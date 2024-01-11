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

    let score = 0; 
    let timerVal = 5; 
    let globalClockVal = 60; 
    let started = false; 
    let clearTimer; 
    let clearGlobalTimer;

    function setRandStringNote(){
        let randNoteIndex = Math.floor(Math.random() * (17)); 
        let randStringIndex = Math.floor(Math.random() * (6)); 
        let stringValue = strings[randStringIndex];
        let noteValue = notes[randNoteIndex];
        text.innerHTML = `${noteValue} on the ${stringValue} string`; 
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

    function endGame(){
        setScoreWindow(); 
        clearInterval(clearTimer); //end the local timer 
        //report score to user 
        yourScoreText.innerHTML=`Your Score: ${score}`;
        //give user an option to retry
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
            timerVal = 5; time.innerHTML = timerVal; 
            clearTimer = setInterval(reduceTime, 1000);
        }

    }
   
    function startGame(){
        if(started) return;
        else{
            started = true;
            globalClock.innerHTML = globalClockVal;
            clearGlobalTimer = setInterval(reduceGlobalClock, 1000); 
            setRandStringNote();
           clearTimer = setInterval(reduceTime, 1000);    
        }

    }
    start.addEventListener('click', startGame); 

    increment.addEventListener('click', function(){
        if(started){
            //increment update score in html 
            score+=5; 
            scoreElement.innerHTML = score;
            nextNoteAndResetTime(); 
        }

    });
    incorrect.addEventListener('click', nextNoteAndResetTime); 
})

