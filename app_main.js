$(document).ready(function () {
    let player1 = "X"
    let player2 = "O"

    let currentTurn = 1
    let movesMade = 0

    let sqr = $(".square") // Get every div that has the name 'square'
    let winnerContainer = $('.winnerDiv')
    let reset = $('.reset')
    
    sqr.on('click', function () {
        movesMade++
        if (movesMade === 9) {
            console.log("We've gone over the limit boys!")
        }

        switch (currentTurn) {
            case 1:
                event.target.innerHTML = player1
                event.target.style.color = "red"
                currentTurn++
                break

            case 2:
                event.target.innerHTML = player2
                event.target.style.color = "green"
                currentTurn--
                break

            default:
                console.log("Critical error! Player turn unexpected valuue")
                break
        }
        if (checkWinner()) {
            let theWinner = currentTurn === 1 ? player2 : player1; // This is a shorthand way to say if else with the ":" acting as an else
            declareWinner(theWinner)
        }

    })

    function checkWinner() {
        if (movesMade > 4) {
            let moves = Array.prototype.slice.call($(".square")) // Use Array in Javascript, call prototype method to call slice and return a subset of arrays (a new array) on the start of the new index
            let results = moves.map(function (square) {            // Get the innerHTML of the specific square (Is it an "X" or an "O"?)
                return square.innerHTML
            })
            let winningCombinations = [ // These are all winning combinations
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [0, 4, 8],
                [2, 4, 6]
            ]
            return winningCombinations.find(function (combo) {
                if (results[combo[0]] !== "" && results[combo[1]] !== "" && results[combo[2]] !== "" && results[combo[0]] === results[combo[1]] && results[combo[1]] === results[combo[2]]) {
                    /* The code above looks to find that one of the combinations is not filled (Or set to "" in other words) and that each letter in the filled winning combination is the same 
                    letter to determine a winner*/
                    console.log("Winner found")
                    return true;

                } else {
                    return false;
                }
            })
        }

    }

    function declareWinner(winner){
        winnerContainer.css
    }


})
