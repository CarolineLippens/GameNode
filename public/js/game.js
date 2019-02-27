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
  var bullets;
  var ship;
  var speed;
  var stats;
  var cursors;
  var lastFired = 0;
const game = new Phaser.Game(config);

function preload() {
  	
  this.load.image('ship', 'assets/nain_champ/attack/attack1.png');
  this.load.image('otherPlayer', 'assets/minau_champ/attack/attack2.png');
  this.load.image('star', 'assets/nain_champ/attack/attack4.png');
  this.load.image('bullet', 'assets/lazer.png'); 
}

function addPlayer(self, playerInfo) {
  self.ship = self.physics.add.image(playerInfo.x, playerInfo.y, 'ship').setOrigin(0.5, 0.5).setDisplaySize(53, 40);
  // if (playerInfo.team === '') {
  //   self.ship.setTint(0x0000ff);
  // } else {
  //   self.ship.setTint(0xff0000);
  // }
  self.ship.setDrag(100);
  self.ship.setAngularDrag(100);
  self.ship.setMaxVelocity(200);
}



function update(time) {  
  if (this.ship) {
    if (this.cursors.left.isDown) {
      this.ship.setVelocityX(-200);
    } else if (this.cursors.right.isDown) {
      this.ship.setVelocityX(200);
    } else if (this.cursors.down.isDown){
      this.ship.setVelocityY(200);
    }else if (this.cursors.up.isDown){
      this.ship.setVelocityY(-200);
    }
  if (this.cursors.space.isDown && time > lastFired)
  {
      var bullet = bullets.get();

      if (bullet)
      {
          bullet.fire(this.ship.x, this.ship.y);

          lastFired = time + 50;
      }
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

  var Bullet = new Phaser.Class({

    Extends: Phaser.GameObjects.Image,

    initialize:

    function Bullet (scene)
    {
        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'bullet');

        this.speed = Phaser.Math.GetSpeed(400, 1);
    },

    fire: function (x, y)
    {
        this.setPosition(x, y - 10);

        this.setActive(true);
        this.setVisible(true);
    },

    update: function (time, delta)
    {
        this.y -= this.speed * delta;

        if (this.y < -50)
        {
            this.setActive(false);
            this.setVisible(false);
        }
    }

});

bullets = this.add.group({
    classType: Bullet,
    maxSize: 10,
    runChildUpdate: true
});



cursors = this.input.keyboard.createCursorKeys();

speed = Phaser.Math.GetSpeed(300, 1);


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
  let colorScore ='yellow';
  // this.socket.on('colorScore', function (lifePoint) {
  //     if(lifePoint.red<30) {colorScore='red'} else {colorScore='blue'}
  // });

  this.blueScoreText = this.add.text(16, 16, '', { fontSize: '32px', fill: colorScore });
  this.redScoreText = this.add.text(584, 16, '', { fontSize: '32px', fill: colorScore });
  
  this.socket.on('scoreUpdate', function (lifePoint) {
    self.blueScoreText.setText('Blue: ' + lifePoint.blue);
    self.redScoreText.setText('Red: ' + lifePoint.red);
    // Affichage des étoiles
  });
      this.socket.on('starLocation', function (starLocation) {
        if (self.star) self.star.collider();
        self.star = self.physics.add.image(starLocation.x, starLocation.y, 'star');
        self.physics.add.collider(this.bullets, self.star, function () {
          this.socket.emit('starCollected');
        }, null, self);
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
