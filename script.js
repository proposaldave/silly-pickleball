const variants = {
  consumer: {
    kicker: "Brand route 01",
    title: "Silly Pickleball",
    line: "Let your guard down.",
    image: "assets/surface-to-signal.png"
  },
  club: {
    kicker: "Brand route 02",
    title: "Silly Socials",
    line: "A repeatable club-night format built from laughter, rotation, and return play.",
    image: "assets/slow-fast-decision.png"
  },
  signal: {
    kicker: "Brand route 03",
    title: "The silly graph",
    line: "The surface looks absurd. Underneath, the room is producing signal.",
    image: "assets/social-rituals.png"
  }
};

const hero = document.querySelector(".hero");
const heroBg = document.querySelector(".hero-bg");
const heroTitle = document.querySelector("#hero-title");
const heroLine = document.querySelector("#hero-line");
const variantKicker = document.querySelector("#variant-kicker");
const tabs = Array.from(document.querySelectorAll(".variant-tab"));
const panels = Array.from(document.querySelectorAll(".concept-card"));
const form = document.querySelector("#interest-form");
const formStatus = document.querySelector("#form-status");

function setVariant(name) {
  const variant = variants[name] || variants.consumer;
  hero.dataset.variant = name;
  heroBg.src = variant.image;
  heroTitle.textContent = variant.title;
  heroLine.textContent = variant.line;
  variantKicker.textContent = variant.kicker;

  tabs.forEach((tab) => {
    const active = tab.dataset.target === name;
    tab.classList.toggle("active", active);
    tab.setAttribute("aria-selected", active ? "true" : "false");
  });

  panels.forEach((panel) => {
    panel.classList.toggle("active", panel.dataset.panel === name);
  });
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => setVariant(tab.dataset.target));
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());
  const entries = JSON.parse(localStorage.getItem("sillyPickleballInterest") || "[]");
  entries.push({ ...data, savedAt: new Date().toISOString() });
  localStorage.setItem("sillyPickleballInterest", JSON.stringify(entries));
  formStatus.textContent = `${data.name || "Saved"} is on the ${data.format} list.`;
  form.reset();
});
