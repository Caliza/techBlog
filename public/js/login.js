const loginFormHandler = async (event) => {
    event.preventDefault();


//Collect Values from login form
const email = document.querySelector('#email-login').value.trim();
const password = document.querySelector('#password-login').value.trim();

if (email && password) {
    // Send a post request to API endpoint
    const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ email: email, password: password }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        // If succesful, redirect the browser to profile page
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}
};

const signupFormHandler = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#name-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (name && email && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({username: name, email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.status);
        }
    }   
};

document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);

document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);
