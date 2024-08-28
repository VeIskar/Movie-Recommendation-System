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


$(function() {
    $("#tfidf-mov-search").autocomplete({
        source: function(request, response) {
            $.ajax({
                url: "/autocomplete/movies" ,
                data: { query: request.term}, 
                success: function(data) {
                    response(data);
                }
            });
        },
        minLength: 2

    }); 
});
