document.addEventListener('DOMContentLoaded', function() {
    console.log('blacklist.js loaded');  // Debug log
    const form = document.getElementById('check-url');
    const resultDiv = document.getElementById('blacklist-result');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const urlInput = document.getElementById('blacklist-url').value.trim();
        if (!urlInput) {
            resultDiv.textContent = 'Please enter a valid URL';
            resultDiv.className = 'result-card error';
            resultDiv.style.display = 'block';
            return;
        }

        fetch('/blacklist_lookup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-Requested-With': 'XMLHttpRequest'
            },
            body: new URLSearchParams({
                'blacklist-url': urlInput
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            resultDiv.textContent = data.message;
            resultDiv.className = 'result-card ' + data.status;
            resultDiv.style.display = 'block';
        })
        .catch(error => {
            console.error('Fetch error:', error);
            resultDiv.textContent = `Error: ${error.message}`;
            resultDiv.className = 'result-card error';
            resultDiv.style.display = 'block';
        });
    });
});