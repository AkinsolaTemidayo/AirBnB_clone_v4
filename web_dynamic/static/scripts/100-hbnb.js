document.addEventListener('DOMContentLoaded', function () {
    const apiUrl = 'http://0.0.0.0:5001/api/v1/places_search/';
    const placesSection = document.querySelector('.places');
    const amenitiesCheckbox = document.querySelector('#amenities-checkbox');
    const statesCheckbox = document.querySelector('.states');
    const citiesCheckbox = document.querySelector('.cities');
    const locationsDiv = document.querySelector('.locations');
    const searchButton = document.querySelector('#search-button');

    // Variables to store checked states and cities
    let checkedStates = {};
    let checkedCities = {};

    // Function to fetch places based on checked amenities, states, and cities
    function fetchPlaces() {
        const checkedAmenities = Array.from(amenitiesCheckbox.querySelectorAll('input:checked')).map(input => input.value);
        
        // Convert the checked states and cities to arrays
        const checkedStatesArray = Object.keys(checkedStates).filter(stateId => checkedStates[stateId]);
        const checkedCitiesArray = Object.keys(checkedCities).filter(cityId => checkedCities[cityId]);

        // Send a POST request to places_search with the list of checked amenities, states, and cities
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ amenities: checkedAmenities, states: checkedStatesArray, cities: checkedCitiesArray })
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

    // Function to update the locations display
    function updateLocationsDisplay() {
        const checkedStatesArray = Object.keys(checkedStates).filter(stateId => checkedStates[stateId]);
        const checkedCitiesArray = Object.keys(checkedCities).filter(cityId => checkedCities[cityId]);

        const locationsText = [...checkedStatesArray, ...checkedCitiesArray].join(', ');
        locationsDiv.innerHTML = `Locations: ${locationsText}`;
    }

    // Event listener for changes on state checkboxes
    statesCheckbox.addEventListener('change', function (event) {
        const stateId = event.target.dataset.id;
        const stateName = event.target.dataset.name;

        checkedStates[stateId] = event.target.checked;
        updateLocationsDisplay();
    });

    // Event listener for changes on city checkboxes
    citiesCheckbox.addEventListener('change', function (event) {
        const cityId = event.target.dataset.id;
        const cityName = event.target.dataset.name;

        checkedCities[cityId] = event.target.checked;
        updateLocationsDisplay();
    });

    // Event listener for the search button click
    searchButton.addEventListener('click', fetchPlaces);
});
