async function signupFormHandler(event) {
    event.preventDefault();
  
    const user_name = document.querySelector('#name-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const pwd = document.querySelector('#password-signup').value.trim();
    const github = document.querySelector('#github-signup').value.trim();
  
    if (user_name && email && pwd) {
      const response = await fetch('/api/users', {
        method: 'post',
        body: JSON.stringify({
          user_name,
          email,
          github,
          pwd
        }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      // check the response status
      if (response.ok) {
        console.log('success');
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    }
  }

  document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);