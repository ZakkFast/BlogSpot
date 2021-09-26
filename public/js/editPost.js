async function editFormHandler(event) {
    event.preventDefault();
  
    const subject_name = document.querySelector('input[name="subject_name"]').value;
    const body_content = document.querySelector('input[name="body_content"]').value;
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
      console.log(id)
    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            subject_name,
            body_content
        }),
        headers: {
            'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        document.location.replace('/dashboard/');
      } else {
        alert(response.statusText);
      }
  }
  
  document.querySelector('.edit-post').addEventListener('submit', editFormHandler);