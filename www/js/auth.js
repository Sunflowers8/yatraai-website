// Password Strength Indicator
function checkPasswordStrength(password) {
    const strengthBar = document.querySelector('.strength-bar');
    const strengthText = document.querySelector('.strength-text');
    
    // Reset
    strengthBar.style.width = '0%';
    strengthBar.style.backgroundColor = '#ff4757';
    strengthText.textContent = 'Weak';
    
    if (!password) return;
    
    // Calculate strength
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength += 1;
    if (password.match(/[0-9]/)) strength += 1;
    if (password.match(/[^A-Za-z0-9]/)) strength += 1;
    
    // Update UI
    if (strength === 1) {
        strengthBar.style.width = '25%';
        strengthBar.style.backgroundColor = '#ff4757';
        strengthText.textContent = 'Weak';
    } else if (strength === 2) {
        strengthBar.style.width = '50%';
        strengthBar.style.backgroundColor = '#ffa502';
        strengthText.textContent = 'Moderate';
    } else if (strength === 3) {
        strengthBar.style.width = '75%';
        strengthBar.style.backgroundColor = '#2ed573';
        strengthText.textContent = 'Strong';
    } else if (strength === 4) {
        strengthBar.style.width = '100%';
        strengthBar.style.backgroundColor = '#2ed573';
        strengthText.textContent = 'Very Strong';
    }
}

// Sign Up Form Validation
document.getElementById('signup-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const terms = document.getElementById('terms').checked;
    
    // Validation
    if (!name || !email || !phone || !password || !confirmPassword) {
        alert('Please fill in all fields');
        return;
    }
    
    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }
    
    if (!terms) {
        alert('You must accept the terms and conditions');
        return;
    }
    
    // Phone validation (basic)
    if (phone.length < 10 || !phone.match(/^[0-9]+$/)) {
        alert('Please enter a valid phone number');
        return;
    }
    
    // Email validation (basic)
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // In a real app, you would send this to your backend
    console.log('Signing up:', { name, email, phone });
    
    // Simulate successful signup
    localStorage.setItem('authToken', 'simulated-signup-token');
    localStorage.setItem('userName', name);
    localStorage.setItem('userEmail', email);
    window.location.href = 'app.html';
});

// Password strength checker
document.getElementById('password')?.addEventListener('input', function(e) {
    checkPasswordStrength(e.target.value);
});

// Social Auth Functions
function signInWithGoogle() {
    // In a real app, implement Google Sign-In
    console.log('Signing in with Google');
    localStorage.setItem('authToken', 'google-simulated-token');
    localStorage.setItem('userName', 'Google User');
    localStorage.setItem('userEmail', 'googleuser@example.com');
    window.location.href = 'app.html';
}

function signInWithFacebook() {
    // In a real app, implement Facebook Login
    console.log('Signing in with Facebook');
    localStorage.setItem('authToken', 'facebook-simulated-token');
    localStorage.setItem('userName', 'Facebook User');
    localStorage.setItem('userEmail', 'fbuser@example.com');
    window.location.href = 'app.html';
}

// Initialize from signin.html
document.getElementById('signin-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Basic validation
    if (!email || !password) {
        alert('Please fill in all fields');
        return;
    }
    
    // In a real app, you would verify credentials with your backend
    console.log('Signing in with:', email);
    
    // Simulate successful login
    localStorage.setItem('authToken', 'simulated-login-token');
    localStorage.setItem('userEmail', email);
    window.location.href = 'app.html';
});