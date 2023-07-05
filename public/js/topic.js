const topicName = document.querySelector('#achievementFormLabel').textContent;
const date = document.querySelector('#date').value.trim();
const subject = document.querySelector('#subject').value.trim();
const description = document.querySelector('#description').value.trim();

const newAchievementHandler = async event => {
  event.preventDefault();

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
        addAchievementToPage(achievement);
        removeIntro();
      } else {
        alert('Failed to create achievement');
      }
    }
  } catch (error) {
    console.error(error);
  }
};

const addAchievementToPage = achievement => {
  const container = document.querySelector('#achievementContainer');
  if (container) {
    container.insertAdjacentHTML(
      'afterbegin',
      ` <li>
      <div class='card' style='width: 18rem;'>
        <div class='card-header'>
          <h5 class='card-title'>${achievement.subject}</h5>
          <button
            type='button'
            class='btn-close'
            id='${achievement.id}'
            aria-label='Close'
          ></button>
        </div>
        <div class='card-body'>
          <h6 class='card-subtitle mb-2 text-muted'>${achievement.date}</h6>
          <p class='card-text'>${achievement.description}</p>
        </div>
      </div>
    </li>`
    );
  }
};

const removeIntro = () => {
  const intro = document.querySelector('#intro');
  if (intro) intro.remove();
};

const deleteAchievementHandler = async event => {
  event.preventDefault();

  const achievementToDelete = document
    .querySelector('#deleteAchievement')
    .value.trim();
  try {
    const response = await fetch(
      `/api/topic/${topicName}/${achievementToDelete}`,
      {
        method: 'DELETE',
      }
    );
    if (response.ok) {
      document.location.replace(`/topic/${topicName}`);
    } else {
      alert('Failed to delete achievement');
    }
  } catch (error) {
    console.error(error);
  }
};

document
  .querySelector('.achievement-form')
  .addEventListener('submit', newAchievementHandler);

document
  .querySelector('#deleteAchievement')
  .addEventListener('click', deleteAchievementHandler);
