(function () {

  if (typeof SnakeGame === "undefined") {
    window.SnakeGame = {};
  }


  var GameView = SnakeGame.GameView = function (game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.timerId = null;
  };

  GameView.prototype.start = function () {
    var gameView = this;
    this.timerId = setInterval(
      function () {
        gameView.game.step();
        gameView.game.draw(gameView.ctx);
      }, 20
    );
  };

  GameView.prototype.stop = function () {
    clearInterval(this.timerId);
  };

})();