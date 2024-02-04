const game = document.querySelector("#board")
const displayText = document.querySelector("#text")
const startCells = [
    "", "", "", "", "", "", "", "", "" 
]

let currentSymbol = "x"
displayText.textContent = "The game begins with X's."

function createBoard() {
    startCells.forEach((_cell, index) => {
        const cellElement = document.createElement('div')
        cellElement.classList.add('square')
        cellElement.id = index
        cellElement.addEventListener('click', makeMove)
        game.append(cellElement)
    })
}
createBoard()

function makeMove(e) {
   const goDisplay = document.createElement('div')
   goDisplay.classList.add(currentSymbol)
   e.target.append(goDisplay)
   currentSymbol = currentSymbol === "x" ? "o" : "x"
   displayText.textContent = "Now, it's " + currentSymbol + "'s turn."
   e.target.removeEventListener("click", makeMove)
   score()
}

function score() {
    const allSquares = document.querySelectorAll(".square")
    console.log(allSquares)
    const winningCombos = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ]
    
    winningCombos.forEach(array => {
        const xWins = array.every(cell =>
            allSquares[cell].firstChild?.classList.contains('x'))
        
        if (xWins) {
            displayText.textContent = "X's Wins!"
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
            return
        }
    })

    winningCombos.forEach(array => {
        const oWins = array.every(cell =>
            allSquares[cell].firstChild?.classList.contains('o'))
        
        if (oWins) {
            displayText.textContent = "O's Wins!"
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
            return
        }
    })
}