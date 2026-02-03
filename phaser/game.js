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
  scene: { preload, create, update }
};

const game = new Phaser.Game(config);

let player;
let ground1;
let ground2;
let cursors;
let obstacles;
let obstacleTimer;
let gameOverText;
let isGameOver = false;

// AUDIO
let jumpSound;
let hitSound;

const GROUND_SPEED = 200;
const OBSTACLE_SPEED = 200;

function preload() {
  this.load.image("player", "assets/player.png");

  // AUDIO
  this.load.audio("jumpSound", "assets/jump.mp3");
  this.load.audio("hitSound", "assets/hit.mp3");
}

function create() {
  // ─── GROUNDS ───────────────────────────────
  ground1 = this.add.rectangle(400, 380, 800, 40, 0x444444);
  ground2 = this.add.rectangle(1200, 380, 800, 40, 0x444444);

  this.physics.add.existing(ground1, true);
  this.physics.add.existing(ground2, true);

  // ─── PLAYER ────────────────────────────────
  player = this.physics.add.sprite(120, 200, "player");
  player.setScale(0.25);
  player.setCollideWorldBounds(true);

  player.body.setSize(player.width * 0.4, player.height * 0.8);
  player.body.setOffset(player.width * 0.3, player.height * 0.2);

  this.physics.add.collider(player, ground1);
  this.physics.add.collider(player, ground2);

  // ─── INPUT ─────────────────────────────────
  cursors = this.input.keyboard.createCursorKeys();

  // ─── AUDIO SETUP ───────────────────────────
  jumpSound = this.sound.add("jumpSound", { volume: 0.5 });
  hitSound = this.sound.add("hitSound", { volume: 0.7 });

  // ─── OBSTACLES ─────────────────────────────
  obstacles = this.physics.add.group({
    allowGravity: false,
    immovable: true
  });

  obstacleTimer = this.time.addEvent({
    delay: 1500,
    callback: spawnObstacle,
    callbackScope: this,
    loop: true
  });

  this.physics.add.collider(player, obstacles, gameOver, null, this);

  // ─── GAME OVER TEXT ────────────────────────
  gameOverText = this.add.text(400, 200, "GAME OVER", {
    fontSize: "48px",
    color: "#ff0000"
  }).setOrigin(0.5).setVisible(false);
}

function spawnObstacle() {
  if (isGameOver) return;

  const obstacle = this.add.rectangle(850, 350, 30, 50, 0xff0000);
  this.physics.add.existing(obstacle);

  obstacle.body.allowGravity = false;
  obstacle.body.setImmovable(true);

  obstacles.add(obstacle);
}

function gameOver() {
  if (isGameOver) return;

  isGameOver = true;

  hitSound.play();

  this.physics.pause();
  obstacleTimer.remove();

  gameOverText.setVisible(true);
}

function update(time, delta) {
  if (isGameOver) return;

  const dt = delta / 1000;

  // ─── MOVE GROUNDS ──────────────────────────
  ground1.x -= GROUND_SPEED * dt;
  ground2.x -= GROUND_SPEED * dt;

  ground1.body.updateFromGameObject();
  ground2.body.updateFromGameObject();

  if (ground1.x <= -400) ground1.x = ground2.x + 800;
  if (ground2.x <= -400) ground2.x = ground1.x + 800;

  // ─── MOVE OBSTACLES ────────────────────────
  obstacles.children.iterate(obstacle => {
    if (!obstacle) return;

    obstacle.x -= OBSTACLE_SPEED * dt;
    obstacle.body.updateFromGameObject();

    if (obstacle.x < -50) obstacle.destroy();
  });

  // ─── JUMP ─────────────────────────────────
  if (
    (cursors.space.isDown || cursors.up.isDown) &&
    player.body.touching.down
  ) {
    player.setVelocityY(-500);
    jumpSound.play();
  }
}
