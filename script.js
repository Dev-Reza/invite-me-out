const CONFIG = window.CONFIG || {
  whatsappNumber: "",

  // Textos fáciles de personalizar.
  recipientName: "",
  introQuestion: "¿Te gustaría salir conmigo?",
  finalPSError: "P.D. La gente normal manda un mensaje. Yo te hice una página web. Cosas normales.",
};

const state = {
  date: "",
  time: "",
  foods: [],
};

const screens = document.querySelectorAll(".screen");
const noBtn = document.getElementById("no-btn");
const yesBtn = document.getElementById("yes-btn");
const noMessage = document.getElementById("no-message");
const introTitle = document.getElementById("intro-title");
const dateInput = document.getElementById("date-input");
const timeInput = document.getElementById("time-input");
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
  noMessage.classList.remove("hidden");
}

function protectNoButtonFromKeyboard(event) {
  // Si intenta llegar con Tab o si algún navegador le da focus por accidente,
  // el botón escapa y regresamos el foco al botón bueno.
  if (event) event.preventDefault();
  moveNoButton();
  yesBtn.focus({ preventScroll: true });
}

// Para version en ingles
function ordinal(n) {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

// Return formateado para devolver en Español
function formatDateForCard(dateValue) {
  const [year, month, day] = dateValue.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  //const weekday = date.toLocaleDateString("en-US", { weekday: "long" });
  //const monthName = date.toLocaleDateString("en-US", { month: "long" });
  //return `${weekday}, ${monthName} ${ordinal(day)}`;
  return date.toLocaleDateString("es-GT", {
    weekday: "long",
    day: "numeric",
    month: "long"
  });
}

function buildPlanText() {
  const namePart = CONFIG.recipientName ? `${CONFIG.recipientName} dijo que sí 💗\n\n` : "";
  return `${namePart}¡Tenemos una cita! 💌\n
  Cuándo: ${formatDateForCard(state.date)} a las ${state.time}\n
  Comida: ${state.foods.join(", ")}\n\n
  Acepto oficialmente esta invitación. 😌`;
}

async function copyPlan() {
  const text = buildPlanText();
  try {
    await navigator.clipboard.writeText(text);
    copyStatus.classList.remove("hidden");
  } catch (error) {
    copyStatus.textContent = "No pude copiarlo automáticamente. Cuando se abra WhatsApp, mantén presionado el mensaje para copiarlo.";
    copyStatus.classList.remove("hidden");
  }
}

function openWhatsApp() {
  const text = encodeURIComponent(buildPlanText());
  const phone = CONFIG.whatsappNumber.replace(/\D/g, "");

  if (!phone) {
    copyPlan();
    copyStatus.textContent = "Falta configurar el número de WhatsApp en config.js.";
    copyStatus.classList.remove("hidden");
    return;
  }

  // wa.me funciona bien en móvil y también en desktop con WhatsApp Web.
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
  // Version en ingles
  // finalLine.textContent = `${state.time} Perfecto. Entonces será a las 7:00 PM. Yo seré el que estará intentando no verse nervioso. 😎`;
  
  // Version en español
  finalLine.textContent = `Perfecto. Entonces será a las ${state.time}. Yo seré el que estará intentando no verse nervioso. 😎`
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
  const time = timeInput.value;

  if (!date || !time) {
    dateError.classList.remove("hidden");
    return;
  }

  state.date = date;
  state.time = time;
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
