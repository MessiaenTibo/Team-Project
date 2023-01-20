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



SimonSaysPage = function(){
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
        form.addEventListener("submit", callbackSimonSays, false);
    });
}


ShuttleRunPage = function(){
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
        form.addEventListener("submit", callbackShuttleRun, false);
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

    //Simulatie live data simonsays
    var jsonDataTestSimonSays = {
        Username: "Ibe",
        GameMode: "SimonSays",
        Score: 17,
    }
    LoadSimonSaysData(jsonDataTestSimonSays);

    //Simulatie live data Shuttle Run
    var jsonDataTestShuttleRun = {
        Username: "Ibe",
        GameMode: "ShuttleRun",
        Score: 13,
    }
    LoadShuttleRunData(jsonDataTestShuttleRun);


    showChart();
}

//#endregion


showChart = function(){
    console.log("showChart");

    var options = {
        series: [{
          data: [0.000,0.829,1.624,3.681,4.482,5.291,7.102,7.911,8.722,9.131,9.342,10.651,11.962,12.171,12.582,13.391,14.646,15.411,15.822,17.631,17.842]
        }],
        chart: {
          height: document.getElementById("myChart").parentElement.offsetHeight - 8,
          width: document.getElementById("myChart").parentElement.offsetWidth,
          type: 'line',
          zoom: {
            enabled: false
          }
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
            //   categories: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
            categories: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
            tickAmount: 4  // optional tickAmount value
        }
      };
      
      var chart = new ApexCharts(document.querySelector("#myChart"), options);
      chart.render();

}




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

callbackSimonSays = function(event){
    var jsonBody = {
        name: inputsUsername1[0].value,
        color:  btnColorSelector1[0].value,
        degree: inputDifficulty[0].value,
        StartButtons: inputStartButtons[0].value,
    };
    socketio.emit('SimonSays', jsonBody);
}

callbackShuttleRun = function(event){
    var jsonBody = {
        name: inputsUsername1[0].value,
        color:  btnColorSelector1[0].value,
        degree: inputDifficulty[0].value,
    };
    socketio.emit('ShuttleRun', jsonBody);
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
        console.log("speedrun data ontvangen");
        x = JSON.parse(jsonData)
        LoadSpeedrunData(x);
        console.log(x);

    });

};

//#endregion




//#region ***  Loading Live Data   ***********
LoadSpeedrunData = function(jsonDataTest){
    OutputUsernames.innerHTML = `<h3>${jsonDataTest.Username}</h3>`;
    OutputGameMode.innerHTML = `<img class="c-card-gamemode__svg js-card-gamemode-svg-1vs1" src="./img/1VS1.svg" alt="1 tegen 1 afbeelding">`;
    OutputScore.innerHTML = `<h3>${jsonDataTest.ButtonsRemaining}</h3>`;
    OutputTime.innerHTML = `<h3>00:00:01</h3>`;
    scoreTitle.innerHTML = `<h2>Knoppen</h2>`;
}

LoadOneVSOneData = function(jsonDataTest){
    OutputUsernames.innerHTML = `<h3>${jsonDataTest.Username1}</h3> <h3>VS</h3> <h3>${jsonDataTest.Username2}</h3>`;
    OutputGameMode.innerHTML = `<img class="c-card-gamemode__svg js-card-gamemode-svg-speedrun" src="./img/Speedrun.svg" alt="Speedrun afbeelding">`;
    OutputScore.innerHTML = `<h3>${jsonDataTest.Username1}: ${jsonDataTest.Score1}</h3> <h3>${jsonDataTest.Username2}: ${jsonDataTest.Score2}</h3>`;

}

LoadSimonSaysData = function(jsonDataTest){
    OutputUsernames.innerHTML = `<h3>${jsonDataTest.Username}</h3>`;
    OutputGameMode.innerHTML = `<img class="c-card-gamemode__svg js-card-gamemode-svg-simon-says" src="./img/Simon-Says.svg"alt="afbeelding">`;
    OutputScore.innerHTML = `<h3>${jsonDataTest.Score}</h3>`;
    OutputTime.innerHTML = `<h3>00:00:01</h3>`;
    scoreTitle.innerHTML = `<h2>Score</h2>`;
}

LoadShuttleRunData = function(jsonDataTest){
    OutputUsernames.innerHTML = `<h3>${jsonDataTest.Username}</h3>`;
    OutputGameMode.innerHTML = `<img class="c-card-gamemode__svg js-card-gamemode-svg-shuttle-run" src="./img/Shuttle-Run.svg" alt="afbeelding">`;
    OutputScore.innerHTML = `<h3>${jsonDataTest.Score}</h3>`;
    OutputTime.innerHTML = `<h3>00:00:01</h3>`;
    scoreTitle.innerHTML = `<h2>Score</h2>`;
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
    if(document.URL.includes("Simon-Says"))
    {
        console.log("Simon-Says");
        SimonSaysPage();
    }
    if(document.URL.includes("Shuttle-Run"))
    {
        console.log("Shuttle-Run");
        ShuttleRunPage();
    }
    toggleNav();
};

//#endregion




//#region ***  Init / DOMContentLoaded                  ***********
const init = function () {
    console.log("DOM geladen");
    listenToSocket();
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

    // *** Handle User Interactions
    handleDataUI();
};

document.addEventListener('DOMContentLoaded', init);

//#endregion