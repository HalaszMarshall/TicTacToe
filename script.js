const x_class='x'
const circle_class= 'circle'
const winning_combinations = [ // winning combinationa based on cell numbers
    [0, 1, 2,],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

const cellElements = document.querySelectorAll('[data-cell]') //select all data-cell elements
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
const restartButton =document.getElementById('restartButton')
let circleTurn //to be able to have turns

startGame()  //to make sure we start the function at the beginning

restartButton.addEventListener('click', startGame)

function startGame(){
circleTurn = false //otherwise circle shows up when hovering
cellElements.forEach(cell => {
    cell.classList.remove(x_class)
    cell.classList.remove(circle_class)
    cell.removeEventListener('click', handleClick) //remove them when Restart button is pressed
    cell.addEventListener('click', handleClick,{once:true}) //=>when click, run handleClick function once (do not run again if same cell is clicked again)
})
setBoardHoverClass()
winningMessageElement.classList.remove('show') //removed the show class/winning message screen
}

function handleClick(e){ //e = event..idk why needed
const cell = e.target //target is whichever cell we clicked
const currentClass = circleTurn ? circle_class : x_class // if it is circle turn, return circle class, otherwise x class
placeMark(cell, currentClass)
if (checkWin(currentClass)){
endGame(false)
} else if (isDraw()) {
endGame(true)
} else {
    swapTurns()
    setBoardHoverClass() //make sure it comes after swap turns so it knows what symbol to show    
}
}

function endGame(draw){
    if (draw) {
winningMessageTextElement.innerText = 'Draw!'
    } else {
        winningMessageTextElement.innerText =  `${circleTurn ? "O" : "X"} Wins!` // when winning, print out this text
    }
    winningMessageElement.classList.add('show') // show the winnig Text div element
}

function isDraw() {
    return [...cellElements].every(cell =>{ // [...xxx] is needed because 'cellElements' does not have a .every method so we Destructure
        return cell.classList.contains(x_class) ||
        cell.classList.contains(circle_class)
    }) // if ecery cell has an X or O then Draw is true
}

function placeMark(cell, currentClass){
cell.classList.add(currentClass)
}

function swapTurns(){
    circleTurn=!circleTurn //set circleTurn to opposite of circleTurn
}

function setBoardHoverClass(){
    board.classList.remove(x_class)
    board.classList.remove(circle_class) //remove both classes
    if (circleTurn) {
        board.classList.add(circle_class)
    } else {
        board.classList.add(x_class) // depending on whose turn it is, display the correct symbol
    }
}

function checkWin(currentClass){
   return winning_combinations.some(combination =>{ // check all combination to see if some of them are met by the current combination
        return combination.every(index =>{ // check if every element/cell of the combination has the same class
            return cellElements[index].classList.contains(currentClass)  // check if every element/cell of the combination has current class
        })
    })
} // If currentClass is in all 3 of the cells inside one of the possible combination, you are a winner 