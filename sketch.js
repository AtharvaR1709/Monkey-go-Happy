var player, ground, scene, scene_image, player_running
var food_image, stone_image
var banana_group, stone_group
var gameState, PLAY, END
var score

function preload(){
  player_running = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png","Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png","Monkey_09.png", "Monkey_10.png")
  
  scene_image = loadImage("jungle.jpg")
  
  food_image = loadImage("banana.png")
  
  stone_image = loadImage("stone.png")
}

function setup() {
  createCanvas(400, 400);
  
  PLAY = 1;
  END = 0;
  gameState = PLAY;
  
  banana_group = createGroup();
  stone_group = createGroup();
  
  scene = createSprite(200,200, 1000, 400)
  scene.addImage(scene_image);
  scene.scale=0.5
  
  player = createSprite(50, 350, 30, 50)
  player.addAnimation("jumping", player_running)
  player.scale=0.1;
  
  score = 0;
  
  ground = createSprite(200, 382, 800, 10)
  ground.visible=false;
  ground.velocityX=-6;
  ground.x=ground.width/2
}

function draw() {
  background(220);
  
  
  if (gameState === PLAY){
     if (ground.x<0){
       ground.x=ground.width/2
      }
    
    if (keyDown('space') && player.y>325){
       player.velocityY=-16;
     }
     player.velocityY=player.velocityY+0.6

     spawnObstacles()
     spawnBananas()
     player_scale()

    if (banana_group.isTouching(player)){
      score = score+2;
       banana_group.destroyEach();
    }
    if (stone_group.isTouching(player)){
        player.scale = 0.1;
      if (player.scale < 0.1) {
        stone_group.destroyEach();
      }
    }
   if (stone_group.isTouching(player) && player.scale === 0.1){
        gameState = END;
    }
        
  }else if (gameState === END){
    ground.velocityX=0;
    player.velocityY=0
    banana_group.setVelocityXEach(0)
    stone_group.setVelocityXEach(0)
    
    banana_group.setLifetimeEach(-1)
    stone_group.setLifetimeEach(-1)
  }
   stroke("black");
  textSize(20);
  fill("black");
  text("Score: " + score, 100, 40);
  
  player.collide(ground)
  drawSprites();
}
function spawnObstacles() {
  if (frameCount % 300 === 0){
    var stone = createSprite(400, 355, 10, 10);
    stone.addImage(stone_image)
    stone.scale=0.15;
    stone.velocityX=-6;
    stone.lifetime=400/6;
    stone_group.add(stone);
  }
}
function spawnBananas() {
  if (frameCount % 80 === 0){
    var banana = createSprite(400, random(120,200), 10, 10);
    banana.addImage(food_image);
    banana.scale=0.05;
    banana.velocityX=-4;
    banana.lifetime=110;
    banana_group.add(banana);
  }
}
function player_scale(){
  switch (score){
    case 10: player.scale=0.12;
        break;
    case 20: player.scale=0.14;
        break;
    case 30: player.scale=0.16;
        break;
    case 40: player.scale=0.18;
        break;
    default: break;
  }
}