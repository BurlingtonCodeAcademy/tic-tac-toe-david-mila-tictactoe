//Creating js variables
let board = document.getElementById('board')
let gameStatus = document.getElementById('game-status')
let startButton = document.getElementById('start')
let cells = document.getElementsByClassName('cell')


//variable for players
let playerOne = "X"
let playerTwo = "O"
//variable to keep track of moves made
let movesMade = 0
//variable to keep track of players
let currentPlayer = 1
//winning combos
let wins = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]
let boardArr = [0, 1, 2, 3, 4, 5, 6, 7, 8]
let playerOneArr = []
let playerTwoArr = []


//start function - when start button gets clicked
function start() {
    currentPlayer = 1
    startButton.disabled = true
    showPlayer()
    //adding event listener to cell class
    for (let cell of cells) {
        cell.addEventListener('click', clicked)
    }
}

//adding event listener to start button
startButton.addEventListener('click', start);

//function to change status
function showPlayer() {
    if (currentPlayer === 1) {
        gameStatus.innerHTML = `Player ${playerOne}'s turn`
    } else {
        gameStatus.innerHTML = `Player ${playerTwo}'s turn`
    }
}

// function to prevent clicking on the same cell
function alreadyClicked() {
    gameStatus.innerHTML = `Please select an empty cell.`
}

let winCom = []
//function to check for wins
function checkWin(currentPlayerArr) {

    let winner = false
    wins.forEach((win) => {
        if (currentPlayerArr.includes(win[0])) {
            if (currentPlayerArr.includes(win[1])) {
                if (currentPlayerArr.includes(win[2])) {
                    winCom.push(...win)
                    console.log(winCom)
                    console.log("You Won!")
                    winner = true
                }
            }
        }
    })
    return winner
}


//makeMove function - when player clicks on cells
function clicked(event) {
    //movesMade += 1 - not using this variable right now
    event.target.removeEventListener('click', clicked)
    event.target.addEventListener('click', alreadyClicked)
    let cellNumber = parseInt(event.target.id)
    let index = boardArr.indexOf(cellNumber)

    if (boardArr.includes(cellNumber)) {
        console.log(boardArr)
        boardArr.splice(index, 1)
    }

    if (currentPlayer === 1) {
        event.target.innerHTML = playerOne
        event.target.style.color = "red"
        currentPlayer += 1
        playerOneArr.push(cellNumber)
        if (checkWin(playerOneArr) === true) {
            gameStatus.innerHTML = `Congratulations ${playerOne}! You won!`

            for (let cell of cells) {
                console.log(cell.id)
                if (winCom.includes(+cell.id))
                    cell.style.backgroundColor = "green"
            }
            return reStart()
        }

    } else {
        event.target.innerHTML = playerTwo
        event.target.style.color = "blue"
        currentPlayer -= 1
        playerTwoArr.push(cellNumber)
        if (checkWin(playerTwoArr) === true) {
            gameStatus.innerHTML = `Congratulations ${playerTwo}! You won!`

            for (let cell of cells) {
                console.log(cell.id)
                if (winCom.includes(+cell.id))
                    cell.style.backgroundColor = "green"
            }
            return reStart()
        }
    }
    showPlayer()
}


function reStart() {

    for (let cell of cells) {
        cell.event.target.removeEventListener('click', clicked)
        cell.event.target.removeEventListener('click', alreadyClicked)
    }
    startButton.disabled = false
    gameStatus.innerHTML = `Play again!`

    start()
}









