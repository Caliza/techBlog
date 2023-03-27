const editHandler = async (event) => {
    event.preventDefault();
const post_id = document.querySelector("#project-id").value;
    const title = document.querySelector('#project-name').value.trim();
  // const needed_funding = document.querySelector('#project-funding').value.trim();
  const content = document.querySelector('#project-desc').value.trim();

  if (title && content) {
    const response = await fetch(`/api/post-routes/edit/${post_id}`, {
      method: 'PUT',
      body: JSON.stringify({ title, content }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create project');
    }
  }
};

document.querySelector(".btn").addEventListener("click", editHandler)