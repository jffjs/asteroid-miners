'use strict';

var Projectile = require('./projectile');

var Ship = function(game, createOnNew) {
  this.game = game;
  if (createOnNew) {
    this.create();
  }
};

Ship.prototype.create = function() {
  // Define motion constants
  this.ROTATION_SPEED = 180; // degrees/second
  this.ACCELERATION = 200; // pixels/second/second
  this.MAX_SPEED = 250; // pixels/second
  this.PROJECTILE_DELAY = 400;
  this.MAX_PROJECTILES = 10;

  var x = this.game.width / 2,
      y = this.game.height / 2
  this.sprite = this.game.add.sprite(x, y, 'sprites', 'playerShip1_blue.png');
  //this.sprite = this.game.add.sprite(x, y, 'ship');
  this.sprite.anchor.setTo(0.5, 0.5);
  this.sprite.scale.x = 0.5;
  this.sprite.scale.y = 0.5;

  // Enable physics on the ship
  this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);

  this.sprite.body.facing = Phaser.UP;
  // Set maximum velocity
  this.sprite.body.maxVelocity.setTo(this.MAX_SPEED, this.MAX_SPEED); // x, y

  this.game.input.keyboard.addKeyCapture([
    Phaser.Keyboard.LEFT,
    Phaser.Keyboard.RIGHT,
    Phaser.Keyboard.UP,
    Phaser.Keyboard.DOWN
  ]);

  this.projectilePool = this.game.add.group();
  for(var i = 0; i < this.MAX_PROJECTILES; i++) {
    var projectile = new Projectile(this.game, this.sprite);
    this.projectilePool.add(projectile.sprite);
    projectile.sprite.kill();
  }
  return this;
};

Ship.prototype.update = function() {
  // Keep the ship on the screen
  if (this.sprite.x > this.game.width) this.sprite.x = 0;
  if (this.sprite.x < 0) this.sprite.x = this.game.width;
  if (this.sprite.y > this.game.height) this.sprite.y = 0;
  if (this.sprite.y < 0) this.sprite.y = this.game.height;

  var keyboard = this.game.input.keyboard;
  if (keyboard.isDown(Phaser.Keyboard.LEFT)) {
    // If the LEFT key is down, rotate left
    this.sprite.body.angularVelocity = -this.ROTATION_SPEED;
  } else if (keyboard.isDown(Phaser.Keyboard.RIGHT)) {
    // If the RIGHT key is down, rotate right
    this.sprite.body.angularVelocity = this.ROTATION_SPEED;
  } else {
    // Stop rotating
    this.sprite.body.angularVelocity = 0;
  }

  if (keyboard.isDown(Phaser.Keyboard.UP)) {
    // If the UP key is down, thrust
    // Calculate acceleration vector based on this.angle and this.ACCELERATION
    this.sprite.body.acceleration.x = Math.sin(this.sprite.rotation) * this.ACCELERATION;
    this.sprite.body.acceleration.y = -1 * Math.cos(this.sprite.rotation) * this.ACCELERATION;

    // TODO: Show the frame from the spritesheet with the engine on
  } else {
    // Otherwise, stop thrusting
    this.sprite.body.acceleration.setTo(0, 0);

    // TODO: Show the frame from the spritesheet with the engine off
  }

  if (keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
    this.fireProjectile();
  }
};

Ship.prototype.fireProjectile = function() {
  if (this.lastFired === undefined) {
    this.lastFired = 0;
  }

  if (this.game.time.now - this.lastFired < this.PROJECTILE_DELAY) {
    return;
  }

  this.lastFired = this.game.time.now;
  var projectile = this.projectilePool.getFirstDead();

  if (projectile === null || projectile === undefined) {
    return;
  }

  projectile.revive();
  projectile.checkWorldBounds = true;
  projectile.outOfBoundsKill = true;
  projectile.entity.fire();
};

module.exports = Ship;
