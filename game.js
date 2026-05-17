// =============================================================
//  BOOT SCENE — generates all textures once at startup
// =============================================================
class BootScene extends Phaser.Scene {
  constructor() { super('BootScene'); }

  create() {
    makeGrass(this);
    makePath(this);
    makeTree(this);
    makePlayer(this);
    makePolse(this);
    makeBrus(this);
    makeIs(this);
    makeBallong(this, 0xff3333, 'ballong_red');
    makeBallong(this, 0x3399ff, 'ballong_blue');
    makeBallong(this, 0xffcc00, 'ballong_yellow');
    makeFlagg(this);
    makeBench(this);
    this.scene.start('GameScene');
  }
}

// =============================================================
//  TEXTURE GENERATORS
// =============================================================
function makeGrass(scene) {
  const g = scene.make.graphics({ x: 0, y: 0, add: false });
  g.fillStyle(0x4aac4a);
  g.fillRect(0, 0, 40, 40);
  g.fillStyle(0x3d963d, 0.6);
  [[5, 8], [15, 20], [28, 5], [10, 30], [32, 18]].forEach(([x, y]) => g.fillRect(x, y, 3, 3));
  g.generateTexture('grass', 40, 40);
  g.destroy();
}

function makePath(scene) {
  const g = scene.make.graphics({ x: 0, y: 0, add: false });
  g.fillStyle(0xd4b483);
  g.fillRect(0, 0, 40, 40);
  g.fillStyle(0xc4a473, 0.5);
  g.fillRect(0, 0, 40, 2);
  g.fillRect(0, 38, 40, 2);
  g.generateTexture('path', 40, 40);
  g.destroy();
}

function makeTree(scene) {
  const g = scene.make.graphics({ x: 0, y: 0, add: false });
  g.fillStyle(0x000000, 0.15);
  g.fillEllipse(22, 36, 26, 10);
  g.fillStyle(0x8B4513);
  g.fillRect(16, 24, 8, 16);
  g.fillStyle(0x2a6e2a);
  g.fillCircle(20, 18, 18);
  g.fillStyle(0x3a8a3a);
  g.fillCircle(14, 22, 11);
  g.fillCircle(26, 22, 11);
  g.fillStyle(0x4aaa4a);
  g.fillCircle(20, 14, 12);
  g.fillStyle(0x6acc6a, 0.5);
  g.fillCircle(16, 10, 5);
  g.generateTexture('tree', 40, 40);
  g.destroy();
}

function makePlayer(scene) {
  const g = scene.make.graphics({ x: 0, y: 0, add: false });
  // shadow
  g.fillStyle(0x000000, 0.2);
  g.fillEllipse(16, 36, 24, 8);
  // legs
  g.fillStyle(0x111133);
  g.fillRect(9, 26, 6, 10);
  g.fillRect(17, 26, 6, 10);
  // shoes
  g.fillStyle(0x111111);
  g.fillRect(8, 34, 7, 4);
  g.fillRect(17, 34, 7, 4);
  // body — dark bunad jacket
  g.fillStyle(0x1a1a2e);
  g.fillRect(7, 14, 18, 14);
  // bunad red apron detail
  g.fillStyle(0xcc2222);
  g.fillRect(9, 16, 14, 5);
  // white shirt collar
  g.fillStyle(0xeeeeee);
  g.fillRect(13, 13, 6, 4);
  // head
  g.fillStyle(0xf5cba7);
  g.fillCircle(16, 9, 8);
  // eyes
  g.fillStyle(0x333333);
  g.fillCircle(13, 8, 1.5);
  g.fillCircle(19, 8, 1.5);
  // smile — three dots (Phaser Graphics has no strokeArc)
  g.fillCircle(13, 12, 1.2);
  g.fillCircle(16, 13, 1.2);
  g.fillCircle(19, 12, 1.2);
  // hair
  g.fillStyle(0x7B3F00);
  g.fillRect(8, 2, 16, 9);
  g.fillCircle(16, 3, 8);
  g.generateTexture('player', 32, 40);
  g.destroy();
}

function makePolse(scene) {
  const g = scene.make.graphics({ x: 0, y: 0, add: false });
  // bun
  g.fillStyle(0xe8c07a);
  g.fillRoundedRect(1, 8, 30, 16, 8);
  g.fillStyle(0xd4a55a);
  g.fillRoundedRect(1, 8, 30, 5, { tl: 8, tr: 8, bl: 0, br: 0 });
  // sausage
  g.fillStyle(0xc44a2a);
  g.fillRoundedRect(3, 11, 26, 10, 5);
  g.fillStyle(0xd45a3a, 0.5);
  g.fillRoundedRect(3, 11, 26, 4, { tl: 5, tr: 5, bl: 0, br: 0 });
  // mustard
  g.fillStyle(0xf5c518);
  g.fillRect(5, 16, 22, 2);
  g.generateTexture('polse', 32, 32);
  g.destroy();
}

function makeBrus(scene) {
  const g = scene.make.graphics({ x: 0, y: 0, add: false });
  g.fillStyle(0xcc1111);
  g.fillRoundedRect(7, 5, 18, 24, 4);
  // silver rims
  g.fillStyle(0xbbbbbb);
  g.fillRoundedRect(7, 5, 18, 4, { tl: 4, tr: 4, bl: 0, br: 0 });
  g.fillRoundedRect(7, 25, 18, 4, { tl: 0, tr: 0, bl: 4, br: 4 });
  // label
  g.fillStyle(0xffffff);
  g.fillRect(9, 12, 14, 8);
  g.fillStyle(0xcc1111);
  g.fillRect(10, 13, 12, 2);
  g.fillRect(10, 17, 12, 2);
  // pull tab
  g.fillStyle(0x999999);
  g.fillRoundedRect(13, 3, 6, 4, 2);
  g.generateTexture('brus', 32, 32);
  g.destroy();
}

function makeIs(scene) {
  const g = scene.make.graphics({ x: 0, y: 0, add: false });
  // cone
  g.fillStyle(0xd4a55a);
  g.fillTriangle(16, 31, 5, 14, 27, 14);
  // waffle lines
  g.lineStyle(1, 0xb8894a);
  g.lineBetween(10, 20, 22, 20);
  g.lineBetween(11, 24, 21, 24);
  g.lineBetween(13, 16, 14, 24);
  g.lineBetween(18, 16, 19, 24);
  // scoop
  g.fillStyle(0xffb7c5);
  g.fillCircle(16, 10, 11);
  g.fillStyle(0xff99aa);
  g.fillCircle(20, 13, 7);
  g.fillStyle(0xffdde6, 0.8);
  g.fillCircle(12, 7, 4);
  g.generateTexture('is', 32, 32);
  g.destroy();
}

function makeBallong(scene, color, key) {
  const g = scene.make.graphics({ x: 0, y: 0, add: false });
  g.fillStyle(color);
  g.fillEllipse(16, 13, 22, 26);
  g.fillStyle(0xffffff, 0.35);
  g.fillEllipse(10, 7, 8, 10);
  g.fillStyle(color);
  g.fillTriangle(16, 26, 13, 30, 19, 30);
  g.lineStyle(1, 0x666666);
  g.lineBetween(16, 30, 14, 32);
  g.generateTexture(key, 32, 32);
  g.destroy();
}

function makeFlagg(scene) {
  const g = scene.make.graphics({ x: 0, y: 0, add: false });
  g.fillStyle(0x9B7A40);
  g.fillRect(7, 2, 3, 30);
  g.fillStyle(0xEF2B2D);
  g.fillRect(10, 2, 22, 18);
  g.fillStyle(0xFFFFFF);
  g.fillRect(10, 9, 22, 4);
  g.fillRect(17, 2, 4, 18);
  g.fillStyle(0x002868);
  g.fillRect(10, 10, 22, 2);
  g.fillRect(18, 2, 2, 18);
  g.generateTexture('flagg', 32, 32);
  g.destroy();
}

function makeBench(scene) {
  const g = scene.make.graphics({ x: 0, y: 0, add: false });
  g.fillStyle(0x8B6914);
  g.fillRect(4, 8, 32, 4);   // backrest
  g.fillRect(4, 12, 32, 6);  // seat
  g.fillRect(4, 18, 5, 10);  // left leg
  g.fillRect(31, 18, 5, 10); // right leg
  g.generateTexture('bench', 40, 30);
  g.destroy();
}

// =============================================================
//  MAP  (0=grass, 1=path, 2=tree, 3=bench)
//  20 cols × 15 rows × 40px = 800 × 600
// =============================================================
const TILE = 40;
const MAP = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 2, 0, 0, 0, 0, 2, 0, 3, 3, 0, 2, 0, 0, 0, 0, 2, 1, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 1, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 3, 0, 0, 0, 0, 0, 0, 3, 1, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 1, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 1, 2, 0, 0, 0, 0, 2, 0, 3, 3, 0, 2, 0, 0, 0, 0, 2, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

const ITEM_TYPES  = ['polse', 'brus', 'is', 'flagg', 'ballong_red', 'ballong_blue', 'ballong_yellow'];
const ITEM_LABELS = {
  polse: 'Pølse!', brus: 'Brus!', is: 'Is!',
  flagg: 'Flagg!', ballong_red: 'Ballong!', ballong_blue: 'Ballong!', ballong_yellow: 'Ballong!',
};
const TOTAL_ITEMS = 21;
const GAME_TIME   = 90;

// =============================================================
//  GAME SCENE
// =============================================================
class GameScene extends Phaser.Scene {
  constructor() { super('GameScene'); }

  create() {
    this.score    = 0;
    this.timeLeft = GAME_TIME;
    this.gameOver = false;

    this._buildMap();
    this._spawnNPCs();
    this._spawnItems();
    this._createPlayer();
    this._setupInput();
    this._setupHUD();
    this._setupTimer();

    this.physics.add.overlap(this.player, this.items, this._collectItem, null, this);
    this.physics.add.collider(this.player, this.obstacles);
  }

  _buildMap() {
    this.obstacles = this.physics.add.staticGroup();

    for (let row = 0; row < MAP.length; row++) {
      for (let col = 0; col < MAP[row].length; col++) {
        const x = col * TILE + TILE / 2;
        const y = row * TILE + TILE / 2;
        const t = MAP[row][col];

        this.add.image(x, y, t === 1 ? 'path' : 'grass');

        if (t === 2) {
          const tr = this.obstacles.create(x, y, 'tree');
          tr.setDepth(1);
          tr.body.setSize(22, 14);
          tr.body.setOffset(9, 26);
          tr.refreshBody();
        } else if (t === 3) {
          this.add.image(x, y + 5, 'bench').setDepth(0.5);
        }
      }
    }
  }

  _spawnNPCs() {
    const positions = [[5, 3], [15, 3], [3, 6], [16, 6], [6, 10], [14, 10], [3, 11], [16, 11]];
    const tints     = [0xffcccc, 0xccffcc, 0xccccff, 0xffffcc, 0xffccff, 0xccffff];
    positions.forEach(([col, row], i) => {
      if (MAP[row] && MAP[row][col] !== 2) {
        this.add.image(col * TILE + TILE / 2, row * TILE + TILE / 2, 'player')
          .setTint(tints[i % tints.length])
          .setDepth(0.9)
          .setAlpha(0.85);
      }
    });
  }

  _spawnItems() {
    this.items = this.physics.add.staticGroup();

    const walkable = [];
    for (let row = 1; row < MAP.length - 1; row++) {
      for (let col = 1; col < MAP[row].length - 1; col++) {
        if (MAP[row][col] !== 2 && MAP[row][col] !== 3) {
          walkable.push({ col, row });
        }
      }
    }
    Phaser.Utils.Array.Shuffle(walkable);

    for (let i = 0; i < TOTAL_ITEMS && i < walkable.length; i++) {
      const { col, row } = walkable[i];
      const x    = col * TILE + TILE / 2;
      const y    = row * TILE + TILE / 2;
      const type = ITEM_TYPES[i % ITEM_TYPES.length];
      const spr  = this.items.create(x, y, type).setDepth(1.5);
      spr.itemType = type;

      this.tweens.add({
        targets: spr,
        scaleX: 1.12, scaleY: 1.12,
        duration: 700 + Math.random() * 500,
        yoyo: true, repeat: -1,
        ease: 'Sine.InOut',
        delay: Math.random() * 600,
      });
    }
  }

  _createPlayer() {
    this.player = this.physics.add.sprite(400, 300, 'player');
    this.player.setCollideWorldBounds(true);
    this.player.setDepth(2);
    this.player.body.setSize(20, 16);
    this.player.body.setOffset(6, 22);
  }

  _setupInput() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.wasd    = this.input.keyboard.addKeys({
      up:    Phaser.Input.Keyboard.KeyCodes.W,
      down:  Phaser.Input.Keyboard.KeyCodes.S,
      left:  Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    });
  }

  _setupHUD() {
    this.add.rectangle(400, 18, 800, 36, 0x000000, 0.45).setDepth(9).setScrollFactor(0);

    this.scoreText = this.add.text(12, 9, '', {
      fontSize: '17px', fill: '#ffffff',
      stroke: '#000', strokeThickness: 3,
    }).setDepth(10).setScrollFactor(0);

    this.timerText = this.add.text(788, 9, '', {
      fontSize: '17px', fill: '#ffffff',
      stroke: '#000', strokeThickness: 3,
      align: 'right',
    }).setDepth(10).setScrollFactor(0).setOrigin(1, 0);

    this.add.text(400, 9, '17. mai-festen!', {
      fontSize: '17px', fill: '#FFD700',
      stroke: '#000', strokeThickness: 2,
    }).setDepth(10).setScrollFactor(0).setOrigin(0.5, 0);

    this._updateHUD();
  }

  _updateHUD() {
    this.scoreText.setText(`Samlet: ${this.score}/${TOTAL_ITEMS}`);
    const t = this.timeLeft;
    this.timerText.setText(`Tid: ${t}s`);
    this.timerText.setFill(t <= 15 ? '#ff4444' : '#ffffff');
  }

  _setupTimer() {
    this.timerEvent = this.time.addEvent({
      delay: 1000,
      repeat: GAME_TIME - 1,
      callback: () => {
        if (this.gameOver) return;
        this.timeLeft--;
        this._updateHUD();
        if (this.timeLeft <= 0) this._endGame(false);
      },
    });
  }

  _collectItem(player, item) {
    if (this.gameOver) return;
    const label = ITEM_LABELS[item.itemType] || '+1';
    const { x, y } = item;
    item.destroy();
    this.score++;
    this._updateHUD();

    // Floating label
    const txt = this.add.text(x, y - 10, label, {
      fontSize: '19px', fill: '#FFD700',
      stroke: '#000', strokeThickness: 3,
    }).setDepth(15).setOrigin(0.5);
    this.tweens.add({
      targets: txt, y: y - 46, alpha: 0,
      duration: 700, ease: 'Cubic.Out',
      onComplete: () => txt.destroy(),
    });

    // Particle burst
    for (let i = 0; i < 5; i++) {
      const dot   = this.add.circle(x, y, 4, 0xFFD700).setDepth(14);
      const angle = (i / 5) * Math.PI * 2;
      this.tweens.add({
        targets: dot,
        x: x + Math.cos(angle) * 30,
        y: y + Math.sin(angle) * 30,
        alpha: 0, scaleX: 0, scaleY: 0,
        duration: 500,
        onComplete: () => dot.destroy(),
      });
    }

    if (this.score >= TOTAL_ITEMS) this._endGame(true);
  }

  _endGame(won) {
    if (this.gameOver) return;
    this.gameOver = true;
    this.player.setVelocity(0, 0);
    this.timerEvent.remove();

    const flash = this.add.rectangle(400, 300, 800, 600, 0xffffff).setDepth(20).setAlpha(0);
    this.tweens.add({
      targets: flash, alpha: 0.8,
      duration: 300, yoyo: true,
      onComplete: () => this.scene.start('EndScene', {
        won, score: this.score, total: TOTAL_ITEMS, timeLeft: this.timeLeft,
      }),
    });
  }

  update() {
    if (this.gameOver) return;

    const speed = 160;
    const c = this.cursors;
    const w = this.wasd;

    let vx = 0, vy = 0;
    if (c.left.isDown  || w.left.isDown)  vx = -speed;
    if (c.right.isDown || w.right.isDown) vx =  speed;
    if (c.up.isDown    || w.up.isDown)    vy = -speed;
    if (c.down.isDown  || w.down.isDown)  vy =  speed;

    if (vx !== 0 && vy !== 0) { vx *= 0.707; vy *= 0.707; }

    this.player.setVelocity(vx, vy);
    if (vx < 0) this.player.setFlipX(true);
    else if (vx > 0) this.player.setFlipX(false);
  }
}

// =============================================================
//  END SCENE
// =============================================================
class EndScene extends Phaser.Scene {
  constructor() { super('EndScene'); }

  create(data) {
    const { won, score, total, timeLeft } = data;

    this.add.rectangle(400, 300, 800, 600, won ? 0x1a4a8a : 0x2a2a2a);
    this.add.rectangle(400, 500, 800, 200, won ? 0x2a6a2a : 0x1a1a1a);

    // Norwegian flag
    const g = this.add.graphics();
    const [fx, fy, fw, fh] = [360, 30, 120, 80];
    g.fillStyle(0x9B7A40);  g.fillRect(fx - 4, fy, 4, fh + 30);
    g.fillStyle(0xEF2B2D);  g.fillRect(fx, fy, fw, fh);
    g.fillStyle(0xFFFFFF);  g.fillRect(fx, fy + 31, fw, 18);  g.fillRect(fx + 42, fy, 18, fh);
    g.fillStyle(0x002868);  g.fillRect(fx, fy + 35, fw, 10);  g.fillRect(fx + 46, fy, 10, fh);

    this.add.text(400, 148, won ? 'Gratulerer med dagen!' : 'Tiden er ute!', {
      fontSize: '36px', fill: '#ffffff',
      stroke: '#000000', strokeThickness: 5,
    }).setOrigin(0.5);

    const percent = Math.round((score / total) * 100);
    const medal   = percent === 100 ? '🏆' : percent >= 70 ? '🥈' : '🥉';
    this.add.text(400, 200, medal, { fontSize: '42px' }).setOrigin(0.5);

    this.add.text(400, 258, `Du samlet ${score} av ${total} ting (${percent}%)`, {
      fontSize: '22px', fill: '#ffffff', stroke: '#000000', strokeThickness: 3,
    }).setOrigin(0.5);

    if (won) {
      this.add.text(400, 300, `Tid til overs: ${timeLeft} sekunder!`, {
        fontSize: '18px', fill: '#FFD700', stroke: '#000', strokeThickness: 2,
      }).setOrigin(0.5);
    }

    // Item icon row
    ['polse', 'brus', 'is', 'flagg', 'ballong_red', 'ballong_blue', 'ballong_yellow']
      .forEach((type, i) => this.add.image(190 + i * 68, 350, type).setScale(0.9));

    // Fun fact
    const facts = [
      'Vi spiser ca. 3 millioner pølser på 17. mai!',
      'Grunnloven ble undertegnet på Eidsvoll i 1814.',
      'Barnetoget i Oslo er verdens lengste barnetog!',
      'Bunad er det tradisjonelle plagget på nasjonaldagen.',
      '17. mai markerer Norges selvstendighet fra Danmark.',
    ];
    this.add.text(400, 400, facts[Math.floor(Math.random() * facts.length)], {
      fontSize: '14px', fill: '#ccddff',
      align: 'center', wordWrap: { width: 640 },
    }).setOrigin(0.5);

    // Restart button
    const btn = this.add.text(400, 468, '  Spill igjen!  ', {
      fontSize: '26px', fill: '#ffffff',
      backgroundColor: '#EF2B2D',
      padding: { x: 24, y: 12 },
      stroke: '#000000', strokeThickness: 3,
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    btn.on('pointerover', () => { btn.setStyle({ fill: '#FFD700' }); btn.setScale(1.05); });
    btn.on('pointerout',  () => { btn.setStyle({ fill: '#ffffff' }); btn.setScale(1); });
    btn.on('pointerdown', () => this.scene.start('GameScene'));

    this.input.keyboard.once('keydown-SPACE', () => this.scene.start('GameScene'));
    this.input.keyboard.once('keydown-ENTER', () => this.scene.start('GameScene'));

    this.add.text(400, 530, 'Trykk Space eller Enter for å spille igjen', {
      fontSize: '13px', fill: '#888899',
    }).setOrigin(0.5);

    this.add.text(400, 560, 'Beveg deg med piltaster eller WASD', {
      fontSize: '13px', fill: '#666677',
    }).setOrigin(0.5);

    if (won) this._spawnConfetti();
  }

  _spawnConfetti() {
    const colors = [0xEF2B2D, 0xFFFFFF, 0x002868, 0xFFD700];
    for (let i = 0; i < 60; i++) {
      const x    = Math.random() * 800;
      const rect = this.add.rectangle(x, -10, 8, 8,
        colors[Math.floor(Math.random() * colors.length)]).setDepth(20);
      this.tweens.add({
        targets: rect,
        y: 640,
        x: x + (Math.random() - 0.5) * 120,
        angle: Math.random() * 720 - 360,
        duration: 2000 + Math.random() * 2000,
        delay: Math.random() * 1500,
        ease: 'Linear',
        onComplete: () => rect.destroy(),
      });
    }
  }
}

// =============================================================
//  PHASER CONFIG + LAUNCH
// =============================================================
new Phaser.Game({
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: '#4aac4a',
  physics: {
    default: 'arcade',
    arcade: { debug: false },
  },
  scene: [BootScene, GameScene, EndScene],
});
