const form = document.querySelector("#interest-form");
const formStatus = document.querySelector("#form-status");

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    const entries = JSON.parse(localStorage.getItem("sillyPickleballInterest") || "[]");
    entries.push({ ...data, savedAt: new Date().toISOString() });
    localStorage.setItem("sillyPickleballInterest", JSON.stringify(entries));
    formStatus.textContent = `${data.name || "Saved"} is on the ${data.format} list.`;
    form.reset();
  });
}
