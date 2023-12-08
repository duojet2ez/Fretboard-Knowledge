document.addEventListener('DOMContentLoaded', function(){
    const strings = [1,2,3,4,5,6];
    const notes = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'A#', 'C#', 'D#', 'F#', 'G#', 'Ab', 'Bb', 'Db', 'Eb', 'Gb'];
    const scoreElement = document.getElementById('score');
    const increment = document.getElementById('increment');

    let score = 0; 

    increment.addEventListener('click', function(){
        score+=5; 
        scoreElement.innerHTML = score;
        const stringValue = document.getElementById('num');
        const noteValue = document.getElementById('note'); 
        stringValue.innerHTML = '5';
        noteValue.innerHtml = 'C';

    });
    
})

