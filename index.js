// MENU MODULE 
const menu = (function() {
    //cache DOM 
    let menuContainer = document.getElementById('menu-modal');
    let playerButton = document.getElementById('player');
    let aiButton = document.getElementById('ai');
    let playerModal = document.getElementById("player-modal")
    let aiModal = document.getElementById("ai-modal")

    let menuButton = document.getElementById('menu-btn')

    //bind events
    playerButton.addEventListener('click', selectPlayerModal)
    aiButton.addEventListener('click', selectAIModal)
    menuButton.addEventListener('click', openModal)

    function selectPlayerModal() {
        menuContainer.style.display = "none";
        aiModal.style.display = "none";
    }

    function selectAIModal() {
        menuContainer.style.display = "none";
        playerModal.style.display = "none";
    }

    function openModal() {
        window.location.reload(true)
            // menuContainer.style.display = "block";
            // playerModal.style.display = "block";
            // aiModal.style.display = "block";
            // gameBoard.clearBoard();
            // console.log(`After I clicked menu, the turn is ${turn}`)
            // console.log(`After I click the menu, positions are ${positions}`)
    }

})();

// PLAYER FACTORY 
const createPlayer = (playerName, playerToken) => {
    return {
        playerName,
        playerToken
    }
};



// PLAYER INPUT MODULE

const playerInput = (function() {
    let player1 = createPlayer("", "X")
    let player2 = createPlayer("", "O")

    //cache DOM
    let playerModal = document.getElementById('player-modal')
    let playerSubmitButton = document.getElementById('player-submit')
    let player1Box = document.getElementById('player1name')
    let player2Box = document.getElementById('player2name')


    //bind events 
    playerSubmitButton.addEventListener('click', addToPlayerBox)

    function addToPlayerBox() {
        player1.playerName = document.getElementById('player1-nameField').value
        player2.playerName = document.getElementById('player2-nameField').value

        if ((player1.playerName == "") || (player2.playerName == "")) {
            alert("Please enter a valid name!")
            return addToPlayerBox()
        } else {
            player1Box.innerText = player1.playerName
            player2Box.innerText = player2.playerName
            document.forms[0].reset();
            playerModal.style.display = "none";
            gameBoard.playPlayerGame()
        }
    };

    return {

    }
})();

// AI INPUT MODULE 

const aiInput = (function() {
    let player1 = createPlayer("", "X")
    let player2 = createPlayer("Computer", "O")

    //cache DOM 
    let aiModal = document.getElementById('ai-modal')
    let aiSubmitButton = document.getElementById('ai-submit')
    let player1Box = document.getElementById('player1name')
    let player2Box = document.getElementById('player2name')

    //bind events 
    aiSubmitButton.addEventListener('click', addToPlayerBox)

    // functions 
    function addToPlayerBox() {
        player1.playerName = document.getElementById('user-nameField').value

        if (player1.playerName == "") {
            alert("Please enter a valid name!")
            return addtoPlayerBox()
        } else {
            player1Box.innerText = player1.playerName
            player2Box.innerText = player2.playerName
            document.forms[1].reset();
            aiModal.style.display = "none";
            gameBoard.playAIGame()
        }
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

    let tiles = Array.from(document.getElementsByClassName('tile'))
    let restartButton = document.getElementById("restart-btn")
    let player1Box = document.getElementById("player1")
    let player2Box = document.getElementById("player2")


    //bind events 
    restartButton.addEventListener('click', clearBoard);




    //functions
    function playPlayerGame() {

        tiles.forEach(item => {
            item.addEventListener('click', e => {
                if (turn % 2 == 0) {
                    addO(e)
                } else {
                    addX(e)
                }
                turn++
                showTurn()
                checkWinner()
                checkTie()
            })
        })
    }

    function playAIGame() {
        tiles.forEach(item => {
            item.addEventListener('click', e => {
                if (turn % 2 != 0) {
                    console.log(`the turn is ${turn}`)
                        // Player Turn 
                    addX(e)
                    turn++
                    showTurn()
                    checkWinner()
                    checkTie()

                    // AI Turn 
                    aiTurn()
                    turn++
                    showTurn()
                    checkWinner()
                    checkTie()
                }
            })
        });
    }

    function showTurn() {
        if (turn % 2 == 0) {
            player1Box.classList.remove("highlight")
            player2Box.classList.add("highlight")
        } else {
            player2Box.classList.remove("highlight")
            player1Box.classList.add("highlight")
        }
    }
    showTurn()


    function checkLines() {
        let comboarray = []
        let linearray = []

        winning_array.forEach(combo => {
            let pos = {}
            pos[combo[0]] = positions[combo[0]]
            pos[combo[1]] = positions[combo[1]]
            pos[combo[2]] = positions[combo[2]]

            let parr = Object.values(pos)
            let line = parr.sort().join("")

            comboarray.push(pos)
            linearray.push(line)
        })

        if (linearray.includes("XX")) {
            let index = linearray.indexOf("XX")
            let c = comboarray[index]
            return getKeyByValue(c, "")
        } else if (linearray.includes("OO")) {
            let index = linearray.indexOf("OO")
            let c = comboarray[index]
            return getKeyByValue(c, "")
        } else {
            console.log(`The index of an empty string is ${positions.indexOf("")}`)
            return positions.indexOf("")
        }
    }

    function getKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key] === value);
    }

    function selectTile(tile) {
        console.log(`Inside the selectTile function, positions is ${positions}`)
        let target = "tile" + tile
        targetTile = document.getElementById(target)
        positions[target] = "O"
        targetTile.innerHTML = "<i class='fas fa-circle fa-4x'></i>"
        targetTile.classList.add('nohover')
    }


    function aiTurn() {
        if (turn == 2) {
            if (positions[0] == "") {
                selectTile(0)
                positions[0] = "O"
            } else {
                selectTile(1)
                positions[1] = "O"
            }
        } else {
            var selection = checkLines()
            selectTile(selection)
            positions[selection] = "O"
        }

    }

    function addX(e) {
        let index = e.target.id.slice(-1)
        positions[index] = "X"
        e.target.innerHTML = "<i class='fas fa-times fa-5x'></i>"
        e.target.classList.add('nohover')
    }

    function addO(e) {
        let index = e.target.id.slice(-1)
        positions[index] = "O"
        e.target.innerHTML = "<i class='fas fa-circle fa-4x'></i>"
        e.target.classList.add('nohover')
    }

    function checkWinner() {
        winning_array.forEach(combo => {
            if (positions[combo[0]] == "X" && positions[combo[1]] == "X" && positions[combo[2]] == "X") {
                return xwinner()
            } else if (positions[combo[0]] == "O" && positions[combo[1]] == "O" && positions[combo[2]] == "O") {
                return owinner()
            }
        });
    }

    function checkTie() {
        if (turn > 9) {
            return tie();
        }
    }

    function xwinner() {
        let player1name = document.getElementById('player1name').innerText || "X"
        alert(player1name + " wins!")
    }

    function owinner() {
        let player2name = document.getElementById('player2name').innerText || "O"
        alert(player2name + " wins!")
    }

    function tie() {
        alert("It's a tie!")
    }

    function clearBoard() {
        tiles.forEach(tile => {
            tile.innerHTML = ""
            tile.classList.remove("nohover")
        });
        positions = ["", "", "", "", "", "", "", "", ""];
        turn = 1;
        showTurn()
    }

    return {
        clearBoard,
        playPlayerGame,
        playAIGame
    };
})();