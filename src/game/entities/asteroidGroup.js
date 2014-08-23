'use strict';

var Asteroid = require('../entities/asteroid');

var randBetween = function(min, max) {
  return Math.floor(Math.random() * ((max + 1) - min)) + min;
};

var AsteroidGroup = function(game) {
  this.game = game;
  this.MAX_ASTEROIDS = 10;
  this.MIN_SPEED = 20,
  this.MAX_SPEED = 150,
  this.MIN_ROTATION = 20,
  this.MAX_ROTATION = 100,
  this.COLORS = ['brown', 'grey'],
  this.SIZES = ['big', 'medium', 'small'];
  this.pool = null;
};

AsteroidGroup.prototype.create = function() {
  this.pool = this.game.add.group();
  for(var i = 0; i < this.MAX_ASTEROIDS; i++) {
    var start = new Phaser.Point(randBetween(0, this.game.width), randBetween(0, this.game.height));
    var velocity = new Phaser.Point(randBetween(this.MIN_SPEED, this.MAX_SPEED) * Phaser.Math.randomSign(),
                                    randBetween(this.MIN_SPEED, this.MAX_SPEED) * Phaser.Math.randomSign());
    var rotation = randBetween(this.MIN_ROTATION, this.MAX_ROTATION);
    var color = this.COLORS[randBetween(0, this.COLORS.length - 1)];
    var size = this.SIZES[randBetween(0, this.SIZES.length - 1)];
    var asteroid = new Asteroid(this.game, start, velocity, rotation, color, size);
    this.pool.add(asteroid.create().sprite);
  }

  return this;
};

AsteroidGroup.prototype.update = function() {
  this.pool.forEachAlive(function(child) {
    child.entity.update();
  }, this);
};
module.exports = AsteroidGroup;
