// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    // I will add later
    apiKey: "AIzaSyC9gLWIMDfgeLq1roi8AM5qrvCpysHMfxo",
    authDomain: "login-test-28fcd.firebaseapp.com",
    projectId: "login-test-28fcd",
    storageBucket: "login-test-28fcd.firebasestorage.app",
    messagingSenderId: "850630273496",
    appId: "1:850630273496:web:946a8462d351755338eaad",
    measurementId: "G-FJBKECMN1Y"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const analytics = getAnalytics(app);

// Add this after initialization
auth.onAuthStateChanged((user) => {
    if (user) {
        // User is signed in
        console.log("User is logged in:", user.email);
    } else {
        // User is signed out
        console.log("User is logged out");
    }
});

// DOM Elements
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const forgotPasswordForm = document.getElementById('forgot-password-form');
const showSignup = document.getElementById('show-signup');
const showLogin = document.getElementById('show-login');
const forgotPasswordLink = document.getElementById('forgot-password');
const showLoginFromForgot = document.getElementById('show-login-from-forgot');
const messageDiv = document.getElementById('message');
const container = document.getElementById('container');

// Toggle between forms
showSignup.addEventListener('click', (e) => {
    e.preventDefault();
    loginForm.style.display = 'none';
    signupForm.style.display = 'block';
    forgotPasswordForm.style.display = 'none';
    container.style.height = 'auto';
    clearMessage();
});

showLogin.addEventListener('click', (e) => {
    e.preventDefault();
    signupForm.style.display = 'none';
    loginForm.style.display = 'block';
    forgotPasswordForm.style.display = 'none';
    container.style.height = 'auto';
    clearMessage();
});

forgotPasswordLink.addEventListener('click', (e) => {
    e.preventDefault();
    loginForm.style.display = 'none';
    signupForm.style.display = 'none';
    forgotPasswordForm.style.display = 'block';
    container.style.height = 'auto';
    clearMessage();
});

showLoginFromForgot.addEventListener('click', (e) => {
    e.preventDefault();
    forgotPasswordForm.style.display = 'none';
    loginForm.style.display = 'block';
    container.style.height = 'auto';
    clearMessage();
});

// Display message
function showMessage(type, text) {
    messageDiv.style.display = 'block';
    messageDiv.textContent = text;
    messageDiv.className = 'message ' + type;
}

// Clear message
function clearMessage() {
    messageDiv.style.display = 'none';
    messageDiv.textContent = '';
    messageDiv.className = 'message';
}

// Login form submission
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            showMessage('success', 'Login successful! Redirecting...');
            setTimeout(() => {
                window.location.href = '/dashboard.html';
            }, 1500);
        })
        .catch((error) => {
            showMessage('error', error.message);
        });
});

// Signup form submission
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validate passwords match
    if (password !== confirmPassword) {
        showMessage('error', 'Passwords do not match.');
        return;
    }

    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            showMessage('success', 'Account created! Please check your email for verification.');
            // Send email verification
            userCredential.user.sendEmailVerification();
            // Switch to login form
            signupForm.style.display = 'none';
            loginForm.style.display = 'block';
        })
        .catch((error) => {
            showMessage('error', error.message);
        });
});

// Forgot password form submission
forgotPasswordForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('reset-email').value;

    auth.sendPasswordResetEmail(email)
        .then(() => {
            showMessage('success', 'Password reset link sent to your email!');
        })
        .catch((error) => {
            showMessage('error', error.message);
        });
});