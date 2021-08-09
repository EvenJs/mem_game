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
  'aws',
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
  timerDisplay:  document.querySelector('.game-timer__bar'),
  scoreDisplay: document.querySelector('.game-stats__score--value'),
  levelDisplay: document.querySelector('.game-stats__level--value'),
  timerInterval: null,
  startButton: document.querySelector('.game-stats__button'),
  // and much more
  gameBoard: document.querySelector('.game-board'),
  cardFlipNum: 0,
  cardPairNum: 0,
};

setGame();

/*******************************************
/     game process
/******************************************/
function setGame() {
  // register any element in your game object
  let {startButton} = game;

  startButton.addEventListener('click',() =>{
    if (startButton.innerHTML === 'End Game'){
   
      clearInterval(game.timerInterval);
      //handleGameOver();
      GameOver();
      startButton.innerHTML = 'Start Game';
      
      console.log(1,startButton.innerHTML )
   }else if(startButton.innerHTML === 'New Game'){
      startButton.innerHTML = 'End Game';
      updateTimerDisplay();
      firstLevel();
      handleCardFlip();
   }else{
        //updateTimerDisplay();
        startButton.innerHTML = 'End Game';
        startGame();

        console.log(2,startButton.innerHTML )
       // handleCardFlip();
       
     }
  })
}

function startGame() {
  let card = document.querySelectorAll('.card');
  card.forEach(card => {
    card.classList.remove('done');
  });
  const { startButton } = game;
  clearInterval(game.timerInterval);
  //startButton.innerHTML = 'Start Game';
  setGame();
  resetGame();
  firstLevel();
  handleCardFlip();
}

function handleCardFlip() {
  let cards = document.querySelectorAll('.card');
  let fliped = [];
  let {cardFlipNum} = game;
  
  cards.forEach(card=>{
    card.addEventListener('click',()=>{
      if(cardFlipNum === 0 && !card.classList.contains('done')) {
        card.classList.add('card--flipped','done');
        fliped[cardFlipNum] = card;
        console.log(cardFlipNum);
        cardFlipNum = 1;

      }
      if(cardFlipNum ===1 && !card.classList.contains('done')){
        card.classList.add('card--flipped','done');
        fliped[cardFlipNum] = card;
        console.log(cardFlipNum);
        cardFlipNum = 2;
        
        // check two card same or not by data-tech 
        if(fliped[0].dataset.tech === fliped[1].dataset.tech)
        {
          game.cardPairNum +=1;
          updateScore();
          passLevel();
          cardFlipNum = 0;

        }else {
          setTimeout(()=>{ 
            fliped[0].classList.remove('done','card--flipped');
            fliped[1].classList.remove('done','card--flipped');
            cardFlipNum = 0;
          },1500)
        }
      }  
    })
  })
}


function passLevel(){
  if(game.level === 1 && game.cardPairNum === 2){
    setTimeout(()=>{
      secondLevel();
      updateLevel();
      handleCardFlip();
    },1500)
  }else if(game.level ===2 && game.cardPairNum === 8){
    setTimeout(()=>{
      thirdLevel();
      updateLevel();
      handleCardFlip();
    },1500)
  }
  else if(game.level === 3 && game.cardPairNum === 18){
    handleGameOver();
  }
}

function nextLevel() {}

function GameOver() {
  alert('Congratulations, your score is')
  game.level = 1;
  game.score = 0;
  resetGame();
  let card = document.querySelectorAll('.card');
  card.forEach(card => {
    card.classList.add('done');
  });
}

function createCards(className){
  let newCard = document.createElement('div');
  let newCardFront = document.createElement('div');
  let newCardBack = document.createElement('div');

  newCard.classList.add('card',`${className}`);
  newCard.setAttribute('data-tech',`${className}`);
  newCardFront.classList.add('card__face','card__face--front');
  newCardBack.classList.add('card__face','card__face--back');

  newCard.append(newCardFront,newCardBack);
  return newCard;
}

function firstLevel() {
  const {gameBoard} = game;
  gameBoard.style = 'grid-template-columns: repeat(2, 1fr)';
  gameBoard.innerHTML = null;

  for(let i = 0; i < 2; i ++){
  gameBoard.append(createCards(CARD_TECHS[i]))
  }
  createCardCopy();
  shuffle();

}

function secondLevel(){
  const {gameBoard} = game;
  gameBoard.style = 'grid-template-columns: repeat(4, 1fr)';
  gameBoard.innerHTML = null;

  for(let i = 0; i < 8; i ++){
    gameBoard.append(createCards(CARD_TECHS[i]))
    }
  createCardCopy();
  shuffle();
}

function thirdLevel() {
  const {gameBoard} = game;
  gameBoard.style = 'grid-template-columns: repeat(6, 1fr)';
  gameBoard.innerHTML = null;

  for(let i = 0; i < 18; i ++){
    gameBoard.append(createCards(CARD_TECHS[i]))
    }
  
  createCardCopy();
  shuffle();
}

function createCardCopy() {
  const {gameBoard} = game;

  gameBoard.childNodes.forEach(
    card =>{
      cardCopy = card.cloneNode(true);
      gameBoard.append(cardCopy);
    }
  )
}
  
function shuffle(){
  const cards = document.querySelectorAll('.card');
  cards.forEach(card=>{
    let random = Math.floor(Math.random()*10);
    card.style.order = random;
  });
}


/*******************************************
/     UI update
/******************************************/
function updateScore() {
  let{scoreDisplay} = game;
  game.score += 1;
  scoreDisplay.innerHTML = game.score;
}

function updateTimerDisplay() {
  let {timer, timerDisplay,timerInterval} = game;
  let time = timer;
  clearInterval(timerInterval);
  timerInterval = setInterval(function (){
    if(time > 0){
      time -= 1;
      timerDisplay.innerHTML = time;
    }else{
    clearInterval(timerInterval);
    alert('Time out!');
    }
  },1000); 
}

function updateLevel(){
  let {levelDisplay} = game;
  game.level += 1;
  levelDisplay.innerHTML = game.level;
}

function resetGame(){
  game.cardPairNum = 0;
  game.score = 0;
  game.scoreDisplay.innerHTML = game.score;
  game.level = 1;
  game.levelDisplay.innerHTML = game.level;
  game.timerInterval= null;
}

/*******************************************
/     bindings
/******************************************/
function bindStartButton() {}

function unBindCardClick(card) {}

function bindCardClick() {}
