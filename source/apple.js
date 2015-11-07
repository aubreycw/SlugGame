(function () {
  if (typeof SnakeGame === "undefined") {
    window.SnakeGame = {};
  }

  var Apple = SnakeGame.Apple = function (pos) {
    this.pos = pos
    this.color = "#00CC99";
    this.radius = 20
  };

  Apple.prototype.snakeTouching = function(pos) {
    if ((pos[0] - this.pos[0] < 20) && (pos[0] - this.pos[0] > -20)){
      if ((pos[1] - this.pos[1] < 20) && (pos[1] - this.pos[1] > -20)){
        return true
      }
    }
    return false
  }


  Apple.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.rect(this.pos[0],this.pos[1],this.radius,this.radius);
    ctx.fill();
  };

})();