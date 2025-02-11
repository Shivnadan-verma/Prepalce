document.addEventListener("DOMContentLoaded", function() {
    // Get form elements
    const loginForm = document.querySelector("form[action='/login']");
    const registerForm = document.querySelector("form[action='/register']");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirm-password");
    const passwordStrengthLabel = document.createElement('span');
    passwordStrengthLabel.style.fontSize = "0.9em";
    passwordStrengthLabel.style.color = "#ff0000";
    passwordInput.parentElement.appendChild(passwordStrengthLabel);

    // Password strength check function
    function checkPasswordStrength(password) {
        const strength = calculateStrength(password);
        if (strength < 2) {
            passwordStrengthLabel.textContent = "Weak password";
            passwordStrengthLabel.style.color = "#ff0000";
        } else if (strength < 4) {
            passwordStrengthLabel.textContent = "Medium strength password";
            passwordStrengthLabel.style.color = "#ffa500";
        } else {
            passwordStrengthLabel.textContent = "Strong password";
            passwordStrengthLabel.style.color = "#00ff00";
        }
    }

    // Calculate password strength
    function calculateStrength(password) {
        let strength = 0;
        if (password.length >= 8) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/\d/.test(password)) strength++;
        if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;
        return strength;
    }

    // Event listener to check password strength
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            checkPasswordStrength(passwordInput.value);
        });
    }

    // Register form validation
    if (registerForm) {
        registerForm.addEventListener("submit", function(e) {
            const password = document.getElementById("password").value;
            const confirmPassword = document.getElementById("confirm-password").value;
            if (password !== confirmPassword) {
                e.preventDefault();
                alert("Passwords do not match.");
            }
        });
    }

    // Login form validation with AJAX
    if (loginForm) {
        loginForm.addEventListener("submit", function(e) {
            e.preventDefault();  // Prevent the default form submission
            
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            
            // Validate email and password before sending request
            if (!email || !password) {
                alert("Please fill in both fields.");
                return;
            }

            // Send the login request via AJAX (fetch)
            fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    window.location.href = '/dashboard';  // Redirect to the dashboard
                } else {
                    alert("Your password is wrong");  // Show error message if login failed
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert("An error occurred. Please try again later.");
            });
        });
    }
});
