var backImage,backgr;
var player, player_running;
var ground,ground_img;
var bananaImage;
var stoneImage;
var foodGroup,stoneGroup;
var score = 0;

var END =0;
var PLAY =1;
var gameState = PLAY;

function preload(){
  backImage=loadImage("Images/jungle.jpg");
  player_running = loadAnimation("Images/Monkey_01.png","Images/Monkey_02.png","Images/Monkey_03.png",
  "Images/Monkey_04.png","Images/Monkey_05.png","Images/Monkey_06.png","Images/Monkey_07.png",
  "Images/Monkey_08.png","Images/Monkey_09.png","Images/Monkey_10.png");
  bananaImage = loadImage("Images/banana.png");
  stoneImage = loadImage("Images/stone.png");

}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  foodGroup = createGroup();
  stoneGroup = createGroup();
  
}

function draw() { 
 
  
  
  
  background(0);

  if(gameState===PLAY){

    


  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);
    
    spawnFood();
    spawnObstacles();

    if(foodGroup.isTouching(player)){
      foodGroup.destroyEach();
      score = score+2;
      player.scale += + 0.05
    }

    if(stoneGroup.isTouching(player)){
      gameState = END;
    }
  }

  drawSprites();

  fill(255);
  textSize(20);
  text("Score : "+ score,700,30);

  if(gameState === END){
    backgr.velocityX = 0;
    player.visible = false;

    foodGroup.destroyEach();
    stoneGroup.destroyEach();

    textSize(30);
    fill(255);
    text("Game Over!",300,200);
  }
}

function spawnFood(){
  if(frameCount%80 === 0){
    var banana = createSprite(800,250,40,10);
    banana.y = random(120,200);
    banana.addImage("lk",bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -4;
    banana.lifetime = 500;

    foodGroup.add(banana);
    player.depth = banana.depth+1;
  }
}

function spawnObstacles(){
  if(frameCount%300 === 0){
    var obstacles = createSprite(800,310,40,10);
    //obstacles.y = random(120,200);
    obstacles.addImage("de",stoneImage);
    obstacles.scale = 0.2;
    obstacles.velocityX = -4;
    obstacles.lifetime = 500;

    stoneGroup.add(obstacles);
    player.depth = obstacles.depth+1;
  }
}
