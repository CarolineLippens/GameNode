var config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
      gravity: { y: 0 }
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

var game = new Phaser.Game(config);
let direction = 0, player, otherPlayer;
function preload() {

  this.load.spritesheet('dude', 'assets/bluerun.png', { frameWidth: 75, frameHeight: 80 });
  this.load.spritesheet('dudeAttack', 'assets/bluerunAttack.png', { frameWidth: 108, frameHeight: 80 });
  this.load.spritesheet('SdudeAttack', 'assets/bluesuperattack.png', { frameWidth: 108, frameHeight: 80 });
  this.load.spritesheet('otherPlayer', 'assets/nainrun.png', { frameWidth: 108, frameHeight: 80 });
  this.load.image('star', 'assets/star.png');
}


function update() {
  // if(otherPlayer){
  //   console.log(otherPlayer)
  //   if (this.cursors.left.isDown) {
  //     direction = "leftO";
  //     otherPlayer.setVelocityX(-100);
  //     otherPlayer.anims.play('left', true);

  //   } else if (this.cursors.right.isDown) {
  //     direction = "rightO";
  //     otherPlayer.setVelocityX(100);
  //     otherPlayer.anims.play('right', true);}
  // }
  if (this.ship) {
    if (this.cursors.left.isDown) {
      direction = "left";
      this.ship.setVelocityX(-100);
      this.ship.anims.play('left', true);

    } else if (this.cursors.right.isDown) {
      direction = "right";
      this.ship.setVelocityX(100);
      this.ship.anims.play('right', true);

    } else if (direction == "right" && this.cursors.down.isDown) {
      direction = "right";
      this.ship.setVelocityY(100);
      this.ship.anims.play('right', true);
    } else if (direction == "right" && this.cursors.up.isDown) {
      direction = "right";
      this.ship.setVelocityY(-100);
      this.ship.anims.play('right', true);
    } else if (direction == "left" && this.cursors.up.isDown) {
      direction = "left";
      this.ship.setVelocityY(-100);
      this.ship.anims.play('left', true);
    } else if (direction == "left" && this.cursors.down.isDown) {
      direction = "left";
      this.ship.setVelocityY(100);
      this.ship.anims.play('left', true);
    }
    if (direction == "left" && this.cursors.space.isDown) {
      direction = "left";
      this.ship.anims.play('attackLeft', true);
    } else if (direction == "right" && this.cursors.space.isDown) {
      direction = "right";
      this.ship.anims.play('attackRight', true);
    }
    if (direction == "left" && this.cursors.shift.isDown) {
      direction = "left";
      this.ship.anims.play('SattackLeft', true);
    } else if (direction == "right" && this.cursors.shift.isDown) {
      direction = "right";
      this.ship.anims.play('SattackRight', true);
    }
    // emit player movement
    var x = this.ship.x;
    var y = this.ship.y;
    var r = this.ship.rotation;
    if (this.ship.oldPosition && (x !== this.ship.oldPosition.x || y !== this.ship.oldPosition.y || r !== this.ship.oldPosition.rotation)) {
      this.socket.emit('playerMovement', { x: this.ship.x, y: this.ship.y, rotation: this.ship.rotation });
    }
    

    // save old position data
    this.ship.oldPosition = {
      x: this.ship.x,
      y: this.ship.y,
      rotation: this.ship.rotation
    };
  }

}
function create() {
  this.ship = this.physics.add.sprite(100, 350, 'dude');
  this.ship.setCollideWorldBounds(true);


  var self = this;
  this.socket = io();

  this.otherPlayers = this.physics.add.group();
  this.cursors = this.input.keyboard.createCursorKeys();

  this.anims.create({
    key: 'leftO',
    frames: this.anims.generateFrameNumbers('otherPlayer', { start: 0, end: 2 }),
    frameRate: 10,
    repeat: 1
  });

  this.anims.create({
    key: 'rightO',
    frames: this.anims.generateFrameNumbers('otherPlayer', { start: 3, end: 5 }),
    frameRate: 10,
    repeat: 1
  });

  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 2 }),
    frameRate: 10,
    repeat: 1
  });

  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('dude', { start: 3, end: 5 }),
    frameRate: 10,
    repeat: 1
  });
  this.anims.create({
    key: 'attackLeft',
    frames: this.anims.generateFrameNumbers('dudeAttack', { start: 0, end: 2 }),
    frameRate: 10,
    repeat: 1
  });
  this.anims.create({
    key: 'attackRight',
    frames: this.anims.generateFrameNumbers('dudeAttack', { start: 3, end: 6 }),
    frameRate: 10,
    repeat: 1
  });
  this.anims.create({
    key: 'SattackRight',
    frames: this.anims.generateFrameNumbers('SdudeAttack', { start: 0, end: 2 }),
    frameRate: 10,
    repeat: 1
  });
  this.anims.create({
    key: 'SattackLeft',
    frames: this.anims.generateFrameNumbers('SdudeAttack', { start: 3, end: 6 }),
    frameRate: 10,
    repeat: 1
  });


  this.socket.on('currentPlayers', function (players) {
    Object.keys(players).forEach(function (id) {
      if (players[id].playerId === self.socket.id) {
        addPlayer(self, players[id]);

      } else {
        addOtherPlayers(self, players[id]);
      }
    });
  });

  this.socket.on('newPlayer', function (playerInfo) {
    addOtherPlayers(self, playerInfo);
  });

  this.socket.on('disconnect', function (playerId) {
    self.otherPlayers.getChildren().forEach(function (otherPlayer) {
      if (playerId === otherPlayer.playerId) {
        otherPlayer.destroy();
      }
    });
  });
  this.blueScoreText = this.add.text(16, 16, '', { fontSize: '32px', fill: '#0000FF' });
  this.redScoreText = this.add.text(584, 16, '', { fontSize: '32px', fill: '#FF0000' });
    
  this.socket.on('scoreUpdate', function (scores) {
    self.blueScoreText.setText('Blue: ' + scores.blue);
    self.redScoreText.setText('Red: ' + scores.red);
  });

  this.socket.on('starLocation', function (starLocation) {
    if (self.star) self.star.destroy();
    self.star = self.physics.add.image(starLocation.x, starLocation.y, 'star');
    self.physics.add.overlap(self.ship, self.star, function () {
      this.socket.emit('starCollected');
    }, null, self);
  });

  this.socket.on('playerMoved', function (playerInfo) {
    self.otherPlayers.getChildren().forEach(function (otherPlayer) {
      if (playerInfo.playerId === otherPlayer.playerId) {
        otherPlayer.setRotation(playerInfo.rotation);
        otherPlayer.setPosition(playerInfo.x, playerInfo.y);
      }
    });
  });
}
function addPlayer(self, playerInfo) {
  // self.ship = self.physics.add.image(playerInfo.x, playerInfo.y, 'dude')
  //   .setOrigin(0.5, 0.5).setDisplaySize(83, 80);

  if (playerInfo.team === 'blue') {
    self.ship.setTint(0x0000ff);
  } else {
    self.ship.setTint(0xff0000);
  }
  self.ship.setDrag(100);
  self.ship.setAngularDrag(100);
  self.ship.setMaxVelocity(70);
}
function addOtherPlayers(self, playerInfo) {
  const otherPlayer = self.add.sprite(playerInfo.x, playerInfo.y, 'otherPlayer').setOrigin(0.5, 0.5).setDisplaySize(83, 80);
  if (playerInfo.team === 'blue') {
    otherPlayer.setTint(0x0000ff);
  } else {
    otherPlayer.setTint(0xff0000);
  }
  otherPlayer.playerId = playerInfo.playerId;
  self.otherPlayers.add(otherPlayer);
}
