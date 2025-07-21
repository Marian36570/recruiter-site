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

    jobSelect.innerHTML = jobsList.map(job => `
      <option value="${job.title}">${job.title}</option>
    `).join("");
  } catch (err) {
    jobsContainer.innerHTML = "<p>Не удалось загрузить вакансии.</p>";
    console.error(err);
  }
}

// Ініціалізація EmailJS з відкритим ключем
emailjs.init("Dx57A1q8VUKvdmwN9");

form.addEventListener("submit", e => {
  e.preventDefault();

  const formData = {
    name: form.name.value,
    email: form.email.value,
    job: form.job.value,
    message: form.message.value,
  };

  formStatus.textContent = "Отправка...";

  emailjs.send("service_5tjdkih", "template_6ch5tei", formData)
    .then(() => {
      formStatus.textContent = "Спасибо! Ваша заявка отправлена.";
      form.reset();
    })
    .catch((error) => {
      console.error("Ошибка при отправке:", error);
      formStatus.textContent = "Ошибка при отправке. Попробуйте позже.";
    });
});

loadJobs();
