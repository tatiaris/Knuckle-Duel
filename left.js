function left(){
  this.x = 25;
  this.y = 25;
  this.xVelocity = 0;
  this.yVelocity = 0;
  this.xAcc = 0;
  this.yAcc = 0;
  this.ammo = 10;
  this.bullets = [];
  this.reloading = false;
  this.lives = 5;
  this.name = "Left";
  this.img;

  this.move = function(){
    if (this.xAcc == 0){
      if (this.xVelocity > 0) {
        this.xVelocity -= 0.5;
      }
      if (this.xVelocity < 0){
        this.xVelocity += 0.5;
      }
    }
    if (this.yAcc == 0){
      if (this.yVelocity > 0) {
        this.yVelocity -= 0.5;
      }
      if (this.yVelocity < 0){
        this.yVelocity += 0.5;
      }
    }
    this.x += this.xVelocity;
    this.y += this.yVelocity;
    this.x = constrain(this.x, 25, width/2 - 50);
    this.y = constrain(this.y, 25, height - 25);
  }
  this.show = function(){
    // this.move();
    fill(0, this.lives * 50, this.lives * 50);
    // ellipse(this.x, this.y, 50,50);
    image(this.img, this.x, this.y);
  }
  this.shoot = function(){
    if(this.ammo > 0){
      var clic = new bullet(this.x, this.y, 1);
      this.bullets.push(clic);
      this.ammo--;
    }
  }
}
