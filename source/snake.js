(function () {
  if (typeof SnakeGame === "undefined") {
    window.SnakeGame = {};
  }

  var Snake = SnakeGame.Snake = function (pos, game) {
    this.color = "#660033";
    this.radius = 20;
    this.direction = [0,1];
    this.grow = false;
    this.scales = [pos, [pos[0]-this.radius, pos[1]], [pos[0]-(2*this.radius), pos[1]], [pos[0]-(3*this.radius), pos[1]]];
    this.game = game

  };

  Snake.prototype.growOne = function(){
    this.grow = true
  }

  Snake.prototype.headPos = function(){
    return this.scales[0]
  }


  Snake.prototype.draw = function (ctx) {
    var that = this;
    this.scales.forEach(function(scale){
      ctx.fillStyle = that.color;
      ctx.beginPath();
      ctx.rect(scale[0],scale[1],that.radius,that.radius);
      ctx.fill();
    });
  };

  Snake.prototype.changeDir = function(dir){
    this.direction = dir
  }

  Snake.prototype.move = function(){
    if (!this.grow){
      this.scales.pop()
    }
    this.grow = false
    this.scales.unshift([this.scales[0][0] + this.direction[0]*4, this.scales[0][1] + this.direction[1]*4])
    if (this.scales[0][0] > SnakeGame.Game.DIM_X){
      this.scales[0][0] = 0
    } else if (this.scales[0][0] < 0){
      this.scales[0][0] = SnakeGame.Game.DIM_X
    }

    if (this.scales[0][1] > SnakeGame.Game.DIM_Y){
      this.scales[0][1] = 0
    } else if (this.scales[0][1] < 0){
      this.scales[0][1] = SnakeGame.Game.DIM_Y
    }
  }

})();