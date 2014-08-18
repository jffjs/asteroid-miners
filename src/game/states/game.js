'use strict';
var Ship = require('../entities/ship');

function Game() {
  this.player = null;
  this.ship = null;
}

Game.prototype = {

  create: function () {
    var tileWidth = 256,
        tileHeight = 256;

    for(var bx = 0; bx <= this.game.width; bx += tileWidth) {
      for(var by = 0; by <= this.game.height; by += tileHeight) {
        this.add.tileSprite(bx, by, tileWidth, tileHeight, 'background');
      }
    }

    this.ship = new Ship(this.game, true);
  },

  update: function () {
    this.ship.update();
  }
};

module.exports = Game;
