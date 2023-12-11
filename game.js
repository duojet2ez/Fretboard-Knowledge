document.addEventListener('DOMContentLoaded', function(){
    const strings = [1,2,3,4,5,6];
    const notes = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'A#', 'C#', 'D#', 'F#', 'G#', 'Ab', 'Bb', 'Db', 'Eb', 'Gb'];
    const scoreElement = document.getElementById('score');
    const increment = document.getElementById('increment');
    const stringValue = document.getElementById('num');
    const noteValue = document.getElementById('note'); 
    const time = document.getElementById('currTime'); 
    const start = document.getElementById('start');
    let score = 0; 
    let timerVal = 5; 

    function setRandStringNote(){
        let randNoteIndex = Math.floor(Math.random() * (17)); 
        let randStringIndex = Math.floor(Math.random() * (6)); 
        stringValue.innerHTML = strings[randStringIndex];
        noteValue.innerHTML = notes[randNoteIndex];
    }

    function reduceTime(){
        timerVal--; 
        time.innerHTML = timerVal; 
        if(timerVal === 1){
            timerVal = 6; 
        }
    }

    
   
    function startGame(){
        setRandStringNote();
        setInterval(reduceTime, 1000); 
    }
    start.addEventListener('click', startGame); 

    increment.addEventListener('click', function(){
        score+=5; 
        scoreElement.innerHTML = score;
        setRandStringNote();
    });
    
})

