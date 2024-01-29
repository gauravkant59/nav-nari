document.addEventListener('DOMContentLoaded', function() {
    const activateForm = document.getElementById('activateForm');

    activateForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Collect activation code
        const activationCode = document.getElementById('activationCode').value;

        // Send activation code to the server using Fetch API or XMLHttpRequest
        // Example: fetch('/activate', { method: 'POST', body: JSON.stringify({ activationCode }) })
        // Handle server response as needed
    });
});
