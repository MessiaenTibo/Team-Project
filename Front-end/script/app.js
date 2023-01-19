const lanIP = `${window.location.hostname}:5000`; // ip van de webserver
const socketio = io(lanIP);





//#region ***  Navigation ***
const toggleNav = function() {
    let toggleTrigger = document.querySelectorAll(".js-toggle-nav");
    for (let i = 0; i < toggleTrigger.length; i++) {
        toggleTrigger[i].addEventListener("click", function () {
            document.querySelector("body").classList.toggle("has-mobile-nav");
        })
    }
  }

//#endregion





//#region ***  Pages         ***

const HomePage = function(){
    btn1VS1.addEventListener('click', function(){
        console.log("1vs1 clicked");
    });
    btnSimonSays.addEventListener('click', function(){
        console.log("Simon says clicked");
    });
    btnSpeedrun.addEventListener('click', function(){
        console.log("Speedrun clicked");
    });
    btnShuttleRun.addEventListener('click', function(){
        console.log("Shuttle run clicked");
    });
    btnSvg1VS1.addEventListener('click', function(){
        console.log("1vs1 svg clicked");
    });
    btnSvgSimonSays.addEventListener('click', function(){
        console.log("Simon says svg clicked");
    });
    btnSvgSpeedrun.addEventListener('click', function(){
        console.log("Speedrun svg clicked");
    });
    btnSvgShuttleRun.addEventListener('click', function(){
        console.log("Shuttle run svg clicked");
    });
    btnInfo1VS1.addEventListener('click', function(){
        console.log("Info 1vs1 clicked");
        info1VS1.classList.toggle('o-hide-accessible');
        btnSvg1VS1.classList.toggle('o-hide-accessible');
    });
    btnInfoSimonSays.addEventListener('click', function(){
        console.log("Info Simon says clicked");
        infoSimonSays.classList.toggle('o-hide-accessible');
        btnSvgSimonSays.classList.toggle('o-hide-accessible');
    });
    btnInfoSpeedrun.addEventListener('click', function(){
        console.log("Info Speedrun clicked");
        infoSpeedrun.classList.toggle('o-hide-accessible');
        btnSvgSpeedrun.classList.toggle('o-hide-accessible');
    });
    btnInfoShuttleRun.addEventListener('click', function(){
        console.log("Info Shuttle run clicked");
        infoShuttleRun.classList.toggle('o-hide-accessible');
        btnSvgShuttleRun.classList.toggle('o-hide-accessible');
    });
}

OneVSOnePage = function(){
    btnColorSelector1.forEach(element => {
        element.addEventListener('input', function(){
            ColorSelectorSVGPlayer1.forEach(element => {
                element.style.fill = this.value;
            });
        });
    });
    btnColorSelector1.forEach(element => {
        element.addEventListener('change', function(){
            console.log(this.value)
            btnColorSelector1[0].value = this.value;
            btnColorSelector1[1].value = this.value;
            btnColorSelector1[2].value = this.value;
            btnColorSelector1[3].value = this.value;
        });
    });
    btnColorSelector2.forEach(element => {
        element.addEventListener('input', function(){
            ColorSelectorSVGPlayer2.forEach(element => {
                element.style.fill = this.value;
            });
        });
    });
    btnColorSelector2.forEach(element => {
        element.addEventListener('change', function(){
            console.log(this.value)
            btnColorSelector2[0].value = this.value;
            btnColorSelector2[1].value = this.value;
            btnColorSelector2[2].value = this.value;
            btnColorSelector2[3].value = this.value;
        });
    });

    ColorSelectorSVGPlayer1.forEach(element => {
        element.addEventListener('click', function(){
            btnColorSelector1.forEach(element2 => {
                element2.click();
            });
        });
    });
    
    ColorSelectorSVGPlayer2.forEach(element => {
        element.addEventListener('click', function(){
            btnColorSelector2.forEach(element2 => {
                element2.click();
            });
        });
    });
    
    // Setting the same value for all inputs
    inputsUsername1.forEach(element => {
        element.addEventListener('input', function(){
            inputsUsername1.forEach(element2 => {
                element2.value = this.value;
            });
        });
    });

    inputsUsername2.forEach(element => {
        element.addEventListener('input', function(){
            inputsUsername2.forEach(element2 => {
                element2.value = this.value;
            });
        });
    });

    // Setting the same value for all inputs select (dropdown)
    inputsTime.forEach(element => {
        element.addEventListener('change', function(){
            inputsTime.forEach(element2 => {
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
    forms.forEach(form => {
        form.addEventListener("submit", callbackOneVSOne, false);
    });
}



SpeedrunPage = function(){
    btnColorSelector1.forEach(element => {
        element.addEventListener('input', function(){
            ColorSelectorSVGPlayer1.forEach(element => {
                element.style.fill = this.value;
            });
        });
    });
    btnColorSelector1.forEach(element => {
        element.addEventListener('change', function(){
            console.log(this.value)
            btnColorSelector1[0].value = this.value;
            btnColorSelector1[1].value = this.value;
            btnColorSelector1[2].value = this.value;
        });
    });


    ColorSelectorSVGPlayer1.forEach(element => {
        element.addEventListener('click', function(){
            btnColorSelector1.forEach(element2 => {
                element2.click();
            });
        });
    });

    
    // Setting the same value for all inputs
    inputsUsername1.forEach(element => {
        element.addEventListener('input', function(){
            inputsUsername1.forEach(element2 => {
                element2.value = this.value;
            });
        });
    });

    // Setting the same value for all inputs select (dropdown)
    inputDifficulty.forEach(element => {
        element.addEventListener('change', function(){
            inputDifficulty.forEach(element2 => {
                element2.value = this.value;
            });
        });
    });
    inputButtonGoal.forEach(element => {
        element.addEventListener('change', function(){
            inputButtonGoal.forEach(element2 => {
                element2.value = this.value;
            });
        });
    });


    // Callback for the form
    var forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener("submit", callbackSpeedrun, false);
    });
}


LivePage = function(){
    OutputUsernames.innerHTML = `<h3>Loading...</h3>`;
    OutputGameMode.innerHTML = `<h3>Loading...</h3>`;
    OutputScore.innerHTML = `<h3>Loading...</h3>`;
    OutputTime.innerHTML = `<h3>Loading...</h3>`;



        // *** Tests
    //Simulatie live data Speedrun
    
    var jsonDataTestSpeedrun = {
        Username: "Ibe",
        GameMode: "Speedrun",
        ButtonsRemaining: 8,
    }

    LoadSpeedrunData(jsonDataTestSpeedrun);

    //Simulatie live data 1vs1
    var jsonDataTestOneVSOne = {
        Username1: "Ibe",
        Username2: "Lander",
        Score1: 10,
        Score2: 12,
    }
    LoadOneVSOneData(jsonDataTestOneVSOne);




    var xValues = [50,60,70,80,90,100,110,120,130,140,150];
    var yValues = [7,8,8,9,9,9,10,11,14,14,15];

    new Chart("myChart", {
    type: "line",
    data: {
        labels: xValues,
        datasets: [{
        fill: false,
        lineTension: 0,
        backgroundColor: "rgba(0,0,255,1.0)",
        borderColor: "rgba(0,0,255,0.1)",
        data: yValues
        }]
    },
    options: {
        legend: {display: false},
        scales: {
        yAxes: [{ticks: {min: 6, max:16}}],
        }
    }
    });
}

//#endregion





//#region ***  Callbacks                 ***********
callbackOneVSOne = function(event){
    var jsonBody = {
            name1: inputsUsername1[0].value,
            color1:  btnColorSelector1[0].value,
            name2: inputsUsername2[0].value,
            color2: btnColorSelector2[0].value,
            minutes: inputsTime[0].value,
            seconds: 0
        };
    socketio.emit('1vs1', jsonBody);
}

callbackSpeedrun = function(event){
    var jsonBody = {
        name: inputsUsername1[0].value,
        color:  btnColorSelector1[0].value,
        degree: inputDifficulty[0].value,
        buttonGoal: inputButtonGoal[0].value,
    };
    socketio.emit('Speedrun', jsonBody);
}

//#endregion




//#region ***  Favicon  ***********
const checkFavicon = function(){
    if(window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.getElementById('faviconTag').href = "img/favicon–light.ico";
    }
    else
    {
        document.getElementById('faviconTag').href = "img/favicon-dark.ico";
    }
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    checkFavicon();
});

//#endregion




//#region ***  SocketIO - listenToSocket   ***********
const listenToSocket = function(){
    socketio.on("connect", function(){
        console.log("Verbonden met socket webserver");
        socketio.emit("F2B_new_connection")
    });
    socketio.on("B2F_new_data_speedrun", function(jsonData){
        console.log("Verbonden met socket webserver");
        LoadSpeedrunData(jsonData);

    });

};

//#endregion




//#region ***  Loading Live Data   ***********
LoadSpeedrunData = function(jsonDataTest){
    OutputUsernames.innerHTML = `<h3>${jsonDataTest.Username}</h3>`;
    OutputGameMode.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="240" height="240" viewBox="0 0 240 240">
    <defs>
      <clipPath id="clip-card-speedrun">
        <rect width="240" height="240"/>
      </clipPath>
    </defs>
    <g id="card-speedrun" clip-path="url(#clip-card-speedrun)">
      <path id="noun-clock-5078124" d="M166.8,16.793a80,80,0,1,1-56.568,23.432A79.755,79.755,0,0,1,166.8,16.793Zm34,96.227a3.4,3.4,0,1,1-3.458,5.85l-32.27-19.151a3.4,3.4,0,0,1-1.668-2.925l-.008-53.321a3.405,3.405,0,0,1,6.81,0V94.863l30.6,18.156Zm5.5-77.859-2.525,4.373a3.39,3.39,0,1,1-5.878-3.378l2.532-4.388A72.8,72.8,0,0,0,170.2,23.681v5.044a3.405,3.405,0,1,1-6.81,0V23.681a72.775,72.775,0,0,0-30.223,8.086l2.532,4.388a3.39,3.39,0,0,1-5.878,3.378L127.3,35.16A73.593,73.593,0,0,0,105.161,57.3l4.37,2.523a3.39,3.39,0,1,1-3.378,5.878l-4.387-2.532a72.766,72.766,0,0,0-8.086,30.223h5.044a3.405,3.405,0,0,1,0,6.81H93.681a72.775,72.775,0,0,0,8.086,30.223l4.388-2.532a3.39,3.39,0,0,1,3.378,5.878l-4.373,2.525A73.593,73.593,0,0,0,127.3,158.427l2.523-4.37a3.39,3.39,0,1,1,5.878,3.378l-2.532,4.387a72.766,72.766,0,0,0,30.223,8.086v-5.042a3.405,3.405,0,1,1,6.81,0v5.042a72.812,72.812,0,0,0,30.223-8.086l-2.532-4.387a3.39,3.39,0,1,1,5.878-3.378l2.523,4.37a73.593,73.593,0,0,0,22.136-22.135l-4.373-2.525a3.39,3.39,0,0,1,3.378-5.878l4.388,2.532A72.8,72.8,0,0,0,239.9,100.2h-5.043a3.405,3.405,0,0,1,0-6.81H239.9a72.812,72.812,0,0,0-8.086-30.223L227.431,65.7a3.39,3.39,0,0,1-3.378-5.878l4.37-2.523a73.593,73.593,0,0,0-22.135-22.136Z" transform="translate(-46.796 23.207)"/>
    </g>
  </svg>`;
    OutputScore.innerHTML = `<h3>${jsonDataTest.ButtonsRemaining}</h3>`;
    OutputTime.innerHTML = `<h3>00:00:01</h3>`;
    scoreTitle.innerHTML = `<h2>Knoppen</h2>`;
}

LoadOneVSOneData = function(jsonDataTest){
    OutputUsernames.innerHTML = `<h3>${jsonDataTest.Username1}</h3> <h3>VS</h3> <h3>${jsonDataTest.Username2}</h3>`;
    OutputGameMode.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="240" height="240" viewBox="0 0 240 240">
    <defs>
      <clipPath id="clip-Card-1vs1">
        <rect width="240" height="240"/>
      </clipPath>
    </defs>
    <g id="Card-1vs1" clip-path="url(#clip-Card-1vs1)">
      <text id="_1_vs_1" data-name="1 vs 1" transform="translate(15 149)" font-size="80" font-family="SegoeUI-Bold, Segoe UI" font-weight="700"><tspan x="0" y="0">1 vs 1</tspan></text>
    </g>
  </svg>`;
    OutputScore.innerHTML = `<h3>${jsonDataTest.Username1}: ${jsonDataTest.Score1}</h3> <h3>${jsonDataTest.Username2}: ${jsonDataTest.Score2}</h3>`;

}


//#endregion




//#region ***  Event Listeners - UI   ***********
const handleDataUI = function () {
    if(btn1VS1){
        HomePage();
    }
    if(btnStart){
        listenToClickKnopen();
    }
    if(document.URL.includes("Live"))
    {
        console.log("Live");
        LivePage();
    }
    if(document.URL.includes("1vs1"))
    {
        console.log("1vs1");
        OneVSOnePage();
    }
    if(document.URL.includes("Speedrun"))
    {
        console.log("Speedrun");
        SpeedrunPage();
    }
    toggleNav();
};

//#endregion




//#region ***  Init / DOMContentLoaded                  ***********
const init = function () {
    console.log("DOM geladen");

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
    btnSvg1VS1 = document.querySelector('.js-card-gamemode-svg-1vs1')
    btnSvgSimonSays = document.querySelector('.js-card-gamemode-svg-simon-says');
    btnSvgSpeedrun = document.querySelector('.js-card-gamemode-svg-speedrun');
    btnSvgShuttleRun = document.querySelector('.js-card-gamemode-svg-shuttle-run');

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


    /*
    Page: Live
    */
    OutputUsernames = document.querySelector('.js-output-username');
    OutputGameMode = document.querySelector('.js-output-gamemode');
    OutputScore = document.querySelector('.js-output-score');
    OutputTime = document.querySelector('.js-output-time');

    scoreTitle = document.querySelector('.js-output-score__title');

    // *** Handle User Interactions
    handleDataUI();
};

document.addEventListener('DOMContentLoaded', init);

//#endregion