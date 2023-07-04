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
      `  <li>
        <div class='card' style='width: 18rem;'>
          <div class='card-body'>
            <h5 class='card-title'>${achievement.subject}</h5>
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

document
  .querySelector('.achievement-form')
  .addEventListener('submit', newAchievementHandler);
// Extract the topicId from the URL
const urlPath = window.location.pathname;
const pathSegments = urlPath.split('/');
const topicId = pathSegments[pathSegments.length - 1];

// Load achievements when the page loads
fetch('/api/achievements/' + topicId)
  .then(response => response.json())
  .then(achievements => {
    const achievementsContainer = document.querySelector(
      '#achievements-container'
    );

    achievements.forEach(achievement => {
      const achievementElement = document.createElement('div');
      achievementElement.textContent = achievement.name;

      achievementsContainer.appendChild(achievementElement);
    });
  });
// To handle form submission
document
  .querySelector('#new-achievement-form')
  .addEventListener('submit', function (event) {
    event.preventDefault();

    const achievementName = document
      .querySelector('#achievement-name')
      .value.trim();

    fetch('/api/achievements', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: achievementName, topicId: topicId }),
    })
      .then(response => response.json())
      .then(newAchievement => {
        // Insert the new achievement into your page
        const achievementsContainer = document.querySelector(
          '#achievements-container'
        );
        const achievementElement = document.createElement('div');
        achievementElement.textContent = newAchievement.name;

        achievementsContainer.appendChild(achievementElement);
      });
  });

const addNewCardHandler = async event => {
  event.preventDefault();

  const cardTitle = document.querySelector('#card-title').value.trim();
  const cardContent = document.querySelector('#card-content').value.trim();

  try {
    if (cardTitle && cardContent) {
      const response = await fetch('/topic/${topicId}/card', {
        method: 'POST',
        body: JSON.stringify({
          title: cardTitle,
          content: cardContent,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to create new card');
      }

      // Page refresh
      document.location.reload();
    }
  } catch (error) {
    console.error(error);
  }
};

document
  .querySelector('#new-card-form')
  .addEventListerner('submit', addNewCardHandler);

const backToDashboardHandler = event => {
  event.preventDefault();

  document.location.replace('/dashboard');
};

document
  .querySelector('#back-to-dashboard-button')
  .addEventListener('click', backToDashboardHandler);
