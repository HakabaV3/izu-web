(function() {
	var WORLD_W = 480,
		WORLD_H = 640;

	var player,
		sky;

	var game = new Phaser.Game(WORLD_W, WORLD_H, Phaser.AUTO, '', {
		preload: preload,
		create: create,
		update: update
	});

	function preload() {
		game.load.image('star', '/assets/star.png');
		game.load.image('sky', '/assets/sky.png');
		game.load.spritesheet('player', '/assets/player.png', 32, 32);
	}

	function create() {
		game.physics.startSystem(Phaser.Physics.ARCADE);

		sky = game.add.sprite(0, 0, 'sky');

		player = game.add.sprite(WORLD_W / 2 - 32, 0, 'player');
		game.physics.arcade.enable(player);
		player.body.bounce.y = 0;
		player.body.gravity.y = 800;
		player.body.collideWorldBounds = true;
		player.animations.add('left', [0, 1], 10, true);
		player.animations.add('right', [2, 3], 10, true);
	}

	function update() {
		var cursors = game.input.keyboard.createCursorKeys();
		if (cursors.left.isDown && cursors.left.repeats === 0) {
			player.body.velocity.x = -100;
			player.body.velocity.y = -300;
			player.animations.play('left');

		} else if (cursors.right.isDown && cursors.right.repeats === 0) {
			player.body.velocity.x = 100;
			player.body.velocity.y = -300;
			player.animations.play('right');

		} else {
			// player.animations.stop();
			player.frame = 4;
		}
	}

})();
