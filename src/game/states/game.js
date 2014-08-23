'use strict';
var Ship = require('../entities/ship');
var AsteroidGroup = require('../entities/asteroidGroup');

function Game() {
  this.player = null;
  this.ship = null;
  this.asteroids = [];
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
    this.asteroidGroup = new AsteroidGroup(this.game).create();
  },

  update: function () {
    this.ship.update();
    this.asteroidGroup.update();
  }
};

module.exports = Game;
