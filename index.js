// MENU MODULE 
const menu = (function() {
    //cache DOM 
    let menuContainer = document.getElementById('menu-modal');
    let playerButton = document.getElementById('player');
    let aiButton = document.getElementById('ai');

    //bind events
    playerButton.addEventListener('click', closeModal)
    aiButton.addEventListener('click', closeModal)

    function closeModal() {
        menuContainer.style.display = "none";
    }


})();

// PLAYER FACTORY 
const createPlayer = (playerName, playerToken) => {
    return {
        playerName,
        playerToken
    }
};

let player1 = createPlayer("", "X")
let player2 = createPlayer("", "O")

// PLAYER INPUT MODULE

const playerInput = (function() {
    //cache DOM
    let playerModal = document.getElementById('player-modal')
    let playerSubmitButton = document.getElementById('player-submit')
    let player1Box = document.getElementById('player1name')
    let player2Box = document.getElementById('player2name')


    //bind events 
    playerSubmitButton.addEventListener('click', addToPlayerBox)

    function addToPlayerBox() {
        // var player1obj = createPlayer(document.getElementById('player1-nameField').value, 'X')
        // var player2obj = createPlayer(document.getElementById('player2-nameField').value, 'O')
        player1.playerName = document.getElementById('player1-nameField').value
        player2.playerName = document.getElementById('player2-nameField').value
        player1Box.innerText = player1.playerName
        player2Box.innerText = player2.playerName
        document.forms[0].reset();
        playerModal.style.display = "none";

    }

    return {

    }
})();


// GAMEBOARD MODULE

const gameBoard = (function() {
    positions = ["", "", "", "", "", "", "", "", ""];
    turn = 1
    winning_array = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 4, 8],
        [2, 4, 6],
        [1, 4, 7],
        [0, 3, 6],
        [2, 5, 8]
    ]

    //cache DOM 
    let gameboard = document.getElementById("gameboard")
    let tiles = Array.from(document.getElementsByClassName('tile'))

    //bind events 
    tiles.forEach(item => {
        item.addEventListener('click', e => {
            if (turn % 2 == 0) {
                addO(e)
            } else {
                addX(e)
            }
            turn++
            checkWinner()
            checkTurn()
            console.log(positions)
            console.log(turn)

        })
    })

    //functions
    function addX(e) {
        console.log(e.target)
        let index = e.target.id.slice(-1)
        positions[index] = "X"
        e.target.innerHTML = "<i class='fas fa-times fa-5x'></i>"
        e.target.classList.add('nohover')
    }

    function addO(e) {
        console.log(e.target)
        let index = e.target.id.slice(-1)
        positions[index] = "O"
        e.target.innerHTML = "<i class='fas fa-circle fa-4x'></i>"
        e.target.classList.add('nohover')
    }

    function checkWinner() {
        console.log("checking winner")
        winning_array.forEach(combo => {
            console.log(combo)
            if (positions[combo[0]] == "X" && positions[combo[1]] == "X" && positions[combo[2]] == "X") {
                console.log("X should win!")
                return xwinner()
            } else if (positions[combo[0]] == "O" && positions[combo[1]] == "O" && positions[combo[2]] == "O") {
                console.log("O should win")
                return owinner()
            }
        });
    }

    function checkTurn() {
        if (turn > 9) {
            return tie();
        }
    }

    function xwinner() {
        console.log("X wins!")
        let player1name = document.getElementById('player1name').innerText || "X"
        alert(player1name + " wins!")
    }

    function owinner() {
        console.log("O wins!")
        let player2name = document.getElementById('player2name').innerText || "O"
        alert(player2name + " wins!")
    }

    function tie() {
        alert("It's a tie!")
    }

    return {
        positions: positions
    };
})();