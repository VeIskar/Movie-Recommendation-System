from flask import Flask, request, jsonify, render_template
import pandas as pd
from sklearn.neighbors import NearestNeighbors
from sklearn.feature_extraction.text import TfidfVectorizer
from scipy.sparse import csr_matrix
from sklearn.metrics.pairwise import cosine_similarity


app = Flask(__name__)

mov_df = pd.read_csv('data/movies.csv')
rat_df = pd.read_csv('data/ratings.csv')

print("Successfully loaded dataset")

mov_df['genre_list'] = mov_df['genres'].str.split('|')

def get_recommendations(user_filter):
    rat_amount = rat_df.groupby(['movieId']).count()
    rat_mean = rat_df.groupby(['movieId']).mean()
    rat_avg = rat_mean.loc[rat_amount['rating'] > user_filter]
    sorted_rat_avg = rat_avg.sort_values(by="rating", inplace=False, ascending=False)
    
    recommendations = sorted_rat_avg.join(mov_df.set_index('movieId')['genres'], on='movieId')
    recommendations = recommendations.join(mov_df.set_index('movieId')['title'], on='movieId')
    recommendations = recommendations[recommendations.columns[3:]]
    
    return recommendations

vectorizer = TfidfVectorizer(ngram_range=(1, 2))
tfidf = vectorizer.fit_transform(mov_df["title"])

#Content-Based recommendation based on movie title similarity using tf-idf and cosine measure
def recom_tfid_title(movie_title):
    try:
        query_index = mov_df[mov_df['title'].str.contains(movie_title, case=False)].index[0]
    except IndexError:
        return pd.DataFrame()
    
    sim_scores = cosine_similarity(tfidf[query_index], tfidf).flatten()
    sim_indices = sim_scores.argsort()[-11:][::-1]
    
    sim_movs_tl = mov_df.iloc[sim_indices]
    sim_movs_tl = sim_movs_tl[sim_movs_tl['title'] != movie_title]
    
    return sim_movs_tl.head(10)

#Knn item-based collaborative filtering genre recommender
def filter_genre(genre):
    return mov_df[mov_df['genres'].str.contains(genre, case=False)]

def knn_genre_recoms(genre, n_neighbors):
    genre_fil_movs = filter_genre(genre)
    
    if genre_fil_movs.empty:
        return []

    genre_matrix = genre_fil_movs['genre_list'].str.join('|').str.get_dummies()
    knn = NearestNeighbors(metric='cosine', algorithm='brute')
    knn.fit(genre_matrix.values)
    
    first_mov_id = genre_fil_movs['movieId'].iloc[0]
    movie_vector = genre_matrix.loc[first_mov_id].values.reshape(1, -1)
    dist, ind = knn.kneighbors(movie_vector, n_neighbors + 1)
    
    similar_movs = genre_fil_movs.iloc[ind[0][1:]]
    similar_movs['similarity'] = dist[0][1:]
    return similar_movs

all_gens = []
for genres in mov_df['genre_list']:
    if genres not in all_gens and genres!='':
        all_gens.append(genres)


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/recommend/tfidf', methods=['POST'])
def recommend_tfidf():
    movie_title = request.form.get('tfidf-mov', type=str)
    recommendations = recom_tfid_title(movie_title)
    return jsonify(recommendations.to_dict(orient='index'))

@app.route('/autocomplete/movies', methods=['GET'])
def autocomplete_movies():
    query = request.args.get('query', type=str)
    if query:
        matches = mov_df[mov_df['title'].str.contains(query, case=False)]
        suggestions = matches['title'].tolist()
    else:
        suggestions = []
    return jsonify(suggestions)


@app.route('/recommend/genre', methods=['POST'])
def recommend_genre():
    genre = request.form.get('knn-genre', type=str)
    recommendations = knn_genre_recoms(genre, 10)
    return jsonify(recommendations.to_dict(orient='index'))

@app.route('/autocomplete/genres', methods=['GET'])
def autocomplete_genres():
    query = request.args.get('query', type=str)
    matches = []

    for genre in all_gens:
        if query.lower() in genre.lower():
            matches.append(genre)

    return jsonify(matches)


@app.route('/recommend', methods=['POST'])
def recommend():
    user_filter = request.form.get('user_filter', type=int, default=100)
    recommendations = get_recommendations(user_filter)
    recommendations = recommendations.head(10)
    return jsonify(recommendations.to_dict(orient='index'))

if __name__ == '__main__':
    app.run(debug=True)