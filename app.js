// *** means ideas to work on/improve if I have time

//global variables
let squareCount = 0
let squareFill = 0
let winCount = 0
let isEdge = false
let bombArray = []
let squares = document.querySelectorAll(".square")
let grid = document.getElementById("gridID")
let message = document.querySelector(".message")
let messageTwo = document.querySelector(".messageTwo")
let reset = document.querySelector(".reset")
//***Might not need? Only for Debugging?
let gameMap = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,]

//add number to squares
squares.forEach(square => {
    square.dataset.number = squareCount
    gameMap[squareCount] = squareCount
    squareCount++
});
//add onclick to buttons
squares.forEach(square => {
    square.addEventListener('click', () => {
        isEdge = false
        if (square.id === "bomb") {
            explodeBomb(gameMap[square.dataset.number])
        } else {
            countBombs(gameMap[square.dataset.number])
            safe(gameMap[square.dataset.number])
        }
    })
})
//reset button calls setGame
reset.addEventListener("click", function () {
    setGame()
})
//setGame original call, sets new game on page load/refresh
setGame()

//setGame sets up new game, calls clearBoard
function setGame() {
    //resets squares to start condition
    clearBoard()
    //add bombs to random squares function
    //randomly pick 10 bomb squares
    for (let i = 0; i < 10; i++) {
        let bombCreate = Math.floor(Math.random() * 81)
        bombArray.push(bombCreate)
    }
    //assign bombs to gameMap squares 
    for (i = 0; i < 10; i++) {
        gameMap[bombArray[i]] = "bomb"
        squares[bombArray[i]].id = "bomb"
    }
    //log bomb array and gameMap for debugging
    console.log(`bomb array ' ${bombArray}`)
    console.log(gameMap)
}

//changes color of squares that touch no bombs, calles explodingSafe
function safe(squareNo) {
    squares[squareNo].style.backgroundColor = "lightgreen"
    explodingSafe()
}

// countBombs looks at squares in front of and behid (i+1, i-1) and squares in rows above[-9-8-10] and below [+8+9+10]. It adds the number of bombs a square touches to its' innerHTML.  Calls edgeLeft and EdgeRight
function countBombs(squareNo) {
    let base = squareNo
    let bombTouchCount = 0
    //edgecase groups
    let edgeCaseLeft = [0, 9, 18, 27, 36, 45, 54, 63, 72,]
    let edgeCaseRight = [8, 17, 26, 35, 44, 53, 62, 71, 80]
    //edge piece exception code - if it is an edgecase, it doesn't count the number before it(right) or after it (left). 
    //calls edgeLeft
    edgeCaseLeft.forEach(caseLeft => {
        if (caseLeft === squareNo) {
            edgeLeft(squareNo, bombTouchCount, base)
            return
        }
    })
    //calls edgeRight
    edgeCaseRight.forEach(caseRight => {
        if (caseRight === squareNo) {
            edgeRight(squareNo, bombTouchCount, base)
            return
        }
    })
    //regular piece calculations - verifies if it edgecase is false, if so, it looks at squares in front of and behid (i+1, i-1) and squares in rows above [] and below[-9-8-10] and below [+8+9+10]
    if (isEdge === false) {
        if (gameMap[base - 1] === "bomb") {
            bombTouchCount++
        }
        if (gameMap[base + 1] === "bomb") {
            bombTouchCount++
        }
        if (gameMap[base + 10] === "bomb") {
            bombTouchCount++
        }
        if (gameMap[base + 8] === "bomb") {
            bombTouchCount++
        }
        if (gameMap[base + 9] === "bomb") {
            bombTouchCount++
        }
        if (gameMap[base - 10] === "bomb") {
            bombTouchCount++
        }
        if (gameMap[base - 8] === "bomb") {
            bombTouchCount++
        }
        if (gameMap[base - 9] === "bomb") {
            bombTouchCount++
        }
        if (bombTouchCount != 0) {
            squares[squareNo].style.color = "purple"
            squares[squareNo].innerHTML = bombTouchCount
        }
    }
    //checks for win status
    isWin()
}

//called in countBombs, counts bombs touched [bomb -8,-9,+1+,9,+10]
function edgeLeft(squareNo, bombTouchCount, base) {
    if (gameMap[base - 9] === "bomb") {
        bombTouchCount++
    }
    if (gameMap[base - 8] === "bomb") {
        bombTouchCount++
    }
    if (gameMap[base + 1] === "bomb") {
        bombTouchCount++
    }
    if (gameMap[base + 9] === "bomb") {
        bombTouchCount++
    }
    if (gameMap[base + 10] === "bomb") {
        bombTouchCount++
    }
    if (bombTouchCount != 0) {
        squares[squareNo].style.color = "purple"
        squares[squareNo].innerHTML = bombTouchCount
    }
    isEdge = true
    return
}

//called in countBombs, counts bombs touched [bomb -10,-9,+1,+9,+8]
function edgeRight(squareNo, bombTouchCount, base) {
    if (gameMap[base - 10] === "bomb") {
        bombTouchCount++
    }
    if (gameMap[base - 9] === "bomb") {
        bombTouchCount++
    }
    if (gameMap[base - 1] === "bomb") {
        bombTouchCount++
    }
    if (gameMap[base + 8] === "bomb") {
        bombTouchCount++
    }
    if (gameMap[base + 9] === "bomb") {
        bombTouchCount++
    }
    if (bombTouchCount != 0) {
        squares[squareNo].style.color = "purple"
        squares[squareNo].innerHTML = bombTouchCount
    }
    isEdge = true
    return
}

//sets message innerHTML to explode message, calls endGame function
function explodeBomb(squareNo) {
    message.innerHTML = `You found the bomb - with your face.  Better luck next time. bombArray: ${bombArray}`
    gameOver()
}

//checks for win condition
function isWin() {
    squares.forEach(square => {
        if (square.style.backgroundColor === "lightgreen") {
            winCount++
        }
        if (winCount === 70) {
            win()
        }
    });
    winCount = 0
}

//win function - prints message, calls gameOver
function win() {
    message.innerHTML = "You win, no more bugs in the code!"
    gameOver()
}

//clears board of all changes to state made durring the game
function clearBoard() {
    squares.forEach(square => {
        //refresh IDs
        square.id = 0
        //reset css colors
        square.style.backgroundColor = "grey"
        //remove innerHTML
        square.innerHTML = ""
        //remove messages
        message.innerHTML = ""
        messageTwo.innerHTML = ""
    })
    squares.forEach(square => {
        square.disabled = false
    })

}

//prints message, disables buttons
function gameOver() {
    messageTwo.innerHTML = "Game Over. To play again, hit Reset!"
    squares.forEach(square => {
        square.disabled = true
    })
}




//creates a ripple effect reveiling all touching squares that are safe and have no bomb touches
function explodingSafe() {
    //put in a for each loop containing all touching squares
    if (square.style.backgroundColor == "lightgreen" && square.innerHTML === "") { }
}

//calculates which squares to check for touching and wether it is an edge pice or not
function touchSquares() {

}