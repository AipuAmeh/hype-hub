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
