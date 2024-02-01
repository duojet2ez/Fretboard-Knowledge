document.addEventListener('DOMContentLoaded', function(){
    const strings = [1,2,3,4,5,6];
    const notes = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'A#', 'C#', 'D#', 'F#', 'G#', 'Ab', 'Bb', 'Db', 'Eb', 'Gb'];
    const scoreElement = document.getElementById('score');
    const increment = document.getElementById('increment');
    const stringValue = document.getElementById('num');
    const noteValue = document.getElementById('note'); 
    const time = document.getElementById('currTime'); 
    const start = document.getElementById('start');
    const text = document.getElementById('text'); 
    const incorrect = document.getElementById('incorrect'); 
    const globalClock = document.getElementById('global-clock');
    const scoreWindow = document.querySelector('.window');
    const yourScoreText = document.querySelector('.score_text'); 
    const playAgain = document.getElementById('pAgain');
    const play = document.getElementById('play');
    const introScreen = document.querySelector('.introScreen');
    const gameScreen = document.querySelector('.gameScreen');
    const gameText = document.getElementById('gameText');
    const setDifficulty = document.getElementById('difficulty');
    const difficultyWindow = document.querySelector('.difficultyWindow');
    const submitButtonDifficulty = document.getElementById('submitButtonDifficulty');

    let score; 
    const setTimerVal = 5; 
    let timerVal = setTimerVal; 
    const setGlobalClockVal = 60;
    let globalClockVal = setGlobalClockVal; 
    let started = false; 
    let clearTimer; 
    let clearGlobalTimer;
    let startFret = 0;
    let endFret = 12; 


    function playGame(){
        //hide introScreen
        introScreen.style.display = 'none';

        //turn on gameScreen
        gameScreen.style.display = 'initial';
    }

    function setRandStringNote(){
        let randNoteIndex = Math.floor(Math.random() * (17)); 
        let randStringIndex = Math.floor(Math.random() * (6)); 
        let stringValue = strings[randStringIndex];
        let noteValue = notes[randNoteIndex];
        gameText.innerHTML = `${noteValue} on the ${stringValue} string`; 
    }

    function setDifficult(){
        difficultyWindow.style.display = 'initial';

    }
    function saveDifficultySettings(){
         startFret = Number(document.getElementById("startFret").value); // convert string value to number
         endFret = Number(document.getElementById("endingFret").value);
        difficultyWindow.style.display = 'none';
        console.log(typeof startFret);
    }

    function reduceTime(){
        timerVal--; 
        time.innerHTML = timerVal; 
        if(timerVal === 0){
            timerVal = 6; 
            nextNoteAndResetTime();
        }
    }

    function setScoreWindow(){
        scoreWindow.style.display = 'flex';
    }
    function removeScoreWindow(){
        scoreWindow.style.display = 'none';
    }

    function endGame(){
        setScoreWindow(); 
        clearInterval(clearTimer); //end the local timer 
        //report score to user 
        yourScoreText.innerHTML=`Your Score: ${score}`;
        //reset local timer
        timerVal = setTimerVal; time.innerHTML = timerVal; 
    }

    function reduceGlobalClock(){
        globalClockVal--;
        globalClock.innerHTML = globalClockVal;
        if(globalClockVal == 1){
            console.log('end'); 
            clearInterval(clearGlobalTimer);
            endGame();
        }
    }

    function nextNoteAndResetTime(){
        //if game has started 
        if(started){
            setRandStringNote();
            clearInterval(clearTimer); 
            timerVal = setTimerVal; time.innerHTML = timerVal; 
            clearTimer = setInterval(reduceTime, 1000);
        }

    }
   
    function startGame(){
        if(started) return;
        else{
            started = true;
            score = 0;
            globalClock.innerHTML = globalClockVal;

            setRandStringNote();
            clearGlobalTimer = setInterval(reduceGlobalClock, 1000); 
            clearTimer = setInterval(reduceTime, 1000);    
        }
    }

    start.addEventListener('click', startGame); 
    play.addEventListener('click', playGame);
    setDifficulty.addEventListener('click', setDifficult);
    submitButtonDifficulty.addEventListener('click', saveDifficultySettings);


    increment.addEventListener('click', function(){
        if(started){
            //increment update score in html 
            score+=5; 
            scoreElement.innerHTML = score;
            nextNoteAndResetTime(); 
        }
        
    });
    incorrect.addEventListener('click', nextNoteAndResetTime); 
    playAgain.addEventListener('click', () =>{
        started = false; 
        removeScoreWindow(); 
        score = 0; 
        scoreElement.innerHTML = score;
        globalClockVal = setGlobalClockVal;
        startGame();
    });
})

