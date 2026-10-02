document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('analyze-headers-form');
    const resultCard = document.getElementById('headers-result');

    if (!form || !resultCard) {
        console.error('Form or result card not found');
        return;
    }

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const formData = new FormData(form);

        fetch('/analyze_headers', {
            method: 'POST',
            body: formData,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            resultCard.classList.remove('success', 'error', 'show');
            resultCard.innerHTML = `<pre>${data}</pre>`;
            resultCard.classList.add(
                data.includes('Error') || data.includes('Not Safe') ? 'error' : 'success',
                'show'
            );
        })
        .catch(error => {
            console.error('Error:', error);
            resultCard.classList.remove('success', 'error', 'show');
            resultCard.innerHTML = `<pre>Error: ${error.message}</pre>`;
            resultCard.classList.add('error', 'show');
        });
    });
});