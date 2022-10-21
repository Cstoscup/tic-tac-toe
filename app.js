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

    var emptyCells = gameArray.filter(function(cell) {
      return cell === '-';
    });

    console.log(emptyCells);

    if (emptyCells.length === 0) {
      return true;
    }

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

  const endRound = function(tie) {
    if (tie === true) {
      ties++;
      document.getElementById('tie-score').innerHTML = 'Ties: ' + ties;
      title.innerHTML = "It's a tie!";
    } else {
      console.log('player' + currentPlayer.number + '-score')
      var score = document.getElementById('player' + currentPlayer.number + '-score');
      score.innerHTML = currentPlayer.name + ': ' + currentPlayer.increaseScore();

      title.innerHTML = currentPlayer.name + ' wins!';
    }

    var playAgainButton = document.createElement('button');
    playAgainButton.classList.add('play-again');
    playAgainButton.innerHTML = 'Play Again!';
    document.body.append(playAgainButton);
    playAgainButton.addEventListener('click', function() {
      for (var i = 0; i < gameArray.length; i++) {
        gameArray[i] = '-';
      }
      player1.displayName();
      player2.displayName();
      playAgainButton.classList.add('hidden');
      currentPlayer = player1;

      writeToDOM();
    });
  }

  return {gameArray, writeToDOM, determineWinner, endRound};
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
  var score = 0;

  const increaseScore = function() {
    this.score++;
    return this.score;
  }

  const getName = function() {
    if (document.getElementById('computer').checked === true && number === 2) {
      name = 'Computer';
    } else {
      name = document.getElementById('player' + number).value;
      if (name === '') {
        name = 'Player ' + number;
      }
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

  const computerPickCell = function() {
    if (gameboard.gameArray[0] === 'X' && gameboard.gameArray[1] === 'X' && gameboard.gameArray[2] === '-') {
      return 2;
    }
    if (gameboard.gameArray[0] === 'X' && gameboard.gameArray[2] === 'X' && gameboard.gameArray[1] === '-') {
      return 1;
    }
    if (gameboard.gameArray[1] === 'X' && gameboard.gameArray[2] === 'X' && gameboard.gameArray[0] === '-') {
      return 0;
    }

    if (gameboard.gameArray[3] === 'X' && gameboard.gameArray[4] === 'X' && gameboard.gameArray[5] === '-') {
      return 5;
    }
    if (gameboard.gameArray[4] === 'X' && gameboard.gameArray[5] === 'X' && gameboard.gameArray[3] === '-') {
      return 3;
    }
    if (gameboard.gameArray[3] === 'X' && gameboard.gameArray[5] === 'X' && gameboard.gameArray[4] === '-') {
      return 4;
    }

    if (gameboard.gameArray[6] === 'X' && gameboard.gameArray[7] === 'X' && gameboard.gameArray[8] === '-') {
      return 8;
    }
    if (gameboard.gameArray[6] === 'X' && gameboard.gameArray[8] === 'X' && gameboard.gameArray[7] === '-') {
      return 7;
    }
    if (gameboard.gameArray[7] === 'X' && gameboard.gameArray[8] === 'X' && gameboard.gameArray[6] === '-') {
      return 6;
    }

    if (gameboard.gameArray[0] === 'X' && gameboard.gameArray[3] === 'X' && gameboard.gameArray[6] === '-') {
      return 6;
    }
    if (gameboard.gameArray[0] === 'X' && gameboard.gameArray[6] === 'X' && gameboard.gameArray[3] === '-') {
      return 3;
    }
    if (gameboard.gameArray[3] === 'X' && gameboard.gameArray[6] === 'X' && gameboard.gameArray[0] === '-') {
      return 0;
    }

    if (gameboard.gameArray[1] === 'X' && gameboard.gameArray[4] === 'X' && gameboard.gameArray[7] === '-') {
      return 7;
    }
    if (gameboard.gameArray[1] === 'X' && gameboard.gameArray[7] === 'X' && gameboard.gameArray[4] === '-') {
      return 4;
    }
    if (gameboard.gameArray[4] === 'X' && gameboard.gameArray[7] === 'X' && gameboard.gameArray[1] === '-') {
      return 1;
    }

    if (gameboard.gameArray[2] === 'X' && gameboard.gameArray[5] === 'X' && gameboard.gameArray[8] === '-') {
      return 8;
    }
    if (gameboard.gameArray[2] === 'X' && gameboard.gameArray[8] === 'X' && gameboard.gameArray[5] === '-') {
      return 5;
    }
    if (gameboard.gameArray[5] === 'X' && gameboard.gameArray[8] === 'X' && gameboard.gameArray[2] === '-') {
      return 2;
    }

    if (gameboard.gameArray[0] === 'X' && gameboard.gameArray[4] === 'X' && gameboard.gameArray[8] === '-') {
      return 8;
    }
    if (gameboard.gameArray[0] === 'X' && gameboard.gameArray[8] === 'X' && gameboard.gameArray[4] === '-') {
      return 4;
    }
    if (gameboard.gameArray[4] === 'X' && gameboard.gameArray[8] === 'X' && gameboard.gameArray[0] === '-') {
      return 0;
    }

    if (gameboard.gameArray[2] === 'X' && gameboard.gameArray[4] === 'X' && gameboard.gameArray[6] === '-') {
      return 6;
    }
    if (gameboard.gameArray[2] === 'X' && gameboard.gameArray[6] === 'X' && gameboard.gameArray[4] === '-') {
      return 4;
    }
    if (gameboard.gameArray[4] === 'X' && gameboard.gameArray[6] === 'X' && gameboard.gameArray[2] === '-') {
      return 2;
    }

    var index = pickRandomCell();
    return index;
  }

  const pickRandomCell = function() {
    var randomIndex = Math.floor((Math.random() * 9));
    console.log(randomIndex);
   if (gameboard.gameArray[randomIndex] === '-') {
      return randomIndex;
    } else {
      return pickRandomCell();
    }
  }

  const pickCell = function(event) {
    if (document.getElementById('computer').checked === true && currentPlayer === player2) {
      gameboard.gameArray[computerPickCell()] = 'O';
    } else {
      gameboard.gameArray[Number(event.target.id)] = this.choice;
    }

    gameboard.writeToDOM();

    var gameIsOver = gameboard.determineWinner();
    if (gameIsOver === undefined) {
      if (currentPlayer === player1) {
        title.innerHTML = player2.name + "'s turn!";
        currentPlayer = player2;
        if (document.getElementById('computer').checked === true && currentPlayer === player2) {
          setTimeout(pickCell, 1000);
        }
      } else {
        title.innerHTML = player1.name + "'s turn!";
        currentPlayer = player1;
      }
    } else {
      gameboard.endRound(gameIsOver);
    }
  }

  return {name, choice, score, number, displayName, pickCell, increaseScore};
};

var submitButton = document.getElementById('submit');
submitButton.addEventListener('click', function(event) {
  event.preventDefault();

  player1.displayName();
  player2.displayName();
  gameboard.writeToDOM()
});

var addPlayer2 = document.getElementById('human');
human.addEventListener('change', function() {
  document.getElementById('player2-section').classList.add('hidden');
  document.getElementById('player2-input').classList.remove('hidden');
});

const player1 = Player(1);
const player2 = Player(2);
var currentPlayer = player1;
var ties = 0;
