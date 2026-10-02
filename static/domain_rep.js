document.getElementById('check-domain').addEventListener('submit', async function(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const resultDiv = document.getElementById('result');

    try {
        const response = await fetch('/url_analysis', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();
        resultDiv.style.display = 'block';

        if (data.error) {
            resultDiv.className = 'result-card error';
            resultDiv.innerHTML = `<p>${data.error}</p>`;
        } else {
            const isValid = data.domain_reputation.includes('trustworthy') && data.ssl_check.includes('valid');
            resultDiv.className = isValid ? 'result-card valid' : 'result-card invalid';
            resultDiv.innerHTML = `
                <dl class="result-list">
                    <dt>Domain Reputation:</dt>
                    <dd>${data.domain_reputation}</dd>
                    <br>
                    <dt>SSL Status:</dt>
                    <dd>${data.ssl_check}</dd>
                </dl>
            `;
        }
    } catch (error) {
        resultDiv.style.display = 'block';
        resultDiv.className = 'result-card error';
        resultDiv.innerHTML = `<p>Error: Failed to fetch analysis results</p>`;
    }
});