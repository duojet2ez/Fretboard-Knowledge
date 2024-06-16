import { autoCorrelate } from "./autoCorrelationAlgo.js";

document.addEventListener('DOMContentLoaded', function(){
    const strings: number[] = [1,2,3,4,5,6];
    const notes: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'A#', 'C#', 'D#', 'F#', 'G#', 'Ab', 'Bb', 'Db', 'Eb', 'Gb'];
    type FretboardNotes = [string, number, number, number]
    const fretboard: FretboardNotes[][] = [[['E', 6, 81, 83], ['A', 5, 109, 111], ['D', 4, 146, 148], ['G', 3, 195, 197], ['B', 2, 246, 248], ['E', 1, 329, 331]], //fret 0
    [['F', 6, 86, 88], ['A#', 5, 116, 118], ['Bb', 5, 116, 118], ['D#', 4, 155, 157], ['Eb', 4, 155, 157], ['G#', 3, 207, 209], ['Ab', 3, 207, 209], ['C', 2, 261, 263], ['F', 1, 348, 350]],  //fret 1
    [['F#', 6, 92, 94], ['Gb', 6, 92, 94], ['B', 5, 123, 125], ['E', 4, 164, 166], ['A', 3, 219, 221], ['C#', 2, 277, 279], ['Db', 2, 277, 279], ['F#', 1, 369, 371], ['Gb', 1, 369, 371]], //fret 2
    [['G', 6, 97, 99], ['C', 5, 130, 132], ['F', 4, 174, 176], ['A#', 3, 232, 234], ['Bb', 3, 232, 234], ['D', 2, 293, 295], ['G', 1, 391, 393]], //fret 3
    [['G#', 6, 103, 105], ['Ab', 6, 103, 105], ['C#', 5, 138, 140], ['Db', 5, 138, 140], ['F#', 4, 184, 186], ['Gb', 4, 184, 186], ['B', 3, 246, 248], ['D#', 2, 310, 312], ['Eb', 2, 310, 312], ['G#', 1, 414, 416], ['Ab', 1, 414, 416]], //fret 4
    [['A', 6, 109, 111], ['D', 5, 146, 148], ['G', 4, 195, 197], ['C', 3, 261, 263], ['E', 2, 329, 331], ['A', 1, 439, 441]], //fret 5
    [['A#', 6, 116, 118], ['Bb', 6, 116, 118], ['D#', 5, 155, 157], ['Eb', 5, 155, 157], ['G#', 4, 207, 209], ['Ab', 4, 207, 209], ['C#', 3, 277, 279], ['Db', 3, 277, 279], ['F', 2, 348, 350], ['A#', 1, 465, 467], ['Bb', 1, 465, 467]], //fret 6
    [['B', 6, 123, 125], ['E', 5, 164, 166], ['A', 4, 219, 221], ['D', 3, 293, 295], ['F#', 2, 369, 371], ['Gb', 2, 369, 371], ['B', 1, 493, 495]], //fret 7
    [['C', 6, 130, 132], ['F', 5, 174, 176], ['A#', 4, 232, 234], ['Bb', 4, 232, 234], ['D#', 3, 310, 312], ['Eb', 3, 310, 312], ['G', 2, 391, 393], ['C', 1, 522, 524]],  //fret 8
    [['C#', 6, 138, 140], ['Db', 6, 138, 140], ['F#', 5, 184, 186], ['Gb', 5, 184, 186], ['B', 4, 246, 248], ['E', 3, 329, 331], ['Ab', 2, 414, 416], ['G#', 2, 414, 416], ['C#', 1, 553, 555], ['Db', 1, 553, 555]], //fret 9
    [['D', 6, 146, 148], ['G', 5, 195, 197], ['C', 4, 261, 263], ['F', 3, 348, 350], ['A', 2, 439, 441], ['D', 1, 586, 588]], //fret 10
    [['D#', 6, 155, 157], ['Eb', 6, 155, 157], ['G#', 5, 207, 209], ['Ab', 5, 207, 209], ['C#', 4, 277, 279], ['Db', 4, 277, 279], ['F#', 3, 369, 371], ['Gb', 3, 369, 371], ['A#', 2, 465, 467], ['Bb', 2, 465, 467], ['D#', 1, 621, 623], ['Eb', 1, 621, 623]], //fret 11
    [['E', 6, 164, 166], ['A', 5, 219, 221], ['D', 4, 293, 295], ['G', 3, 391, 393], ['B', 2, 493, 495], ['E', 1, 658, 660]]  //fret 12
]; 
    
    const scoreElement: HTMLElement | null = document.getElementById('score');
    const scoreText: HTMLElement | null = document.getElementById('scoreText');
    const increment: HTMLElement | null = document.getElementById('increment');
    const stringValue: HTMLElement | null = document.getElementById('num');
    const noteValue: HTMLElement | null = document.getElementById('note'); 
    const time: HTMLElement | null = document.getElementById('currTime'); 
    const start: HTMLElement | null = document.getElementById('start');
    const text: HTMLElement | null = document.getElementById('text'); 
    const globalClock: HTMLElement | null = document.getElementById('global-clock');
    const scoreWindow: HTMLElement | null = document.querySelector('.window');
    const submissionWindow: HTMLElement | null = document.querySelector('.submissionWindow');
    const submissionWindowScoreText: HTMLElement | null = document.querySelector('.submissionWindow_score_text');
    const yourScoreText: HTMLElement | null = document.querySelector('.score_text'); 
    const playAgain: HTMLElement | null = document.getElementById('pAgain');
    const play: HTMLElement | null = document.getElementById('play');
    const returnMain: HTMLElement | null = document.getElementById('returnMain');
    const introScreen: HTMLElement | null = document.querySelector('.introScreen');
    const gameScreen: HTMLElement | null = document.querySelector('.gameScreen');
    const gameText: HTMLElement | null = document.getElementById('gameText');
    const setDifficulty: HTMLElement | null = document.getElementById('difficulty');
    const difficultyWindow: HTMLElement | null = document.querySelector('.difficultyWindow');
    const submitButtonDifficulty: HTMLElement | null = document.getElementById('submitButtonDifficulty');
    const competitiveMode: HTMLElement | null = document.getElementById('competitive_mode');
    const practiceMode: HTMLElement | null = document.getElementById('practice_mode');
    const settings: HTMLElement | null = document.getElementById('settings'); 
    const timePerNote: number = Number((document.getElementById('timePerNote') as HTMLInputElement | null)?.value) || 0;
    const timePerNoteInput = document.getElementById('timePerNote') as HTMLInputElement | null;
    const timePerGameInput = document.getElementById('timePerGame') as HTMLInputElement | null;
    const disableTimer: HTMLElement | null = document.getElementById("disableTimer"); 
    const disablePitchDetection: HTMLElement | null = document.getElementById("disablePitchDetection"); 
    const localTimeClockToDisable: HTMLElement | null = document.getElementById('localTimeClock');
    const globalTimerToDisable: HTMLElement | null = document.getElementById('disableGameTimer');
    const removeScoreSetting: HTMLElement | null = document.getElementById('removeScore');
    const submitLeaderB1: HTMLElement | null = document.getElementById('submit_leader');
    const submitLeaderB2: HTMLElement | null = document.getElementById('submit_leaderboard_b2');
    const userName: HTMLElement | null = document.getElementById('name');



    let isPitchDetectionEnabled: boolean = true;
    const freqRangeLow: number = 2;
    const freqRangeHigh: number = 3; 
    let currentNoteString: [string, number, number, number]; 
    let score: number; 
    let setTimerVal: number = timePerNote;
    let timerVal: number = setTimerVal; 
    let setGlobalClockVal: number = 3;
    let globalClockVal = setGlobalClockVal; 
    let started: boolean = false; 
    let clearTimer: NodeJS.Timeout; 
    let clearGlobalTimer: NodeJS.Timeout;
    let startFret: number = 0;
    let endFret: number = 12; 
    let wasNoteTimerDisabled: boolean = false; 
    let wasGlobalTimerDisabled: boolean = false; 


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
              if(isPitchDetectionEnabled){
                //if gameStarted is true and note detected within frequency 
                if(started && typeof currentNoteString[freqRangeHigh] === 'number' && typeof currentNoteString[freqRangeLow] === 'number' && (freq <= currentNoteString[freqRangeHigh] && freq >= currentNoteString[freqRangeLow])){
                    //increment score and go to next
                    score+=5; 
                    if(scoreElement !== null)scoreElement.innerHTML = `${score}`;
                    nextNoteAndResetTime();  
              }
              }
              requestAnimationFrame(processAudio); 
            }
            processAudio();
        });
    }

    function playGame(){
        //hide introScreen
        if(introScreen !== null) introScreen.style.display = 'none';
        //turn on gameScreen
        if(gameScreen !== null) gameScreen.style.display = 'initial';
        if(difficultyWindow !== null) difficultyWindow.style.display = 'none';
        startAudio();
    }

    function setRandStringNote(){
        if(startFret > endFret) {let temp = startFret; startFret = endFret; endFret = temp;}
        const noteString: [string, number, number, number] = pickRandomNoteString(getValuesFromFretboard(fretboard, startFret, endFret));
        currentNoteString = noteString; 
        if(gameText !== null) gameText.innerHTML = `${noteString[0]} on the ${noteString[1]} string`; 
    }

    function setDifficult(){
        if(difficultyWindow !== null) difficultyWindow.style.display = 'initial';
    }

    function setSettings(){
        if(difficultyWindow !== null) difficultyWindow.style.display = 'initial';
    }
    
    //takes in 3d array of fretboard and a start and end range, returns a 2d array of possible notes with corresponding strings e.g. [['A', 5], ['B', 2]]
    function getValuesFromFretboard(fretboardArr, start, end){
        type arrType = [string, number, number, number]; 
        let rangedNotes: arrType[] = [];  
        for(let i = start; i <= end; i++){
            for(let j = 0; j < fretboardArr[i].length; j++){
                rangedNotes.push(fretboardArr[i][j]); 
            }
        }
        return rangedNotes;
    }

    //function takes in a 2d array of notes w strings, picks a random index of 2d array,  and returns an array of size 4 that has ['note name', string, lowfreq, highFreq]
    function pickRandomNoteString(noteStrings){
        let noteSelectionSize = noteStrings.length;
        const randomNumber = Math.floor(Math.random() * noteSelectionSize); 
        return noteStrings[randomNumber]; 
    }


    function saveDifficultySettings(){
        const startFretInput = document.getElementById("startFret") as HTMLInputElement | null; 
        const endFretInput = document.getElementById("endingFret") as HTMLInputElement | null; 
         // Number(startFretInput.value); // convert string value to number
         if(startFretInput){startFret = Number(startFretInput.value)}
         if(endFretInput){endFret = Number(endFretInput.value);}
        if(difficultyWindow !== null) difficultyWindow.style.display = 'none';
    }

    function reduceTime(){
        if(time !== null){
            if(!wasNoteTimerDisabled){
                timerVal--; 
                time.innerHTML = timerVal.toString(); 
                if(timerVal === 0){
                    timerVal = 6; 
                    nextNoteAndResetTime();
                }
            }
        }
    }

    function setScoreWindow(){
        if(scoreWindow !== null) scoreWindow.style.display = 'flex';
    }
    function removeScoreWindow(){
        if(scoreWindow !== null) scoreWindow.style.display = 'none';
    }

    function endGame(){
        setScoreWindow(); 
        clearInterval(clearTimer); //end the local timer 
        //report score to user 
        if(yourScoreText !== null) yourScoreText.innerHTML=`Your Score: ${score}`;
        //reset local timer
        timerVal = setTimerVal; 
        if(time !== null) time.innerHTML = timerVal.toString(); 
    }

    function reduceGlobalClock(){
        if(!wasGlobalTimerDisabled){
            globalClockVal--;
            if(globalClock !== null) globalClock.innerHTML = globalClockVal.toString();
            if(globalClockVal === 1){
                clearInterval(clearGlobalTimer);
                endGame();
            }
        }
    }

    function nextNoteAndResetTime(){
        //if game has started 
        if(started){
            setRandStringNote();
            clearInterval(clearTimer); 
            timerVal = setTimerVal; 
            if(time !== null) time.innerHTML = timerVal.toString(); 
            clearTimer = setInterval(reduceTime, 1000);
        }
    }
   
    function startGame(){
        if(started) return;
        else{
            started = true;
            score = 0;
            if(globalClock !== null) globalClock.innerHTML = globalClockVal.toString();
            setRandStringNote();
            clearGlobalTimer = setInterval(reduceGlobalClock, 1000); 
            clearTimer = setInterval(reduceTime, 1000);   
        }
    }

    function enterPracticeMode(){
        playGame();
    }

    function enterCompetitiveMode(){
        if(settings != null) settings.style.display = 'none';
        playGame();
    }

    function timePerNoteSetting(){
        setTimerVal = Number(timePerNoteInput?.value) || 0; 
        if(time != null) {time.innerHTML = setTimerVal.toString(); timerVal = setTimerVal;} 
    }

    function timePerGameSetting(){
        setGlobalClockVal = Number(timePerGameInput?.value) || 0; 
        if(globalClock != null) {globalClock.innerHTML = setGlobalClockVal.toString(); globalClockVal = setGlobalClockVal;}

    }
    function disableNoteTimerSetting(e){
        if(e.target.value === "yes"){
            if(localTimeClockToDisable != null){
                wasNoteTimerDisabled = true;
                localTimeClockToDisable.style.display = 'none'; 
            }
        } 
        else{
            if(localTimeClockToDisable != null){
                wasNoteTimerDisabled = false;
                localTimeClockToDisable.style.display = 'initial'; 
            }
        }
    }

    function disableGlobalTimerSetting(e){
        if(e.target.value === "yes"){
            if(globalClock != null){
                globalClock.style.display = 'none';
                wasGlobalTimerDisabled = true;
            }
        } 
        else{
            if(globalClock != null){
                globalClock.style.display = 'initial'; 
                wasGlobalTimerDisabled = false;
            }
        }

    }
    function removeScore(e){
        if(e.target.value === "yes"){
            if(scoreElement != null && scoreText != null){
                scoreElement.style.display = 'none';
                scoreText.style.display = 'none';
            }
        } 
        else{
            if(scoreElement != null && scoreText != null){
                scoreElement.style.display = 'initial'; 
                scoreText.style.display = 'initial';
            }
        }

    }

    function disablePitchDetectionSetting(e){
        if(e.target.value === "yes"){
            if(disablePitchDetection != null && increment != null){
                increment.style.display = 'inline-block'; 
                isPitchDetectionEnabled = false;
            }
        } 
        else{
            if(disablePitchDetection != null && increment != null){
                increment.style.display = 'none';
                isPitchDetectionEnabled = true;
            }
        }
    }

    function submitToLeaderboardB1(){
        removeScoreWindow(); 
        if(submissionWindow !== null) submissionWindow.style.display = 'flex';
        if(submissionWindowScoreText !== null) submissionWindowScoreText.innerHTML=`Your Score: ${score}`;
    }

    async function submitToLeaderboardB2(){
        let name: string = "";
        if(userName instanceof HTMLInputElement) name = userName.value;
        const obj = {
            userName: name,
            userScore: score
        };
        try{
            const response = await fetch('http://localhost:3000/leaderboard', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj)
            });
            if(response.ok){
                console.log('Data sent successfully'); 
            }
            else console.error('Error sending data:', response.statusText);
        }catch(error){
            console.error('Error sending data:', error);
        }
    }

    increment?.addEventListener('click', function(){
        if(started){
            //increment update score in html 
            score+=5; 
            if(scoreElement !== null) scoreElement.innerHTML = score.toString();
            nextNoteAndResetTime(); 
        }
        
    });

    playAgain?.addEventListener('click', () => {
        started = false;
        removeScoreWindow();
        score = 0;
        if(scoreElement !== null){scoreElement.innerHTML = score.toString();}
        globalClockVal = setGlobalClockVal;
        startGame();
      }); 


    returnMain?.addEventListener('click', () =>{
        if(scoreWindow!== null) scoreWindow.style.display = 'none';
        if(gameScreen !== null) gameScreen.style.display = 'none';
        if(introScreen !== null) introScreen.style.display = 'initial';
        //all states need to be reset to initial
        started = false; 
        //need to reset global timer
        globalClockVal = setGlobalClockVal;
        if(gameText !== null) gameText.innerHTML = '';
        scoreElement!.innerHTML = '0';
    });


    //interaction events buttons
    start?.addEventListener('click', startGame); 
    play?.addEventListener('click', playGame);
    setDifficulty?.addEventListener('click', setDifficult);
    settings?.addEventListener('click', setSettings);
    submitButtonDifficulty?.addEventListener('click', saveDifficultySettings);
    competitiveMode?.addEventListener('click', enterCompetitiveMode);
    practiceMode?.addEventListener('click', enterPracticeMode);
    submitLeaderB1?.addEventListener('click', submitToLeaderboardB1); 
    submitLeaderB2?.addEventListener('click', submitToLeaderboardB2); 

    
    //settings
    timePerNoteInput?.addEventListener('input', timePerNoteSetting);  //detects a change in value and calls timerPerNoteSetting for every change 
    timePerGameInput?.addEventListener('input', timePerGameSetting); 
    disableTimer?.addEventListener('change', disableNoteTimerSetting); 
    globalTimerToDisable?.addEventListener('change', disableGlobalTimerSetting); 
    removeScoreSetting?.addEventListener('change', removeScore); 
    disablePitchDetection?.addEventListener('change', disablePitchDetectionSetting); 
})

