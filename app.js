// *** means ideas to work on/improve if I have time

//global variables
let squareCount = 0
let squareFill = 0
let winCount = 0
let bombTouchCount = 0
let numBombs = 10
let width = 9
let height = 9
let isEdge = false
let flag = false
let timeStatus = false
let gameIsOver = false
let bombArray = []
//edgecase groups
let edgeCaseLeft = [0, 9, 18, 27, 36, 45, 54, 63, 72,]
let edgeCaseRight = [8, 17, 26, 35, 44, 53, 62, 71, 80]
let caseCheck = [-1, 1, -10, 10, -9, 9, -8, 8]
let caseCheckRight = [-10, -9, -1, 8, 9]
let caseCheckLeft = [-9, -8, 1, 9, 10]
let squares = document.querySelectorAll(".square")
let grid = document.getElementById("gridID")
let message = document.querySelector(".message")
let messageTwo = document.querySelector(".messageTwo")
let reset = document.querySelector(".reset")
let setFlag = document.querySelector("#flagID")
let beginner = document.querySelectorAll("beginner")
let intermediate = document.querySelector("intermediate")
let advanced = document.querySelector("advanced")
let timer = document.getElementById("timerID")
console.log(timer)
//***Might not need? Only for Debugging?
let gameMap = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,]

//add number to squares
squares.forEach(square => {
    square.dataset.number = squareCount
    gameMap[squareCount] = squareCount
    squareCount++
});
//add onclick to buttons
function buttonsOn() {
    squares.forEach(square => {
        square.addEventListener('click', () => {
            isEdge = false
            //starts game timer on first click
            if (timeStatus === false || gameIsOver == true) {
                let timeNow = 0
                if (timeStatus === false) {
                    const timeInterval = setInterval(function () {
                        timeNow = timeNow + .5
                        timer.innerHTML = `Timer: ${timeNow}`
                    }, 500)
                    timeStatus = true
                } else if (gameIsOver === true) {
                    clearInterval(timeInterval)
                }
            }
            if (flag === false) {
                if (square.id === "bomb") {
                    explodeBomb(square)
                    //(gameMap[square.dataset.number])
                } else {
                    // safe(square)
                    // countBombs(square)
                    safe(gameMap[square.dataset.number], square)
                    countBombs(gameMap[square.dataset.number])
                    console.log(`bomb count from onclick ${bombTouchCount}`)
                    //console.log(bombTouchCount)
                    if (bombTouchCount === 0) {
                        cascadingSafe(square.dataset.number)
                    }
                }
            } else if (flag === true && square.style.backgroundColor !== "lightgreen") {
                square.style.backgroundColor = "purple"
                //square.classList.add("flagOn")
            }
        })
    })
}

//reset button calls setGame
reset.addEventListener("click", function () {
    setGame()
})

//set flag button
setFlag.addEventListener("click", function () {
    if (flag === false) {
        flag = true;
        console.log("flag on")
        setFlag.style.backgroundColor = "red"
        setFlag.innerHTML = "Set Flag: ON"
    } else if (flag === true) {
        flag = false;
        console.log("flag off")
        setFlag.style.backgroundColor = "purple"
        setFlag.innerHTML = "Set Flag"
    } else {
        console.log("something has gone wrong in setFlag()")
    }
});

// beginner.addEventListener("click", function(){
//     //set parameters
//     height = 9
//     width = 9
//     numBombs = 10
// })
// intermediate.addEventListener("click", function(){
//     //set parameters
//     height = 16
//     width = 16
//     numBombs = 40
//     //add new game map slots
//     for (i = 0; i < (175); i++){
//         gameMap.push(0)
//     }

//     //add new squares
// })
// advanced.addEventListener("click", function(){
//     //set parameters
//     height = 16
//     width = 30
//     numBombs = 99
//     //add new game map slots
//     for (i = 0; i < (399); i++){
//         gameMap.push(0)
//     }
//     //add new squares

// })

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
    buttonsOn()
    //start timer
    //log bomb array and gameMap for debugging
    console.log(`bomb array ' ${bombArray}`)
    console.log(gameMap)
}

//changes color of squares that touch no bombs, calles cascadingSafe
function safe(squareNo) {
    if (squares[squareNo] != null) {
        squares[squareNo].style.backgroundColor = "lightgreen"
    }
}

// countBombs looks at squares in front of and behid (i+1, i-1) and squares in rows above[-9-8-10] and below [+8+9+10]. It adds the number of bombs a square touches to its' innerHTML.  Calls edgeLeft and EdgeRight
function countBombs(squareNo) {
    //let squareNo = squareNo
    bombTouchCount = 0
    //edge piece exception code - if it is an edgecase, it doesn't count the number before it(right) or after it (left). 
    //calls edgeLeft
    edgeCaseLeft.forEach(caseLeft => {
        if (caseLeft === squareNo) {
            edgeLeft(squareNo)
            return
        }
    })
    //calls edgeRight
    edgeCaseRight.forEach(caseRight => {
        if (caseRight === squareNo) {
            edgeRight(squareNo)
            return
        }
    })
    //regular piece calculations - verifies if it edgecase is false, if so, it looks at squares in front of and behid (i+1, i-1) and squares in rows above [] and below[-9-8-10] and below [+8+9+10]
    if (isEdge === false) {
        if (gameMap[squareNo - 1] === "bomb") {
            bombTouchCount++
        }
        if (gameMap[squareNo + 1] === "bomb") {
            bombTouchCount++
        }
        if (gameMap[squareNo + 10] === "bomb") {
            bombTouchCount++
        }
        if (gameMap[squareNo + 8] === "bomb") {
            bombTouchCount++
        }
        if (gameMap[squareNo + 9] === "bomb") {
            bombTouchCount++
        }
        if (gameMap[squareNo - 10] === "bomb") {
            bombTouchCount++
        }
        if (gameMap[squareNo - 8] === "bomb") {
            bombTouchCount++
        }
        if (gameMap[squareNo - 9] === "bomb") {
            bombTouchCount++
        }
    }
    if (bombTouchCount !== 0) {
        console.log(isEdge)
        console.log(`bomb count from countBombs ${bombTouchCount}`)
        console.log(squares[squareCount])
        if (squares[squareCount] !== null) {
            squares[squareNo].style.color = "purple"
            squares[squareNo].innerHTML = bombTouchCount
        }
    }
    //checks for win status
    isWin()
    return
}

//called in countBombs, counts bombs touched [bomb -8,-9,+1+,9,+10]
function edgeLeft(squareNo) {
    if (gameMap[squareNo - 9] === "bomb") {
        bombTouchCount++
    }
    if (gameMap[squareNo - 8] === "bomb") {
        bombTouchCount++
    }
    if (gameMap[squareNo + 1] === "bomb") {
        bombTouchCount++
    }
    if (gameMap[squareNo + 9] === "bomb") {
        bombTouchCount++
    }
    if (gameMap[squareNo + 10] === "bomb") {
        bombTouchCount++
    }
    if (bombTouchCount !== 0) {
        squares[squareNo].style.color = "purple"
        squares[squareNo].innerHTML = bombTouchCount
    }
    isEdge = true
    return
}

//called in countBombs, counts bombs touched [bomb -10,-9,+1,+9,+8]
function edgeRight(squareNo) {
    if (gameMap[squareNo - 10] === "bomb") {
        bombTouchCount++
    }
    if (gameMap[squareNo - 9] === "bomb") {
        bombTouchCount++
    }
    if (gameMap[squareNo - 1] === "bomb") {
        bombTouchCount++
    }
    if (gameMap[squareNo + 8] === "bomb") {
        bombTouchCount++
    }
    if (gameMap[squareNo + 9] === "bomb") {
        bombTouchCount++
    }
    if (bombTouchCount !== 0) {
        squares[squareNo].style.color = "purple"
        squares[squareNo].innerHTML = bombTouchCount
    }
    isEdge = true
    return
}

//sets message innerHTML to explode message, calls endGame function
function explodeBomb(squareNo) {
    // console.log(squareNo)
    message.innerHTML = `You found the bomb - with your face.  Better luck next time.`// bombArray: ${bombArray}`
    squareNo.classList.add("bombHit")
    gameOver()
}

//checks for win condition
function isWin() {
    squares.forEach(square => {
        if (square.style.backgroundColor === "lightgreen") {
            winCount++
        }
        if (winCount === 71) {
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
        square.classList.remove("bombHit")
    })



}

//prints message, disables buttons
function gameOver() {
    //clearInterval(timerInterval)
    messageTwo.innerHTML = "Game Over. To play again, hit Reset!"
    gameIsOver = true
    squares.forEach(square => {
        square.disabled = true
    })
}

// creates a ripple effect reveiling all touching squares that are safe and have no bomb touches and stops after reveling a numbered square, calls  CheckAround
function cascadingSafe(squareNo) {
    let whichEdge = "none"
    console.log(squareNo)
    //check for edge cases on the Left
    edgeCaseLeft.forEach(caseLeft => {
        if (caseLeft == squareNo) {
            whichEdge = "left"
            console.log(whichEdge)
            return
        }
    })
    //check for edge cases on the right
    edgeCaseRight.forEach(caseRight => {
        if (caseRight == squareNo) {
            whichEdge = "right"
            console.log(whichEdge)
            return
        }
    })
    //if it is not an edge case
    if (whichEdge === "none") {
        console.log(whichEdge)
        //check through all surrounding squares
        for (let i = 0; i < caseCheck.length; i++) {
            let curr = caseCheck[i] + parseInt(squareNo)
            checkAround(curr)
            //console.log(squares[curr].style.backgroundColor)
            // if (curr >-1 && curr <(width * height)&& squares[curr].style.backgroundColor !== "lightgreen"){
            //     console.log("inside none")
            //     cascadingSafe(curr)
            // }
        }
        //check through left case squares
    } else if (whichEdge === "left") {
        for (let i = 0; i < caseCheckLeft.length; i++) {
            let curr = caseCheckLeft[i] + parseInt(squareNo)
            checkAround(curr)
            // if (curr >-1 && curr <(width * height)&& squares[curr].style.backgroundColor !== "lightgreen"){
            //     console.log("inside none")
            //     cascadingSafe(curr)
            // }
        }
        //check through right case squares
    } else if (whichEdge === "right") {
        for (let i = 0; i < caseCheckRight.length; i++) {
            let curr = caseCheckRight[i] + parseInt(squareNo)
            checkAround(curr)
            // if (curr >-1 && curr <(width * height)&& squares[curr].style.backgroundColor !== "lightgreen"){
            //     console.log("inside none")
            //     cascadingSafe(curr)
            // }
        }
    } else {
        console.log("something is wrong with cascading Edge Cases")
    }

}

//extension of cascadingSafe, verifies safe status of current squares and adds formatting.  Calls itself recursively
function checkAround(currSquare) {
    //if the current square is not a bomb
    if (gameMap[currSquare] !== "bomb") {
        safe(currSquare)
        countBombs(currSquare)
        if (bombTouchCount !== 0) {
            squares[currSquare].style.color = "purple"
            squares[currSquare].innerHTML = bombTouchCount
        } else if (bombTouchCount === 0) {
            curr = currSquare + 1
            checkAround(curr)
        }
    }
}