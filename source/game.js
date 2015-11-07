(function () {
  if (typeof SnakeGame === "undefined") {
    window.SnakeGame = {};
  }

  var Game = SnakeGame.Game = function () {
    this.snake = new SnakeGame.Snake([100,100], this);
    this.others = [];
    this.apples = [];
    this.addRandomApple();
  };

  Game.BG_COLOR = "#FFFFCC";
  Game.FPS = 1;

  Game.prototype.step = function() {
    this.snake.move()
    var that = this

    this.others.forEach(function(other) {
      other.maybeChangeDir()
      other.move()
    })


    this.apples.forEach(function(apple) {
      if (apple.snakeTouching(that.snake.headPos())){
        that.maybeNewOther()
        that.removeApple(apple)
        that.snake.growOne()
        that.addRandomApple()
      }

      that.others.forEach(function(other) {
        if (apple.snakeTouching(other.headPos())){
        that.removeApple(apple)
        other.growOne()
        that.addRandomApple()
      }
      })
    });
  }

  Game.prototype.maybeNewOther = function(){
    if (Math.random() > 0.75) {
      var other = new SnakeGame.Other([100,100], this);
      this.others.push(other)
    }
  }

  Game.prototype.removeApple = function(appleX) {
    var newApples = []
    this.apples.forEach(function(apple) {
      if (!(apple === appleX)){
        newApples.push(apple)
      }
    })
    this.apples = newApples
  }

  Game.prototype.addRandomApple = function(){
    apple = new SnakeGame.Apple([Math.floor(Math.random()*SnakeGame.Game.DIM_X), Math.floor(Math.random()*SnakeGame.Game.DIM_Y)])
    this.apples.push(apple)
  }

  Game.prototype.moveSnake = function(dir){
    this.snake.changeDir(dir)
  }

  Game.prototype.draw = function(ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.fillStyle = Game.BG_COLOR;
    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);
    this.apples.forEach(function (apple) {
      apple.draw(ctx);
    });
    this.others.forEach(function (other){
      other.draw(ctx);
    })
    this.snake.draw(ctx)
  }

})();