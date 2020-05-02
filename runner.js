{
  var righty;
  var lefty;
  var gameOver;
  var paused;
  var paddleVelocity;
  var leftImg;
  var rightImg;
}

function setup() {
  createCanvas(innerWidth, innerHeight);
  paddleVelocity = 7;
  righty = new right();
  lefty = new left();
  righty.img = rightImg;
  lefty.img = leftImg;
  gameOver = false;
}
function draw() {
  if(!gameOver && !paused){
    background(0);
    checkAmmo();
    detectHit(lefty, righty);
    detectHit(righty, lefty);
    righty.move();
    lefty.move();
    showBullets();
    righty.show();
    lefty.show();
    if(righty.lives == 0) winner(lefty);
    if(lefty.lives == 0) winner(righty);
  }
}
function checkAmmo(){
  if (righty.ammo == 0 && !righty.reloading){
    righty.reloading = true;
    setTimeout(reload, 2000, righty);
  }
  if (lefty.ammo == 0 && !lefty.reloading){
    lefty.reloading = true;
    setTimeout(reload, 2000, lefty);
  }
}
function showBullets(){
  for(var i = 0; i < righty.bullets.length; i++){
    righty.bullets[i].move();
    righty.bullets[i].show();
  }
  for(var i = 0; i < lefty.bullets.length; i++){
    lefty.bullets[i].move();
    lefty.bullets[i].show();
  }
  if (righty.bullets.length > lefty.bullets.length){
    for(var i = 0; i < lefty.bullets.length; i++){
      if (collideCircles(lefty.bullets[i].x, lefty.bullets[i].y, lefty.bullets[i].dia, righty.bullets[i].x, righty.bullets[i].y, righty.bullets[i].dia)){
        lefty.bullets[i].active = false;
        righty.bullets[i].active = false;
      }
    }
  }else{
    for(var i = 0; i < righty.bullets.length; i++){
      if (collideCircles(lefty.bullets[i].x, lefty.bullets[i].y, lefty.bullets[i].dia, righty.bullets[i].x, righty.bullets[i].y, righty.bullets[i].dia)){
        lefty.bullets[i].active = false;
        righty.bullets[i].active = false;
      }
    }
  }
}
function keyPressed() {
  if (keyCode == 39){ // move right right
    righty.xAcc = 1;
    righty.xVelocity = paddleVelocity;
  }
  if(keyCode == 37){ // move right left
    righty.xAcc = 1;
    righty.xVelocity = -paddleVelocity;
  }
  if (keyCode == 38){ // move right up
    righty.yAcc = 1;
    righty.yVelocity = -paddleVelocity;
  }
  if(keyCode == 40){ // move right down
    righty.yAcc = 1;
    righty.yVelocity = paddleVelocity;
  }
  if (keyCode == 68){ // move left right
    lefty.xAcc = 1;
    lefty.xVelocity = paddleVelocity;
  }
  if(keyCode == 65){ // move left left
    lefty.xAcc = 1;
    lefty.xVelocity = -paddleVelocity;
  }
  if (keyCode == 87){ // move left up
    lefty.yAcc = 1;
    lefty.yVelocity = -paddleVelocity;
  }
  if(keyCode == 83){ // move left down
    lefty.yAcc = 1;
    lefty.yVelocity = paddleVelocity;
  }
  if (keyCode == 32){
    righty.shoot();
  } // right shoot
  if (keyCode == 16){
    lefty.shoot();
  } // left shoot
  if(keyCode == 82){
    setup();
  }
  if(keyCode == 27 && !paused){
    paused = true;
  }else if(keyCode == 27 && paused){
    paused = false;
  }

}
function keyReleased() {
  if(keyCode == 39 || keyCode == 37){ // stop moving right x direction
    righty.xAcc =  0;
  }
  if(keyCode == 38 || keyCode == 40){ // stop moving right x direction
    righty.yAcc =  0;
  }
  if(keyCode == 68 || keyCode == 65){ // stop moving right x direction
    lefty.xAcc =  0;
  }
  if(keyCode == 83 || keyCode == 87){ // stop moving right x direction
    lefty.yAcc =  0;
  }
}
function reload(side) {
  side.ammo = 10;
  side.reloading = false;
}
function detectHit(side, opp) {
  for(var i = 0; i < opp.bullets.length; i++){
    if (collideCircles(side.x, side.y, 50, opp.bullets[i].x, opp.bullets[i].y, 10)){
      if(side.lives > 0 && opp.bullets[i].active) side.lives--;
      opp.bullets[i].active = false;
    }
  }
}
function collideCircles(x, y,d, x2, y2, d2){
  if(this.dist(x,y,x2,y2) <= (d/2)+(d2/2)) return true;
  return false;
}
function winner(side){
  textSize(32);
  fill(255);
  text("Winner: " + side.name, width/2 - 100, height/2);
  text("Press 'r' to restart", width/2 - 100, height/2 + 50);
  gameOver = true;
}
