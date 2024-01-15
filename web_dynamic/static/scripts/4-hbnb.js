document.addEventListener('DOMContentLoaded', function () {
    const apiUrl = 'http://0.0.0.0:5001/api/v1/places_search/';
    const placesSection = document.querySelector('.places');
    const amenitiesCheckbox = document.querySelector('#amenities-checkbox');
    const searchButton = document.querySelector('#search-button');

    // Function to fetch places based on checked amenities
    function fetchPlaces() {
        const checkedAmenities = Array.from(amenitiesCheckbox.querySelectorAll('input:checked')).map(input => input.value);

        // Send a POST request to places_search with the list of checked amenities
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ amenities: checkedAmenities })
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

    // Event listener for the search button click
    searchButton.addEventListener('click', fetchPlaces);
});
