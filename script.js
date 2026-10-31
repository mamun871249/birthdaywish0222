
/* ======================================
   PERSONALIZE YOUR BIRTHDAY WEBSITE HERE
====================================== */

const CONFIG = {
  herName: "Birthday Girl",
  yourName: "Your Best Friend",

  letter: `Hey Birthday Girl! 💗

Happy Birthday to one of the most wonderful people in my life!

I hope your day is filled with smiles, laughter, sweet surprises,
and everything that makes your heart happy.

You deserve all the beautiful things this world has to offer.
Keep shining, keep smiling, and never stop being your amazing self.

I'm so lucky to have you as my best friend.
May this new chapter bring you endless happiness and success.

Happy Birthday, Bestie! 🎂🌷`,

  gifts: [
    {
      emoji: "🌷",
      title: "A Little Reminder",
      message: "You are enough, you are amazing, and you deserve every beautiful thing life has to offer. Never forget that! 💗"
    },
    {
      emoji: "🌈",
      title: "A Wish for You",
      message: "May every new day bring you closer to your dreams, surround you with genuine people, and give you countless reasons to smile. ✨"
    },
    {
      emoji: "💝",
      title: "Your Secret Gift",
      message: "No expensive gift can replace a genuine friendship. Today, I just want you to know that your happiness will always matter to me. Happy Birthday, Bestie! 🥹💕"
    }
  ]
};

/* ======================================
   WEBSITE LOGIC
====================================== */

const $ = (selector) => document.querySelector(selector);
const screens = document.querySelectorAll(".screen");

function showScreen(id) {
  screens.forEach(screen => {
    screen.classList.toggle("active", screen.id === id);
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.querySelectorAll("[data-go]").forEach(button => {
  button.addEventListener("click", () => {
    showScreen(button.dataset.go);
  });
});

// Personalize visible text
document.title = `Happy Birthday, ${CONFIG.herName}! 💗`;
$("#welcome h1").textContent = `Hey, ${CONFIG.herName}! 🎀`;
$("#letter h2").textContent = `To My Favorite Person 💌`;
$("#final h1").textContent = `You're Truly Special, ${CONFIG.herName}!`;

// Secret letter reveal
let letterOpened = false;
let typingTimer;

$("#openLetter").addEventListener("click", () => {
  if (letterOpened) return;
  letterOpened = true;

  $("#envelopeIcon")?.remove();
  $("#envelopeLabel").textContent = "Your letter is opening... 💗";
  $("#openLetter").classList.add("hidden");

  const card = $("#letterCard");
  const output = $("#letterText");
  card.classList.remove("hidden");
  output.textContent = "";

  const message = CONFIG.letter;
  let index = 0;

  function typeNext() {
    output.textContent += message.charAt(index);
    index++;

    if (index < message.length) {
      typingTimer = setTimeout(typeNext, 24);
    } else {
      output.textContent = message;
    }
  }

  typeNext();
});

// Cake and wish
$("#wishButton").addEventListener("click", () => {
  $("#cakeScene").classList.add("blown");
  $("#cakeMessage").textContent =
    `Happy Birthday, ${CONFIG.herName}! 🎉 May all your beautiful wishes come true!`;

  $("#wishButton").classList.add("hidden");
  $("#giftButton").classList.remove("hidden");
  launchConfetti(100);
});

// Gift interactions
const openedGifts = new Set();

document.querySelectorAll("[data-gift]").forEach(button => {
  button.addEventListener("click", () => {
    const index = Number(button.dataset.gift);
    const gift = CONFIG.gifts[index];

    if (!gift) return;

    openedGifts.add(index);
    button.classList.add("opened");

    $("#modalEmoji").textContent = gift.emoji;
    $("#modalTitle").textContent = gift.title;
    $("#modalMessage").textContent = gift.message;
    $("#giftModal").classList.remove("hidden");

    if (openedGifts.size === CONFIG.gifts.length) {
      $("#finalButton").classList.remove("hidden");
    }

    launchConfetti(22);
  });
});

function closeGiftModal() {
  $("#giftModal").classList.add("hidden");
}

$("#closeModal").addEventListener("click", closeGiftModal);

$("#giftModal").addEventListener("click", event => {
  if (event.target.id === "giftModal") closeGiftModal();
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeGiftModal();
});

// Floating hearts
const heartContainer = $("#hearts");
const heartSymbols = ["💗", "💕", "♡", "💖", "🌸"];

function addFloatingHeart() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const heart = document.createElement("span");
  heart.className = "heart-particle";
  heart.textContent = heartSymbols[
    Math.floor(Math.random() * heartSymbols.length)
  ];

  heart.style.left = `${Math.random() * 100}%`;
  heart.style.fontSize = `${14 + Math.random() * 20}px`;
  heart.style.animationDuration = `${7 + Math.random() * 7}s`;

  heartContainer.appendChild(heart);
  setTimeout(() => heart.remove(), 15000);
}

setInterval(addFloatingHeart, 650);

// Confetti effect
function launchConfetti(count = 60) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const container = $("#confetti");
  const colors = ["#ff78ac", "#ffd166", "#c4a1ff", "#ffb6d5", "#ffffff"];

  for (let i = 0; i < count; i++) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    piece.textContent = Math.random() > 0.5 ? "♥" : "✦";
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.color = colors[Math.floor(Math.random() * colors.length)];
    piece.style.fontSize = `${10 + Math.random() * 12}px`;
    piece.style.animationDelay = `${Math.random() * 0.8}s`;

    container.appendChild(piece);
    setTimeout(() => piece.remove(), 4000);
  }
}

// Replay the surprise from the beginning
$("#replayButton").addEventListener("click", () => {
  clearTimeout(typingTimer);

  letterOpened = false;
  openedGifts.clear();

  $("#letterCard").classList.add("hidden");
  $("#letterText").textContent = "";
  $("#openLetter").classList.remove("hidden");
  $("#envelopeLabel").textContent = "Tap to open your letter";

  $("#cakeScene").classList.remove("blown");
  $("#cakeMessage").textContent =
    "Close your eyes, make a wish, and tap below! 🌸";
  $("#wishButton").classList.remove("hidden");
  $("#giftButton").classList.add("hidden");

  document.querySelectorAll("[data-gift]").forEach(button => {
    button.classList.remove("opened");
  });

  $("#finalButton").classList.add("hidden");
  closeGiftModal();
  showScreen("welcome");
});
