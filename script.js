let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = false;
let mode = "";

// Select game mode
function setMode(selectedMode) {
    mode = selectedMode;
    gameActive = true;
    board = ["", "", "", "", "", "", "", "", ""];
    document.getElementById("status").innerText = `Player X's turn`;
    document.querySelectorAll(".cell").forEach(cell => {
        cell.innerText = "";
        cell.className = "cell"; // Remove winning effect
    });
}

// Handle player move
function handleClick(index) {
    if (!gameActive || board[index] !== "") return;

    board[index] = currentPlayer;
    let cell = document.querySelectorAll(".cell")[index];
    cell.innerText = currentPlayer;
    cell.classList.add(currentPlayer);

    if (checkWinner()) {
        document.getElementById("status").innerText = `🎉 Player ${currentPlayer} wins! 🎉`;
        gameActive = false;
        return;
    }

    if (board.every(cell => cell !== "")) {
        document.getElementById("status").innerText = "It's a draw!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    document.getElementById("status").innerText = `Player ${currentPlayer}'s turn`;

    if (mode === "ai" && currentPlayer === "O") {
        setTimeout(aiMove, 500);
    }
}

// AI Move (Random)
function aiMove() {
    if (!gameActive) return;
    let emptyCells = board.map((val, idx) => (val === "" ? idx : null)).filter(val => val !== null);
    let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    handleClick(randomIndex);
}

// Check for winner and highlight winning cells
function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            highlightWinner(pattern);
            return true;
        }
    }
    return false;
}

// Highlight winning cells
function highlightWinner(pattern) {
    pattern.forEach(index => {
        document.querySelectorAll(".cell")[index].classList.add("win-cell");
    });

    showFireworks();
}

// Fireworks Effect
function showFireworks() {
    const fireworksContainer = document.querySelector(".fireworks-container");
    for (let i = 0; i < 15; i++) {
        let firework = document.createElement("div");
        firework.classList.add("firework");
        firework.style.left = Math.random() * window.innerWidth + "px";
        firework.style.top = Math.random() * window.innerHeight / 2 + "px";
        fireworksContainer.appendChild(firework);
        setTimeout(() => firework.remove(), 1000);
    }
}

// Reset Game
function resetGame() {
    setMode(mode);
}