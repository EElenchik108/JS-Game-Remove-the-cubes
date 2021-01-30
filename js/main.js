let field = document.getElementById('playArea');
let partition = document.getElementById('partition');		
let heightField = field.getBoundingClientRect().height;
let widthField = field.getBoundingClientRect().width;
let yField = field.getBoundingClientRect().y;
let xField = field.getBoundingClientRect().x;
let colorArray = ["#8080ff", "#DC143C", "#ffff3c", "#37ff37", "#ff8040", "#0000a6", "#00f9f9", "#FF69B4", "#9122ff", "#408080", "#FF1493", "#c10061", "#4aa5ff",  "#ff55ff", "#00d5d5",  "#0082bf", "#FA8072", "#C71585", "#DB7093", "#FF4500", "#DDA0DD", "#DA70D6", "#FF00FF", "#BA55D3", "#8A2BE2", "#800080", "#4B0082", "#6A5ACD", "#483D8B", "#BC8F8F", "#00FF7F", "#3CB371", "#006400", "#66CDAA", "#20B2AA", "#008080", "#7FFFD4", "#1E90FF", "#0000FF", "#191970"];
let score = 0;
let timeGame = 60;
let int;
let amount = document.querySelector('#amount>span');
let clock = document.querySelector('#clock>span');
let btnStart = document.getElementById('start');
let btnPause = document.getElementById('pause');
let btnAnew = document.getElementById('anew');
let modalScore = document.getElementById('modalScore');
let userScore = document.querySelector('input[name="userScore"]'); 
let userName = document.querySelector('input[name="userName"]'); 
let usersArray = [];
let butUser = document.getElementById('butUser');
let close = document.querySelector(".btn-close");
let rating = document.getElementById('rating');		
let tbody = document.querySelector('tbody');
partition.style.zIndex = -1;

let startGame = ()=>{
    score = 0;
    removeCube();
    partition.style.zIndex = -1;	
    clearInterval(int);	
    score!==0?score:score=0;
    timeGame==0?timeGame=60:timeGame;		
    amount.innerHTML = score;
      clock.innerHTML = timeGame;
    int = setInterval(cubeAppearance, 500);			
}; 

function removeCube(){
    clearInterval(int);
    let cubs = document.querySelectorAll('div.cube');
    for (i=0; i<cubs.length; i++){
        cubs[i].remove();
    }
}

function stopGame(){
    document.querySelector('.btn-modal').click();
    modalScore.innerHTML = score;
    userScore.value = score;			
    removeCube();							
    score = 0;
};		

function pauseGame(){
    clearInterval(int);			
    partition.style.zIndex = 5;							
};

function restartGame(){			
    removeCube();
    score = 0;
    timeGame = 60;
    startGame();
};			

btnStart.addEventListener ('click', startGame);
btnPause.addEventListener ('click', pauseGame);
btnAnew.addEventListener ('click', restartGame);		

let cubeAppearance = function(){
    timeGame--;
    clock.innerHTML = timeGame;
    if(timeGame==0)	stopGame();		
    let quantity = Math.floor(Math.random() * 3);
    for (i=0; i<quantity; i++){
        let cube =  document.createElement('div');
        cube.style.background = colorArray[Math.floor(Math.random() * colorArray.length)];
        cube.classList = 'cube';
        field.prepend(cube);
        cube.style.left = Math.floor(xField+Math.random()*(widthField-100))+'px';
        cube.style.top = Math.floor(yField+Math.random()*(heightField-100))+'px';				

        cube.addEventListener('mouseover', clickCube);
        function clickCube(){
            cube.addEventListener('click', ()=>{
                score+=10;
                amount.innerHTML = score;					
                cube.remove();
            });					
        }												
    }		
}

butUser.addEventListener('click', (e)=>{	
    e.preventDefault();
    console.log(userScore.value);
    console.log(userName.value);
    let array = new Map();			
    array.set(htmlEntities(userName.value), userScore.value);
    usersArray.push(array); 			
    close.click();
                                                    
    array.forEach(function(value,key) {
        tbody.innerHTML += '<tr><td>'+(usersArray.length)+'</td><td>'+key+'</td><td>'+value+'</td></tr>';
    });	
});		

amount.innerHTML = score;
clock.innerHTML = timeGame;

function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
};