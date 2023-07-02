// const { EmptyResultError } = require("sequelize");

const newAchievementHandler = async event => {
  event.preventDefault();

  const date = document.querySelector('#date').value.trim();
  const subject = document.querySelector('#subject').value.trim();
  const description = document.querySelector('#description').value.trim();

  try {
    if (date && subject && description) {
      const response = await fetch(`/api/topic/:topicName`, {
        method: 'POST',
        body: JSON.stringify({ date, subject, description }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        document.location.replace('/topic/:topicName');
      } else {
        alert('Failed to create achievement');
      }
    }
  } catch (error) {
    console.error(error);
  }
};

document
  .querySelector('.achievement-form')
  .addEventListener('submit', newAchievementHandler);
