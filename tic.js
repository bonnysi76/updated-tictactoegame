let currentPlayer = 'X';
let moves = 0;

document.getElementById("theme-toggle").onclick = toggleTheme;

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
}

function makeMove(cellId) {
    const cell = document.getElementById(cellId);
    if (cell.value === '') {
        cell.value = currentPlayer;
        cell.disabled = true;
        moves++;
        checkWin();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        document.getElementById('print').innerText = `Player ${currentPlayer} Turn`;
    }
}

function checkWin() {
    const winningCombinations = [
        ['b1', 'b2', 'b3'],
        ['b4', 'b5', 'b6'],
        ['b7', 'b8', 'b9'],
        ['b1', 'b4', 'b7'],
        ['b2', 'b5', 'b8'],
        ['b3', 'b6', 'b9'],
        ['b1', 'b5', 'b9'],
        ['b3', 'b5', 'b7']
    ];

    for (const combo of winningCombinations) {
        const [a, b, c] = combo.map(id => document.getElementById(id).value);
        if (a && a === b && b === c) {
            document.getElementById('print').innerText = `Player ${a} Won!`;
            disableAllCells();
            return;
        }
    }

    if (moves === 9) {
        document.getElementById('print').innerText = "It's a Tie!";
    }
}

function disableAllCells() {
    for (let i = 1; i <= 9; i++) {
        document.getElementById(`b${i}`).disabled = true;
    }
}

function resetGame() {
    for (let i = 1; i <= 9; i++) {
        const cell = document.getElementById(`b${i}`);
        cell.value = '';
        cell.disabled = false;
    }
    currentPlayer = 'X';
    moves = 0;
    document.getElementById('print').innerText = "Player X Turn";
}
