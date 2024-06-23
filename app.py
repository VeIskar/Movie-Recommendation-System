from flask import Flask, request, jsonify, render_template
import pandas as pd

app = Flask(__name__)


mov_df = pd.read_csv('data/movies.csv')
rat_df = pd.read_csv('data/ratings.csv')
tag_df = pd.read_csv('data/tags.csv')
lin_df = pd.read_csv('data/links.csv')

print("Successfully loaded dataset")


joined_data = rat_df.join(mov_df.set_index('movieId')['genres'], on='movieId')
joined_data = joined_data.join(mov_df.set_index('movieId')['title'], on='movieId')


def get_recommendations(user_filter=100):
    rat_amount = rat_df.groupby(['movieId']).count()
    rat_mean = rat_df.groupby(['movieId']).mean()
    rat_avg = rat_mean.loc[rat_amount['rating'] > user_filter]
    sorted_rat_avg = rat_avg.sort_values(by="rating", inplace=False, ascending=False)
    
    recommendations = sorted_rat_avg.join(mov_df.set_index('movieId')['genres'], on='movieId')
    recommendations = recommendations.join(mov_df.set_index('movieId')['title'], on='movieId')
    recommendations = recommendations[recommendations.columns[3:]]
    
    return recommendations

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/recommend', methods=['POST'])
def recommend():
    user_filter = request.form.get('user_filter', type=int, default=100)
    recommendations = get_recommendations(user_filter)
    recommendations = recommendations.head(10)
    return jsonify(recommendations.to_dict(orient='index'))

if __name__ == '__main__':
    app.run(debug=True)