const game = document.querySelector("#board");
const displayText = document.querySelector("#text");

let boardCells = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
displayText.textContent = "";
displayText.textContent = "The game begins with X's (human player)!";

const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
];

function createBoard() {
    for (let i = 0; i < 9; i++) {
        const cellElement = document.createElement('div');
        cellElement.classList.add('square');
        cellElement.id = i;
        cellElement.addEventListener('click', makeMove);
        game.appendChild(cellElement);
    }
}

createBoard();

function makeMove(e) {
    const cellIndex = e.target.id;

    if (boardCells[cellIndex] === "") {
        boardCells[cellIndex] = currentPlayer;
        updateBoard();

        if (checkWin(currentPlayer)) {
            displayText.textContent = currentPlayer + "'s wins!";
            document.querySelectorAll('.square').forEach(cell => {
                cell.removeEventListener('click', makeMove);
            });
            return;
        } else if (full()) {
            displayText.textContent = "It's a draw!";
            return;
        }

        currentPlayer = currentPlayer === "X" ? "O" : "X";
        displayText.textContent = "Now it's " + currentPlayer + "'s turn.";

        if (currentPlayer === "O") {
            setTimeout(() => {
                moveAI();
            }, 500);
        }
    }
}

function updateBoard() {
    boardCells.forEach((cell, index) => {
        const cellElement = document.getElementById(index);
        cellElement.textContent = cell;
    });
}

function checkWin(player) {
    return winningCombos.some(combination => {
        return combination.every(index => boardCells[index] === player);
    });
}

function full() {
    return boardCells.every(cell => cell !== "");
}

function moveAI() {
    let highestScore = -Infinity;
    let move;

    for (let i = 0; i < 9; i++) {
        if (boardCells[i] === "") {
            boardCells[i] = "O";
            let score = minimax(boardCells, 0, false);
            boardCells[i] = "";
            if (score > highestScore) {
                highestScore = score;
                move = i;
            }
        }
    }

    boardCells[move] = "O";
    updateBoard();

    if (checkWin(currentPlayer)) {
        displayText.textContent = currentPlayer + "'s wins!";
        document.querySelectorAll('.square').forEach(cell => {
            cell.removeEventListener('click', makeMove);
        });
        return;
    } else if (full()) {
        displayText.textContent = "It's a draw!";
        return;
    }

    currentPlayer = "X";
    displayText.textContent = "Now it's " + currentPlayer + "'s turn.";
}

function minimax(board, depth, maximize) {
    if (checkWin("X")) {
        return -10 + depth;
    } else if (checkWin("O")) {
        return 10 - depth;
    } else if (full()) {
        return 0;
    }

    if (maximize) {
        let highestScore = -Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] === "") {
                board[i] = "O";
                let score = minimax(board, depth + 1, false);
                board[i] = "";
                highestScore = Math.max(score, highestScore);
            }
        }
        return highestScore;
    } else {
        let highestScore = Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] === "") {
                board[i] = "X";
                let score = minimax(board, depth + 1, true);
                board[i] = "";
                highestScore = Math.min(score, highestScore);
            }
        }
        return highestScore;
    }
}