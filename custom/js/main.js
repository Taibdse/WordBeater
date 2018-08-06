$(() => {
  $('#btnPlayGame').click(startGame);
  $('#wordForm').submit(handleSubmitWord);
  $('#typedWord').bind('paste', e => e.preventDefault());
})

const arrWords = ['zoophily', 'jug', 'disorbed', 'finitism', 'tendentious', 'poculiform', 'pneumatosis', 'quinzhee',
  'balmorality', 'supercalender', 'vulnerary', 'cochlear', 'kilfud-yoking', 'claver', 'gossip', 'admiration',
  'compound', 'positively', 'living', 'possession', 'resembling', 'instrument', 'contractions', 'muscular',
  'astronomy', 'heavens', 'remains', 'archaeological', 'bonification', 'monument', 'sudden', 'soldier',
  'interaction', 'motivation', 'ability', 'hard-working', 'collaboration', 'cooperation'
];

let score = 0;
let currentWord = '';
let timeLeft = 10;
let intervalOfGame = null;

function randomWord() {
  let l = arrWords.length;
  let random = Math.floor(Math.random() * l);
  return arrWords[random];
}

function showAlertGameOver(score) {
  if (score < 10)
    return swal({
      title: "You should practise more!",
      text: `Your score is just ${score}!`,
      icon: "error",
      timer: 5000
    });
  swal({
    title: "Good job!",
    text: `You have scored ${score}!`,
    icon: "success",
    timer: 5000
  });
}

function startGame() {
  if (intervalOfGame) clearInterval(intervalOfGame);
  score = 0;
  timeLeft = 10;
  currentWord = randomWord();
  resetGameInfoOnUI();
  intervalOfGame = setInterval(() => {
    playGame();
  }, 1000);
}

function playGame() {
  timeLeft--
  if (timeLeft < 0) {
    clearInterval(intervalOfGame);
    showAlertGameOver(score);
  } else $('#timeLeft').text(timeLeft);
}

function handleSubmitWord(e) {
  let type = $('#typedWord').val();
  if (type == currentWord) {
    score++;
    timeLeft = 10;
    currentWord = randomWord()
    resetGameInfoOnUI();
    $('#correct').text('correct!!!');
  } else {
    $('#correct').text('Game Over!!!');
    showAlertGameOver(score);
    clearInterval(intervalOfGame);
  }
  e.preventDefault();
}

function resetGameInfoOnUI() {
  $('#typedWord').val('');
  $('#score').text(score);
  $('#timeLeft').text(timeLeft);
  $('#wordRandom').text(currentWord);
}