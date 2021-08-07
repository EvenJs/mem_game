// css class for different card image
const CARD_TECHS = [
  'html5',
  'css3',
  'js',
  'sass',
  'nodejs',
  'react',
  'linkedin',
  'heroku',
  'github',
  'aws'
];

// only list out some of the properties,
// add more when needed
const game = {
  score: 0,
  level: 1,
  timer: 60,
  timerDisplay: document.querySelector('.game-timer__bar'),
  scoreDisplay: document.querySelector('.game-stats__score--value'),
  levelDisplay: null,
  timerInterval: null,
  startButton: document.querySelector('.game-stats__button'),
  // and much more
};

game.startButton.addEventListener('click',function(){
  if(game.startButton.innerHTML === 'Start Game'){
    game.startButton.innerHTML = 'End Game';
    //
    timer = setInterval(() => {
      game.timer--;
      if(game.timer <= 0){
        clearInterval(timer);
      }
      game.timerDisplay.innerHTML = game.timer;
      
    }, 1000);
    

  }

  else if(game.startButton.innerHTML === 'End Game')
  {
    game.startButton.innerHTML = 'New Game';
  }

  else {
    game.startButton.innerHTML = 'Start Game';
  }
} )




setGame();

/*******************************************
/     game process
/******************************************/

function timer(){

}

function setGame() {
  // register any element in your game object  


}

function startGame() {
  
}

function handleCardFlip() {}

function nextLevel() {}

function handleGameOver() {}

/*******************************************
/     UI update
/******************************************/
function updateScore() {}

function updateTimerDisplay() {}

/*******************************************
/     bindings
/******************************************/
function bindStartButton() {}

function unBindCardClick(card) {}

function bindCardClick() {}
