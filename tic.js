let board = [];
let currentPlayer = 'X';
let gameOver = false;
let scoreX = 0;
let scoreO = 0;
let ties = 0;
let winningCells = [];

// Create the game board dynamically
function createBoard() {
  const boardElement = document.getElementById('board');
  boardElement.innerHTML = ''; // Clear existing board if any
  
  // Create each cell and add event listeners
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    cell.addEventListener('click', () => makeMove(i));
    boardElement.appendChild(cell);
  }
}

// Handle a move by a player
function makeMove(index) {
  if (gameOver || board[index]) return;

  // Mark the cell with the player's symbol (X or O)
  board[index] = currentPlayer;
  const cell = document.querySelector(`.cell[data-index="${index}"]`);
  cell.textContent = currentPlayer;
  
  // Check if there's a winner
  if (checkWinner()) {
    setTimeout(() => {
      alert(`${currentPlayer} wins!`);
      highlightWinningCells();
      updateScore();
      gameOver = true;
      showConfetti();
    }, 100);
  } else if (board.every(cell => cell)) {
    setTimeout(() => {
      alert('It\'s a tie!');
      ties++;
      document.getElementById('ties').textContent = `Ties: ${ties}`;
      gameOver = true;
    }, 100);
  } else {
    // Switch player turn
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    document.getElementById('turnIndicator').textContent = `Player ${currentPlayer}'s Turn`;
  }
}

// Check for a winner using pre-defined win patterns
function checkWinner() {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      winningCells = [a, b, c];
      return true;
    }
  }
  return false;
}

// Highlight the winning cells with a glowing effect
function highlightWinningCells() {
  for (let i = 0; i < winningCells.length; i++) {
    const index = winningCells[i];
    const winningCell = document.querySelector(`.cell[data-index="${index}"]`);
    winningCell.classList.add('winning-cell');
  }
}

// Update the score after a win
function updateScore() {
  if (currentPlayer === 'X') {
    scoreX++;
    document.getElementById('scoreX').textContent = `Player X: ${scoreX}`;
  } else {
    scoreO++;
    document.getElementById('scoreO').textContent = `Player O: ${scoreO}`;
  }
}

// Display confetti animation
function showConfetti() {
  const confetti = document.getElementById('confetti');
  confetti.style.display = 'block';
  setTimeout(() => {
    confetti.style.display = 'none';
  }, 3000);
}

// Reset the game board
function resetGame() {
  board = [];
  currentPlayer = 'X';
  gameOver = false;
  winningCells = [];
  document.getElementById('turnIndicator').textContent = "Player X's Turn";
  createBoard();
}

// Toggle between dark and light mode
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
}

// Initialize the game on page load
window.onload = createBoard;
