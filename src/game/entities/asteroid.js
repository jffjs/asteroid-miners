'use strict';

var Asteroid = function(game, start, velocity, rotation, color, size) {
  this.game = game;
  this.start = start;
  this.velocity = velocity;
  this.rotation = rotation;
  this.color = color;
  this.size = size;
};

var SPRITE_KEY_MAP = {
  brown: {
    big: ['meteorBrown_big1.png', 'meteorBrown_big2.png', 'meteorBrown_big3.png', 'meteorBrown_big4.png'],
    medium: ['meteorBrown_med1.png', 'meteorBrown_med2.png'],
    small: ['meteorBrown_small1.png','meteorBrown_small2.png' ],
    tiny: ['meteorBrown_tiny1.png', 'meteorBrown_tiny2.png']
  },
  grey: {
    big: ['meteorGrey_big1.png', 'meteorGrey_big2.png', 'meteorGrey_big3.png', 'meteorGrey_big4.png'],
    medium: ['meteorGrey_med1.png', 'meteorGrey_med2.png'],
    small: ['meteorGrey_small1.png','meteorGrey_small2.png' ],
    tiny: ['meteorGrey_tiny1.png', 'meteorGrey_tiny2.png']
  }
};

var randomSpriteKey = function(color, size) {
  var keys = SPRITE_KEY_MAP[color][size];
  return keys[Math.floor(Math.random() * keys.length)];
};

Asteroid.prototype.create = function() {
  this.sprite = this.game.add.sprite(this.start.x, this.start.y, 'sprites', randomSpriteKey(this.color, this.size));
  this.sprite.anchor.setTo(0.5, 0.5);
  this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
  this.sprite.body.angularVelocity = this.rotation;
  this.sprite.body.velocity = this.velocity;
  this.sprite.entity = this;

  return this;
};

Asteroid.prototype.update = function() {
  // Keep the asteroid on the screen
  if (this.sprite.x > this.game.width) this.sprite.x = 0;
  if (this.sprite.x < 0) this.sprite.x = this.game.width;
  if (this.sprite.y > this.game.height) this.sprite.y = 0;
  if (this.sprite.y < 0) this.sprite.y = this.game.height;
};

module.exports = Asteroid;
