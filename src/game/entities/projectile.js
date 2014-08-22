'use strict';

var Projectile = function(game, shipSprite) {
  this.game = game;
  this.ship = shipSprite;
  this.sprite = this.game.add.sprite(0, 0, 'sprites', 'laserBlue01.png');
  this.sprite.anchor.setTo(0.5, 0.5);
  this.sprite.scale = new Phaser.Point(0.5, 0.5);
  this.sprite.entity = this;
  this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
}

Projectile.prototype.fire = function() {
  this.sprite.reset(this.ship.x, this.ship.y);
  this.sprite.angle = this.ship.angle;
  this.sprite.body.velocity = new Phaser.Point(400 * Math.sin(this.ship.rotation),
                                              -400 * Math.cos(this.ship.rotation));

  return this;
};

module.exports = Projectile;
