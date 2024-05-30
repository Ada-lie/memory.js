const cards = document.querySelectorAll(".memory-card");
const refresh = document.querySelector(".refresh");
const final = document.querySelector(".final");
const congrats = document.querySelector("#congratsSection");
const minute = document.querySelector(".minute");
const second = document.querySelector(".second");
const again = document.querySelector(".again");
const totalTime = document.querySelector("#totalTime");

let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false; //ne pas autorisé 4 clic consécutifs
let totalSeconds = 0;
let interval;
let finalTime;
let click = -1;

function flipCard() {
  // si etat plateau lockBoard vrais return
  if (lockBoard) return;
  // si carte cliqué = premère carte retourné return
  if (this === firstCard) return;
  // annimation css rotation
  this.classList.add("flip");

  // premier clic
  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    // démarré chrono
    startTime();
    return;
  }

  //second clic
  secondCard = this;
  // verification paire
  checkForMatch();
}

// comparé les 2 cartes id, si = les retournées
function checkForMatch() {
  let isMatch = firstCard.dataset.id === secondCard.dataset.id;
  isMatch ? disableCards() : unFlipCards();
}

function disableCards() {
  // Désactive le clic
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  // réinitialise les variables
  resetBoard();
  // vérifie que toute les paires ont été trouvées
  gameWon();
}

function unFlipCards() {
    // verouille le plateau pendant retournement
    lockBoard = true;
  //not match
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
  }, 700);
}

//lorsque le bouton acualiser est enfoncé
refresh.addEventListener("click", function () {
  confirm("Are you sure that?");
  location.reload();
});

//affichage de l'heure
function startTime() {
  if (click === -1) {
    interval = setInterval(function () {
      //l'intervalle garantit un fonctionnement continu à certains intervalles.
      final.innerHTML = "You won in " + finalTime + " time!";
      finalTime = minute.innerHTML + ":" + second.innerHTML;
      totalSeconds++;
      second.innerHTML = pad(totalSeconds % 60);
      minute.innerHTML = pad(parseInt(totalSeconds / 60));
    }, 1000);
  }
  click = 1;
}

function pad(val) {
  // laissez l'heure avancer à 00h00
  const valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}

//game won
function gameWon() {
  if (click < 1) {
    // clicker pour la seconde s'arête. cela empêche le jeu de continuer pendant quelque seconde même s'il se termine.
    firstCard = e.target;
  }

  if (document.getElementsByClassName("flip").length === 12) {
    congratsSection.classList.replace("hidden", "show");
    clearInterval(interval);
    finalTime = minute.innerHTML + ":" + second.innerHTML;
    final.innerHTML = "You won in " + finalTime + " time!";
    totalTime.innerHTML = finalTime;
  }
  click = 0;
}

//congrats encore une fois le bouton dans la section félicitaton
again.addEventListener("click", function () {
  congratsSection.classList.replace("show", "hidden");
  location.reload();
});

(function shuffle() {
  cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach((card) => card.addEventListener("click", flipCard));