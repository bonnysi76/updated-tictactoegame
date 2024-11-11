// script.js

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;
let playerXScore = 0;
let playerOScore = 0;
let ties = 0;

const cells = document.querySelectorAll(".cell");
const turnIndicator = document.getElementById("turnIndicator");
const newGameBtn = document.getElementById("newGameBtn");
const darkModeToggle = document.getElementById("darkModeToggle");
const playerXScoreElement = document.getElementById("playerXScore");
const playerOScoreElement = document.getElementById("playerOScore");
const tiesElement = document.getElementById("ties");

cells.forEach((cell, index) => {
  cell.addEventListener("click", () => handleCellClick(index));
});

newGameBtn.addEventListener("click", resetGame);
darkModeToggle.addEventListener("click", toggleDarkMode);

function handleCellClick(index) {
  if (board[index] || !gameActive) return;

  board[index] = currentPlayer;
  cells[index].textContent = currentPlayer;
  checkWin();
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  turnIndicator.textContent = `Player ${currentPlayer}'s Turn`;
}

function checkWin() {
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]
  ];

  let roundWon = false;
  winningCombinations.forEach(combination => {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      roundWon = true;
      gameActive = false;
      combination.forEach(index => cells[index].classList.add("winning-cell"));
      updateScore();
    }
  });

  if (!board.includes("") && !roundWon) {
    gameActive = false;
    ties++;
    tiesElement.textContent = ties;
  }
}

function updateScore() {
  if (currentPlayer === "X") {
    playerXScore++;
    playerXScoreElement.textContent = playerXScore;
  } else {
    playerOScore++;
    playerOScoreElement.textContent = playerOScore;
  }
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("winning-cell");
  });
  gameActive = true;
  currentPlayer = "X";
  turnIndicator.textContent = `Player X's Turn`;
}

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}
