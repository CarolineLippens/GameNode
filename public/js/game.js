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
let marche, direction;
let random = parseInt(Math.random() * 10);

function preload() {
  	
// BLUE 
  this.load.spritesheet('dude','assets/bluerun.png', { frameWidth: 75, frameHeight: 80 });
  this.load.spritesheet('dudeAttack','assets/bluerunAttack.png', { frameWidth: 108, frameHeight: 80 });
  this.load.spritesheet('SdudeAttack','assets/bluesuperattack.png', { frameWidth: 108, frameHeight: 80 });

// MINAUTORE
  this.load.spritesheet('minautore', 'assets/minaurun.png', {frameWidth: 110, frameHeight: 80});
  this.load.spritesheet('minauAttack','assets/minauattack.png', { frameWidth: 108, frameHeight: 80 });

// NAIN
  this.load.spritesheet('nain', 'assets/nainrun.png', {frameWidth: 140, frameHeight: 80});


  // OTHER PLAYER
 // this.load.spritesheet('otherPlayer', 'assets/minaurun.png', {frameWidth: 80, frameHeight: 80});

  
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
      direction = "left";
      player.setVelocityX(-100);
      player.anims.play('left', true);

    } else if (this.cursors.right.isDown) {
      direction = "right";
      player.setVelocityX(100);
      player.anims.play('right', true);

    } else if (direction == "right" && this.cursors.down.isDown){
      direction = "right";
      player.setVelocityY(100);
      player.anims.play('right', true);
    }else if (direction == "right" && this.cursors.up.isDown){
      direction = "right";
      player.setVelocityY(-100);
      player.anims.play('right', true);
    }else if (direction == "left" && this.cursors.up.isDown){
      direction = "left";
      player.setVelocityY(-100);
      player.anims.play('left', true);
    }else if (direction == "left" && this.cursors.down.isDown){
      direction = "left";
      player.setVelocityY(100);
      player.anims.play('left', true);
    }
    if(direction == "left" && this.cursors.space.isDown){
      direction = "left";
      player.anims.play('attackLeft', true);
    }else if(direction == "right" && this.cursors.space.isDown){
      direction = "right";
      player.anims.play('attackRight', true);
    }
    if(direction == "left" && this.cursors.shift.isDown){
      direction = "left";
      player.anims.play('SattackLeft', true);
    }else if(direction == "right" && this.cursors.shift.isDown){
      direction = "right";
      player.anims.play('SattackRight', true);
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

  // CREE BLUE
  if (random < 3) {
    player = this.physics.add.sprite(100, 350, 'dude');
  }
  // CREE UN MINAUTORE
  else if(random >= 3 && random <= 5 ) {
    player = this.physics.add.sprite(100, 350, 'minautore');
  }
 // CREE UN NAIN
  else if(random > 5 && random < 8 ) {
    player = this.physics.add.sprite(100, 350, 'nain');
  }

  else {
    player = this.physics.add.sprite(100, 350, 'nain');
  }
  // player.setBounce(0.2);
  player.setCollideWorldBounds(true);
 //ANIMATIONS BLUE
  if (random < 3) {
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
} 
//ANIMATIONS MINAUTORE
else if (random >= 3 && random <= 5) {
  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('minautore', { start: 0, end: 2 }),
    frameRate: 10,
    repeat: 1
});

this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('minautore', { start: 3, end: 6 }),
    frameRate: 10,
    repeat: 1
});
this.anims.create({
  key: 'attackLeft',
  frames: this.anims.generateFrameNumbers('minauAttack', { start: 0, end: 2 }),
  frameRate: 10,
  repeat: 1
});
this.anims.create({
  key: 'attackRight',
  frames: this.anims.generateFrameNumbers('minauAttack', { start: 3, end: 6 }),
  frameRate: 10,
  repeat: 1
});
/*
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
});*/
}
//ANIMATIONS NAINS
else if (random > 5 && random <= 10) {
  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('nain', { start: 0, end: 2 }),
    frameRate: 10,
    repeat: 1
});

this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('nain', { start: 3, end: 6 }),
    frameRate: 10,
    repeat: 1
});
/*this.anims.create({
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
});*/
}



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
  const otherPlayer = self.add.sprite(playerInfo.x, playerInfo.y, 'otherPlayer').setOrigin(0.5, 0.5);
  // if (playerInfo.team === 'blue') {
  //   otherPlayer.setTint(0x0000ff);
  // } else {
  //   otherPlayer.setTint(0xff0000);
  // }
  otherPlayer.playerId = playerInfo.playerId;
  self.otherPlayers.add(otherPlayer);
}
