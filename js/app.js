const cards = document.querySelectorAll(".card");
const innerCards = [...document.querySelectorAll(".double-face")];
const advice = document.querySelector(".advice");
const score = document.querySelector(".score");

let locked = false;
let cardsPicked = [];
let numberOfTries = 0;
let shuffleLock = false;

function shuffleCards() {
  cards.forEach((card) => {
    const randomPos = Math.trunc(Math.random() * 12);
    card.style.order = randomPos;
  });
}
shuffleCards();

cards.forEach((card) => card.addEventListener("click", flipACard));

function flipACard(e) {
  if (locked) return;

  saveCard(e.target.children[0], e.target.getAttribute("data-attr"));

  if (cardsPicked.length === 2) result();
}

function saveCard(el, value) {
  if (el === cardsPicked[0]?.el) return;

  el.classList.add("active");
  cardsPicked.push({ el, value });
  console.log(cardsPicked);
}

function result() {
  saveNumberOfTries();

  if (cardsPicked[0].value === cardsPicked[1].value) {
    cardsPicked[0].el.parentElement.removeEventListener("click", flipACard);
    cardsPicked[1].el.parentElement.removeEventListener("click", flipACard);
    cardsPicked = [];
    return;
  }

  locked = true;

  setTimeout(() => {
    cardsPicked[0].el.classList.remove("active");
    cardsPicked[1].el.classList.remove("active");
    cardsPicked = [];
    locked = false;
  }, 1000);
}

function saveNumberOfTries() {
  numberOfTries++;
  const checkForEnd = innerCards.filter(
    (card) => !card.classList.contains("active")
  );
  if (!checkForEnd.length) {
    advice.textContent = `Bravo ! Appuyez sur "espace" pour relancer une partie. `;
    return;
  }
  score.textContent = `Votre score final : ${numberOfTries} `;
}

window.addEventListener("keydown", handleRestart);

function handleRestart(e) {
  e.preventDefault();
  if (e.keyCode === 32) {
    innerCards.forEach((card) => card.classList.remove("active"));
    advice.textContent = `Bravo ! Appuyez sur "espace" pour relancer une partie. `;
    score.textContent = `Votre score final : 0`;
    numberOfTries = 0;
    cards.forEach((card) => card.addEventListener("click", flipACard));

    if (shuffleLock) return;
    shuffleLock = true;
    setTimeout(() => {
      shuffleCards();
      shuffleLock = false;
    }, 600);
  }
}
