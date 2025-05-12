document.addEventListener('DOMContentLoaded', () => {
    const cardsGrid = document.getElementById('cards');
    const attemptsDisplay = document.getElementById('attempts');
    const bestScoreDisplay = document.getElementById('best-score');
    const resetBtn = document.getElementById('reset-btn');
  
    const emojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];
    let cards = [...emojis, ...emojis]; // Duplicamos para tener pares
    let flippedCards = [];
    let matchedPairs = 0;
    let attempts = 0;
    let bestScore = localStorage.getItem('bestScore') || 0;
  
    bestScoreDisplay.textContent = bestScore;
  
    // Barajar cartas (Fisher-Yates algorithm)
    function shuffleCards() {
      for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
      }
    }
  
    // Crear el tablero
    // ... (código anterior igual hasta createBoard) ...

function createBoard() {
    cardsGrid.innerHTML = '';
    shuffleCards();
    cards.forEach((emoji, index) => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.dataset.index = index;
      card.dataset.emoji = emoji; // Usamos dataset para guardar el emoji
      card.addEventListener('click', flipCard);
      cardsGrid.appendChild(card);
    });
  }
  
  function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
      this.classList.add('flipped');
      flippedCards.push(this);
  
      if (flippedCards.length === 2) {
        attempts++;
        attemptsDisplay.textContent = attempts;
        checkForMatch();
      }
    }
  }
  
  function checkForMatch() {
    const [card1, card2] = flippedCards;
    const emoji1 = card1.dataset.emoji;
    const emoji2 = card2.dataset.emoji;
  
    if (emoji1 === emoji2) {
      card1.classList.add('matched');
      card2.classList.add('matched');
      matchedPairs++;
      flippedCards = [];
    } else {
      setTimeout(() => {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        flippedCards = [];
      }, 1000);
    }
  }
  
  // ... (resto del código igual) ...
  
    // Actualizar mejor puntaje
    function updateBestScore() {
      if (attempts < bestScore || bestScore === 0) {
        bestScore = attempts;
        localStorage.setItem('bestScore', bestScore);
        bestScoreDisplay.textContent = bestScore;
      }
    }
  
    // Reiniciar juego
    function resetGame() {
      flippedCards = [];
      matchedPairs = 0;
      attempts = 0;
      attemptsDisplay.textContent = attempts;
      createBoard();
    }
  
    resetBtn.addEventListener('click', resetGame);
  
    // Iniciar juego
    createBoard();
  });