import { autoCorrelate } from "./autoCorrelationAlgo.ts";
document.addEventListener('DOMContentLoaded', function () {
    const strings = [1, 2, 3, 4, 5, 6];
    const notes = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'A#', 'C#', 'D#', 'F#', 'G#', 'Ab', 'Bb', 'Db', 'Eb', 'Gb'];
    const fretboard = [[['E', 6, 81, 83], ['A', 5, 109, 111], ['D', 4, 146, 148], ['G', 3, 195, 197], ['B', 2, 246, 248], ['E', 1, 329, 331]], //fret 0
        [['F', 6, 86, 88], ['A#', 5, 116, 118], ['Bb', 5, 116, 118], ['D#', 4, 155, 157], ['Eb', 4, 155, 157], ['G#', 3, 207, 209], ['Ab', 3, 207, 209], ['C', 2, 261, 263], ['F', 1, 348, 350]], //fret 1
        [['F#', 6, 92, 94], ['Gb', 6, 92, 94], ['B', 5, 123, 125], ['E', 4, 164, 166], ['A', 3, 219, 221], ['C#', 2, 277, 279], ['Db', 2, 277, 279], ['F#', 1, 369, 371], ['Gb', 1, 369, 371]], //fret 2
        [['G', 6, 97, 99], ['C', 5, 130, 132], ['F', 4, 174, 176], ['A#', 3, 232, 234], ['Bb', 3, 232, 234], ['D', 2, 293, 295], ['G', 1, 391, 393]], //fret 3
        [['G#', 6, 103, 105], ['Ab', 6, 103, 105], ['C#', 5, 138, 140], ['Db', 5, 138, 140], ['F#', 4, 184, 186], ['Gb', 4, 184, 186], ['B', 3, 246, 248], ['D#', 2, 310, 312], ['Eb', 2, 310, 312], ['G#', 1, 414, 416], ['Ab', 1, 414, 416]], //fret 4
        [['A', 6, 109, 111], ['D', 5, 146, 148], ['G', 4, 195, 197], ['C', 3, 261, 263], ['E', 2, 329, 331], ['A', 1, 439, 441]], //fret 5
        [['A#', 6, 116, 118], ['Bb', 6, 116, 118], ['D#', 5, 155, 157], ['Eb', 5, 155, 157], ['G#', 4, 207, 209], ['Ab', 4, 207, 209], ['C#', 3, 277, 279], ['Db', 3, 277, 279], ['F', 2, 348, 350], ['A#', 1, 465, 467], ['Bb', 1, 465, 467]], //fret 6
        [['B', 6, 123, 125], ['E', 5, 164, 166], ['A', 4, 219, 221], ['D', 3, 293, 295], ['F#', 2, 369, 371], ['Gb', 2, 369, 371], ['B', 1, 493, 495]], //fret 7
        [['C', 6, 130, 132], ['F', 5, 174, 176], ['A#', 4, 232, 234], ['Bb', 4, 232, 234], ['D#', 3, 310, 312], ['Eb', 3, 310, 312], ['G', 2, 391, 393], ['C', 1, 522, 524]], //fret 8
        [['C#', 6, 138, 140], ['Db', 6, 138, 140], ['F#', 5, 184, 186], ['Gb', 5, 184, 186], ['B', 4, 246, 248], ['E', 3, 329, 331], ['Ab', 2, 414, 416], ['G#', 2, 414, 416], ['C#', 1, 553, 555], ['Db', 1, 553, 555]], //fret 9
        [['D', 6, 146, 148], ['G', 5, 195, 197], ['C', 4, 261, 263], ['F', 3, 348, 350], ['A', 2, 439, 441], ['D', 1, 586, 588]], //fret 10
        [['D#', 6, 155, 157], ['Eb', 6, 155, 157], ['G#', 5, 207, 209], ['Ab', 5, 207, 209], ['C#', 4, 277, 279], ['Db', 4, 277, 279], ['F#', 3, 369, 371], ['Gb', 3, 369, 371], ['A#', 2, 465, 467], ['Bb', 2, 465, 467], ['D#', 1, 621, 623], ['Eb', 1, 621, 623]], //fret 11
        [['E', 6, 164, 166], ['A', 5, 219, 221], ['D', 4, 293, 295], ['G', 3, 391, 393], ['B', 2, 493, 495], ['E', 1, 658, 660]] //fret 12
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
    const returnMain = document.getElementById('returnMain');
    const introScreen = document.querySelector('.introScreen');
    const gameScreen = document.querySelector('.gameScreen');
    const gameText = document.getElementById('gameText');
    const setDifficulty = document.getElementById('difficulty');
    const difficultyWindow = document.querySelector('.difficultyWindow');
    const submitButtonDifficulty = document.getElementById('submitButtonDifficulty');
    const freqRangeLow = 2;
    const freqRangeHigh = 3;
    let currentNoteString;
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
    function startAudio() {
        let source;
        let audioContext = new AudioContext();
        let sr = audioContext.sampleRate;
        let analyser = audioContext.createAnalyser();
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then((stream) => {
            source = audioContext.createMediaStreamSource(stream);
            // Connect the source node to the analyzer
            source.connect(analyser);
            function processAudio() {
                const bufferLength = analyser.fftSize;
                const dataArray = new Float32Array(bufferLength);
                analyser.getFloatTimeDomainData(dataArray);
                //dataArray represents audioBuffer
                let freq = autoCorrelate(dataArray, sr);
                //if gameStarted is true and note detected within frequency 
                if (started && (freq <= currentNoteString[freqRangeHigh] && freq >= currentNoteString[freqRangeLow])) {
                    //increment score and go to next
                    score += 5;
                    scoreElement.innerHTML = score;
                    nextNoteAndResetTime();
                }
                requestAnimationFrame(processAudio);
            }
            processAudio();
        });
    }
    function playGame() {
        //hide introScreen
        introScreen.style.display = 'none';
        //turn on gameScreen
        gameScreen.style.display = 'initial';
        difficultyWindow.style.display = 'none';
        startAudio();
    }
    function setRandStringNote() {
        if (startFret > endFret) {
            let temp = startFret;
            startFret = endFret;
            endFret = temp;
        }
        const noteString = pickRandomNoteString(getValuesFromFretboard(fretboard, startFret, endFret));
        currentNoteString = noteString;
        gameText.innerHTML = `${noteString[0]} on the ${noteString[1]} string`;
    }
    function setDifficult() {
        difficultyWindow.style.display = 'initial';
    }
    //takes in 3d array of fretboard and a start and end range, returns a 2d array of possible notes with corresponding strings e.g. [['A', 5], ['B', 2]]
    function getValuesFromFretboard(fretboardArr, start, end) {
        let rangedNotes = [];
        for (let i = start; i <= end; i++) {
            for (let j = 0; j < fretboardArr[i].length; j++) {
                rangedNotes.push(fretboardArr[i][j]);
            }
        }
        return rangedNotes;
    }
    //function takes in a 2d array of notes w strings, picks a random index of 2d array,  and returns an array of size 4 that has ['note name', string, lowfreq, highFreq]
    function pickRandomNoteString(noteStrings) {
        let noteSelectionSize = noteStrings.length;
        const randomNumber = Math.floor(Math.random() * noteSelectionSize);
        return noteStrings[randomNumber];
    }
    function saveDifficultySettings() {
        startFret = Number(document.getElementById("startFret").value); // convert string value to number
        endFret = Number(document.getElementById("endingFret").value);
        difficultyWindow.style.display = 'none';
    }
    function reduceTime() {
        timerVal--;
        time.innerHTML = timerVal;
        if (timerVal === 0) {
            timerVal = 6;
            nextNoteAndResetTime();
        }
    }
    function setScoreWindow() {
        scoreWindow.style.display = 'flex';
    }
    function removeScoreWindow() {
        scoreWindow.style.display = 'none';
    }
    function endGame() {
        setScoreWindow();
        clearInterval(clearTimer); //end the local timer 
        //report score to user 
        yourScoreText.innerHTML = `Your Score: ${score}`;
        //reset local timer
        timerVal = setTimerVal;
        time.innerHTML = timerVal;
    }
    function reduceGlobalClock() {
        globalClockVal--;
        globalClock.innerHTML = globalClockVal;
        if (globalClockVal === 1) {
            clearInterval(clearGlobalTimer);
            endGame();
        }
    }
    function nextNoteAndResetTime() {
        //if game has started 
        if (started) {
            setRandStringNote();
            clearInterval(clearTimer);
            timerVal = setTimerVal;
            time.innerHTML = timerVal;
            clearTimer = setInterval(reduceTime, 1000);
        }
    }
    function startGame() {
        if (started)
            return;
        else {
            started = true;
            score = 0;
            globalClock.innerHTML = globalClockVal;
            setRandStringNote();
            clearGlobalTimer = setInterval(reduceGlobalClock, 1000);
            clearTimer = setInterval(reduceTime, 1000);
        }
    }
    increment.addEventListener('click', function () {
        if (started) {
            //increment update score in html 
            score += 5;
            scoreElement.innerHTML = score;
            nextNoteAndResetTime();
        }
    });
    incorrect.addEventListener('click', nextNoteAndResetTime);
    playAgain.addEventListener('click', () => {
        started = false;
        removeScoreWindow();
        score = 0;
        scoreElement.innerHTML = score;
        globalClockVal = setGlobalClockVal;
        startGame();
    });
    returnMain.addEventListener('click', () => {
        scoreWindow.style.display = 'none';
        gameScreen.style.display = 'none';
        introScreen.style.display = 'initial';
        //all states need to be reset to initial
        started = false;
        //need to reset global timer
        globalClockVal = setGlobalClockVal;
        gameText.innerHTML = '';
        scoreElement.innerHTML = '0';
    });
    start.addEventListener('click', startGame);
    play.addEventListener('click', playGame);
    setDifficulty.addEventListener('click', setDifficult);
    submitButtonDifficulty.addEventListener('click', saveDifficultySettings);
});
