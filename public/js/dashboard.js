const newTopicHandler = async event => {
  event.preventDefault();

  const topicName = document.querySelector('#newListTitle').value.trim();
  try {
    if (topicName) {
      const response = await fetch(`/api/dashboard`, {
        method: 'POST',
        body: JSON.stringify({ topicName }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to create topic');
      }
    }
  } catch (error) {
    console.error(error);
  }
};

const deleteTopicHandler = async event => {
  event.preventDefault();

  const topicId = event.target.getAttribute('data-topic-id');
  try {
    const response = await fetch(`/api/dashboard/${topicId}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete topic');
    }
  } catch (error) {
    console.error(error);
  }
};

document
  .querySelector('#savedTitle')
  .addEventListener('click', newTopicHandler);

document.addEventListener('DOMContentLoaded', () => {
  const deleteTopicBtns = document.querySelectorAll('.deleteTopic');
  deleteTopicBtns.forEach(deleteTopicBtn => {
    deleteTopicBtn.addEventListener('click', deleteTopicHandler);
  });
});
