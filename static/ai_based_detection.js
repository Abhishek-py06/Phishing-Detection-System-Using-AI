document.addEventListener('DOMContentLoaded', function() {
    console.log('ai_threat.js loaded');  // Debug log
    const form = document.getElementById('ai-threat-form');
    const resultDiv = document.getElementById('ai-threat-result');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const urlInput = document.getElementById('ai-url').value.trim();
        if (!urlInput) {
            resultDiv.textContent = 'Please enter a valid URL';
            resultDiv.className = 'result-card error';
            resultDiv.style.display = 'block';
            return;
        }

        fetch('/ai_threat_detection', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-Requested-With': 'XMLHttpRequest'
            },
            body: new URLSearchParams({
                'ai-url': urlInput
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