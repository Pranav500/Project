//The making of the sprites
var rocket, rocketImg;
var space, spaceImg;
var meteorImg, meteor, ObstacleGroup;
var barrier1, barrier2;
var star, starImg, starGroup;
var UFO, UFOImg;
var gameOver, restart, gameOverImg, restartImg;
var gameState = "play";
var score = 0;

function preload(){
    //loading images
    rocketImg = loadImage("Cool rocket.png");
    spaceImg = loadImage("Space.jpg");
    meteorImg = loadImage("meteor.png");
    starImg = loadImage("star.png");
    UFOImg = loadImage("UFO.png");
}

function setup() {
    createCanvas(800,700);

    //space sprite
    space = createSprite(200,200,20,20)
    space.addImage("space", spaceImg);
    space.scale = 2.5;

    //rocket sprite
    rocket = createSprite(400,600,20,20)
    rocket.addImage("rocket", rocketImg);
    rocket.scale = 0.4;

    //invible barriers
    barrier1 = createSprite(0,350,5,700);
    barrier2 = createSprite(800,350,5,700);

    //groups
    obstacleGroup = new Group();
    starGroup = new Group();
}

function draw() {
    //background
    background("black");
    if (gameState === "play"){

        //movement of space and score
        score += Math.round (frameCount/200)
        space.velocityY = 5;

        //rocketship movement
        if (space.y > 400){
            space.y = space.height/2;
        }

        if (keyDown("left")){
            rocket.x -= 8;
        }
        if (keyDown("right")){
            rocket.x += 8;
        }

        //the end of the game
        if (rocket.isTouching(obstacleGroup)){
            gameState = "end";
            obstacleGroup.destroyEach();
        }

        //starbonus 
        if (rocket.isTouching(starGroup)){
            score += 200;
            starGroup.destroyEach();
        }

        //bariier functionality
        rocket.collide(barrier1);
        rocket.collide(barrier2);

        //UFObouncing
        obstacleGroup.bounceOff(barrier1);
        obstacleGroup.bounceOff(barrier2);

        //making barriers invisible
        barrier1.visible = false;
        barrier2.visible = false;

        //calling the functions
        spawnMeteors();
        spawnStars();
        spawnUFO();

        if (score >= 2000){
        spawnUFO2();
        }
    }
    else if (gameState === "end"){
        //making sprites invisible
        rocket.visible = false;
        space.visible = false;

        //game over and restart
        textSize(50);
        text("GAME OVER", 250,280);
        text("PRESS R TO RESTART", 150,350);

        //resetting the game
        if (keyDown("r")){
            reset();
        }

        //destroying all obstacles from the last game
        obstacleGroup.destroyEach();
        starGroup.destroyEach();
    }
    drawSprites();

    //showing the score
    textSize(20)
    fill("white")
    text("SCORE:"+score,320,20)
}

function spawnMeteors(){
    if (frameCount % 50 === 0){
        //creating a meteor sprite
        meteor = createSprite(0,0,20,20);
        meteor.addImage("meteor", meteorImg);
        meteor.x = Math.round(random(10,790))

        //meteor movement
        meteor.velocityY = 8 + score/2000;
        meteor.lifetime = 800;
        meteor.scale = 0.5
        obstacleGroup.add(meteor);
    }
}

function spawnUFO(){
    if (frameCount % 90 === 0){
        //creating UFO sprite
        UFO = createSprite(0,0,20,20);
        UFO.addImage("UFO", UFOImg);
        UFO.x = Math.round(random(100,690))

        //UFO movement
        UFO.velocityY = 8 + score/2000;
        UFO.velocityX = 5 + score/2000;
        UFO.lifetime = 1800;
        UFO.scale = 0.1;
        obstacleGroup.add(UFO);
    }
}

function spawnUFO2(){
    if (frameCount % 80 === 0){
        //creating UFO sprite
        UFO = createSprite(0,0,20,20);
        UFO.addImage("UFO", UFOImg);
        UFO.x = Math.round(random(100,690))

        //UFO movement
        UFO.velocityY = 8 + score/2000;
        UFO.velocityX = -5 - score/2000;
        UFO.lifetime = 1800;
        UFO.scale = 0.1;
        obstacleGroup.add(UFO);
    }
}


function spawnStars(){
    if (frameCount % 150 === 0){
        //creating star sprites
        star = createSprite(0,0,20,20);
        star.addImage("star", starImg);
        star.x = Math.round(random(10,790))

        //star movement
        star.velocityY = 8 + score/2000;
        star.lifetime = 800;
        star.scale = 0.3;
        starGroup.add(star);
    }
}

function reset() {
    //changing the gamstate
    gameState = "play";
    score = 0;

    //making all sprites visible and back to position
    space.visible = true;
    rocket.visible = true;
    rocket.x = 400;
    rocket.y = 600;
  }