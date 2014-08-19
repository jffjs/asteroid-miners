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
    var startingAsteroids = 10;
    for(var i = 0; i < startingAsteroids; i++) {
      this.asteroids.push(AsteroidFactory.random(this.game).create());
    }
  },

  update: function () {
    this.ship.update();
    for(var i = 0; i < this.asteroids.length; i++) {
      this.asteroids[i].update();
    }
  }
};

module.exports = Game;
