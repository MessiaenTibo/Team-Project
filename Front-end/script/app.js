const lanIP = `${window.location.hostname}:5000`; // ip van de webserver
const socketio = io(lanIP);

let gamemodeNumber = 3;
let pauseScroll = false;
let countdownTime = '4000';

var stopGame = false;
var TimeLiveGame = '00:00';

var startGameOnce = false;

var date = null;

//**** get_ ****
//1VS1
const get_data_1vs1 = function (time) {
  const url = `http://${lanIP}/api/v1/1vs1/${time}/`;
  handleData(url, LoadScoreBord);
};

const get_data_1vs1_podium = function (time) {
  const url = `http://${lanIP}/api/v1/1vs1/${time}/`;
  handleData(url, LoadScoreBoardPodium1vs1);
};

//speedrun
const get_data_speedrun = function (difficulty, buttons) {
  const url = `http://${lanIP}/api/v1/speedrun/${difficulty}/${buttons}/`;
  handleData(url, LoadScoreBordSpeedrun);
};

const get_data_speedrun_podium = function (difficulty, buttons) {
  const url = `http://${lanIP}/api/v1/speedrun/${difficulty}/${buttons}/`;
  handleData(url, LoadScoreBoardPodiumSpeedrun);
};

//simon says
const get_data_simon_says = function (difficulty, startButtons) {
  const url = `http://${lanIP}/api/v1/simon_says/${difficulty}/${startButtons}/`;
  handleData(url, LoadScoreBord);
};
const get_data_simon_says_podium = function (difficulty, startButtons) {
  const url = `http://${lanIP}/api/v1/simon_says/${difficulty}/${startButtons}/`;
  handleData(url, LoadScoreBoardPodiumSimonSays);
};

//shuttle run
const get_data_shuttle_run = function (difficulty) {
  const url = `http://${lanIP}/api/v1/shuttle_run/${difficulty}/`;
  handleData(url, LoadScoreBord);
};

const get_data_shuttle_run_podium = function (difficulty) {
  const url = `http://${lanIP}/api/v1/shuttle_run/${difficulty}/`;
  handleData(url, LoadScoreBoardPodiumShuttleRun);
};

//#region ***  Navigation ***
const toggleNav = function () {
  let toggleTrigger = document.querySelectorAll('.js-toggle-nav');
  for (let i = 0; i < toggleTrigger.length; i++) {
    toggleTrigger[i].addEventListener('click', function () {
      document.querySelector('body').classList.toggle('has-mobile-nav');
    });
  }
};

//#endregion

//#region ***  Pages         ***
const countdownPage = function () {
  console.log('countdownPage');
  setTimeout(function () {
    window.location.replace(`http://${lanIP}/Front-end/Live.html`);
  }, '4000');
};

const HomePage = function () {
  btn1VS1.addEventListener('click', function () {
    console.log('1vs1 clicked');
  });
  btnSimonSays.addEventListener('click', function () {
    console.log('Simon says clicked');
  });
  btnSpeedrun.addEventListener('click', function () {
    console.log('Speedrun clicked');
  });
  btnShuttleRun.addEventListener('click', function () {
    console.log('Shuttle run clicked');
  });
  btnSvg1VS1.addEventListener('click', function () {
    console.log('1vs1 svg clicked');
  });
  btnSvgSimonSays.addEventListener('click', function () {
    console.log('Simon says svg clicked');
  });
  btnSvgSpeedrun.addEventListener('click', function () {
    console.log('Speedrun svg clicked');
  });
  btnSvgShuttleRun.addEventListener('click', function () {
    console.log('Shuttle run svg clicked');
  });
  btnInfo1VS1.addEventListener('click', function () {
    console.log('Info 1vs1 clicked');
    info1VS1.classList.toggle('o-hide-accessible');
    btnSvg1VS1.classList.toggle('o-hide-accessible');
  });
  btnInfoSimonSays.addEventListener('click', function () {
    console.log('Info Simon says clicked');
    infoSimonSays.classList.toggle('o-hide-accessible');
    btnSvgSimonSays.classList.toggle('o-hide-accessible');
  });
  btnInfoSpeedrun.addEventListener('click', function () {
    console.log('Info Speedrun clicked');
    infoSpeedrun.classList.toggle('o-hide-accessible');
    btnSvgSpeedrun.classList.toggle('o-hide-accessible');
  });
  btnInfoShuttleRun.addEventListener('click', function () {
    console.log('Info Shuttle run clicked');
    infoShuttleRun.classList.toggle('o-hide-accessible');
    btnSvgShuttleRun.classList.toggle('o-hide-accessible');
  });
  btnScoreBordArrowLeft.addEventListener('click', function () {
    console.log('Scoreboard arrow left clicked');
    gamemodeNumber = gamemodeNumber - 1;
    if (gamemodeNumber < 0) {
      gamemodeNumber = 3;
    }
    ScoreBoard();
  });
  btnScoreBordArrowRight.addEventListener('click', function () {
    console.log('Scoreboard arrow right clicked');
    gamemodeNumber = gamemodeNumber + 1;
    if (gamemodeNumber > 3) {
      gamemodeNumber = 0;
    }
    ScoreBoard();
  });
  btnScoreBordPlayButton.addEventListener('click', function () {
    console.log('Scoreboard play button clicked');
    if (pauseScroll == false) {
      pauseScroll = true;
      btnScoreBordPlayButton.src = './img/Play-Icon.svg';
    } else {
      pauseScroll = false;
      btnScoreBordPlayButton.src = './img/Pause-Icon.svg';
    }
  });
  gameSquares.forEach((element) => {
    element.addEventListener('click', function () {
      console.log('Game square clicked');
      if (gameSquares[0] == this) {
        console.log('Game square 1 clicked');
        get_data_1vs1_podium(60);
      } else if (gameSquares[1] == this) {
        console.log('Game square 2 clicked');
        get_data_simon_says_podium(1, 2);
      } else if (gameSquares[2] == this) {
        console.log('Game square 3 clicked');
        get_data_speedrun_podium(1, 5);
      } else if (gameSquares[3] == this) {
        console.log('Game square 4 clicked');
        get_data_shuttle_run_podium(1);
      }
    });
  });
  autoscrollScoreBoard();
};

OneVSOnePage = function () {
  btnColorSelector1.forEach((element) => {
    element.addEventListener('input', function () {
      ColorSelectorSVGPlayer1.forEach((element) => {
        element.style.fill = this.value;
      });
    });
  });
  btnColorSelector1.forEach((element) => {
    element.addEventListener('change', function () {
      console.log(this.value);
      btnColorSelector1[0].value = this.value;
      btnColorSelector1[1].value = this.value;
      btnColorSelector1[2].value = this.value;
      btnColorSelector1[3].value = this.value;
    });
  });
  btnColorSelector2.forEach((element) => {
    element.addEventListener('input', function () {
      ColorSelectorSVGPlayer2.forEach((element) => {
        element.style.fill = this.value;
      });
    });
  });
  btnColorSelector2.forEach((element) => {
    element.addEventListener('change', function () {
      console.log(this.value);
      btnColorSelector2[0].value = this.value;
      btnColorSelector2[1].value = this.value;
      btnColorSelector2[2].value = this.value;
      btnColorSelector2[3].value = this.value;
    });
  });

  ColorSelectorSVGPlayer1.forEach((element) => {
    element.addEventListener('click', function () {
      btnColorSelector1.forEach((element2) => {
        element2.click();
      });
    });
  });

  ColorSelectorSVGPlayer2.forEach((element) => {
    element.addEventListener('click', function () {
      btnColorSelector2.forEach((element2) => {
        element2.click();
      });
    });
  });

  // Setting the same value for all inputs
  inputsUsername1.forEach((element) => {
    element.addEventListener('input', function () {
      inputsUsername1.forEach((element2) => {
        element2.value = this.value;
      });
    });
  });

  inputsUsername2.forEach((element) => {
    element.addEventListener('input', function () {
      inputsUsername2.forEach((element2) => {
        element2.value = this.value;
      });
    });
  });

  // Setting the same value for all inputs select (dropdown)
  inputsTime.forEach((element) => {
    element.addEventListener('change', function () {
      inputsTime.forEach((element2) => {
        element2.value = this.value;
      });
    });
  });

  // var ele = document.getElementById("form1VS1");
  // if(ele.addEventListener){
  //     ele.addEventListener("submit", callback, false);  //Modern browsers
  // }else if(ele.attachEvent){
  //     ele.attachEvent('onsubmit', callback);            //Old IE
  // }

  var forms = document.querySelectorAll('form');
  forms.forEach((form) => {
    form.addEventListener(
      'submit',
      function () {
        callbackOneVSOne();
      },
      false
    );
  });
};

SpeedrunPage = function () {
  btnColorSelector1.forEach((element) => {
    element.addEventListener('input', function () {
      ColorSelectorSVGPlayer1.forEach((element) => {
        element.style.fill = this.value;
      });
    });
  });
  btnColorSelector1.forEach((element) => {
    element.addEventListener('change', function () {
      console.log(this.value);
      btnColorSelector1[0].value = this.value;
      btnColorSelector1[1].value = this.value;
      btnColorSelector1[2].value = this.value;
    });
  });

  ColorSelectorSVGPlayer1.forEach((element) => {
    element.addEventListener('click', function () {
      btnColorSelector1.forEach((element2) => {
        element2.click();
      });
    });
  });

  // Setting the same value for all inputs
  inputsUsername1.forEach((element) => {
    element.addEventListener('input', function () {
      inputsUsername1.forEach((element2) => {
        element2.value = this.value;
      });
    });
  });

  // Setting the same value for all inputs select (dropdown)
  inputDifficulty.forEach((element) => {
    element.addEventListener('change', function () {
      inputDifficulty.forEach((element2) => {
        element2.value = this.value;
      });
    });
  });
  inputButtonGoal.forEach((element) => {
    element.addEventListener('change', function () {
      inputButtonGoal.forEach((element2) => {
        element2.value = this.value;
      });
    });
  });

  // Popup
  btnsPopupDifficulty.forEach((element) => {
    element.addEventListener('click', function () {
      popupDifficulty.forEach((element2) => {
        element2.classList.toggle('show');
      });
    });
  });

  btnsPopupButtonGoal.forEach((element) => {
    element.addEventListener('click', function () {
      popupButtonGoal.forEach((element2) => {
        element2.classList.toggle('show');
      });
    });
  });

  // Callback for the form
  var forms = document.querySelectorAll('form');
  forms.forEach((form) => {
    form.addEventListener(
      'submit',
      function () {
        callbackSpeedrun();
      },
      false
    );
  });
};

SimonSaysPage = function () {
  btnColorSelector1.forEach((element) => {
    element.addEventListener('input', function () {
      ColorSelectorSVGPlayer1.forEach((element) => {
        element.style.fill = this.value;
      });
    });
  });
  btnColorSelector1.forEach((element) => {
    element.addEventListener('change', function () {
      console.log(this.value);
      btnColorSelector1[0].value = this.value;
      btnColorSelector1[1].value = this.value;
      btnColorSelector1[2].value = this.value;
    });
  });

  ColorSelectorSVGPlayer1.forEach((element) => {
    element.addEventListener('click', function () {
      btnColorSelector1.forEach((element2) => {
        element2.click();
      });
    });
  });

  // Setting the same value for all inputs
  inputsUsername1.forEach((element) => {
    element.addEventListener('input', function () {
      inputsUsername1.forEach((element2) => {
        element2.value = this.value;
      });
    });
  });

  // Setting the same value for all inputs select (dropdown)
  inputDifficulty.forEach((element) => {
    element.addEventListener('change', function () {
      inputDifficulty.forEach((element2) => {
        element2.value = this.value;
      });
    });
  });
  inputButtonGoal.forEach((element) => {
    element.addEventListener('change', function () {
      inputButtonGoal.forEach((element2) => {
        element2.value = this.value;
      });
    });
  });

  // Callback for the form
  var forms = document.querySelectorAll('form');
  forms.forEach((form) => {
    form.addEventListener(
      'submit',
      function () {
        callbackSimonSays();
      },
      false
    );
  });
};

ShuttleRunPage = function () {
  btnColorSelector1.forEach((element) => {
    element.addEventListener('input', function () {
      ColorSelectorSVGPlayer1.forEach((element) => {
        element.style.fill = this.value;
      });
    });
  });
  btnColorSelector1.forEach((element) => {
    element.addEventListener('change', function () {
      console.log(this.value);
      btnColorSelector1[0].value = this.value;
      btnColorSelector1[1].value = this.value;
      btnColorSelector1[2].value = this.value;
    });
  });

  ColorSelectorSVGPlayer1.forEach((element) => {
    element.addEventListener('click', function () {
      btnColorSelector1.forEach((element2) => {
        element2.click();
      });
    });
  });

  // Setting the same value for all inputs
  inputsUsername1.forEach((element) => {
    element.addEventListener('input', function () {
      inputsUsername1.forEach((element2) => {
        element2.value = this.value;
      });
    });
  });

  // Setting the same value for all inputs select (dropdown)
  inputDifficulty.forEach((element) => {
    element.addEventListener('change', function () {
      inputDifficulty.forEach((element2) => {
        element2.value = this.value;
      });
    });
  });
  inputButtonGoal.forEach((element) => {
    element.addEventListener('change', function () {
      inputButtonGoal.forEach((element2) => {
        element2.value = this.value;
      });
    });
  });

  // Popup
  btnsPopupDifficulty.forEach((element) => {
    element.addEventListener('click', function () {
      popupDifficulty.forEach((element2) => {
        element2.classList.toggle('show');
      });
    });
  });

  // Callback for the form
  var forms = document.querySelectorAll('form');
  forms.forEach((form) => {
    form.addEventListener(
      'submit',
      function () {
        callbackShuttleRun();
      },
      false
    );
  });
};

LivePage = function () {
  listenToSocket();
  socketio.emit('getLiveGameData');
  OutputUsernames.innerHTML = `<h3>Loading...</h3>`;
  OutputGameMode.innerHTML = `<h3>Loading...</h3>`;
  OutputScore.innerHTML = `<h3>Loading...</h3>`;
  OutputTime.innerHTML = `<h3>Loading...</h3>`;
};

ScoreBordPage = function () {
  btnGameModeSelecter1vs1.addEventListener('click', function () {
    btnGameModeSelecter1vs1.classList.add('active');
    btnGameModeSelecterSimonSays.classList.remove('active');
    btnGameModeSelecterShuttleRun.classList.remove('active');
    btnGameModeSelecterSpeedrun.classList.remove('active');
    options1vs1.classList.remove('o-hide');
    optionsSimonSays.classList.add('o-hide');
    optionsShuttleRun.classList.add('o-hide');
    optionsSpeedrun.classList.add('o-hide');
    get_data_1vs1(document.querySelector('.js-1vs1-time').value * 60);
  });
  btnGameModeSelecterSimonSays.addEventListener('click', function () {
    btnGameModeSelecter1vs1.classList.remove('active');
    btnGameModeSelecterSimonSays.classList.add('active');
    btnGameModeSelecterShuttleRun.classList.remove('active');
    btnGameModeSelecterSpeedrun.classList.remove('active');
    options1vs1.classList.add('o-hide');
    optionsSimonSays.classList.remove('o-hide');
    optionsShuttleRun.classList.add('o-hide');
    optionsSpeedrun.classList.add('o-hide');
    get_data_simon_says(1, 2);
  });
  btnGameModeSelecterShuttleRun.addEventListener('click', function () {
    btnGameModeSelecter1vs1.classList.remove('active');
    btnGameModeSelecterSimonSays.classList.remove('active');
    btnGameModeSelecterShuttleRun.classList.add('active');
    btnGameModeSelecterSpeedrun.classList.remove('active');
    options1vs1.classList.add('o-hide');
    optionsSimonSays.classList.add('o-hide');
    optionsShuttleRun.classList.remove('o-hide');
    optionsSpeedrun.classList.add('o-hide');
    get_data_shuttle_run(1);
  });
  btnGameModeSelecterSpeedrun.addEventListener('click', function () {
    btnGameModeSelecter1vs1.classList.remove('active');
    btnGameModeSelecterSimonSays.classList.remove('active');
    btnGameModeSelecterShuttleRun.classList.remove('active');
    btnGameModeSelecterSpeedrun.classList.add('active');
    options1vs1.classList.add('o-hide');
    optionsSimonSays.classList.add('o-hide');
    optionsShuttleRun.classList.add('o-hide');
    optionsSpeedrun.classList.remove('o-hide');
    get_data_speedrun(1, 5);
  });
  // 1VS1
  document
    .querySelector('.js-1vs1-time')
    .addEventListener('change', function () {
      get_data_1vs1(this.value * 60);
    });
  // Simon Says
  document
    .querySelector('.js-simon-says-difficulty')
    .addEventListener('change', function () {
      get_data_simon_says(
        this.value,
        document.querySelector('.js-simon-says-buttons').value
      );
    });
  document
    .querySelector('.js-simon-says-buttons')
    .addEventListener('change', function () {
      get_data_simon_says(
        document.querySelector('.js-simon-says-difficulty').value,
        this.value
      );
    });
  // Speedrun
  document
    .querySelector('.js-speedrun-difficulty')
    .addEventListener('change', function () {
      get_data_speedrun(
        this.value,
        document.querySelector('.js-speedrun-buttons').value
      );
    });
  document
    .querySelector('.js-speedrun-buttons')
    .addEventListener('change', function () {
      get_data_speedrun(
        document.querySelector('.js-speedrun-difficulty').value,
        this.value
      );
    });
  // Shuttle Run
  document
    .querySelector('.js-shuttle-run-difficulty')
    .addEventListener('change', function () {
      get_data_shuttle_run(this.value);
    });

  document.querySelectorAll('.js-dropdown').forEach((element) => {
    element.addEventListener('change', function () {
      console.log(this.value);
    });
  });
  get_data_1vs1(60);
};

//#endregion

showChart = function () {
  console.log('showChart');

  var options = {
    series: [
      {
        data: [
          0.0,
          0.829,
          1.624,
          3.681,
          4.482,
          5.291,
          7.102,
          7.911,
          8.722,
          9.131,
          9.342,
          10.651,
          11.962,
          12.171,
          12.582,
          13.391,
          14.646,
          15.411,
          15.822,
          17.631,
          17.842,
        ],
      },
    ],
    chart: {
      height: document.getElementById('myChart').parentElement.offsetHeight - 8,
      width: document.getElementById('myChart').parentElement.offsetWidth,
      type: 'line',
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      //   categories: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
      categories: [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
      ],
      tickAmount: 4, // optional tickAmount value
    },
  };

  var chart = new ApexCharts(document.querySelector('#myChart'), options);
  chart.render();
};

//#region ***  Callbacks                 ***********
callbackOneVSOne = function (event) {
  var jsonBody = {
    name1: inputsUsername1[0].value,
    color1: btnColorSelector1[0].value,
    name2: inputsUsername2[0].value,
    color2: btnColorSelector2[0].value,
    minutes: inputsTime[0].value,
    seconds: 0,
  };
  socketio.emit('1vs1', jsonBody);
};

callbackSpeedrun = function (event) {
  var jsonBody = {
    name1: inputsUsername1[0].value,
    color1: btnColorSelector1[0].value,
    degree: inputDifficulty[0].value,
    buttonGoal: inputButtonGoal[0].value,
  };
  socketio.emit('Speedrun', jsonBody);
};

callbackSimonSays = function (event) {
  var jsonBody = {
    name1: inputsUsername1[0].value,
    color1: btnColorSelector1[0].value,
    degree: inputDifficulty[0].value,
    StartButtons: inputStartButtons[0].value,
  };
  socketio.emit('SimonSays', jsonBody);
};

callbackShuttleRun = function (event) {
  var jsonBody = {
    name1: inputsUsername1[0].value,
    color1: btnColorSelector1[0].value,
    degree: inputDifficulty[0].value,
  };
  socketio.emit('ShuttleRun', jsonBody);
};

//#endregion

//#region ***  Favicon  ***********
const checkFavicon = function () {
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.getElementById('faviconTag').href = 'img/favicon-light.ico';
  } else {
    document.getElementById('faviconTag').href = 'img/favicon-dark.ico';
  }
};

window
  .matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', (e) => {
    checkFavicon();
  });

//#endregion

//#region ***  SocketIO - listenToSocket   ***********
const listenToSocket = function () {
  socketio.on('connect', function () {
    console.log('Verbonden met socket webserver');
    socketio.emit('F2B_new_connection');
  });
  socketio.on('B2F_new_data_speedrun', function (jsonData) {
    console.log('speedrun data ontvangen');
    x = JSON.parse(jsonData);
    LoadSpeedrunData(x);
    console.log(x);
  });
  socketio.on('B2F_new_data_1vs1', function (jsonData) {
    console.log('1vs1 data ontvangen');
    x = JSON.parse(jsonData);
    LoadOneVSOneData(x);
    console.log(x);
  });
  socketio.on('B2F_new_data_shuttle_run', function (jsonData) {
    console.log('Shuttle run data ontvangen');
    x = JSON.parse(jsonData);
    LoadShuttleRunData(x);
    console.log(x);
  });
  socketio.on('B2F_new_data_simon_says', function (jsonData) {
    console.log('Simon says data ontvangen');
    x = JSON.parse(jsonData);
    LoadSimonSaysData(x);
    console.log(x);
  });
  socketio.on('knop_aan', function (jsonBody) {
    console.log('knop aan');
    console.log(jsonBody);
    knopAan(jsonBody);
  });
  socketio.on('Start', function (unix_timestamp) {
    console.log('Start');
    stopGame = false;
    var date2 = new Date(unix_timestamp * 1000);
    date = date2;
    console.log(date);

    if (startGameOnce == false) {
      StartGame(date);
      startGameOnce = true;
    }
  });
  socketio.on('Reload', function (jsonBody) {
    console.log('Reload');
    console.log(jsonBody);
    x = JSON.parse(jsonBody);
    console.log(x);
    if (x.GameMode == 'Speedrun') {
      LoadSpeedrunData(x);
    }
    if (x.GameMode == 'OnevsOne') {
      console.log('OnevsOne');
      LoadOneVSOneData(x);
    }
    if (x.GameMode == 'ShuttleRun') {
      LoadShuttleRunData(x);
    }
    if (x.GameMode == 'SimonSays') {
      LoadSimonSaysData(x);
    }
    //Time
    time = new Date(x.Tijd * 1000);
    var minutes = '0' + time.getMinutes();
    var seconds = '0' + time.getSeconds();
    TimeLiveGame = `${minutes.substr(-2)}:${seconds.substr(-2)}`;
    OutputTime.innerHTML = `<h3>${TimeLiveGame}</h3>`;
  });
  socketio.on('Stop', function () {
    console.log('Stop');
    if (scoreTitle.innerHTML == `<h2>Knoppen</h2>`) {
      OutputScore.innerHTML = `<h3>0</h3>`;
    }
    StopGame();
    gameOver.style.display = 'block';
    setTimeout(function () {
      gameOver.style.display = 'none';
    }, 4000);
  });
};

//#endregion

//#region ***  Loading Data   ***********
LoadSpeedrunData = function (jsonDataTest) {
  OutputUsernames.innerHTML = `<h3>${jsonDataTest.Username}</h3>`;
  OutputGameMode.innerHTML = `<img class="c-card-gamemode__svg js-card-gamemode-svg-speedrun" src="./img/Speedrun.svg" alt="speedrun afbeelding">`;
  OutputScore.innerHTML = `<h3>${jsonDataTest.ButtonsRemaining}</h3>`;
  OutputTime.innerHTML = `<h3>${TimeLiveGame}</h3>`;
  scoreTitle.innerHTML = `<h2>Knoppen</h2>`;
  playersTitle.innerHTML = `<h2>Speler</h2>`;
};

LoadOneVSOneData = function (jsonDataTest) {
  OutputUsernames.innerHTML = `<h3>${jsonDataTest.Username1}</h3> <h3>VS</h3> <h3>${jsonDataTest.Username2}</h3>`;
  OutputGameMode.innerHTML = `<img class="c-card-gamemode__svg js-card-gamemode-svg-1vs1" src="./img/1VS1.svg" alt="1 tegen 1 afbeelding">`;
  OutputScore.innerHTML = `<h3>${jsonDataTest.Username1}: ${jsonDataTest.Score1}</h3> <h3>${jsonDataTest.Username2}: ${jsonDataTest.Score2}</h3>`;
  OutputTime.innerHTML = `<h3>${TimeLiveGame}</h3>`;
  playersTitle.innerHTML = `<h2>Spelers</h2>`;
};

LoadSimonSaysData = function (jsonDataTest) {
  OutputUsernames.innerHTML = `<h3>${jsonDataTest.Username}</h3>`;
  OutputGameMode.innerHTML = `<img class="c-card-gamemode__svg js-card-gamemode-svg-simon-says" src="./img/Simon-Says.svg"alt="afbeelding">`;
  OutputScore.innerHTML = `<h3>${jsonDataTest.Score}</h3>`;
  OutputTime.innerHTML = `<h3>${TimeLiveGame}</h3>`;
  scoreTitle.innerHTML = `<h2>Score</h2>`;
  playersTitle.innerHTML = `<h2>Speler</h2>`;
};

LoadShuttleRunData = function (jsonDataTest) {
  OutputUsernames.innerHTML = `<h3>${jsonDataTest.Username}</h3>`;
  OutputGameMode.innerHTML = `<img class="c-card-gamemode__svg js-card-gamemode-svg-shuttle-run" src="./img/Shuttle-Run.svg" alt="afbeelding">`;
  OutputScore.innerHTML = `<h3>${jsonDataTest.Score}</h3>`;
  OutputTime.innerHTML = `<h3>${TimeLiveGame}</h3>`;
  scoreTitle.innerHTML = `<h2>Score</h2>`;
  playersTitle.innerHTML = `<h2>Speler</h2>`;
};

LoadScoreBoardPodium1vs1 = function (players) {
  scoreBordTitle.innerHTML = `Scorebord <u>1VS1</u>`;
  scoreBordFirstPlace.innerHTML = 'Leeg';
  scoreBordSecondPlace.innerHTML = 'Leeg';
  scoreBordThirdPlace.innerHTML = 'Leeg';
  if (players[0] != undefined) {
    scoreBordFirstPlace.innerHTML = `${players[0].winnaar}`;
  }
  if (players[1] != undefined) {
    scoreBordSecondPlace.innerHTML = `${players[1].winnaar}`;
  }
  if (players[2] != undefined) {
    scoreBordThirdPlace.innerHTML = `${players[2].winnaar}`;
  }

  gamemodeNumber = 0;

  gameSquares.forEach(function (square) {
    square.classList.remove('selected');
  });
  gameSquares[gamemodeNumber].classList.add('selected');
};

LoadScoreBoardPodiumSimonSays = function (players) {
  scoreBordTitle.innerHTML = `Scorebord <u>Simon Says</u>`;
  scoreBordFirstPlace.innerHTML = 'Leeg';
  scoreBordSecondPlace.innerHTML = 'Leeg';
  scoreBordThirdPlace.innerHTML = 'Leeg';
  if (players[0] != undefined) {
    scoreBordFirstPlace.innerHTML = `${players[0].winnaar}`;
  }
  if (players[1] != undefined) {
    scoreBordSecondPlace.innerHTML = `${players[1].winnaar}`;
  }
  if (players[2] != undefined) {
    scoreBordThirdPlace.innerHTML = `${players[2].winnaar}`;
  }

  gamemodeNumber = 1;

  gameSquares.forEach(function (square) {
    square.classList.remove('selected');
  });
  gameSquares[gamemodeNumber].classList.add('selected');
};

LoadScoreBoardPodiumSpeedrun = function (players) {
  scoreBordTitle.innerHTML = `Scorebord <u>Speedrun</u>`;
  scoreBordFirstPlace.innerHTML = 'Leeg';
  scoreBordSecondPlace.innerHTML = 'Leeg';
  scoreBordThirdPlace.innerHTML = 'Leeg';
  if (players[0] != undefined) {
    scoreBordFirstPlace.innerHTML = `${players[0].winnaar}`;
  }
  if (players[1] != undefined) {
    scoreBordSecondPlace.innerHTML = `${players[1].winnaar}`;
  }
  if (players[2] != undefined) {
    scoreBordThirdPlace.innerHTML = `${players[2].winnaar}`;
  }

  gamemodeNumber = 2;

  gameSquares.forEach(function (square) {
    square.classList.remove('selected');
  });
  gameSquares[gamemodeNumber].classList.add('selected');
};

LoadScoreBoardPodiumShuttleRun = function (players) {
  scoreBordTitle.innerHTML = `Scorebord <u>Shuttle Run</u>`;
  scoreBordFirstPlace.innerHTML = 'Leeg';
  scoreBordSecondPlace.innerHTML = 'Leeg';
  scoreBordThirdPlace.innerHTML = 'Leeg';
  if (players[0] != undefined) {
    scoreBordFirstPlace.innerHTML = `${players[0].winnaar}`;
  }
  if (players[1] != undefined) {
    scoreBordSecondPlace.innerHTML = `${players[1].winnaar}`;
  }
  if (players[2] != undefined) {
    scoreBordThirdPlace.innerHTML = `${players[2].winnaar}`;
  }

  gamemodeNumber = 3;

  gameSquares.forEach(function (square) {
    square.classList.remove('selected');
  });
  gameSquares[gamemodeNumber].classList.add('selected');
};

LoadScoreBord = function (players) {
  console.log(players);
  // First place
  placeHolderScoreBordPlayers.innerHTML = '';
  if (players.length > 0) {
    placeHolderScoreBordPlayers.innerHTML = `<div class="c-player c-first-player">
        <div class="c-player-number">
            <img src="./img/first-place-icon.svg" alt="eerste plaats">
        </div>
        <div class="c-player-name">
            <h3>${players[0].winnaar}</h3>
        </div>
        <div class="c-player-score">
            <h3>${players[0].score}</h3>
        </div>
    </div>`;
  }
  // Second place
  if (players.length > 1) {
    placeHolderScoreBordPlayers.innerHTML += `<div class="c-player c-second-player">
        <div class="c-player-number">
            <img src="./img/second-place-icon.svg" alt="eerste plaats">
        </div>
        <div class="c-player-name">
            <h3>${players[1].winnaar}</h3>
        </div>
        <div class="c-player-score">
            <h3>${players[1].score}</h3>
        </div>
    </div>`;
  }
  // Third place
  if (players.length > 2) {
    placeHolderScoreBordPlayers.innerHTML += `<div class="c-player c-third-player">
        <div class="c-player-number">
            <img src="./img/third-place-icon.svg" alt="eerste plaats">
        </div>
        <div class="c-player-name">
            <h3>${players[2].winnaar}</h3>
        </div>
        <div class="c-player-score">
            <h3>${players[2].score}</h3>
        </div>
    </div>`;
  }
  // Other places
  var place = 1;
  players.forEach((player) => {
    if (place > 3) {
      placeHolderScoreBordPlayers.innerHTML += `<div class="c-player">
            <div class="c-player-number">
                <h3>${place}</h3>
            </div>
            <div class="c-player-name">
                <h3>${player.winnaar}</h3>
            </div>
            <div class="c-player-score">
                <h3>${player.score}</h3>
            </div>`;
    }
    place++;
  });
  while (place <= 10) {
    placeHolderScoreBordPlayers.innerHTML += `<div class="c-player">
        <div class="c-player-number">
            <h3>${place}</h3>
        </div>
        <div class="c-player-name">
            <h3>Leeg</h3>
        </div>
        <div class="c-player-score">
            <h3></h3>
        </div>`;
    place++;
  }
};

LoadScoreBordSpeedrun = function (players) {
  console.log(players);
  // First place
  placeHolderScoreBordPlayers.innerHTML = '';
  if (players.length > 0) {
    var seconds = players[0].score;
    // convert seconds to minutes and seconds
    var minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;
    // add leading zero if seconds less than 10
    seconds = seconds < 10 ? '0' + seconds : seconds;
    // add leading zero if minutes less than 1
    minutes = minutes < 1 ? '0' + minutes : minutes;
    players[0].score = minutes + ':' + seconds;

    placeHolderScoreBordPlayers.innerHTML = `<div class="c-player c-first-player">
            <div class="c-player-number">
                <img src="./img/first-place-icon.svg" alt="eerste plaats">
            </div>
            <div class="c-player-name">
                <h3>${players[0].winnaar}</h3>
            </div>
            <div class="c-player-score">
                <h3>${players[0].score}</h3>
            </div>
        </div>`;
  }
  // Second place
  if (players.length > 1) {
    var seconds = players[1].score;
    // convert seconds to minutes and seconds
    var minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;
    // add leading zero if seconds less than 10
    seconds = seconds < 10 ? '0' + seconds : seconds;
    // add leading zero if minutes less than 1
    minutes = minutes < 1 ? '0' + minutes : minutes;
    players[1].score = minutes + ':' + seconds;

    placeHolderScoreBordPlayers.innerHTML += `<div class="c-player c-second-player">
            <div class="c-player-number">
                <img src="./img/second-place-icon.svg" alt="eerste plaats">
            </div>
            <div class="c-player-name">
                <h3>${players[1].winnaar}</h3>
            </div>
            <div class="c-player-score">
                <h3>${players[1].score}</h3>
            </div>
        </div>`;
  }
  // Third place
  if (players.length > 2) {
    var seconds = players[2].score;
    // convert seconds to minutes and seconds
    var minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;
    // add leading zero if seconds less than 10
    seconds = seconds < 10 ? '0' + seconds : seconds;
    // add leading zero if minutes less than 1
    minutes = minutes < 1 ? '0' + minutes : minutes;
    players[2].score = minutes + ':' + seconds;

    placeHolderScoreBordPlayers.innerHTML += `<div class="c-player c-third-player">
            <div class="c-player-number">
                <img src="./img/third-place-icon.svg" alt="eerste plaats">
            </div>
            <div class="c-player-name">
                <h3>${players[2].winnaar}</h3>
            </div>
            <div class="c-player-score">
                <h3>${players[2].score}</h3>
            </div>
        </div>`;
  }
  // Other places
  var place = 1;
  players.forEach((player) => {
    var seconds = player.score;
    // convert seconds to minutes and seconds
    var minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;
    // add leading zero if seconds less than 10
    seconds = seconds < 10 ? '0' + seconds : seconds;
    // add leading zero if minutes less than 1
    minutes = minutes < 1 ? '0' + minutes : minutes;
    player.score = minutes + ':' + seconds;

    if (place > 3) {
      placeHolderScoreBordPlayers.innerHTML += `<div class="c-player">
            <div class="c-player-number">
                <h3>${place}</h3>
            </div>
            <div class="c-player-name">
                <h3>${player.winnaar}</h3>
            </div>
            <div class="c-player-score">
                <h3>${player.score}</h3>
            </div>`;
    }
    place++;
  });
  while (place <= 10) {
    placeHolderScoreBordPlayers.innerHTML += `<div class="c-player">
        <div class="c-player-number">
            <h3>${place}</h3>
        </div>
        <div class="c-player-name">
            <h3>Leeg</h3>
        </div>
        <div class="c-player-score">
            <h3></h3>
        </div>`;
    place++;
  }
};

//#endregion

//#region ***  get  ***********
GetScoreBordPodium1vs1 = function () {
  jsonBody = {
    firstplace: 'Tibo',
    secondplace: 'Tjörven',
    thirdplace: 'Lander',
  };
  LoadScoreBoardPodium1vs1(jsonBody);
};

GetScoreBordPodiumSimonSays = function () {
  jsonBody = {
    firstplace: 'Ibe',
    secondplace: 'Doran',
    thirdplace: 'Capser',
  };
  LoadScoreBoardPodiumSimonSays(jsonBody);
};

GetScoreBordPodiumSpeedrun = function () {
  jsonBody = {
    firstplace: 'Niels',
    secondplace: 'Eric',
    thirdplace: 'Steve',
  };
  LoadScoreBoardPodiumSpeedrun(jsonBody);
};

GetScoreBordPodiumShuttleRun = function () {
  jsonBody = {
    firstplace: 'Lander',
    secondplace: 'Tibo',
    thirdplace: 'Tjörven',
  };
  LoadScoreBoardPodiumShuttleRun(jsonBody);
};

//#endregion

//#region ***  methods  ***********
ScoreBoard = function () {
  switch (gamemodeNumber) {
    case 0:
      get_data_1vs1_podium(60);
      break;
    case 1:
      get_data_simon_says_podium(1, 2);
      break;
    case 2:
      get_data_speedrun_podium(1, 5);
      break;
    case 3:
      get_data_shuttle_run_podium(1);
      break;
    default:
      break;
  }
};

autoscrollScoreBoard = function () {
  if (pauseScroll == false) {
    gamemodeNumber++;
    if (gamemodeNumber > 3) {
      gamemodeNumber = 0;
    }
    ScoreBoard();
  }
  setTimeout(autoscrollScoreBoard, 2000);
};

StartGame = function () {
  var liveTime = setInterval(() => {
    if (stopGame == true) {
      // clearInterval(liveTime);
    } else {
      time = new Date(Date.now() - date);
      // Minutes part from the timestamp
      var minutes = '0' + time.getMinutes();
      // Seconds part from the timestamp
      var seconds = '0' + time.getSeconds();
      TimeLiveGame = `${minutes.substr(-2)}:${seconds.substr(-2)}`;
      OutputTime.innerHTML = `<h3>${TimeLiveGame}</h3>`;
    }
  }, 200);
};

StopGame = function () {
  stopGame = true;
};

knopAan = function (jsonBody) {
  Paal1.src = './img/Paal.png';
  Paal1.style.opacity = '0.7';
  Paal2.src = './img/Paal.png';
  Paal2.style.opacity = '0.7';
  Paal3.src = './img/Paal.png';
  Paal3.style.opacity = '0.7';
  Paal4.src = './img/Paal.png';
  Paal4.style.opacity = '0.7';
  Paal5.src = './img/Paal.png';
  Paal5.style.opacity = '0.7';
  Paal6.src = './img/Paal.png';
  Paal6.style.opacity = '0.7';
  switch (jsonBody.knop1) {
    case 1:
      Paal1.src = './img/Paal-light.png';
      Paal1.style.opacity = '1';
      break;
    case 2:
      Paal2.src = './img/Paal-light.png';
      Paal2.style.opacity = '1';
      break;
    case 3:
      Paal3.src = './img/Paal-light.png';
      Paal3.style.opacity = '1';
      break;
    case 4:
      Paal4.src = './img/Paal-light.png';
      Paal4.style.opacity = '1';
      break;
    case 5:
      Paal5.src = './img/Paal-light.png';
      Paal5.style.opacity = '1';
      break;
    case 6:
      Paal6.src = './img/Paal-light.png';
      Paal6.style.opacity = '1';
      break;
  }
  switch (jsonBody.knop2) {
    case 1:
      Paal1.src = './img/Paal-light.png';
      Paal1.style.opacity = '1';
      break;
    case 2:
      Paal2.src = './img/Paal-light.png';
      Paal2.style.opacity = '1';
      break;
    case 3:
      Paal3.src = './img/Paal-light.png';
      Paal3.style.opacity = '1';
      break;
    case 4:
      Paal4.src = './img/Paal-light.png';
      Paal4.style.opacity = '1';
      break;
    case 5:
      Paal5.src = './img/Paal-light.png';
      Paal5.style.opacity = '1';
      break;
    case 6:
      Paal6.src = './img/Paal-light.png';
      Paal6.style.opacity = '1';
      break;
  }
};

//#endregion

//#region ***  Event Listeners - UI   ***********
const handleDataUI = function () {
  if (btn1VS1) {
    HomePage();
  }
  if (btnStart) {
    listenToClickKnopen();
  }
  if (document.URL.includes('Live')) {
    console.log('Live');
    LivePage();
  }
  if (document.URL.includes('1vs1')) {
    console.log('1vs1');
    OneVSOnePage();
  }
  if (document.URL.includes('Speedrun')) {
    console.log('Speedrun');
    SpeedrunPage();
  }
  if (document.URL.includes('Simon-Says')) {
    console.log('Simon-Says');
    SimonSaysPage();
  }
  if (document.URL.includes('Shuttle-Run')) {
    console.log('Shuttle-Run');
    ShuttleRunPage();
  }
  if (document.URL.includes('ScoreBord')) {
    console.log('ScoreBord');
    ScoreBordPage();
  }
  if (document.URL.includes('countdown')) {
    console.log('CountdownPage');
    countdownPage();
  }
  toggleNav();
};

//#endregion

//#region ***  Init / DOMContentLoaded                  ***********
const init = function () {
  console.log('DOM geladen');
  // Check localstorage
  let hardwareWarning = localStorage.getItem('hardwareWarning');
  if (!hardwareWarning) {
    setTimeout(() => {
      // Alert
      alert(
        'This website works together with hardware.\nIf this is not connected there is no live information/ scoreboard'
      );
    }, 1000);
    localStorage.setItem('hardwareWarning', true);
  }

  // Favicon
  checkFavicon();

  /*
    Page: Home
    */
  //Gamemode buttons
  btn1VS1 = document.querySelector('.js-btn-1vs1');
  btnSimonSays = document.querySelector('.js-btn-simon-says');
  btnSpeedrun = document.querySelector('.js-btn-speedrun');
  btnShuttleRun = document.querySelector('.js-btn-shuttle-run');

  //Gamemode svg buttons
  btnSvg1VS1 = document.querySelector('.js-card-gamemode-svg-1vs1');
  btnSvgSimonSays = document.querySelector('.js-card-gamemode-svg-simon-says');
  btnSvgSpeedrun = document.querySelector('.js-card-gamemode-svg-speedrun');
  btnSvgShuttleRun = document.querySelector(
    '.js-card-gamemode-svg-shuttle-run'
  );

  //Gamemode Info buttons
  btnInfo1VS1 = document.querySelector('.js-btn-info-1vs1');
  btnInfoSimonSays = document.querySelector('.js-btn-info-simon-says');
  btnInfoSpeedrun = document.querySelector('.js-btn-info-speedrun');
  btnInfoShuttleRun = document.querySelector('.js-btn-info-shuttle-run');

  //Gamemode Info
  info1VS1 = document.querySelector('.js-card-gamemode-info-1vs1');
  infoSimonSays = document.querySelector('.js-card-gamemode-info-simon-says');
  infoSpeedrun = document.querySelector('.js-card-gamemode-info-speedrun');
  infoShuttleRun = document.querySelector('.js-card-gamemode-info-shuttle-run');

  //Score bord
  scoreBordTitle = document.querySelector('.js-score-bord-title');
  scoreBordFirstPlace = document.querySelector('.js-throphy-gold__name');
  scoreBordSecondPlace = document.querySelector('.js-throphy-silver__name');
  scoreBordThirdPlace = document.querySelector('.js-throphy-bronze__name');
  gameSquares = document.querySelectorAll('.js-game-square');
  btnScoreBordArrowLeft = document.querySelector('.js-score-bord-arrow-left');
  btnScoreBordArrowRight = document.querySelector('.js-score-bord-arrow-right');
  btnScoreBordPlayButton = document.querySelector('.js-score-bord-play-btn');

  /*
    Page: Game
    */

  btnStart = document.querySelector('.js-btn-start');
  btnPlayer1 = document.querySelector('.js-btn-player1');
  btnPlayer2 = document.querySelector('.js-btn-player2');
  btnPlayer3 = document.querySelector('.js-btn-player3');
  btnPlayer4 = document.querySelector('.js-btn-player4');
  scorePlayer1 = document.querySelector('.js-score-player1');
  scorePlayer2 = document.querySelector('.js-score-player2');
  scorePlayer3 = document.querySelector('.js-score-player3');
  scorePlayer4 = document.querySelector('.js-score-player4');
  placeHolderTimer = document.querySelector('.js-timer');

  /*
    Page: 1VS1
    */
  btnColorSelector1 = document.querySelectorAll('.js-btn-color-selector1');
  btnColorSelector2 = document.querySelectorAll('.js-btn-color-selector2');
  ColorSelectorSVGPlayer1 = document.querySelectorAll('.c-player-1__svg');
  ColorSelectorSVGPlayer2 = document.querySelectorAll('.c-player-2__svg');

  inputsUsername1 = document.querySelectorAll('.js-player-1-input');
  inputsUsername2 = document.querySelectorAll('.js-player-2-input');

  inputsTime = document.querySelectorAll('.js-time-input');

  /*
    Page: Speedrun
    */
  inputDifficulty = document.querySelectorAll('.js-difficulty-input');
  inputButtonGoal = document.querySelectorAll('.js-button-goal-input');
  btnsPopupDifficulty = document.querySelectorAll('.js-btn-popup-difficulty');
  popupDifficulty = document.querySelectorAll('.js-popup-difficulty');
  btnsPopupButtonGoal = document.querySelectorAll('.js-btn-popup-button-goal');
  popupButtonGoal = document.querySelectorAll('.js-popup-button-goal');

  /*
    Page: Simon Says
    */
  inputStartButtons = document.querySelectorAll('.js-start-buttons-input');

  /*
    Page: Shuttle Run
    */

  /*
    Page: Live
    */
  OutputUsernames = document.querySelector('.js-output-username');
  OutputGameMode = document.querySelector('.js-output-gamemode');
  OutputScore = document.querySelector('.js-output-score');
  OutputTime = document.querySelector('.js-output-time');
  scoreTitle = document.querySelector('.js-output-score__title');
  playersTitle = document.querySelector('.js-output-players__title');
  gameOver = document.querySelector('.js-game-over');

  //palen
  Paal1 = document.querySelector('.js-knop-1');
  Paal2 = document.querySelector('.js-knop-2');
  Paal3 = document.querySelector('.js-knop-3');
  Paal4 = document.querySelector('.js-knop-4');
  Paal5 = document.querySelector('.js-knop-5');
  Paal6 = document.querySelector('.js-knop-6');

  /*
    Page: ScoreBord
    */
  btnGameModeSelecter1vs1 = document.querySelector(
    '.js-btn-gamemode-selecter-1vs1'
  );
  btnGameModeSelecterSimonSays = document.querySelector(
    '.js-btn-gamemode-selecter-simon-says'
  );
  btnGameModeSelecterSpeedrun = document.querySelector(
    '.js-btn-gamemode-selecter-speedrun'
  );
  btnGameModeSelecterShuttleRun = document.querySelector(
    '.js-btn-gamemode-selecter-shuttle-run'
  );
  options1vs1 = document.querySelector('.js-options-1vs1');
  optionsSimonSays = document.querySelector('.js-options-simon-says');
  optionsSpeedrun = document.querySelector('.js-options-speedrun');
  optionsShuttleRun = document.querySelector('.js-options-shuttle-run');
  placeHolderScoreBordPlayers = document.querySelector('.js-grid-players');

  // *** Handle User Interactions
  handleDataUI();
};

document.addEventListener('DOMContentLoaded', init);

//#endregion
