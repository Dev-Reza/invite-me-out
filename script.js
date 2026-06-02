const CONFIG = {
  // Tu número con código de país, sin +, espacios ni guiones.
  whatsappNumber: "50245738104",

  // Su nombre o apodo.
  recipientName: "Mafer",

  // Pregunta inicial.
  introQuestion: "¿Te gustaría salir conmigo?",
};

const state = {
  date: "",
  period: "",
  time: "",
  foods: [],
};

const TIME_SLOTS = {
  morning: ["9:00 AM", "10:00 AM", "11:00 AM"],
  afternoon: [
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
    "7:00 PM",
  ],
};

const screens = document.querySelectorAll(".screen");
const noBtn = document.getElementById("no-btn");
const yesBtn = document.getElementById("yes-btn");
const noMessage = document.getElementById("no-message");
const introTitle = document.getElementById("intro-title");
const dateInput = document.getElementById("date-input");
const timeOptions = document.getElementById("time-options");
const timeOptionsLabel = document.getElementById("time-options-label");
const timePeriodCards = document.querySelectorAll(".time-period-card");
const dateError = document.getElementById("date-error");
const foodError = document.getElementById("food-error");
const finalLine = document.getElementById("final-line");
const finalDate = document.getElementById("final-date");
const finalTime = document.getElementById("final-time");
const finalFood = document.getElementById("final-food");
const whatsappBtn = document.getElementById("whatsapp-btn");
const copyBtn = document.getElementById("copy-btn");
const copyStatus = document.getElementById("copy-status");

introTitle.textContent = CONFIG.introQuestion;

function showScreen(id) {
  screens.forEach((screen) => screen.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function setMinimumDate() {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");

  dateInput.min = `${yyyy}-${mm}-${dd}`;
}

function moveNoButton() {
  const card = noBtn.closest(".card");
  const cardRect = card.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();

  noBtn.style.position = "absolute";

  const padding = 24;
  const maxX = Math.max(padding, cardRect.width - btnRect.width - padding);
  const maxY = Math.max(padding, cardRect.height - btnRect.height - padding);
  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY);

  noBtn.style.left = `${randomX}px`;
  noBtn.style.top = `${randomY}px`;

  if (noMessage) {
    noMessage.classList.remove("hidden");
  }
}

function protectNoButtonFromKeyboard(event) {
  // Si intenta llegar con Tab o si algún navegador le da focus por accidente,
  // el botón escapa y regresamos el foco al botón bueno.
  if (event) event.preventDefault();

  moveNoButton();
  yesBtn.focus({ preventScroll: true });
}

timePeriodCards.forEach((card) => {
  card.addEventListener("click", () => {
    const period = card.dataset.period;

    timePeriodCards.forEach((item) => {
      item.classList.remove("selected");
    });

    card.classList.add("selected");
    state.period = period;

    renderTimeOptions(period);
    dateError.classList.add("hidden");
  });
});

function formatDateForCard(dateValue) {
  const [year, month, day] = dateValue.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  return date.toLocaleDateString("es-GT", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

function renderTimeOptions(period) {
  const slots = TIME_SLOTS[period] || [];

  timeOptions.innerHTML = "";
  state.time = "";

  slots.forEach((slot) => {
    const button = document.createElement("button");

    button.type = "button";
    button.className = "time-card";
    button.textContent = slot;

    button.addEventListener("click", () => {
      document.querySelectorAll(".time-card").forEach((card) => {
        card.classList.remove("selected");
      });

      button.classList.add("selected");
      state.time = slot;
      dateError.classList.add("hidden");
    });

    timeOptions.appendChild(button);
  });

  timeOptionsLabel.classList.remove("hidden");
  timeOptions.classList.remove("hidden");
}

function buildPlanText() {
  const heart = "\u{1F497}";      // 💗
  const letter = "\u{1F48C}";     // 💌
  const smile = "\u{1F60C}";      // 😌

  const namePart = CONFIG.recipientName
    ? `${CONFIG.recipientName} dijo que sí ${heart}\n\n`
    : "";

  return `${namePart}` +
    `¡Tenemos una cita! ${letter}\n\n` +
    `Cuándo: ${formatDateForCard(state.date)} a las ${state.time}\n` +
    `Comida: ${state.foods.join(", ")}\n\n` +
    `Acepto oficialmente esta invitación. ${smile}`;
}

async function copyPlan() {
  const text = buildPlanText();

  try {
    await navigator.clipboard.writeText(text);
    copyStatus.textContent = "Copiado. Ya no hay excusas 😌";
    copyStatus.classList.remove("hidden");
  } catch (error) {
    copyStatus.textContent = "No pude copiarlo automáticamente. Cuando se abra WhatsApp, mantén presionado el mensaje para copiarlo.";
    copyStatus.classList.remove("hidden");
  }
}

function openWhatsApp() {
  const message = buildPlanText();
  const text = encodeURIComponent(message);
  const phone = CONFIG.whatsappNumber.replace(/\D/g, "");

  if (!phone) {
    copyPlan();
    copyStatus.textContent = "Falta configurar el número de WhatsApp en config.js.";
    copyStatus.classList.remove("hidden");
    return;
  }

  window.location.href = `https://wa.me/${phone}?text=${text}`;
}

function launchConfetti() {
  const confetti = document.getElementById("confetti");
  confetti.innerHTML = "";

  for (let i = 0; i < 80; i++) {
    const piece = document.createElement("span");

    piece.className = "confetti-piece";
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.animationDelay = `${Math.random() * 0.65}s`;
    piece.style.transform = `rotate(${Math.random() * 360}deg)`;
    piece.style.background = ["#ff4fa3", "#ffd166", "#a0e7e5", "#b4f8c8", "#ff99c8"][Math.floor(Math.random() * 5)];

    confetti.appendChild(piece);
  }

  setTimeout(() => {
    confetti.innerHTML = "";
  }, 2600);
}

function renderFinalCard() {
  finalLine.textContent = `Perfecto. Entonces será a las ${state.time}. Yo seré el que estará intentando no verse nervioso. 😎`;
  finalDate.textContent = formatDateForCard(state.date);
  finalTime.textContent = `a las ${state.time}`;
  finalFood.textContent = state.foods.join(", ");
}

setMinimumDate();

// El botón "No" existe visualmente, pero no entra en la navegación con Tab.
// Porque sí: alguien de sistemas seguro lo iba a intentar.
noBtn.setAttribute("tabindex", "-1");

yesBtn.addEventListener("click", () => {
  launchConfetti();
  showScreen("screen-surprise");
});

noBtn.addEventListener("mouseenter", moveNoButton);
noBtn.addEventListener("focus", protectNoButtonFromKeyboard);
noBtn.addEventListener("keydown", protectNoButtonFromKeyboard);

noBtn.addEventListener("pointerdown", (event) => {
  event.preventDefault();
  moveNoButton();
});

noBtn.addEventListener("touchstart", (event) => {
  event.preventDefault();
  moveNoButton();
});

noBtn.addEventListener("click", moveNoButton);

document.querySelectorAll("[data-next]").forEach((button) => {
  button.addEventListener("click", () => showScreen(button.dataset.next));
});

document.getElementById("date-next").addEventListener("click", () => {
  const date = dateInput.value;

  if (!date || !state.period || !state.time) {
    dateError.textContent = "Primero necesito fecha, parte del día y hora 😌";
    dateError.classList.remove("hidden");
    return;
  }

  state.date = date;
  dateError.classList.add("hidden");
  showScreen("screen-form-food");
});

document.querySelectorAll(".food-card").forEach((card) => {
  card.addEventListener("click", () => {
    const food = card.dataset.food;

    card.classList.toggle("selected");

    if (state.foods.includes(food)) {
      state.foods = state.foods.filter((item) => item !== food);
    } else {
      state.foods.push(food);
    }

    foodError.classList.add("hidden");
  });
});

document.getElementById("food-next").addEventListener("click", () => {
  if (state.foods.length === 0) {
    foodError.classList.remove("hidden");
    return;
  }

  renderFinalCard();
  showScreen("screen-final");
  launchConfetti();
});

whatsappBtn.addEventListener("click", openWhatsApp);
copyBtn.addEventListener("click", copyPlan);
