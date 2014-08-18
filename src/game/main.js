window.onload = function() {
  'use strict'

  Phaser = require('phaser');

  var game = new Phaser.Game(800, 600, Phaser.AUTO, 'asteroid-miners');

  // Game States
  game.state.add('boot', require('./states/boot'));
  game.state.add('preloader', require('./states/preloader'));
  game.state.add('menu', require('./states/menu'));
  game.state.add('game', require('./states/game'));

  game.state.start('boot');
};
