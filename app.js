const gameboard = (function() {
  var currentMarker = 'X';
  var title = document.getElementById('title');
  const gameArray = ['-', '-', '-', '-', '-', '-', '-', '-', '-'];
  const writeToDOM = function() {
    var board = document.getElementById('gameboard');

    if (board === null) {
      board = document.createElement('div');
      board.classList.add('gameboard');
      board.setAttribute('id', 'gameboard');
      document.body.append(board);
    }

    board.innerHTML = '';
    var tie = true;

    gameArray.forEach((element, index) => {
      var cell = document.createElement('div');
      cell.classList.add('cell');
      cell.classList.add('cell-image');
      cell.id = index;
      if (element === '-') {
        tie = false;
        cell.innerHTML = '';
      } else if (element === 'X') {
        cell.innerHTML = 'X';
        cell.classList.remove('cell');
      } else {
        cell.innerHTML = 'O';
        cell.classList.remove('cell');
      }
      board.append(cell);
    });

    if (tie === true) {
      title.innerHTML = "It's a tie!";
    }

    var cells = document.getElementsByClassName('cell');
    for (var i = 0; i < cells.length; i++) {
      cells[i].addEventListener('click', function() { currentPlayer.pickCell(event) });
    }
  }

  const determineWinner = function() {
    var title = document.getElementById('title');
    var winner;
    if (gameArray[0] !== '-' && gameArray[0] === gameArray[1] && gameArray[0] === gameArray[2] ||
        gameArray[0] !== '-' && gameArray[0] === gameArray[3] && gameArray[0] === gameArray[6] ||
        gameArray[0] !== '-' && gameArray[0] === gameArray[4] && gameArray[0] === gameArray[8]) {
      winner = gameArray[0];
    }
    if (gameArray[1] !== '-' && gameArray[1] === gameArray[4] && gameArray[1] === gameArray[7]) {
      winner = gameArray[1];
    }
    if (gameArray[2] !== '-' && gameArray[2] === gameArray[5] && gameArray[2] === gameArray[8] ||
        gameArray[2] !== '-' && gameArray[2] === gameArray[4] && gameArray[2] === gameArray[6]) {
      winner = gameArray[2];
    }
    if (gameArray[3] !== '-' && gameArray[3] === gameArray[4] && gameArray[3] === gameArray[5]) {
      winner = gameArray[3];
    }
    if (gameArray[6] !== '-' && gameArray[6] === gameArray[7] && gameArray[6] === gameArray[8]) {
      winner = gameArray[6];
    }
    return winner;
  }

  return {gameArray, writeToDOM, determineWinner};
})();

const Player = function(number) {
  var number = number;
  var name;
  var choice;
  if (number === 1) {
    choice = 'X';
  } else {
    choice = 'O';
  }

  const getName = function() {
    var name = document.getElementById('player' + number).value;
    if (name === '') {
      name = 'Player ' + number;
    }
    return name;
  }

  const displayName = function() {
    this.name = getName();
    var form = document.getElementById('player-input');
    form.classList.remove('player-input');
    form.classList.add('hidden');
    title.innerHTML = player1.name + "'s turn!";
  }

  const pickCell = function(event) {
    gameboard.gameArray[Number(event.target.id)] = this.choice;
    gameboard.writeToDOM();
    var gameIsOver = gameboard.determineWinner();
    if (gameIsOver === undefined) {
      if (currentPlayer === player1) {
        title.innerHTML = player2.name + "'s turn!";
        currentPlayer = player2;
      } else {
        title.innerHTML = player1.name + "'s turn!";
        currentPlayer = player1;
      }
    } else {
      title.innerHTML = currentPlayer.name + ' wins!';
      var playAgainButton = document.createElement('button');
      playAgainButton.innerHTML = 'Play Again!';
      document.body.append(playAgainButton);
      playAgainButton.addEventListener('click', function() { location.reload() });
    }

  }

  return {name, choice, displayName, pickCell};
};

var submitButton = document.getElementById('submit');
submitButton.addEventListener('click', function(event) {
  event.preventDefault();
  player1.displayName();
  player2.displayName();
  gameboard.writeToDOM()
});

const player1 = Player(1);
const player2 = Player(2);
var currentPlayer = player1;
