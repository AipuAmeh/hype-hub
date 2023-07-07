const newAchievementHandler = async event => {
  event.preventDefault();
  const topicName = document.querySelector('#achievementFormLabel').textContent;
  const date = document.querySelector('#date').value.trim();
  const subject = document.querySelector('#subject').value.trim();
  const description = document.querySelector('#description').value.trim();
  const imgUrl = document.querySelector('#preview-img').getAttribute('src');

  try {
    if (date && subject && description && topicName) {
      const achievement = { date, subject, description, topicName, imgUrl };
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

// * Cloudinary code

const fileUpload = document.getElementById('file-upload');
const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dhdvifkrn/upload';
const CLOUDINARY_UPLOAD_PRESET = 'bh7znkdp';
const previewImg = document.getElementById('preview-img');

fileUpload.addEventListener('change', async function (event) {
  const file = event.target.files[0];
  let formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

  // eslint-disable-next-line no-undef
  axios({
    url: CLOUDINARY_URL,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www.form.urlencoded',
    },
    data: formData,
  })
    .then(function (res) {
      previewImg.src = res.data.secure_url;
    })
    .catch(function (err) {
      console.error(err);
    });
});
