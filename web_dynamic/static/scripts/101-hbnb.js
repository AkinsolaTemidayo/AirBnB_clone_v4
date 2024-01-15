document.addEventListener('DOMContentLoaded', function () {
    const reviewsSection = document.querySelector('.reviews');
    const toggleButton = document.getElementById('toggle-reviews');

    // Function to fetch and display reviews
    function fetchAndDisplayReviews() {
        // Replace this URL with the actual endpoint for fetching reviews
        const reviewsUrl = 'http://example.com/api/v1/reviews';

        fetch(reviewsUrl)
            .then(response => response.json())
            .then(data => {
                // Remove existing reviews
                reviewsSection.innerHTML = '';

                // Loop through the reviews and create elements to display them
                const ul = document.createElement('ul');
                data.forEach(review => {
                    const li = document.createElement('li');
                    li.textContent = review.text;
                    ul.appendChild(li);
                });

                // Append the new reviews to the reviewsSection
                reviewsSection.appendChild(ul);
            })
            .catch(error => console.error('Error fetching reviews:', error));
    }

    // Event listener for the toggle button click
    toggleButton.addEventListener('click', function () {
        const buttonText = toggleButton.textContent.trim().toLowerCase();

        if (buttonText === 'show') {
            // Fetch, parse, and display reviews
            fetchAndDisplayReviews();
            toggleButton.textContent = 'hide';
        } else {
            // Hide reviews
            reviewsSection.innerHTML = '';
            toggleButton.textContent = 'show';
        }
    });
});
