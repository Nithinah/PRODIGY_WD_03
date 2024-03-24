// script.js
const board = document.getElementById('board');
const status = document.getElementById('status');
const resetButton = document.getElementById('resetButton');
let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];

function handleCellClick(index) {
    if (gameState[index] !== '' || isGameOver()) return;

    gameState[index] = currentPlayer;
    renderBoard();

    if (checkWin()) {
        status.textContent = `${currentPlayer} wins!`;
    } else if (checkDraw()) {
        status.textContent = 'It\'s a draw!';
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        status.textContent = `${currentPlayer}'s turn`;
    }
}

function renderBoard() {
    board.innerHTML = '';
    gameState.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        cellElement.textContent = cell;
        cellElement.addEventListener('click', () => handleCellClick(index));
        board.appendChild(cellElement);
    });
}

function checkWin() {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    return winConditions.some(condition => {
        return condition.every(index => gameState[index] === currentPlayer);
    });
}

function checkDraw() {
    return gameState.every(cell => cell !== '');
}

function isGameOver() {
    return checkWin() || checkDraw();
}

function resetGame() {
    gameState = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    renderBoard();
    status.textContent = `${currentPlayer}'s turn`;
}

resetButton.addEventListener('click', resetGame);

// Initial rendering
renderBoard();
