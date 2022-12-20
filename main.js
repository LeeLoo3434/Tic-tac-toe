/*----- constants -----*/
// all caps- lookup value
const PLAYERS = {
  // player1:1,
  // player2:-1, this was not right
  1: {
    name: "Player 1",
    symbol: "X",
    color: "red",
  },
  "-1": {
    name: "Player2",
    symbol: "O",
    color: "blue",
  },
};
// store all the possible win conbos of the game
const WIN_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // VERTICLE
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // Diag
  [0, 4, 8],
  [2, 4, 6],
];
/*----- app's state (variables) -----*/
let turn, board, winner;
/*----- cached element references -----*/
const h2El = document.querySelector("h2");
const boardEl = document.getElementById("board");
const resetBtnEl = document.createElement('button')
/*----- event listeners -----*/
boardEl.addEventListener('click', handleBoardClick)
// vent listener to board elements the event- the click and what function
// I want to run when the click happens event handlers
resetBtnEl.addEventListener('click', handleReset)

/*----- functions -----*/
function init() {
  turn = 1;
  board = [null, null, null, null, null, null, null, null, null];
  winner = null;
  render();
}
function render() {
    renderMessage()
    renderboard()
    if(winner || !board.includes(null)){
        renderResetBtn()
    }
}
function handleBoardClick(evt) {
  // console.log('the board was clicked') check if its working
  // check board array to see if the current position matches
  const idx = evt.target.id[4];
  // console.log(evt.target.id[4])
  // null is falsy- this is why we added the bang oprator
  if (!board[idx]&& !winner) {
    // console.log('this tile is empty')
    board[idx] = turn;
    checkWinner();
    if(!winner)changeTurn();
    render();
  } else {
    console.log("this tile is not empty");
  }
}
function changeTurn() {
  turn *= -1;
}
function checkWinner() {
  for (let combo of WIN_COMBOS) {
    // if(board[combo[0]]) === board[combo[1]] && board[combo[2]] this will get repetetive
    const score = Math.abs(board[combo[0]] + board[combo[1]] + board[combo[2]]);
    if (score === 3) {
      winner = turn;
      break;
    }
  }
}
// 
function renderMessage() {
    if (winner){
        h2El.innerText = `${PLAYERS[winner].name} has won!`
    }else if(!winner && !board.includes(null)) {
        h2El.innerText = "It's a cat's game!"
    }else{`${PLAYERS[turn].name}'s turn!`
    }
  h2El.innerText = `It is ${PLAYERS[turn].name} turn`;
  for (let cell of boardEl.children) {
    const idx = cell.id[4]; f
    // ternary operator instead of an if else
    cell.innerText = board[idx] ? PLAYERS[board[idx]].symbol : "";
  }

}
function renderboard(){
    for(let cell of boardEl.children){
        const idx = cell.id[4]
        cell.innerText = board[idx] ?  PLAYERS[board[idx]].symbol : ''
    }
}
function renderResetBtn(){
    resetBtnEl.innerText = "Play Again"
    document.querySelector('body').append(resetBtnEl)
}
function handleReset(){
    resetBtnEl.remove()
    init()
}
// Start the game
init();
