## Movie Recommendation System

#### About
This project focuses on developing a movie recommendation system using various data science and machine learning techniques. Dataset used in the project can be found on: https://grouplens.org/datasets/movielens/ although movielens dataset was generated on 26 September 26, 2018 it includes data about 9742 movies. 

#### Features
Integration of the project in Flask isn't complete and is still being developed.
Jupyter file of my project is mostly complete (I still plan to change the code of some of the functions and descriptions) it leverages machine learning techniques to analyze user preferences and movie features. Here are the key components: 

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

README will be periodically updated