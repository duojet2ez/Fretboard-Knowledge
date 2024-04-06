import { autoCorrelate } from "./autoCorrelationAlgo.js";

document.addEventListener('DOMContentLoaded', function(){
    const strings = [1,2,3,4,5,6];
    const notes = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'A#', 'C#', 'D#', 'F#', 'G#', 'Ab', 'Bb', 'Db', 'Eb', 'Gb'];
    const fretboard = [[['E', 6], ['A', 5], ['D', 4], ['G', 3], ['B', 2], ['E', 1]], //fret 0
    [['F', 6], ['A#', 5], ['Bb', 5], ['D#', 4], ['Eb', 4], ['G#', 3], ['Ab', 3], ['C', 2], ['F', 1]],  //fret 1
    [['F#', 6], ['Gb', 6], ['B', 5], ['E', 4], ['A', 3], ['C#', 2], ['Db', 2], ['F#', 1], ['Gb', 1]],
    [['G', 6], ['C', 5], ['F', 4], ['A#', 3], ['Bb', 3], ['D', 2], ['G', 1]] //fret 3
]; 
    
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
    let endFret = 3; 

    function startAudio(){
        let source;
        let audioContext = new AudioContext();
        let sr = audioContext.sampleRate;
        let analyser = audioContext.createAnalyser();
        navigator.mediaDevices.getUserMedia({audio:true})
        .then((stream) =>{
            source = audioContext.createMediaStreamSource(stream);
            // Connect the source node to the analyzer
            source.connect(analyser);
            function processAudio(){
              const bufferLength = analyser.fftSize;
              const dataArray = new Float32Array(bufferLength);
              analyser.getFloatTimeDomainData(dataArray); 
              //dataArray represents audioBuffer
              let freq = autoCorrelate(dataArray, sr);
              console.log(freq); 
              requestAnimationFrame(processAudio); 
            }
            processAudio();
        });

    }
    function playGame(){
        //hide introScreen
        introScreen.style.display = 'none';
        //turn on gameScreen
        gameScreen.style.display = 'initial';
        startAudio();
    }

    function setRandStringNote(){
        console.log(`start fret: ${startFret}, end fret: ${endFret}`);
        if(startFret > endFret) {let temp = startFret; startFret = endFret; endFret = temp;}
        const noteString = pickRandomNoteString(getValuesFromFretboard(fretboard, startFret, endFret));
        gameText.innerHTML = `${noteString[0]} on the ${noteString[1]} string`; 
    }

    function setDifficult(){
        difficultyWindow.style.display = 'initial';

    }
    
    //takes in 3d array of fretboard and a start and end range, returns a 2d array of possible notes with corresponding strings e.g. [['A', 5], ['B', 2]]
    function getValuesFromFretboard(fretboardArr, start, end){
        let rangedNotes = [];  
        for(let i = start; i <= end; i++){
            for(let j = 0; j < fretboardArr[i].length; j++){
                rangedNotes.push(fretboardArr[i][j]); 
            }
        }
        return rangedNotes;
    }

    //function takes in a 2d array of notes w strings, picks a random index of 2d array,  and returns an array of size 2 that has ['note name', string]
    function pickRandomNoteString(noteStrings){
        let noteSelectionSize = noteStrings.length;
        const randomNumber = Math.floor(Math.random() * noteSelectionSize); 
        return noteStrings[randomNumber]; 
    }



    function saveDifficultySettings(){
         startFret = Number(document.getElementById("startFret").value); // convert string value to number
         endFret = Number(document.getElementById("endingFret").value);
        difficultyWindow.style.display = 'none';
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

    start.addEventListener('click', startGame); 
    play.addEventListener('click', playGame);
    setDifficulty.addEventListener('click', setDifficult);
    submitButtonDifficulty.addEventListener('click', saveDifficultySettings);
})

