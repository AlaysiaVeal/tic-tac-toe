const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

let winnerMessage = () => 'The winner is Player ' + player1
const drawMessage = () => 'Game ended in a draw :('
const playerTurn = () => 'It is Player ' + player1 + "'s turn."

let gameStatusDisplay = document.querySelector('.status-display')
let player1 = 'X'
let computerPlayer = 'O'
let gameWinner = document.querySelector('.game-winner')
let gameBoard = ['', '', '', '', '', '', '', '', '']
let gameActive = true

function playCell(clickCell, clickCellIndex) {
  gameBoard[clickCellIndex] = player1
  clickCell.innerHTML = player1
}
function playerChange() {
  player1 = player1 === 'X' ? 'O' : 'X'
  gameStatusDisplay.innerHTML = playerTurn()
}

function resultValidation() {
  let roundWon = false
  for (let i = 0; i <= 7; i++) {
    const winCondition = winConditions[i]
    let a = gameBoard[winCondition[0]]
    let b = gameBoard[winCondition[1]]
    let c = gameBoard[winCondition[2]]
    if (a === '' || b === '' || c === '') {
      continue
    }
    if (a === b && b === c) {
      roundWon = true
      break
    }
  }
  if (roundWon) {
    gameWinner.innerHTML = winnerMessage()
    gameActive = false
    return
  }
  let roundDraw = !gameBoard.includes('')
  if (roundDraw) {
    gameWinner.innerHTML = drawMessage()
    gameActive = false
    return
  }
  playerChange()
}
function cellClick(clickCellEvent) {
  const clickCell = clickCellEvent.target
  const clickCellIndex = parseInt(clickCell.getAttribute('data-cell-index'))
  if (gameBoard[clickCellIndex] !== '' || !gameActive) {
    return
  }
  playCell(clickCell, clickCellIndex)
  resultValidation()
}
function restartGame() {
  gameActive = true
  player1 = 'X'
  gameBoard = ['', '', '', '', '', '', '', '', '']
  gameStatusDisplay.innerHTML = playerTurn()
  gameWinner.innerHTML = ''
  document.querySelectorAll('#cell').forEach((cell) => (cell.innerHTML = ''))
}
document
  .querySelectorAll('#cell')
  .forEach((cell) => cell.addEventListener('click', cellClick))
document.querySelector('.game-restart').addEventListener('click', restartGame)
