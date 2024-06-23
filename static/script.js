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