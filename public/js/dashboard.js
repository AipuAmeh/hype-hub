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
        addTopicToPage(topicName);
        removeIntro();
      } else {
        alert('Failed to create topic');
      }
    }
  } catch (error) {
    console.error(error);
  }
};

const addTopicToPage = topicName => {
  const container = document.querySelector('#topic-container');
  if (container) {
    container.insertAdjacentHTML(
      'afterbegin',
      `  <a href='/topic/${topicName}'>
      <div class='row row-cols-1 row-cols-md-2 pl-5 topic-list'>
        <div class='row mb-2'>
          <div class='col'>
            <div class='card'>
              <div class='pl-4 card-body'>
                <h5 class='card-title'>${topicName}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </a>`
    );
  }
};

const removeIntro = () => {
  const intro = document.querySelector('#intro');
  if (intro) intro.remove();
};

document
  .querySelector('#savedTitle')
  .addEventListener('click', newTopicHandler);
