'use strict';
var Ship = require('../entities/ship');
var Asteroid = require('../entities/asteroid');
var AsteroidFactory = require('../services/asteroidFactory');

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
    this.asteroid = AsteroidFactory.random(this.game);
    this.asteroid.create();
  },

  update: function () {
    this.ship.update();
    this.asteroid.update();
  }
};

module.exports = Game;
