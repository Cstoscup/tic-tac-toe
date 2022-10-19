const gameboard = (function() {
  const gameArray = ['-', '-', '-', '-', '-', '-', '-', '-', '-'];
  const writeToDOM = function() {
    var board = document.getElementById('gameboard');
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
      var title = document.getElementById('title');
      title.innerHTML = "It's a tie!";
    }

    gameboard.determineWinner();

    var cells = document.getElementsByClassName('cell');
    for (var i = 0; i < cells.length; i++) {
      cells[i].addEventListener('click', function() { Player.pickCell(event) });
    }
  }

  const determineWinner = function() {
    var title = document.getElementById('title');
    if (gameArray[0] !== '-' && gameArray[0] === gameArray[1] && gameArray[0] === gameArray[2] ||
        gameArray[0] !== '-' && gameArray[0] === gameArray[3] && gameArray[0] === gameArray[6] ||
        gameArray[0] !== '-' && gameArray[0] === gameArray[4] && gameArray[0] === gameArray[8]) {
      title.innerHTML = gameArray[0] + ' wins!';
    }
    if (gameArray[1] !== '-' && gameArray[1] === gameArray[4] && gameArray[1] === gameArray[7]) {
      title.innerHTML = gameArray[1] + ' wins!';
    }
    if (gameArray[2] !== '-' && gameArray[2] === gameArray[5] && gameArray[2] === gameArray[8] ||
        gameArray[2] !== '-' && gameArray[2] === gameArray[4] && gameArray[2] === gameArray[6]) {
      title.innerHTML = gameArray[2] + ' wins!';
    }
    if (gameArray[3] !== '-' && gameArray[3] === gameArray[4] && gameArray[3] === gameArray[5]) {
      title.innerHTML = gameArray[3] + ' wins!';
    }
    if (gameArray[6] !== '-' && gameArray[6] === gameArray[7] && gameArray[6] === gameArray[8]) {
      title.innerHTML = gameArray[6] + ' wins!';
    }
  }

  return {gameArray, writeToDOM, determineWinner};
})();

const Player = (function() {

  var currentMarker = 'X';

  const pickCell = function(event) {
    gameboard.gameArray[Number(event.target.id)] = currentMarker;
    gameboard.writeToDOM();
    if (currentMarker === 'O') {
      currentMarker = 'X'
    } else {
      currentMarker = 'O';
    }
  }

  return {pickCell};
})();

gameboard.writeToDOM();

