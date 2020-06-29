//Creating js variables
let board = document.getElementById('board')
let gameStatus = document.getElementById('game-status')
let startButton = document.getElementById('start')
let cells = document.getElementsByClassName('cell')
let playerOneName = document.getElementById('playerOneName')
let playerTwoName = document.getElementById('playerTwoName')
let clock = document.getElementById('clock')
let playerPlayer = document.getElementById('player-player')
let playerComputer = document.getElementById('player-computer')
let gameMode
let randoCellNum


function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }


//variable for players
let playerOne = "X"
let playerTwo = "O"
//variable to keep track of moves made
//let movesMade = 0
//variable to keep track of players
let currentPlayer = 1
//winning combos
let wins = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]
let boardArr = [0, 1, 2, 3, 4, 5, 6, 7, 8]
let playerOneArr = []
let playerTwoArr = []
let winCom = []
let clockCount = 0
let playerOneDisplay = ""
let playerTwoDisplay = ""

//start function - when start button gets clicked
function start() {
    currentPlayer = 1
    startButton.disabled = true

    

    //adding event listener to cell class
    for (let cell of cells) {
        cell.addEventListener('click', clicked)
        cell.innerHTML = ""
        cell.style.backgroundColor = "white"
    }
    //resetting arrays
    boardArr = [0, 1, 2, 3, 4, 5, 6, 7, 8]
    playerOneArr = []
    playerTwoArr = []
    winCom = []
    //setting up clock
    interval = setInterval(() => { updateClock() }, 1000)
    clockCount = 0
    clock.innerHTML = `Time Elapse: 0 seconds`
    //two players
    console.log(playerOneName)
    playerOneDisplay = (playerOneName.value === "" ? "X" : playerOneName.value)
    playerTwoDisplay = (playerTwoName.value === "" ? "O" : playerTwoName.value)
    playerOneName.disabled = true
    playerTwoName.disabled = true
    showPlayer()
}

//adding event listener to start button
startButton.addEventListener('click', start);

//adding event listener to player/computer
playerComputer.addEventListener('click', disPlayerPlayer)

//funtion to disable player vs player box
function disPlayerPlayer() {
    playerPlayer.style.display ="none"
    startButton.disabled = false
    playerTwoName.style.display = "none"
    gameMode = 'pvc' // set the gameMode to player vs computer
    console.log(`THE GAMEMODE IS NOW: ${gameMode}`)
}

//adding event listener to player/player
playerPlayer.addEventListener('click', disPlayerComputer)

//funtion to disable player vs computer box
function disPlayerComputer() {
    playerComputer.style.display = "none"
    startButton.disabled = false
    gameMode = 'pvp' // Set the gameMode to player vs player
    console.log(`THE GAMEMODE IS NOW: ${gameMode}`)
}

//function to update clock
function updateClock() {
    clockCount++
    clock.innerHTML = `Time Elapse: ${clockCount} seconds`
}

//function to change status
function showPlayer() {
    if (currentPlayer === 1) {
        gameStatus.innerHTML = `Player ${playerOneDisplay}'s turn`
    } else {
        gameStatus.innerHTML = `Player ${playerTwoDisplay}'s turn`
    }
}

// function to prevent clicking on the same cell
function alreadyClicked() {
    gameStatus.innerHTML = `Please select an empty cell.`
}

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

//prevents from clicking after win
function reStart() {
    for (let cell of cells) {
        cell.removeEventListener('click', clicked)
        cell.removeEventListener('click', alreadyClicked)
    }
    startButton.disabled = false
    playerOneName.disabled = false
    playerTwoName.disabled = false
    playerOneName.value = ""
    playerTwoName.value = ""
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
            gameStatus.innerHTML = `Congratulations ${playerOneDisplay}! You won!`
            clearInterval(interval)

            for (let cell of cells) {
                console.log(cell.id)
                if (winCom.includes(+cell.id))
                    cell.style.backgroundColor = "green"
            }
            return reStart()
        }
        
        if (boardArr.length === 0) {
            gameStatus.innerHTML = `It's a draw`
            clearInterval(interval)
            startButton.disabled = false
        }
        
        if(gameMode === 'pvc'){
            randoCellNum = randomNum(0, boardArr.length-1).toString()
            randoCell = document.getElementById(boardArr[randoCellNum])
            randoCell.click()
            currentPlayer = 1
        }

        
        
    } else {
        event.target.innerHTML = playerTwo
        event.target.style.color = "blue"
        currentPlayer -= 1
        playerTwoArr.push(cellNumber)
        if (checkWin(playerTwoArr) === true) {
            gameStatus.innerHTML = `Congratulations ${playerTwoDisplay}! You won!`
            clearInterval(interval)

            for (let cell of cells) {
                console.log(cell.id)
                if (winCom.includes(+cell.id))
                    cell.style.backgroundColor = "green"
            }

            return reStart()
        }
    }

    showPlayer()

    if (boardArr.length === 0) {
        gameStatus.innerHTML = `It's a draw`
        clearInterval(interval)
        startButton.disabled = false
    }
    
}


















