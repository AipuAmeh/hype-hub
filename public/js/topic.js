const newAchievementHandler = async event => {
  event.preventDefault();
  const topicName = document.querySelector('#achievementFormLabel').textContent;
  const date = document.querySelector('#date').value.trim();
  const subject = document.querySelector('#subject').value.trim();
  const description = document.querySelector('#description').value.trim();

  try {
    if (date && subject && description && topicName) {
      const achievement = { date, subject, description, topicName };
      const response = await fetch(`/api/topic/${topicName}`, {
        method: 'POST',
        body: JSON.stringify(achievement),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        document.location.replace(`/topic/${topicName}`);
      } else {
        alert('Failed to create achievement');
      }
    }
  } catch (error) {
    console.error(error);
  }
};

const deleteAchievementHandler = async event => {
  event.preventDefault();

  if (window.confirm('Are you sure you want to delete this Topic?')) {
    const topicId = document
      .querySelector('#achievementFormLabel')
      .getAttribute('data-topic-id');
    const topicName = document.querySelector(
      '#achievementFormLabel'
    ).textContent;
    const achievementId = event.target.getAttribute('data-achievement-id');
    try {
      const response = await fetch(`/api/topic/${topicId}/${achievementId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        document.location.replace(`/topic/${topicName}`);
      } else {
        alert('Failed to delete achievement');
      }
    } catch (error) {
      console.error(error);
    }
  }
};

document
  .querySelector('.achievement-form')
  .addEventListener('submit', newAchievementHandler);

document.addEventListener('DOMContentLoaded', () => {
  const deleteAchievementBtns = document.querySelectorAll('.deleteAchievement');
  deleteAchievementBtns.forEach(deleteAchievementBtn => {
    deleteAchievementBtn.addEventListener('click', deleteAchievementHandler);
  });
});
