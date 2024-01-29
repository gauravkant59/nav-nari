document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');

    registerForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Collect form data
        const formData = new FormData(registerForm);

        // Submit form data to the server using Fetch API or XMLHttpRequest
        // Example: fetch('/register', { method: 'POST', body: formData })
        // Handle server response as needed
    });
});
