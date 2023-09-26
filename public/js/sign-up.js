const signUpFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#name-sign-up').value.trim();
    const email = document.querySelector('#email-sign-up').value.trim();
    const password = document.querySelector('#password-sign-up').value.trim();
  
    if (name && email && password) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to sign up: make sure your password is at least 8 characters long');
      }
    }
  };
  
  document
    .querySelector('.sign-up-form')
    .addEventListener('submit', signUpFormHandler);