async function newFormHandler(event) {
    event.preventDefault();
  
    const subject_name = document.querySelector('input[name="subject_name"]').value;
    const body_content = document.querySelector('input[name="body_content"]').value;
  
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({
        subject_name,
        body_content
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('.create-post').addEventListener('submit', newFormHandler);