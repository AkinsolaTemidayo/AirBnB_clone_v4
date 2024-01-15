document.addEventListener('DOMContentLoaded', function () {
    const apiUrl = 'http://0.0.0.0:5001/api/v1/places_search/';
    const placesSection = document.querySelector('.places');

    // Function to fetch places
    function fetchPlaces() {
        // Send a POST request with Content-Type: application/json and an empty dictionary in the body
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        })
            .then(response => response.json())
            .then(data => {
                // Remove existing articles
                placesSection.innerHTML = '';

                // Loop into the result of the request and create an article tag for each place
                data.forEach(place => {
                    const article = document.createElement('article');
                    // Customize the content based on your place data structure
                    article.innerHTML = `<p>${place.name}</p>`;
                    placesSection.appendChild(article);
                });
            })
            .catch(error => console.error('Error fetching places:', error));
    }

    // Initial fetch on page load
    fetchPlaces();

    // Fetch places every 5000 milliseconds (5 seconds)
    setInterval(fetchPlaces, 5000);
});
