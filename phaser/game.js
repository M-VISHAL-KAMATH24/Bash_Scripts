const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 400,
  backgroundColor: "#87CEEB",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 800 },
      debug: true
    }
  },
  scene: {
    preload,
    create,
    update
  }
};

const game = new Phaser.Game(config);

let player;
let ground;

function preload() {
  this.load.image("player", "assets/player.png");
}

function create() {
  // ─── RECTANGLE GROUND ─────────────────────────
  ground = this.add.rectangle(400, 380, 800, 40, 0x444444);

  // Enable physics on rectangle
  this.physics.add.existing(ground, true); // true = STATIC body

  // ─── PLAYER ──────────────────────────────────
  player = this.physics.add.sprite(120, 200, "player");

  player.setScale(0.25);
  player.setCollideWorldBounds(true);

  // Adjust hitbox
  player.body.setSize(
    player.width * 0.4,
    player.height * 0.8
  );
  player.body.setOffset(
    player.width * 0.3,
    player.height * 0.2
  );

  // ─── COLLISION ────────────────────────────────
  this.physics.add.collider(player, ground);
}

function update() {
  // nothing yet
}
