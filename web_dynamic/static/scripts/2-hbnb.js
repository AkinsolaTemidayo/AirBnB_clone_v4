document.addEventListener('DOMContentLoaded', function () {
    const apiUrl = 'http://0.0.0.0:5001/api/v1/status/';

    // Function to fetch API status
    function fetchApiStatus() {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const apiStatusDiv = document.getElementById('api_status');
                if (data.status === 'OK') {
                    apiStatusDiv.classList.add('available');
                } else {
                    apiStatusDiv.classList.remove('available');
                }
            })
            .catch(error => console.error('Error fetching API status:', error));
    }

    // Initial fetch on page load
    fetchApiStatus();

    // Fetch API status every 5000 milliseconds (5 seconds)
    setInterval(fetchApiStatus, 5000);
});
