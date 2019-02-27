const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 1000,
    height: 700,
    physics: {
      default: 'arcade',
      arcade: {
        debug: false,
        gravity: { y: 0 }
      }
    },
    scene: {
      preload: preload,
      create: create,
      update: update
    } 
  };
  

const game = new Phaser.Game(config);
let marche;

function preload() {
  	
  // this.load.image('ship', 'assets/nain_champ/attack/attack1.png');
  this.load.spritesheet('dude','assets/bluerun.png', { frameWidth: 75, frameHeight: 80 });
  this.load.spritesheet('dudeAttack','assets/bluerunAttack.png', { frameWidth: 107, frameHeight: 80 });
  this.load.image('otherPlayer', 'assets/minau_champ/attack/attack2.png');
  // this.load.image('star', 'assets/nain_champ/attack/attack4.png');  
  
}

function addPlayer(self, playerInfo) {
  self.ship = self.physics.add.image(playerInfo.x, playerInfo.y);
    //  'ship').setOrigin(0.5, 0.5).setDisplaySize(53, 40);
  // if (playerInfo.team === '') {
  //   self.ship.setTint(0x0000ff);
  // } else {
  //   self.ship.setTint(0xff0000);
  // }
  player.setDrag(100);
  player.setAngularDrag(100);
  player.setMaxVelocity(70);
}



function update() {  
  
  if (player) {
    if (this.cursors.left.isDown) {
      
      player.setVelocityX(-100);
      player.anims.play('left', true);

    } else if (this.cursors.right.isDown) {
      
      player.setVelocityX(100);
      player.anims.play('right', true);

    } else if (this.cursors.down.isDown){
      player.setVelocityY(100);
      player.anims.play('right', true);
    }else if (this.cursors.up.isDown){
      player.setVelocityY(-100);
      player.anims.play('right', true);
    }
    if(this.cursors.space.isDown){
      player.anims.play('attack', true);
    }

  // emit player movement
    var x = player.x;
    var y = player.y;
    var r = player.rotation;
    if (player.oldPosition && (x !== player.oldPosition.x || y !== player.oldPosition.y || r !== player.oldPosition.rotation)) {
      this.socket.emit('playerMovement', { x: player.x, y: player.y, rotation: player.rotation });
    }
    
    // save old position data
    player.oldPosition = {
      x: player.x,
      y: player.y,
      rotation: player.rotation
};
  
    
  }
}

function create() {

  player = this.physics.add.sprite(100, 350, 'dude');
  // player.setBounce(0.2);
  player.setCollideWorldBounds(true);
  
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
    key: 'attack',
    frames: this.anims.generateFrameNumbers('dudeAttack', { start: 0, end: 2 }),
    frameRate: 10,
    repeat: 1
});

  this.cursors = this.input.keyboard.createCursorKeys();
  var self = this;

  this.socket = io();
  this.otherPlayers = this.physics.add.group();

  this.socket.on('currentPlayers', function (players) {
    Object.keys(players).forEach(function (id) {
      if (players[id].playerId === self.socket.id) {
        addPlayer(self, players[id]);
      } else {
        addOtherPlayers(self, players[id]);
      }
    });
  });

// ajout d 'un autre player
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
  
  //Controle le mouvement de l'autre joueur
  this.socket.on('playerMoved', function (playerInfo) {
    self.otherPlayers.getChildren().forEach(function (otherPlayer) {
      if (playerInfo.playerId === otherPlayer.playerId) {
        // otherPlayer.setRotation(playerInfo.rotation);
        otherPlayer.setPosition(playerInfo.x, playerInfo.y);
      }
    });
  });
  // Affichage de score
  this.blueScoreText = this.add.text(16, 16, '', { fontSize: '32px', fill: '#0000FF' });
  this.redScoreText = this.add.text(584, 16, '', { fontSize: '32px', fill: '#FF0000' });
    
  this.socket.on('scoreUpdate', function (scores) {
    self.blueScoreText.setText('Blue: ' + scores.blue);
    self.redScoreText.setText('Red: ' + scores.red);
    // Affichage des étoiles
  });
  this.socket.on('starLocation', function (starLocation) {
    // if (self.star) self.star.destroy();
    // self.star = self.physics.add.image(starLocation.x, starLocation.y, 'star');
    // self.physics.add.overlap(self.ship, self.star, function () {
    //   this.socket.emit('starCollected');
    // }, null, self);
  });
}

function addOtherPlayers(self, playerInfo) {
  const otherPlayer = self.add.sprite(playerInfo.x, playerInfo.y, 'otherPlayer').setOrigin(0.5, 0.5).setDisplaySize(53, 40);
  // if (playerInfo.team === 'blue') {
  //   otherPlayer.setTint(0x0000ff);
  // } else {
  //   otherPlayer.setTint(0xff0000);
  // }
  otherPlayer.playerId = playerInfo.playerId;
  self.otherPlayers.add(otherPlayer);
}
