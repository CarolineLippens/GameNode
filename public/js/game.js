<<<<<<< HEAD
const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 1000,
    height: 700,
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
  

const game = new Phaser.Game(config);
let marche, direction;
let random = parseInt(Math.random() * 10);
let randomOP = parseInt(Math.random() * 10);
=======
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
>>>>>>> 48897b866986a0e9394468d4d399175a2100b30a

var game = new Phaser.Game(config);
let direction = 0, player, otherPlayer;
let teamBlue = [], teamRed = [];
function preload() {
<<<<<<< HEAD
  	
// BLUE 
  this.load.spritesheet('dude','assets/bluerun.png', { frameWidth: 75, frameHeight: 80 });
  this.load.spritesheet('dudeAttack','assets/bluerunAttack.png', { frameWidth: 108, frameHeight: 80 });
  this.load.spritesheet('SdudeAttack','assets/bluesuperattack.png', { frameWidth: 108, frameHeight: 80 });

// MINAUTORE
  this.load.spritesheet('minautore', 'assets/minaurun.png', {frameWidth: 104, frameHeight: 80});
  this.load.spritesheet('minauAttack','assets/minauattack.png', { frameWidth: 142, frameHeight: 130 });
  this.load.spritesheet('SminauAttack','assets/minausuperattack.png', { frameWidth: 144, frameHeight: 85 });

// NAIN
  this.load.spritesheet('nain', 'assets/nainrun.png', {frameWidth: 134, frameHeight: 80});
  this.load.spritesheet('nainAttack','assets/nainattack.png', { frameWidth: 115, frameHeight: 99 });
  this.load.spritesheet('SnainAttack','assets/nainsuperattack.png', { frameWidth: 100, frameHeight: 80 });

  //PERE NOEL
  this.load.spritesheet('noel', 'assets/noelrun.png', {frameWidth: 55, frameHeight: 55});
  this.load.spritesheet('noelAttack','assets/noelattack.png', { frameWidth: 58, frameHeight: 55 });
  this.load.spritesheet('SnoelAttack','assets/noelsuperattack.png', { frameWidth: 64, frameHeight: 60 });
  //RED
  //this.load.spritesheet('red', 'assets/redrun.png', {frameWidth: 75, frameHeight: 80});
  // OTHER PLAYER
 //this.load.spritesheet('otherPlayer', 'assets/minaurun.png', {frameWidth: 80, frameHeight: 80});

  
}

function addPlayer(self, playerInfo) {
  self.player = self.physics.add.image(playerInfo.x, playerInfo.y);
    //  'ship').setOrigin(0.5, 0.5).setDisplaySize(53, 40);
  // if (playerInfo.team === '') {
  //   self.ship.setTint(0x0000ff);
  // } else {
  //   self.ship.setTint(0xff0000);
  // }
  player.setDrag(100);
  player.setAngularDrag(100);
  player.setMaxVelocity(70);
=======

  this.load.spritesheet('dude', 'assets/bluerun.png', { frameWidth: 75, frameHeight: 80 });
  this.load.spritesheet('dudeAttack', 'assets/bluerunAttack.png', { frameWidth: 108, frameHeight: 80 });
  this.load.spritesheet('SdudeAttack', 'assets/bluesuperattack.png', { frameWidth: 108, frameHeight: 80 });
  this.load.spritesheet('otherPlayer', 'assets/nainrun.png', { frameWidth: 108, frameHeight: 80 });
  this.load.image('star', 'assets/star.png');
>>>>>>> 48897b866986a0e9394468d4d399175a2100b30a
}


function update() {

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
      this.physics.add.collider(this.ship, this.otherPlayers);
    } else if (direction == "right" && this.cursors.space.isDown) {
      direction = "right";
      this.ship.anims.play('attackRight', true);
      this.physics.add.collider(this.ship, this.otherPlayers);
    }
    if (direction == "left" && this.cursors.shift.isDown) {
      direction = "left";
      this.ship.anims.play('SattackLeft', true);
      this.physics.add.collider(this.ship, this.otherPlayers);
    } else if (direction == "right" && this.cursors.shift.isDown) {
      direction = "right";
      this.ship.anims.play('SattackRight', true);
      this.physics.add.collider(this.ship, this.otherPlayers);
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
<<<<<<< HEAD

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
    player = this.physics.add.sprite(100, 350, 'nain').setDisplaySize(90, 70);
  }

  //CREE PERE NOEL
  else if(random >=8 && random <=10) {
    player = this.physics.add.sprite(100, 350, 'noel').setDisplaySize(80, 65);
  }


  // player.setBounce(0.2);
  player.setCollideWorldBounds(true);
 //ANIMATIONS BLUE
  if (random < 3) {
=======
  
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

>>>>>>> 48897b866986a0e9394468d4d399175a2100b30a
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
    frames: this.anims.generateFrameNumbers('minautore', { start: 3, end: 5 }),
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
  frames: this.anims.generateFrameNumbers('minauAttack', { start: 3, end: 5 }),
  frameRate: 10,
  repeat: 1
});

this.anims.create({
  key: 'SattackRight',
  frames: this.anims.generateFrameNumbers('SminauAttack', { start: 0, end: 2 }),
  frameRate: 10,
  repeat: 1
});
this.anims.create({
key: 'SattackLeft',
frames: this.anims.generateFrameNumbers('SminauAttack', { start: 3, end: 6 }),
frameRate: 10,
repeat: 1
});
}
//ANIMATIONS NAINS
else if (random > 5 && random < 8) {
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
this.anims.create({
  key: 'attackLeft',
  frames: this.anims.generateFrameNumbers('nainAttack', { start: 0, end: 2 }),
  frameRate: 10,
  repeat: 1
});
this.anims.create({
  key: 'attackRight',
  frames: this.anims.generateFrameNumbers('nainAttack', { start: 3, end: 6 }),
  frameRate: 10,
  repeat: 1
});

this.anims.create({
  key: 'SattackRight',
  frames: this.anims.generateFrameNumbers('SnainAttack', { start: 0, end: 2 }),
  frameRate: 10,
  repeat: 1
});
this.anims.create({
key: 'SattackLeft',
frames: this.anims.generateFrameNumbers('SnainAttack', { start: 3, end: 6 }),
frameRate: 10,
repeat: 1
});
}
  //ANIMATIONS PERE NOEL
else if (random >= 8 && random <= 10) {
  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('noel', { start: 0, end: 2 }),
    frameRate: 10,
    repeat: 1
});

this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('noel', { start: 3, end: 6 }),
    frameRate: 10,
    repeat: 1
});

this.anims.create({
  key: 'attackLeft',
  frames: this.anims.generateFrameNumbers('noelAttack', { start: 0, end: 2 }),
  frameRate: 10,
  repeat: 1
});
this.anims.create({
  key: 'attackRight',
  frames: this.anims.generateFrameNumbers('noelAttack', { start: 3, end: 6 }),
  frameRate: 10,
  repeat: 1
});
this.anims.create({
  key: 'SattackRight',
  frames: this.anims.generateFrameNumbers('SnoelAttack', { start: 3, end: 6 }),
  frameRate: 10,
  repeat: 1
});
this.anims.create({
key: 'SattackLeft',
frames: this.anims.generateFrameNumbers('SnoelAttack', { start: 0, end: 2 }),
frameRate: 10,
repeat: 1
});
}






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
  console.log(this.ship.team);
  console.log(this.otherPlayers.playerId);
  
}
function addPlayer(self, playerInfo) {
  // self.ship = self.physics.add.image(playerInfo.x, playerInfo.y, 'dude')
  //   .setOrigin(0.5, 0.5).setDisplaySize(83, 80);
  if (playerInfo.team === 'blue') {
    self.ship.setTint(0x0000ff);
    teamBlue.push(playerInfo.playerId);

  } else {
    self.ship.setTint(0xff0000);
    teamRed.push(playerInfo.playerId);
  }
  self.ship.setDrag(100);
  self.ship.setAngularDrag(100);
  self.ship.setMaxVelocity(70);
}
function addOtherPlayers(self, playerInfo) {
<<<<<<< HEAD
 // const otherPlayer = self.add.sprite(playerInfo.x, playerInfo.y, 'otherPlayer').setOrigin(0.5, 0.5);
    // CREE BLUE
    if (randomOP < 3) {
      otherPlayer = self.physics.add.sprite(100, 350, 'dude')
    }
    // CREE UN MINAUTORE
    else if(randomOP >= 3 && randomOP <= 5 ) {
      otherPlayer = self.physics.add.sprite(100, 350, 'minautore')
    }
   // CREE UN NAIN
    else if(randomOP > 5 && randomOP < 8 ) {
      otherPlayer = self.physics.add.sprite(100, 350, 'nain').setDisplaySize(90, 70)
    }
  
    //CREE PERE NOEL
    else if(randomOP >=8 && randomOP <=10) {
      otherPlayer = self.physics.add.sprite(100, 350, 'noel').setDisplaySize(80, 65)
    }
  // if (playerInfo.team === 'blue') {
  //   otherPlayer.setTint(0x0000ff);
  // } else {
  //   otherPlayer.setTint(0xff0000);
  // }
=======
  const otherPlayer = self.add.sprite(playerInfo.x, playerInfo.y, 'otherPlayer').setOrigin(0.5, 0.5).setDisplaySize(83, 80);
  if (playerInfo.team === 'blue') {
    otherPlayer.setTint(0x0000ff);
    teamBlue.push(playerInfo.playerId);
  } else {
    otherPlayer.setTint(0xff0000);
    teamRed.push(playerInfo.playerId);
  }
>>>>>>> 48897b866986a0e9394468d4d399175a2100b30a
  otherPlayer.playerId = playerInfo.playerId;
  self.otherPlayers.add(otherPlayer);
  
}
console.log(teamBlue);
console.log(teamRed);
