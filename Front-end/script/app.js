let gameStarted = false;

const ResetScore = function()
{
    scorePlayer1.innerHTML = 0;
    scorePlayer2.innerHTML = 0;
    scorePlayer3.innerHTML = 0;
    scorePlayer4.innerHTML = 0;
}

const StartTimer = function()
{
    let time = 1000;
    let timer = setInterval(function()
    {
        time -= 10;
        placeHolderTimer.innerHTML = time/100;
        console.log(time/100);
        if(time < 0)
        {
            clearInterval(timer);
            placeHolderTimer.innerHTML = "0";
            console.log("Time is up");
            gameStarted = false;
            btnStart.disabled = false;
        }
    },100);
}


const listenToClickKnopen = function()
{
    btnStart.addEventListener('click', function()
    {
        console.log("Start game");
        gameStarted = true;
        ResetScore();
        StartTimer();
        btnStart.disabled = true;
    });
    btnPlayer1.addEventListener('click',function()
    {
        if(gameStarted)
        {
            console.log("Player 1 clicked");
            scorePlayer1.innerHTML = parseInt(scorePlayer1.innerHTML) + 1;
        }
        else
        {
            console.log("Game not started");
        }
    });
    btnPlayer2.addEventListener('click',function()
    {
        if(gameStarted)
        {
            console.log("Player 2 clicked");
            scorePlayer2.innerHTML = parseInt(scorePlayer2.innerHTML) + 1;
        }
        else
        {
            console.log("Game not started");
        }
    });
    btnPlayer3.addEventListener('click',function()
    {
        if(gameStarted)
        {
            console.log("Player 3 clicked");
            scorePlayer3.innerHTML = parseInt(scorePlayer3.innerHTML) + 1;
        }
        else
        {
            console.log("Game not started");
        }
    });
    btnPlayer4.addEventListener('click',function()
    {
        if(gameStarted)
        {
            console.log("Player 4 clicked");
            scorePlayer4.innerHTML = parseInt(scorePlayer4.innerHTML) + 1;
        }
        else
        {
            console.log("Game not started");
        }
    });
}

const toggleNav = function() {
    let toggleTrigger = document.querySelectorAll(".js-toggle-nav");
    for (let i = 0; i < toggleTrigger.length; i++) {
        toggleTrigger[i].addEventListener("click", function () {
            document.querySelector("body").classList.toggle("has-mobile-nav");
        })
    }
  }

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

const handleDataUI = function () {
    if(btn1VS1){
        HomePage();
    }
    if(btnStart){
        listenToClickKnopen();
    }
    toggleNav();
};

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

    // *** Handle User Interactions
    handleDataUI();
};

document.addEventListener('DOMContentLoaded', init);