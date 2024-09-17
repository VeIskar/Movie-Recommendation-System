document.getElementById('recommendation-form').addEventListener('submit', function(event) {

    event.preventDefault();
    
    const userFilter = document.getElementById('user_filter').value;

    fetch('/recommend', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded', 
        },
        body: `user_filter=${userFilter}`,
    })
    .then(response => response.json())
    .then(data => {
        const recommendationsDiv = document.getElementById('recommendations');
        recommendationsDiv.innerHTML = '<h2>Recommended Movies:</h2>';
        for (let movieId in data) {
            let movie = data[movieId];
            let movieDiv = document.createElement('div');
            movieDiv.innerHTML = `<strong>${movie.title}</strong> (${movie.genres})`;
            recommendationsDiv.appendChild(movieDiv);
        }
    });
});

document.getElementById('recommendation-tfidf-movie').addEventListener('submit', function(event) {
    event.preventDefault();
    const movieTitle = document.getElementById('tfidf-mov-search').value;

    fetch('/recommend/tfidf', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `tfidf-mov=${movieTitle}`,
    })
    .then(response => response.json())
    .then(data => {
        const recommendationsDiv = document.getElementById('recommendations-tfidf');
        recommendationsDiv.innerHTML = '<h2>Recommended Movies:</h2>';
        for (let movieId in data) {
            let movie = data[movieId];
            let movieDiv = document.createElement('div');
            movieDiv.innerHTML = `<strong>${movie.title}</strong> (${movie.genres})`;
            recommendationsDiv.appendChild(movieDiv);
        }
    });
});


document.getElementById('recommendation-tfidf-allsrch').addEventListener('submit', function(event) {
    event.preventDefault();

    let query = document.getElementById('tfidf-all-search').value;

    fetch('/recommend/tfidf_all', {
        method: 'POST',
        headers: {
            'Content-Type':'application/x-www-form-urlencoded',
        },
        body: `tfidf-mov=${query}`
    })
    .then(response => response.json())
    .then(data => {
        const recommendationsDiv = document.getElementById('recommendations-tfidf-allsrch');
        recommendationsDiv.innerHTML = '<h2>Recommended Movies:</h2>' ;
        for (let movieId in data) {
            let movie = data[movieId];
            let movieDiv = document.createElement('div');
            movieDiv.innerHTML = `<strong>${movie.title}</strong> (${movie.genres})`;
            recommendationsDiv.appendChild(movieDiv);
        }

    });
});

document.getElementById('recommendation-knn-genre').addEventListener('submit', function(event) {
    event.preventDefault();
    const genre = document.getElementById('knn-genre-search').value;
    fetch('/recommend/genre', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `knn-genre=${genre}`,
    })
    .then(response => response.json())
    .then(data => {
        const recommendationsDiv = document.getElementById('recommendations-genre');
        recommendationsDiv.innerHTML = '<h2>Recommended Movies:</h2>';
        for (let movieId in data) {
            let movie = data[movieId];
            let movieDiv = document.createElement('div');
            movieDiv.innerHTML = `<strong>${movie.title}</strong> (${movie.genres})`;
            recommendationsDiv.appendChild(movieDiv);
        }
    });
});



/* autocomplete */
document.getElementById('tfidf-mov-search').addEventListener('input', function() {
    let query = this.value;
    if (query.length > 2) {
        fetch(`/autocomplete/movies?query=${query}`)
            .then(response => response.json())
            .then(data => {

                let suggestions = data.map(movie => {
                    let sug_title = movie.split('(')[0].trim();
                    return `<option value="${sug_title}"></option>`;
                });
                document.getElementById('movie-suggestions').innerHTML = suggestions.join('');

             });
    }
});


document.getElementById('knn-genre-search').addEventListener('input', function() {
    let query = this.value;
    if (query.length > 2) {
        fetch(`/autocomplete/genres?query=${query}`)
            .then(response => response.json())
            .then(data => {

                let suggestions = data.map(genre => `<option value="${genre}"></option>`);
                document.getElementById('genre-suggestions').innerHTML = suggestions.join('');

             });
    }
});

document.getElementById('tfidf-all-search').addEventListener('input', function() {
    let query = this.value;
    if (query.length > 2) {
        fetch(`/autocomplete/movies?query=${query}`)
            .then(response => response.json())
            .then(data => {

                let suggestions = data.map(movie => {
                    let sug_title = movie.split('(')[0].trim();
                    return `<option value="${sug_title}"></option>`;
                });
                document.getElementById('movie-suggestions').innerHTML = suggestions.join('');

            });
    }
});
