## Movie Recommendation System

#### About
This project focuses on developing a movie recommendation system using various data science and machine learning techniques. Dataset used in the project can be found on: https://grouplens.org/datasets/movielens/ although movielens dataset was generated on 26 September 26, 2018 it includes data about 9742 movies. 

#### Features
Integration of the project in Flask is complete with the kNN tf-idf and generic recommendation techniques in the current iteration. More features are however planned alongside with major frontend update whcih will be completed in the future.

Jupyter file of my project is complete it leverages machine learning techniques to analyze user preferences and movie features. Below are the key components: 

1. Generic Recommendation:
- Method: Calculates the average rating of movies that have been rated by a specified minimum number of users.
- Implementationwith basic statistical: methods to filter and sort movies based on user ratings.
2. Advanced Recommendations:
- Data Cleaning: Noise reduction by removing users with few ratings and movies rated by few users to enhance recommendation quality as well as creating new data from to map user ratings to movies, filling missing values with zeroes.
- Collaborative Filtering: Uses cosine similarity to find similar users and recommend movies they liked.
- k-Nearest Neighbors (kNN): Item-based collaborative filtering to recommend movies similar to a user-rated movie or based on movie genres.
- Term Frequency - Inverse Document Frequency (TF-IDF): Utilizes content-based filtering alorithm to recommend movies based on the similarity of their titles and other content features.
3. EDA
- Data Visualization: plots and histograms visualizing information about users, movie genres, etc.

**Flask Integration**
The project includes a Flask web application that allows users to interact with the recommendation systems directly from a web browser with the following features:
1. Generic Movie Recommendation:
- Get a list of movies based on the most rated and highest-scored movies by setting a minimum rating threshold
2. TF-IDF Based Recommendation:
- Get recommendation for movies similar to a specified title using TF-IDF and cosine similarity
3. kNN genre-Based Recommendation:
- Recommend movies based on a specified genre using the kNN algorithm.
4. Autocomplete:
- Predicting rest of the word for the user
#### Usage and installation
1. Clone the repo
2. Install necessary libs (pandas, numpy, seaborn):
```bash
    pip install -r requirements.txt
```
3. Run the jupyter file:
    ```bash
    jupyter notebook
    ```


#### Future updates
- Further refine machine learning models to enhance recommendation accuracy.
- Major update of front-end
- Enhance the Flask app with more interactive features

README will be periodically updated