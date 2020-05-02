function bullet(x, y, direc) {
  this.x = x;
  this.y = y;
  this.vel = 15;
  this.dia = 10;
  this.active = true;

  this.show = function(){
    if(this.active){
      fill(255);
      ellipse(this.x, this.y, this.dia, this.dia);
    }
  }
  this.move = function(){
    if (!paused && !gameOver){
      this.x += this.vel * direc;
    }
  }
}
