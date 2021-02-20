var database;
var gameState = 0;
var playerCount, allPlayers;
var form, game, player;
var car1, car2, car3, car4;
var car1IMG, car2IMG, car3IMG, car4IMG, trackIMG;
var cars;
var finishedPlayers, finishedPoint;
var goldIMG, silverIMG, bronzeIMG;

function preload() {
    car1IMG = loadImage("images/car1.png");
    car2IMG = loadImage("images/car2.png");
    car3IMG = loadImage("images/car3.png");
    car4IMG = loadImage("images/car4.png");
    trackIMG = loadImage("images/track.jpg");
    goldIMG = loadImage("images/gold.png");
    silverIMG = loadImage("images/silver.png");
    bronzeIMG = loadImage("images/bronze.png");
}

function setup(){
    createCanvas(displayWidth-24,displayHeight-170);
    database = firebase.database();

    console.log(database);
    game = new Game();
    game.getState();
    game.start();
}

function draw(){
    
   
    if (playerCount === 4){
        game.update(1);
    }
    if (gameState === 1){
        clear();
        game.play();
    }
    if(finishedPlayers === 4){
        gameState = 2;
    }
    if(gameState === 2){
       game.displayRank();
    }
}

