const jobsUrl = "jobs.json";

const jobsContainer = document.getElementById("jobs-container");
const jobSelect = document.getElementById("job");
const form = document.getElementById("apply-form");
const formStatus = document.getElementById("form-status");

let jobsList = [];

async function loadJobs() {
  try {
    const res = await fetch(jobsUrl);
    jobsList = await res.json();

    // Показ вакансій
    jobsContainer.innerHTML = jobsList.map(job => `
      <div class="job-card">
        <img src="${job.image}" alt="${job.title}" />
        <div class="job-content">
          <h3>${job.title}</h3>
          <p><strong>Локация:</strong> ${job.location}</p>
          <p>${job.description}</p>
        </div>
      </div>
    `).join("");

    // Заповнення селектора вакансій у формі
    jobSelect.innerHTML = jobsList.map(job => `
      <option value="${job.title}">${job.title}</option>
    `).join("");
  } catch (err) {
    jobsContainer.innerHTML = "<p>Не удалось загрузить вакансии.</p>";
    console.error(err);
  }
}

form.addEventListener("submit", e => {
  e.preventDefault();

  // Збір даних форми
  const formData = {
    name: form.name.value.trim(),
    email: form.email.value.trim(),
    job: form.job.value,
    message: form.message.value.trim()
  };

  // Відправка через EmailJS
  emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", formData)
    .then(() => {
      formStatus.textContent = "Заявка отправлена успешно!";
      form.reset();
    })
    .catch(() => {
      formStatus.textContent = "Ошибка при отправке заявки.";
    });
});

// Завантажуємо вакансії при старті
loadJobs();
