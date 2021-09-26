async function loginFormHandler(event) {
  event.preventDefault();

  const email = document.querySelector('#email-login').value.trim();
  const pwd = document.querySelector('#password-login').value.trim();

  if (email && pwd) {
    const response = await fetch('/api/users/login', {
      method: 'post',
      body: JSON.stringify({
        email,
        pwd
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Incorrect email or password');
    }
  }
}


  document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);
  
