let bestScore = 0;

// ─────────────────────────────────────────────
// MENU SCENE
// ─────────────────────────────────────────────
class MenuScene extends Phaser.Scene {
  constructor() {
    super("MenuScene");
  }

  create() {
    this.add.text(400, 150, "ENDLESS RUNNER", {
      fontSize: "40px",
      color: "#000"
    }).setOrigin(0.5);

    this.add.text(400, 220, "Press SPACE to Start", {
      fontSize: "20px",
      color: "#000"
    }).setOrigin(0.5);

    this.input.keyboard.once("keydown-SPACE", () => {
      this.scene.start("GameScene");
    });
  }
}

// ─────────────────────────────────────────────
// GAME SCENE
// ─────────────────────────────────────────────
class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }

  preload() {
    this.load.image("player", "assets/player.png");
    this.load.audio("jumpSound", "assets/jump.mp3");
    this.load.audio("hitSound", "assets/hit.mp3");
  }

  create() {
    this.isGameOver = false;
    this.score = 0;

    // ─── GROUNDS ─────────────────────────────
    this.ground1 = this.add.rectangle(400, 380, 800, 40, 0x444444);
    this.ground2 = this.add.rectangle(1200, 380, 800, 40, 0x444444);

    this.physics.add.existing(this.ground1, true);
    this.physics.add.existing(this.ground2, true);

    // ─── PLAYER ──────────────────────────────
    this.player = this.physics.add.sprite(120, 200, "player");
    this.player.setScale(0.25);
    this.player.setCollideWorldBounds(true);

    this.player.body.setSize(this.player.width * 0.4, this.player.height * 0.8);
    this.player.body.setOffset(this.player.width * 0.3, this.player.height * 0.2);

    this.physics.add.collider(this.player, this.ground1);
    this.physics.add.collider(this.player, this.ground2);

    // ─── INPUT ───────────────────────────────
    this.cursors = this.input.keyboard.createCursorKeys();

    // ─── AUDIO ───────────────────────────────
    this.jumpSound = this.sound.add("jumpSound", { volume: 0.5 });
    this.hitSound = this.sound.add("hitSound", { volume: 0.7 });

    // ─── SCORE UI ────────────────────────────
    this.scoreText = this.add.text(20, 20, "Score: 0", {
      fontSize: "20px",
      color: "#000"
    });

    // ─── OBSTACLES ───────────────────────────
    this.obstacles = this.physics.add.group({
      allowGravity: false,
      immovable: true
    });

    this.obstacleTimer = this.time.addEvent({
      delay: 1500,
      callback: this.spawnObstacle,
      callbackScope: this,
      loop: true
    });

    this.physics.add.collider(
      this.player,
      this.obstacles,
      this.gameOver,
      null,
      this
    );
  }

  spawnObstacle() {
    if (this.isGameOver) return;

    const obstacle = this.add.rectangle(850, 350, 30, 50, 0xff0000);
    this.physics.add.existing(obstacle);

    obstacle.body.allowGravity = false;
    obstacle.body.setImmovable(true);

    this.obstacles.add(obstacle);
  }

  gameOver() {
    if (this.isGameOver) return;

    this.isGameOver = true;
    this.hitSound.play();
    this.physics.pause();
    this.obstacleTimer.remove();

    bestScore = Math.max(bestScore, Math.floor(this.score));

    this.time.delayedCall(800, () => {
      this.scene.start("GameOverScene", {
        score: Math.floor(this.score),
        best: bestScore
      });
    });
  }

  update(time, delta) {
    if (this.isGameOver) return;

    const dt = delta / 1000;

    // SCORE
    this.score += delta * 0.01;
    this.scoreText.setText("Score: " + Math.floor(this.score));

    // MOVE GROUNDS
    this.ground1.x -= 200 * dt;
    this.ground2.x -= 200 * dt;

    this.ground1.body.updateFromGameObject();
    this.ground2.body.updateFromGameObject();

    if (this.ground1.x <= -400) this.ground1.x = this.ground2.x + 800;
    if (this.ground2.x <= -400) this.ground2.x = this.ground1.x + 800;

    // MOVE OBSTACLES
    this.obstacles.children.iterate(obstacle => {
      if (!obstacle) return;

      obstacle.x -= 200 * dt;
      obstacle.body.updateFromGameObject();

      if (obstacle.x < -50) obstacle.destroy();
    });

    // JUMP
    if (
      (this.cursors.space.isDown || this.cursors.up.isDown) &&
      this.player.body.touching.down
    ) {
      this.player.setVelocityY(-500);
      this.jumpSound.play();
    }
  }
}

// ─────────────────────────────────────────────
// GAME OVER SCENE
// ─────────────────────────────────────────────
class GameOverScene extends Phaser.Scene {
  constructor() {
    super("GameOverScene");
  }

  init(data) {
    this.score = data.score;
    this.best = data.best;
  }

  create() {
    this.add.text(400, 150, "GAME OVER", {
      fontSize: "40px",
      color: "#ff0000"
    }).setOrigin(0.5);

    this.add.text(400, 210, `Score: ${this.score}`, {
      fontSize: "20px",
      color: "#000"
    }).setOrigin(0.5);

    this.add.text(400, 240, `Best: ${this.best}`, {
      fontSize: "20px",
      color: "#000"
    }).setOrigin(0.5);

    this.add.text(400, 290, "Press SPACE to Restart", {
      fontSize: "18px",
      color: "#000"
    }).setOrigin(0.5);

    this.input.keyboard.once("keydown-SPACE", () => {
      this.scene.start("GameScene");
    });
  }
}

// ─────────────────────────────────────────────
// GAME CONFIG
// ─────────────────────────────────────────────
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 400,
  backgroundColor: "#87CEEB",
  physics: {
    default: "arcade",
    arcade: { gravity: { y: 800 }, debug: false }
  },
  scene: [MenuScene, GameScene, GameOverScene]
};

new Phaser.Game(config);
