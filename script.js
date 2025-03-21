let currentPlayer = 'X'; // Jogador X começa
let gameBoard = ['', '', '', '', '', '', '', '', '']; // Tabuleiro vazio
let gameActive = true;

const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status-text');
const restartBtn = document.getElementById('restart-btn');

// Função para verificar as condições de vitória
const checkWinner = () => {
  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let condition of winningConditions) {
    const [a, b, c] = condition;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      gameActive = false;
      statusText.textContent = `Jogador ${currentPlayer} venceu!`;
      return;
    }
  }

  if (!gameBoard.includes('')) {
    gameActive = false;
    statusText.textContent = 'Empate!';
  }
};

// Função para alternar entre os jogadores
const switchPlayer = () => {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusText.textContent = `Jogador ${currentPlayer} está jogando`;
};

// Função para lidar com o clique nas células
const handleCellClick = (index) => {
  if (gameBoard[index] !== '' || !gameActive) return;

  gameBoard[index] = currentPlayer;
  cells[index].textContent = currentPlayer;

  checkWinner();
  if (gameActive) {
    switchPlayer();
  }
};

// Adiciona evento de clique nas células
cells.forEach((cell, index) => {
  cell.addEventListener('click', () => handleCellClick(index));
});

// Função para reiniciar o jogo
restartBtn.addEventListener('click', () => {
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  currentPlayer = 'X';
  statusText.textContent = `Jogador ${currentPlayer} está jogando`;

  cells.forEach(cell => cell.textContent = '');
});
