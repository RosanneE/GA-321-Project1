// *** means ideas to work on/improve if I have time

//global variables
let squareCount = 0
let winCount = 0
let bombTouchCount = 0
let numBombs = 10
let width = 9
let height = 9
let cascadeOff = false
let isEdge = false
let flag = false
let gameIsOver = false
let bombArray = []
let edgeCaseLeft = [0, 9, 18, 27, 36, 45, 54, 63, 72,]
let edgeCaseRight = [8, 17, 26, 35, 44, 53, 62, 71, 80]
let allEdge = [0, 9, 18, 27, 36, 45, 54, 63, 72, 8, 17, 26, 35, 44, 53, 62, 71, 80]
let caseCheck = [-1, 1, -10, 10, -9, 9, -8, 8]
let caseCheckRight = [-10, -9, -1, 8, 9]
let caseCheckLeft = [-9, -8, 1, 9, 10]
let squares = document.querySelectorAll(".square")
let grid = document.getElementById("gridID")
let message = document.querySelector(".message")
let messageTwo = document.querySelector(".messageTwo")
let reset = document.querySelector(".reset")
let setFlag = document.querySelector("#flagID")
let label = document.querySelector("label")
let cascade = document.getElementsByClassName("cascade")
console.log(cascade)
//map of the current game
let gameMap = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,]

//add number to squares both in HTM and game map
squares.forEach(square => {
    square.dataset.number = squareCount
    gameMap[squareCount] = squareCount
    squareCount++
});

//add onclick to buttons
function buttonsOn() {
    squares.forEach(square => {
        square.addEventListener('click', () => {
            //resets variable that checks for the edge on each click
            isEdge = false
            //Checks to see if we are flagging squares or using the usual click action            
            if (flag === false) {
                if (square.id === "bomb") {
                    explodeBomb(square)
                } else {
                    safe(gameMap[square.dataset.number], square)
                    countBombs(gameMap[square.dataset.number])
                    if (cascadeOff === true){
                        cascadingSafe(square.dataset.number)     
                    }            
                }
                //actions for flagged squares occurs if flag is true and background is set to light green
            } else if (flag === true && square.style.backgroundColor !== "lightgreen") {
                square.classList.add("flagOn")
            }
        })
    })
}

//reset button calls setGame
reset.addEventListener("click", function () {
    setGame()
})
cascade[0].addEventListener("click", function () {
    
    if (cascadeOff === false) {
        cascadeOff = true
        cascade[0].style.backgroundColor = "#00ff41"
        cascade[0].style.color = "black"
        cascade[0].innerHTML = "Cascade"
    }else if (cascadeOff === true) {
        cascadeOff = false
        cascade[0].style.backgroundColor = "grey"
        cascade[0].style.color = "#00ff41"
        cascade[0].innerHTML = "Cascade Off"
    } 

})

//set flag button toggle flag ability. Chnges color and text to alert to on
setFlag.addEventListener("click", function () {
    if (flag === false) {
        flag = true;
        setFlag.style.backgroundColor = "#00ff41"
        setFlag.style.color = "black"
        setFlag.innerHTML = "Set Trap: On"
    } else if (flag === true) {
        flag = false;
        setFlag.style.backgroundColor = "grey"
        setFlag.style.color = "#00ff41"
        setFlag.innerHTML = "Set Trap"      
    } else {
        console.error("setFlag() has an error");
    }
});

//setGame original call, sets new game on page load/refresh
setGame()

//setGame sets up new game, calls clearBoard(), buttonsOn()
function setGame() {
    //resets squares to start condition
    clearBoard()
    //randomly picks 10 squares and adds bombs to them
    for (let i = 0; i < 10; i++) {
        let bombCreate = Math.floor(Math.random() * 81)
        bombArray.push(bombCreate)
    }
    //assign bombs to html and gameMap squares 
    for (i = 0; i < 10; i++) {
        gameMap[bombArray[i]] = "bomb"
        squares[bombArray[i]].id = "bomb"
    }
    //resets buttons
    buttonsOn()
    cascadeOff = false
    //logs bomb array and gameMap for debugging
    console.log(`bomb array ' ${bombArray}`)
    console.log(gameMap)
}

//changes color of squares that touch no bombs, calles cascadingSafe
function safe(squareNo) {
    if (squares[squareNo] != null) {
        squares[squareNo].style.backgroundColor = "lightgreen"
        squares[squareNo].classList.add("safe")
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
        //console.log(squares[squareNo])
        if (squares[squareNo]  !== undefined) {
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
        squares[squareNo].innerHTML = bombTouchCount
    }
    isEdge = true
    return
}

//sets message innerHTML to explode message, calls endGame function
function explodeBomb(squareNo) {
    // console.log(squareNo)
    message.innerHTML = `The bug has spawned, You have been overwhelmed!  Better luck next time.`// bombArray: ${bombArray}`
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
        //remove images/image classes
        square.classList.remove("flagOn")
        square.classList.remove("safe")
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
        }
        //check through left case squares
    } else if (whichEdge === "left") {
        for (let i = 0; i < caseCheckLeft.length; i++) {
            let curr = caseCheckLeft[i] + parseInt(squareNo)
        }
        //check through right case squares
    } else if (whichEdge === "right") {
        for (let i = 0; i < caseCheckRight.length; i++) {
            let curr = caseCheckRight[i] + parseInt(squareNo)
            checkAround(curr)
        }
    } else {
        console.error("something is wrong with cascading Edge Cases")
    }

}

//extension of cascadingSafe, verifies safe status of current squares and adds formatting.  Calls itself recursively
function checkAround(currSquare) {
    //if the current square is not a bomb
    if (gameMap[currSquare] !== "bomb") {
        safe(currSquare)
        countBombs(currSquare) 
        let edgeCheck = false
        allEdge.forEach(no => {
            if (currSquare === no){
                edgeCheck = true
            }          
        })
        if (bombTouchCount === 0 && edgeCheck === false && currSquare > -1 && currSquare <81) {
            currSquare = currSquare + 1
            checkAround(currSquare)
        }
    }
}