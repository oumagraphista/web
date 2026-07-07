const form = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const resultBox = document.getElementById('formResult');

const i18n = window.I18N || {
  sending: "Sending...",
  success: "Thank you! Your message has been sent.",
  errorPrefix: "Error: ",
  errorGeneric: "Please try again.",
  catchError: "Something went wrong. Please try again."
};

form.addEventListener('submit', async function (e) {
  e.preventDefault();

  const formData = new FormData(form);
  const originalText = submitBtn.textContent;

  submitBtn.textContent = i18n.sending;
  submitBtn.disabled = true;
  resultBox.style.display = "none";

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
      headers: { "Accept": "application/json" }
    });
    const data = await response.json();

    if (response.ok) {
      resultBox.textContent = i18n.success;
      resultBox.className = "success";
      form.reset();
    } else {
      resultBox.textContent = i18n.errorPrefix + (data.message || i18n.errorGeneric);
      resultBox.className = "error";
    }
  } catch (error) {
    resultBox.textContent = i18n.catchError;
    resultBox.className = "error";
  } finally {
    resultBox.style.display = "block";
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }
});
