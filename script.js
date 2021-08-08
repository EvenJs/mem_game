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
  levelDisplay: document.querySelector('.game-stats__level--value'),
  timerInterval: null,
  startButton: document.querySelector('.game-stats__button'),
  // and much more
  gameBoard: document.querySelector('.game-board'),
  cardFlipNum: 0,
  cardPairNum: 0,
  
};



setGame();

//handleCardFlip() 

/*******************************************
/     game process
/******************************************/

function setGame() {
  // register any element in your game object  
 startGame();

}



function startGame() {
  game.startButton.addEventListener('click',function(){
    if(game.startButton.innerHTML === 'Start Game'){
      game.startButton.innerHTML = 'End Game';
     
      firstLevel();
      //secondLevel();
      //handleCardFlip();
      levelPass();
    }

    else if(game.startButton.innerHTML === 'End Game')
    {
      //seperate for game over or timeout
      alert('Congratulations, your score is'+ game.score);
      game.startButton.innerHTML = 'New Game';
    }
  
    else {
      game.startButton.innerHTML = 'Start Game';
    }
  })
}

function createCards(className){
  let newCard = document.createElement('div');
  newCard.classList.add('card',`${className}`);
  newCard.setAttribute('data-tech',`${className}`);
  
  let newCardFront = document.createElement('div');
  newCardFront.classList.add('card__face','card__face--front');
 
  let newCardBack = document.createElement('div');
  newCardBack.classList.add('card__face','card__face--back');
  
  newCard.append(newCardFront,newCardBack);
  return newCard;
}

function firstLevel() {
  const { gameBoard } = game;
  gameBoard.style = 'grid-template-columns: repeat(2, 1fr)' ;
  gameBoard.innerHTML = null;       
  gameBoard.append(
    createCards('css3'),
    createCards('html5'),
  )

  createCardCopy();
  shuffle();
  updateTimerDisplay();
}

function secondLevel(){
  const {gameBoard} = game;
  gameBoard.style = 'grid-template-columns: repeat(4, 1fr)';
  gameBoard.innerHTML = null;
  gameBoard.append(
    createCards('css3'),
    createCards('html5'),
    createCards('js'),
    createCards('sass'),
    createCards('nodejs'),
    createCards('react'),
    createCards('linkedin'),
    createCards('heroku'),
    createCards('github'),
    createCards('aws'),
  )
  createCardCopy();
  shuffle();
  updateTimerDisplay();
}

function thirdLevel(){
  const {gameBoard} = game;
  gameBoard.style = 'grid-template-columns: repeat(6, 1fr);';
  gameBoard.innerHTML = null;
  gameBoard.append(
    createCards('js'),
    createCards('sass'),
    createCards('nodejs'),
    createCards('react'),
    createCards('linkedin'),
    createCards('heroku'),
    createCards('github'),
    createCards('aws'),
  )
  createCardCopy();
  shuffle();
  updateTimerDisplay();

}


function createCardCopy() {
  const { gameBoard } = game;
  gameBoard.childNodes.forEach(
    (card) => {
      cardClone = card.cloneNode(true);
      gameBoard.append(cardClone);
    }
  )
}

function handleCardFlip() {
  let fliped = {};
  let card = document.querySelectorAll('.card');
  
    card.forEach((card)=>{
      card.addEventListener('click', function(){
       
        if(game.cardFlipNum === 0 && !card.classList.contains('done')){
          card.classList.add('card--flipped','done');
          game.cardFlipNum = 1;
          fliped.card1 = card;
          //console.log(game.cardFlipNum);
          //console.log(1,fliped.card1);    
        }else if (game.cardFlipNum === 1 && !card.classList.contains('done')){
          card.classList.add('card--flipped');
          game.cardFlipNum = 2;
          fliped.card2 = card;
          //console.log(game.cardFlipNum);
          //console.log(2, fliped.card1.classList[1]);
          //console.log(3, fliped.card2);
          if(fliped.card1.classList[1] === fliped.card2.classList[1])
          {
            //update spore
            fliped.card1.classList.add('done');
            fliped.card2.classList.add('done');
            updateScore();
            game.cardFlipNum = 0;
            game.cardPairNum += 1;
            console.log(game.cardPairNum);
            nextLevel();
          } else{  
            setTimeout(()=>{
              fliped.card1.classList.remove('card--flipped','done');
              fliped.card2.classList.remove('card--flipped');
              game.cardFlipNum = 0;
            },1000)
            
          }
        }
      })
    })
}

function nextLevel(){
  if(game.level === 1 && game.cardPairNum === 2){
    setTimeout(()=>{
      secondLevel();
      updateLevel();
      handleCardFlip();
      game.timer= 60;
      //updateTimerDisplay();
    },1500)
  }else if(game.level === 2 && game.cardPairNum === 8){
    setTimeout(()=>{
      thirdLevel();
      updateLevel();
      handleCardFlip();
    },1500)
    game.timer = 60;
  }

}

function handleGameOver() {}


function levelPass(){
  if(game.level === 1){
    handleCardFlip();
    if(game.cardPairNum === 2)
    {
      updateLevel();
    }
  }
  if(game.level ===2){
    secondLevel();
  }
  if(game.level ===3){

  }

}

function shuffle(){
  const card = document.querySelectorAll('.card');
  card.forEach(card => {
    let randomPos = Math.floor(Math.random() * 16);
    card.style.order = randomPos;
  });
}

function passGame(){
  alert('Congratulations, your score is'+ game.scoreDisplay)
}

/*******************************************
/     UI update
/******************************************/
function updateScore() {
  game.score += 1;
  game.scoreDisplay.innerHTML = game.score;
}

function updateLevel(){
  game.level += 1;
  game.levelDisplay.innerHTML = game.level;
}

function updateTimerDisplay() {
  //clearInterval(game.timer);
  timer = setInterval(() => {
    game.timer--;
    if(game.timer <= 0){
      clearInterval(timer);
      
      alert('Time out, your score is'+ game.scoreDisplay);
      game.startButton.innerHTML = 'New Game';
    }
    game.timerDisplay.innerHTML = game.timer;
    console.log(game.timer);
  }, 1000);
}

/*******************************************
/     bindings
/******************************************/
function bindStartButton() {}

function unBindCardClick(card) {}

function bindCardClick(){}

