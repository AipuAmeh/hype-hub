// const { EmptyResultError } = require("sequelize");

const newTopicHandler = async event => {
  event.preventDefault();

  const topicName = document.querySelector('#newListTitle').value.trim();
  console.log(topicName);
  try {
    if (topicName) {
      const response = await fetch(`/dashboard`, {
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

document
  .querySelector('#savedTitle')
  .addEventListener('click', newTopicHandler);
