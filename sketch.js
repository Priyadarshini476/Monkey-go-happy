var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey, monkey_running, monkey_collided;
var ground;
var score;

var obstacle, obstaclesGroup, obstacle_Image;
var banana, foodGroup, banana_Image;

function preload() {
  monkey_running = loadAnimation("sprite_0.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png");

  obstacle_Image = loadImage("obstacle.png");
  banana_Image = loadImage("banana.png")
}

function setup() {
  createCanvas(600, 200);


  monkey = createSprite(50, 160, 20, 50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.15;

  ground = createSprite(200, 250, 800, 20);
  ground.x = ground.width / 2;
  obstaclesGroup = createGroup();
  foodGroup = createGroup();


  monkey.setCollider("rectangle", 0, 0, monkey.width, monkey.height);
  monkey.debug = true;

  score = 0;
}

function draw() {
  createCanvas(600, 600);
  background("white");
  text("Score: " + score, 500, 50);


  if (gameState === PLAY) {

    ground.velocityX = -(4 + 3 * score / 100)
    if (monkey.isTouching(foodGroup)) {
      score = score + 5;
    }

    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

    //jump when the space key is pressed
    if (keyDown("space") && monkey.y >= 100) {
      monkey.velocityY = -12;
    }

    monkey.velocityY = monkey.velocityY + 0.8

    spawnBanana();

    spawnObstacles();

    if (obstaclesGroup.isTouching(monkey)) {
      gameState = END;

    }
  } else if (gameState === END) {

    ground.velocityX = 0;
    monkey.velocityY = 0
    obstaclesGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);

    obstaclesGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);

    text("PRESS R TO RESTART", 200, 200);

    if (keyDown("r")) {
      reset();
    }

  }
  monkey.collide(ground);

  drawSprites();
}

function reset() {
  gameState = PLAY;
  score = 0;
  obstaclesGroup.destroyEach();
  foodGroup.destroyEach();

}


function spawnObstacles() {
  if (frameCount % 60 === 0) {
    var obstacle = createSprite(600, 250, 10, 40);
    obstacle.velocityX = -(6 + score / 100);

    obstacle.addImage("obstacle", obstacle_Image);
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);

  }
}

function spawnBanana() {
  if (frameCount % 60 === 0) {
    var banana = createSprite(600, 120, 40, 10);
    banana.y = Math.round(random(80, 120));
    banana.addImage(banana_Image);
    banana.scale = 0.15;
    banana.velocityX = -3;

    banana.lifetime = 200;

    //add each cloud to the group
    foodGroup.add(banana);
  }
}