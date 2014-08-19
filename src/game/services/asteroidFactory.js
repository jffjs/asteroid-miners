'use strict';

var Asteroid = require('../entities/asteroid');

var MIN_SPEED = 20,
    MAX_SPEED = 150,
    MIN_ROTATION = 20,
    MAX_ROTATION = 100,
    COLORS = ['brown', 'grey'],
    SIZES = ['big', 'medium', 'small'];

var randBetween = function(min, max) {
  return Math.floor(Math.random() * ((max + 1) - min)) + min;
};

var AsteroidFactory = {
  random: function(game) {
    var start = new Phaser.Point(randBetween(0, game.width), randBetween(0, game.height));
    var velocity = new Phaser.Point(randBetween(MIN_SPEED, MAX_SPEED) * Phaser.Math.randomSign(),
                                    randBetween(MIN_SPEED, MAX_SPEED) * Phaser.Math.randomSign());
    var rotation = randBetween(MIN_ROTATION, MAX_ROTATION);
    var color = COLORS[randBetween(0, COLORS.length - 1)];
    var size = SIZES[randBetween(0, SIZES.length - 1)];
    return new Asteroid(game, start, velocity, rotation, color, size);
  }
};

module.exports = AsteroidFactory;
