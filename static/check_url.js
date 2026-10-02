document.getElementById('check-url').addEventListener('submit', async function (e) {
    e.preventDefault();

    const urlInput = document.querySelector('input[name="url"]').value;
    const fileInput = document.querySelector('input[name="file"]').files[0];
    const action = e.submitter ? e.submitter.value : null;

    const formData = new FormData();
    const resultDiv = document.getElementById('result');

    // Clear previous styling classes
    resultDiv.classList.remove('safe', 'phishing', 'error');

    if (action === 'url' && urlInput) {
        formData.append('url', urlInput);
    } else if (action === 'file' && fileInput) {
        formData.append('file', fileInput);
    } else {
        resultDiv.innerText = 'Please provide a URL or select a file.';
        resultDiv.classList.add('error');
        return;
    }

    try {
        const response = await fetch('/check', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const resultText = data.result.toLowerCase();

        resultDiv.innerText = data.result;

        // Set background based on result content
        if (resultText.includes('safe')) {
            resultDiv.classList.add('safe');        // green background
        } else if (resultText.includes('phishing') || resultText.includes('detected')) {
            resultDiv.classList.add('phishing');    // red background
        } else {
            resultDiv.classList.add('error');       // neutral or yellow for unknown result
        }

        // Show result and scroll to it
        resultDiv.style.display = 'block';
        resultDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });

    } catch (error) {
        resultDiv.innerText = 'Error: ' + error.message;
        resultDiv.classList.add('error');
    }
});

document.getElementById('file').addEventListener('change', function (e) {
    const fileName = e.target.files[0] ? e.target.files[0].name : 'No file chosen';
    document.getElementById('file-name').innerText = fileName;
});