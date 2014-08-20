'use strict';

var Projectile = function(game, start, velocity, angle) {
  this.game = game;
  this.start = start;
  this.velocity = velocity;
  this.angle = angle;
}

Projectile.prototype.create = function() {
  this.sprite = this.game.add.sprite(this.start.x, this.start.y, 'sprites', 'laserBlue01.png');
  this.sprite.anchor.setTo(0.5, 0.5);
  this.sprite.angle = this.angle;
  this.sprite.scale = new Phaser.Point(0.5, 0.5);
  this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
  this.sprite.body.velocity = this.velocity;

  return this;
};

Projectile.prototype.update = function() {
};

module.exports = Projectile;
