const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 1500,
    height: 900,
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

function preload() {

 /* this.load.image("Map", "assets/tilesets/Map.jpg");
  this.load.image("tiles", "assets/tilesets/server_objects.png");
  this.load.image("tile1", "assets/tilesets/tile1.png");
  this.load.image("walkable", "assets/tilesets/walkable.png");
  this.load.tilemapTiledJSON("map", "assets/tilemaps/MAPUF.json");*/
  this.load.image('fond','assets/Background.png');
  this.load.image('wall','assets/border.png');
  this.load.image('ship', 'assets/attack1.png');
  this.load.image('otherPlayer', 'assets/attack2.png');
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



function update() {  
  if (this.ship) {
    if (this.cursors.left.isDown) {
      this.ship.setVelocityX(-80);
    } else if (this.cursors.right.isDown) {
      this.ship.setVelocityX(80);
    } else if (this.cursors.down.isDown){
      this.ship.setVelocityY(80);
    }else if (this.cursors.up.isDown){
      this.ship.setVelocityY(-80);
    }
  
  
    // this.physics.world.wrap(this.ship, 5);
  }
}
var platforms;
function create() {
  
 /* const map = this.make.tilemap({ key: "map" });
  // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
  // Phaser's cache (i.e. the name you used in preload)
  const tileset1 = map.addTilesetImage("Map caro", "Map");
  const tileset2 = map.addTilesetImage("tile1","tile1");


  // Parameters: layer name (or index) from Tiled, tileset, x, y
  const worldLayer = map.createStaticLayer("Border", tileset1, 0, 0).setScale(0.5);
  const belowLayer = map.createStaticLayer("Backgrounds", tileset1, 0, 0).setScale(0.5);
  const aboveLayer = map.createStaticLayer("Colliders", tileset2, 0, 0);*/
  // Debut de la map
  
  this.add.image(750,450,'fond');

  platforms = this.physics.add.staticGroup();

  platforms.create(750, 450, 'wall');
  this.physics.add.collider(ship, platforms);
  //Fin de la map
  this.ship.depth = 1;
  this.ship.setDepth(1);
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
