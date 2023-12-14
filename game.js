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
    let score = 0; 
    let timerVal = 5; 
    let started = false; 

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
        if(timerVal === 1){
            timerVal = 6; 
        }
    }
   
    function startGame(){
        if(started) return;
        else{
            started = true;
            setRandStringNote();
            setInterval(reduceTime, 1000);    
        }

    }
    start.addEventListener('click', startGame); 

    increment.addEventListener('click', function(){
        score+=5; 
        scoreElement.innerHTML = score;
        setRandStringNote();
    });
})

