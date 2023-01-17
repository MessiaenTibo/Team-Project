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
            btnColorSelector1[3].value = this.value;
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
        player: {
            name: inputsUsername1[0].value,
            color:  btnColorSelector1[0].value
        },
        difficulty: {
            degree: inputDifficulty[0].value,
        },
        tijd: {
            minutes: inputsTime[0].value,
            seconds: 0
        }
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


//#endregion




//#region ***  Event Listeners - UI   ***********
const handleDataUI = function () {
    if(btn1VS1){
        HomePage();
    }
    if(btnStart){
        listenToClickKnopen();
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
    //test socketio
    socketio.emit('test');


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

    // *** Handle User Interactions
    handleDataUI();
};

document.addEventListener('DOMContentLoaded', init);

//#endregion