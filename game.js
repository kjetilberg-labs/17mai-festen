'use strict';

// =============================================================
//  CONSTANTS
// =============================================================
const TILE        = 40;
const MAP_COLS    = 48;
const MAP_ROWS    = 32;
const WORLD_W     = MAP_COLS * TILE;   // 1920 px
const WORLD_H     = MAP_ROWS * TILE;   // 1280 px
const SPEED       = 200;
const INTERACT_R  = 72;
const CAMERA_ZOOM = 1.4;
const TOTAL_ITEMS = 21;
const GAME_TIME   = 120;

const T_GRASS = 0;
const T_PATH  = 1;
const T_TREE  = 2;

// =============================================================
//  LOCALISATION
// =============================================================
const LANG_DATA = {
  no: {
    title:         '17. mai-festen!',
    subtitle:      'Samle festmat og feir grunnlovsdagen!',
    btn_start:     'Start spill',
    btn_credits:   'Krediteringer',
    btn_language:  'Språk: Norsk',
    btn_back:      'Tilbake',
    btn_again:     'Spill igjen!',
    btn_menu:      'Til menyen',
    hud_collected: 'Samlet',
    hud_time:      'Tid',
    hud_music:     'M = lyd',
    hint_close:    '[E] Lukk',
    hint_continue: '[E] Fortsett',
    hint_controls: 'Piltaster / WASD for å bevege deg · E for å snakke',
    hint_replay:   'Space / Enter for å spille igjen',
    end_won:       'Gratulerer med dagen!',
    end_lost:      'Tiden er ute!',
    end_score:     (s, tot) => `Du samlet ${s} av ${tot} ting`,
    end_time_left: (s) => `Tid til overs: ${s} sekunder!`,
    credits_title: 'Krediteringer',
    credits_body: [
      'Spill laget med Phaser 3',
      '',
      'Konsept & design',
      'Kjetil Berg',
      '',
      'Musikk',
      'Gammel Jegermarsj',
      '',
      'All grafikk er generert',
      'prosedyralt i JavaScript.',
      '',
      'Gratulerer med dagen!',
    ],
    facts: [
      'Vi spiser ca. 3 millioner pølser på 17. mai!',
      'Grunnloven ble undertegnet på Eidsvoll 17. mai 1814.',
      'Barnetoget i Oslo er verdens lengste barnetog!',
      'Bunad er det tradisjonelle plagget på nasjonaldagen.',
      'Det norske flagget ble vedtatt i 1821 — designet av Fredrik Meltzer.',
      'Kongen hilser fra Slottsbalkongen hvert år på denne dagen.',
    ],
  },
  en: {
    title:         '17th of May Festival!',
    subtitle:      'Collect festival treats and celebrate Norway!',
    btn_start:     'Start Game',
    btn_credits:   'Credits',
    btn_language:  'Language: English',
    btn_back:      'Back',
    btn_again:     'Play Again!',
    btn_menu:      'Main Menu',
    hud_collected: 'Collected',
    hud_time:      'Time',
    hud_music:     'M = music',
    hint_close:    '[E] Close',
    hint_continue: '[E] Continue',
    hint_controls: 'Arrow keys / WASD to move · E to talk',
    hint_replay:   'Space / Enter to play again',
    end_won:       'Happy Constitution Day!',
    end_lost:      'Time\'s up!',
    end_score:     (s, tot) => `You collected ${s} of ${tot} items`,
    end_time_left: (s) => `Time remaining: ${s} seconds!`,
    credits_title: 'Credits',
    credits_body: [
      'Game made with Phaser 3',
      '',
      'Concept & design',
      'Kjetil Berg',
      '',
      'Music',
      'Gammel Jegermarsj',
      '',
      'All graphics are generated',
      'procedurally in JavaScript.',
      '',
      'Happy Constitution Day!',
    ],
    facts: [
      'Norwegians eat ~3 million hot dogs on May 17th!',
      'The Constitution was signed at Eidsvoll on May 17, 1814.',
      'The children\'s parade in Oslo is the world\'s longest!',
      'Bunad is the traditional costume worn on the national day.',
      'The Norwegian flag was adopted in 1821 — designed by Fredrik Meltzer.',
      'The King greets the crowd from the Palace balcony every year.',
    ],
  },
};

let LANG = 'no';
const t = k => LANG_DATA[LANG][k] ?? LANG_DATA.no[k] ?? k;

// Item collect labels
const ITEM_LABEL = {
  polse:          { no: 'Pølse!',   en: 'Hot Dog!'  },
  brus:           { no: 'Brus!',    en: 'Soda!'     },
  is:             { no: 'Is!',      en: 'Ice Cream!'},
  flagg:          { no: 'Flagg!',   en: 'Flag!'     },
  ballong_red:    { no: 'Ballong!', en: 'Balloon!'  },
  ballong_blue:   { no: 'Ballong!', en: 'Balloon!'  },
  ballong_yellow: { no: 'Ballong!', en: 'Balloon!'  },
};
const itemLabel = type => ITEM_LABEL[type]?.[LANG] ?? '+1';

// =============================================================
//  NPC DATA
// =============================================================
const NPC_DATA = [
  {
    id: 'malin', name: 'Malin',
    col: 23, row: 14,
    hair: 0x7B2D1A, jacket: 0x001A4A, skin: 0xf5cba7,
    isFemale: true, patrol: true,
    activity: null,
    lines: [
      'Hei! Gratulerer med dagen!',
      'Jeg elsker 17. mai. Det er noe eget med akkurat denne plassen.',
      'Visste du at den norske grunnloven er den eldste i Europa som fremdeles er i kraft?',
    ],
    linesEn: [
      'Hi! Happy Constitution Day!',
      'I love May 17th. There\'s something special about this spot.',
      'Did you know the Norwegian Constitution is the oldest in Europe still in force?',
    ],
  },
  {
    id: 'sivert', name: 'Sivert',
    col: 40, row: 20,
    hair: 0xC8C0A0, jacket: 0x111133, skin: 0xf0c090,
    isFemale: false,
    activity: 'polse',
    lines: [
      '*tygger* Hei! Vil du ha pølse? Anbefaler sterkt.',
      'Lompe, sennep, ketchup. Noen ganger litt reker også. Ikke døm meg.',
      'Fun fact: vi spiser anslagsvis 3 millioner pølser bare på denne én dagen!',
    ],
    linesEn: [
      '*chewing* Hey! Want a hot dog? Strongly recommend.',
      'Flatbread, mustard, ketchup. Sometimes a little shrimp too. Don\'t judge.',
      'Fun fact: Norwegians eat an estimated 3 million hot dogs on this one day!',
    ],
  },
  {
    id: 'nora', name: 'Nora',
    col: 11, row: 19,
    hair: 0x6B3318, jacket: 0x0A0A2A, skin: 0xf5cba7,
    isFemale: true, seated: true,
    activity: 'brus',
    lines: [
      'Hei! Jeg er Nora. Der borte er Emma — vi er tvillinger!',
      'Jeg er den med brusen. Hun med isen er Emma. Enkelt!',
      'Emma sier hun er eldst med tre minutter. Som om det teller...',
    ],
    linesEn: [
      'Hi! I\'m Nora. Over there is Emma — we\'re twins!',
      'I\'m the one with the soda. The one with ice cream is Emma. Simple!',
      'Emma says she\'s oldest by three minutes. Like that even counts...',
    ],
  },
  {
    id: 'emma', name: 'Emma',
    col: 13, row: 19,
    hair: 0xAA2015, jacket: 0x1A0A20, skin: 0xf5cba7,
    isFemale: true, seated: true,
    activity: 'is',
    lines: [
      'Hei! Emma her. Og ja, Nora er søstera mi — vi er tvillinger!',
      'Vi er alltid sammen på 17. mai. Det er en tradisjon nå!',
      'Grunnloven ble signert 17. mai 1814. Vi har feiret i over 210 år!',
    ],
    linesEn: [
      'Hi! Emma here. And yes, Nora is my sister — we\'re twins!',
      'We\'re always together on May 17th. It\'s a tradition now!',
      'The Constitution was signed May 17, 1814. Over 210 years of celebration!',
    ],
  },
  {
    id: 'aksel', name: 'Aksel',
    col: 23, row: 7,
    hair: 0x222222, jacket: 0x002868, skin: 0xe8b88a,
    isFemale: false, patrol: true,
    activity: 'flagg',
    lines: [
      'NORGE! NORGE! NORGE! Gratulerer med dagen, du!',
      'Ingen dag i hele kalenderåret slår 17. mai. Ingen.',
      'Det norske flagget ble offisielt vedtatt i 1821 — designet av Fredrik Meltzer!',
    ],
    linesEn: [
      'NORWAY! NORWAY! NORWAY! Happy Constitution Day!',
      'No day in the whole year beats May 17th. None.',
      'The Norwegian flag was officially adopted in 1821 — designed by Fredrik Meltzer!',
    ],
  },
];

// =============================================================
//  MAP GENERATION  (48×32 — festival torg layout)
// =============================================================
function generateMap() {
  const map = Array.from({ length: MAP_ROWS }, () => new Array(MAP_COLS).fill(T_GRASS));

  const set   = (r, c, v) => { if (r >= 0 && r < MAP_ROWS && c >= 0 && c < MAP_COLS) map[r][c] = v; };
  const hLine = (r, c1, c2, v)      => { for (let c = c1; c <= c2; c++) set(r, c, v); };
  const vLine = (c, r1, r2, v)      => { for (let r = r1; r <= r2; r++) set(r, c, v); };
  const rect  = (r1, c1, r2, c2, v) => { for (let r = r1; r <= r2; r++) hLine(r, c1, c2, v); };

  // Parade route — full width, rows 13-15
  rect(13, 0, 15, MAP_COLS - 1, T_PATH);

  // Central festival torg — rows 15-25, cols 10-36
  rect(15, 10, 25, 36, T_PATH);

  // Food alley — rows 15-25, cols 37-45
  rect(15, 37, 25, 45, T_PATH);

  // Bandstand / stage clearing — rows 2-12, cols 17-29
  rect(2, 17, 12, 29, T_PATH);
  rect(12, 20, 14, 26, T_PATH); // connector steps to parade

  // Left park paths (cols 0-9, rows 0-12)
  hLine(5,  2, 8,  T_PATH);
  hLine(10, 2, 8,  T_PATH);
  vLine(5,  2, 12, T_PATH);
  vLine(8,  5, 12, T_PATH);

  // Right park paths (cols 30-47, rows 0-12)
  hLine(5,  30, 46, T_PATH);
  hLine(10, 30, 46, T_PATH);
  vLine(34, 2,  12, T_PATH);
  vLine(40, 2,  12, T_PATH);
  vLine(45, 2,  12, T_PATH);

  // South park (rows 26-31)
  hLine(27, 0, MAP_COLS - 1, T_PATH);
  hLine(30, 0, MAP_COLS - 1, T_PATH);
  vLine(10, 25, 30, T_PATH);
  vLine(23, 25, 27, T_PATH);
  vLine(36, 25, 27, T_PATH);
  vLine(44, 25, 30, T_PATH);

  // Trees
  const trees = [
    [0,0],[0,2],[0,4],[0,6],[0,9],[0,12],[0,15],[0,30],[0,32],[0,35],[0,38],[0,41],[0,44],[0,47],
    [1,1],[1,3],[1,7],[1,10],[1,13],[1,16],[1,31],[1,33],[1,36],[1,39],[1,42],[1,46],
    // Left park
    [2,0],[2,3],[2,6],[2,9],
    [3,1],[3,4],[3,7],
    [4,0],[4,3],[4,6],[4,8],
    [6,0],[6,3],[6,6],[6,8],
    [7,1],[7,4],[7,7],
    [8,0],[8,3],[8,6],[8,8],
    [9,1],[9,4],[9,7],
    [11,0],[11,3],[11,6],[11,8],
    [12,1],[12,4],[12,7],
    // Stage flanks
    [2,14],[2,15],[2,16], [2,30],[2,31],[2,32],
    [4,14],[4,15],[4,16], [4,30],[4,31],[4,32],
    [6,14],[6,15],[6,16], [6,30],[6,31],[6,32],
    [8,14],[8,15],[8,16], [8,30],[8,31],[8,32],
    [10,14],[10,15],[10,16],[10,30],[10,31],[10,32],
    [12,14],[12,15],[12,16],[12,30],[12,31],[12,32],
    // Right park
    [2,33],[2,36],[2,38],[2,41],[2,43],[2,46],
    [3,31],[3,35],[3,37],[3,39],[3,42],[3,44],[3,47],
    [4,33],[4,36],[4,38],[4,41],[4,43],[4,46],
    [6,31],[6,33],[6,36],[6,38],[6,41],[6,44],[6,47],
    [7,32],[7,35],[7,37],[7,39],[7,42],[7,46],
    [8,31],[8,33],[8,36],[8,38],[8,41],[8,43],[8,46],
    [9,32],[9,35],[9,37],[9,39],[9,42],[9,44],[9,47],
    [11,31],[11,33],[11,36],[11,38],[11,41],[11,43],[11,46],
    [12,32],[12,35],[12,37],[12,39],[12,42],[12,44],
    // South park
    [25,1],[25,5],[25,8],[25,13],[25,17],[25,20],[25,26],[25,30],[25,33],[25,38],[25,42],[25,46],
    [26,2],[26,6],[26,9],[26,14],[26,18],[26,22],[26,27],[26,31],[26,35],[26,39],[26,43],[26,47],
    [28,1],[28,4],[28,7],[28,12],[28,16],[28,19],[28,24],[28,28],[28,32],[28,37],[28,41],[28,45],
    [29,2],[29,5],[29,9],[29,13],[29,17],[29,21],[29,25],[29,29],[29,33],[29,38],[29,42],[29,46],
    [31,1],[31,4],[31,8],[31,13],[31,17],[31,21],[31,26],[31,30],[31,35],[31,40],[31,44],[31,47],
  ];

  trees.forEach(([r, c]) => {
    if (map[r]?.[c] === T_GRASS) set(r, c, T_TREE);
  });

  NPC_DATA.forEach(({ col, row }) => {
    for (let dr = -2; dr <= 2; dr++)
      for (let dc = -3; dc <= 3; dc++)
        if (map[row + dr]?.[col + dc] === T_TREE) map[row + dr][col + dc] = T_GRASS;
  });

  return map;
}

// =============================================================
//  CHARACTER DRAWING
// =============================================================
function drawCharFront(g, ox, frameIdx, hair, jacket, detail, skin, isFemale) {
  const legs = [[27,9,27,9],[25,11,29,7],[29,7,25,11]];
  const [lsy, lh, rsy, rh] = legs[Math.min(frameIdx, 2)];

  g.fillStyle(0x000000, 0.18);
  g.fillEllipse(ox + 16, 38, 24, 6);

  if (isFemale) {
    g.fillStyle(jacket);
    g.fillRect(ox + 5, 25, 22, 13);
    g.fillStyle(detail);
    g.fillRect(ox + 5, 35, 22, 3);
    g.fillStyle(0x111111);
    g.fillRect(ox + 8,  37, 6, 3);
    g.fillRect(ox + 18, 37, 6, 3);
    g.fillStyle(0xf0f0f0);
    g.fillRect(ox + 7, 14, 18, 12);
    g.fillRect(ox + 4, 15, 4,  9);
    g.fillRect(ox + 24, 15, 4, 9);
    g.fillStyle(0x111133);
    g.fillRect(ox + 8, 14, 16, 12);
    g.fillStyle(detail);
    g.fillRect(ox + 9,  16, 2, 2); g.fillRect(ox + 13, 15, 2, 2);
    g.fillRect(ox + 17, 15, 2, 2); g.fillRect(ox + 21, 16, 2, 2);
    g.fillRect(ox + 10, 20, 2, 2); g.fillRect(ox + 20, 20, 2, 2);
    g.fillStyle(0xffffff, 0.35);
    g.fillRect(ox + 11, 17, 1, 1); g.fillRect(ox + 15, 16, 1, 1); g.fillRect(ox + 19, 16, 1, 1);
  } else {
    g.fillStyle(0xe8e8e8);
    g.fillRect(ox + 9,  lsy + lh - 2, 6, 4);
    g.fillRect(ox + 17, rsy + rh - 2, 6, 4);
    g.fillStyle(0x111111);
    g.fillRect(ox + 8,  lsy + lh + 2, 7, 3);
    g.fillRect(ox + 17, rsy + rh + 2, 7, 3);
    g.fillStyle(0x111122);
    g.fillRect(ox + 9,  lsy, 6, lh);
    g.fillRect(ox + 17, rsy, 6, rh);
    g.fillStyle(0xf0f0f0);
    g.fillRect(ox + 7, 14, 18, 14);
    g.fillRect(ox + 4, 15, 4,  11);
    g.fillRect(ox + 24, 15, 4, 11);
    g.fillStyle(jacket);
    g.fillRect(ox + 8, 14, 16, 14);
    g.fillStyle(0xf0f0f0);
    g.fillRect(ox + 7,  15, 2, 12);
    g.fillRect(ox + 23, 15, 2, 12);
    g.fillRect(ox + 15, 16, 2, 9);
    g.fillStyle(0xD4AF37);
    g.fillRect(ox + 14, 17, 2, 2);
    g.fillRect(ox + 14, 21, 2, 2);
    g.fillRect(ox + 14, 25, 2, 2);
  }

  g.fillStyle(0xeeeeee);
  g.fillRect(ox + 13, 13, 6, 4);
  g.fillStyle(skin);
  g.fillCircle(ox + 16, 9, 8);
  g.fillStyle(0x333333);
  g.fillCircle(ox + 13, 8, 1.5);
  g.fillCircle(ox + 19, 8, 1.5);
  g.fillCircle(ox + 13, 12, 1.2);
  g.fillCircle(ox + 16, 13, 1.2);
  g.fillCircle(ox + 19, 12, 1.2);
  g.fillStyle(hair);
  g.fillRect(ox + 8, 2, 16, 9);
  g.fillCircle(ox + 16, 3, 8);
}

function drawCharBack(g, ox, frameIdx, hair, jacket, isFemale) {
  const legs = [[27,9,27,9],[25,11,29,7],[29,7,25,11]];
  const [lsy, lh, rsy, rh] = legs[Math.min(frameIdx, 2)];

  g.fillStyle(0x000000, 0.18);
  g.fillEllipse(ox + 16, 37, 24, 7);

  if (isFemale) {
    g.fillStyle(jacket);
    g.fillRect(ox + 5, 25, 22, 13);
    g.fillStyle(0xf0f0f0);
    g.fillRect(ox + 7, 14, 18, 12);
    g.fillRect(ox + 4, 15, 4, 9);
    g.fillRect(ox + 24, 15, 4, 9);
    g.fillStyle(0x111133);
    g.fillRect(ox + 8, 14, 16, 12);
    g.fillStyle(0x000000, 0.15);
    g.fillRect(ox + 15, 14, 2, 11);
  } else {
    g.fillStyle(0xe8e8e8);
    g.fillRect(ox + 9,  lsy + lh - 2, 6, 4);
    g.fillRect(ox + 17, rsy + rh - 2, 6, 4);
    g.fillStyle(0x0a0a0a);
    g.fillRect(ox + 8,  lsy + lh + 2, 7, 3);
    g.fillRect(ox + 17, rsy + rh + 2, 7, 3);
    g.fillStyle(0x0d0d22);
    g.fillRect(ox + 9,  lsy, 6, lh);
    g.fillRect(ox + 17, rsy, 6, rh);
    g.fillStyle(jacket);
    g.fillRect(ox + 7, 14, 18, 14);
    g.fillStyle(0x000000, 0.15);
    g.fillRect(ox + 15, 14, 2, 14);
  }

  g.fillStyle(hair);
  g.fillCircle(ox + 16, 8, 8);
  g.fillRect(ox + 8, 4, 16, 6);
}

function drawCharSeated(g, ox, hair, jacket, detail, skin) {
  g.fillStyle(0x000000, 0.18);
  g.fillEllipse(ox + 16, 39, 28, 6);
  g.fillStyle(jacket);
  g.fillRect(ox + 3, 26, 26, 12);
  g.fillStyle(detail);
  g.fillRect(ox + 3, 35, 26, 3);
  g.fillStyle(skin);
  g.fillRect(ox + 9,  35, 5, 4);
  g.fillRect(ox + 18, 35, 5, 4);
  g.fillStyle(0x111111);
  g.fillRect(ox + 8,  38, 7, 3);
  g.fillRect(ox + 17, 38, 7, 3);
  g.fillStyle(0xf0f0f0);
  g.fillRect(ox + 7, 14, 18, 13);
  g.fillRect(ox + 4, 15, 4, 9);
  g.fillRect(ox + 24, 15, 4, 9);
  g.fillStyle(0x111133);
  g.fillRect(ox + 8, 14, 16, 12);
  g.fillStyle(detail);
  g.fillRect(ox + 9,  16, 2, 2); g.fillRect(ox + 13, 15, 2, 2);
  g.fillRect(ox + 17, 15, 2, 2); g.fillRect(ox + 21, 16, 2, 2);
  g.fillRect(ox + 10, 20, 2, 2); g.fillRect(ox + 20, 20, 2, 2);
  g.fillStyle(0xeeeeee);
  g.fillRect(ox + 13, 13, 6, 4);
  g.fillStyle(skin);
  g.fillCircle(ox + 16, 9, 8);
  g.fillStyle(0x333333);
  g.fillCircle(ox + 13, 8, 1.5);
  g.fillCircle(ox + 19, 8, 1.5);
  g.fillCircle(ox + 13, 12, 1.2);
  g.fillCircle(ox + 16, 13, 1.2);
  g.fillCircle(ox + 19, 12, 1.2);
  g.fillStyle(hair);
  g.fillRect(ox + 8, 2, 16, 9);
  g.fillCircle(ox + 16, 3, 8);
}

// =============================================================
//  TEXTURE GENERATORS
// =============================================================
function makeGrass(scene) {
  const g = scene.make.graphics({ x: 0, y: 0, add: false });
  g.fillStyle(0x4aac4a); g.fillRect(0, 0, 40, 40);
  g.fillStyle(0x3d963d, 0.6);
  [[5,8],[15,20],[28,5],[10,30],[32,18],[22,34]].forEach(([x,y]) => g.fillRect(x, y, 3, 3));
  g.generateTexture('grass', 40, 40); g.destroy();
}

function makePath(scene) {
  const g = scene.make.graphics({ x: 0, y: 0, add: false });
  g.fillStyle(0xd4b483); g.fillRect(0, 0, 40, 40);
  g.fillStyle(0xc0a070, 0.4);
  g.fillRect(0, 0, 40, 2); g.fillRect(0, 38, 40, 2);
  g.generateTexture('path', 40, 40); g.destroy();
}

function makeTree(scene) {
  const g = scene.make.graphics({ x: 0, y: 0, add: false });
  g.fillStyle(0x000000, 0.15); g.fillEllipse(22, 36, 26, 10);
  g.fillStyle(0x8B4513);       g.fillRect(16, 24, 8, 16);
  g.fillStyle(0x2a6e2a);       g.fillCircle(20, 18, 18);
  g.fillStyle(0x3a8a3a);       g.fillCircle(14, 22, 11); g.fillCircle(26, 22, 11);
  g.fillStyle(0x4aaa4a);       g.fillCircle(20, 14, 12);
  g.fillStyle(0x6acc6a, 0.5);  g.fillCircle(16, 10, 5);
  g.generateTexture('tree', 40, 40); g.destroy();
}

// Wooden park bench — 2 tiles wide (80×40) for Nora & Emma
function makeBench(scene) {
  const W = 80;
  const g = scene.make.graphics({ x: 0, y: 0, add: false });
  g.fillStyle(0x6B4F14);
  g.fillRect(4,  24, 5, 14);
  g.fillRect(37, 24, 5, 14);
  g.fillRect(71, 24, 5, 14);
  g.fillStyle(0xA07830);
  g.fillRect(2, 19, W - 4, 5);
  g.fillRect(2, 25, W - 4, 4);
  g.fillStyle(0xC09040, 0.35);
  g.fillRect(2, 19, W - 4, 2);
  g.fillStyle(0xA07830);
  g.fillRect(2,  9, W - 4, 5);
  g.fillStyle(0x6B4F14);
  g.fillRect(6,   9, 4, 14);
  g.fillRect(38,  9, 4, 14);
  g.fillRect(70,  9, 4, 14);
  g.generateTexture('bench', W, 40); g.destroy();
}

function makePolse(scene) {
  const g = scene.make.graphics({ x: 0, y: 0, add: false });
  g.fillStyle(0xe8c07a); g.fillRoundedRect(1, 8, 30, 16, 8);
  g.fillStyle(0xd4a55a); g.fillRoundedRect(1, 8, 30, 5, { tl:8,tr:8,bl:0,br:0 });
  g.fillStyle(0xc44a2a); g.fillRoundedRect(3, 11, 26, 10, 5);
  g.fillStyle(0xd45a3a, 0.5); g.fillRoundedRect(3, 11, 26, 4, { tl:5,tr:5,bl:0,br:0 });
  g.fillStyle(0xf5c518); g.fillRect(5, 16, 22, 2);
  g.generateTexture('polse', 32, 32); g.destroy();
}

function makeBrus(scene) {
  const g = scene.make.graphics({ x: 0, y: 0, add: false });
  g.fillStyle(0xcc1111); g.fillRoundedRect(7, 5, 18, 24, 4);
  g.fillStyle(0xbbbbbb);
  g.fillRoundedRect(7, 5, 18, 4, { tl:4,tr:4,bl:0,br:0 });
  g.fillRoundedRect(7, 25, 18, 4, { tl:0,tr:0,bl:4,br:4 });
  g.fillStyle(0xffffff); g.fillRect(9, 12, 14, 8);
  g.fillStyle(0xcc1111); g.fillRect(10, 13, 12, 2); g.fillRect(10, 17, 12, 2);
  g.fillStyle(0x999999); g.fillRoundedRect(13, 3, 6, 4, 2);
  g.generateTexture('brus', 32, 32); g.destroy();
}

function makeIs(scene) {
  const g = scene.make.graphics({ x: 0, y: 0, add: false });
  g.fillStyle(0xd4a55a); g.fillTriangle(16, 31, 5, 14, 27, 14);
  g.lineStyle(1, 0xb8894a);
  g.lineBetween(10, 20, 22, 20); g.lineBetween(11, 24, 21, 24);
  g.lineBetween(13, 16, 14, 24); g.lineBetween(18, 16, 19, 24);
  g.fillStyle(0xffb7c5); g.fillCircle(16, 10, 11);
  g.fillStyle(0xff99aa); g.fillCircle(20, 13, 7);
  g.fillStyle(0xffdde6, 0.8); g.fillCircle(12, 7, 4);
  g.generateTexture('is', 32, 32); g.destroy();
}

function makeFlagg(scene) {
  const g = scene.make.graphics({ x: 0, y: 0, add: false });
  g.fillStyle(0x9B7A40); g.fillRect(7, 2, 3, 30);
  g.fillStyle(0xEF2B2D); g.fillRect(10, 2, 22, 18);
  g.fillStyle(0xFFFFFF); g.fillRect(10, 9, 22, 4); g.fillRect(17, 2, 4, 18);
  g.fillStyle(0x002868); g.fillRect(10, 10, 22, 2); g.fillRect(18, 2, 2, 18);
  g.generateTexture('flagg', 32, 32); g.destroy();
}

function makeBallong(scene, color, key) {
  const g = scene.make.graphics({ x: 0, y: 0, add: false });
  g.fillStyle(color);        g.fillEllipse(16, 13, 22, 26);
  g.fillStyle(0xffffff, 0.35); g.fillEllipse(10, 7, 8, 10);
  g.fillStyle(color);        g.fillTriangle(16, 26, 13, 30, 19, 30);
  g.lineStyle(1, 0x666666);  g.lineBetween(16, 30, 14, 32);
  g.generateTexture(key, 32, 32); g.destroy();
}

// Player spritesheet: 6 frames × 32 px = 192 × 40 px
function makePlayerSheet(scene) {
  const FW = 32, FH = 40;
  const g  = scene.make.graphics({ x: 0, y: 0, add: false });

  for (let f = 0; f < 3; f++) drawCharFront(g, f * FW, f, 0x7B3F00, 0x1a1a2e, 0xcc2222, 0xf5cba7, false);
  for (let f = 0; f < 3; f++) drawCharBack(g, (f + 3) * FW, f, 0x7B3F00, 0x1a1a2e, false);

  g.generateTexture('player', FW * 6, FH); g.destroy();

  const tex = scene.textures.get('player');
  tex.add('f_idle',  0,   0, 0, FW, FH);
  tex.add('f_stepL', 0,  32, 0, FW, FH);
  tex.add('f_stepR', 0,  64, 0, FW, FH);
  tex.add('b_idle',  0,  96, 0, FW, FH);
  tex.add('b_stepL', 0, 128, 0, FW, FH);
  tex.add('b_stepR', 0, 160, 0, FW, FH);

  const A = scene.anims;
  A.create({ key: 'walk_front', frames: [
    { key: 'player', frame: 'f_stepL' }, { key: 'player', frame: 'f_idle' },
    { key: 'player', frame: 'f_stepR' }, { key: 'player', frame: 'f_idle' },
  ], frameRate: 8, repeat: -1 });
  A.create({ key: 'walk_back', frames: [
    { key: 'player', frame: 'b_stepL' }, { key: 'player', frame: 'b_idle' },
    { key: 'player', frame: 'b_stepR' }, { key: 'player', frame: 'b_idle' },
  ], frameRate: 8, repeat: -1 });
  A.create({ key: 'idle_front', frames: [{ key: 'player', frame: 'f_idle' }], frameRate: 1, repeat: -1 });
  A.create({ key: 'idle_back',  frames: [{ key: 'player', frame: 'b_idle' }], frameRate: 1, repeat: -1 });
}

function makeNPCTextures(scene) {
  const FW = 32, FH = 40;
  NPC_DATA.forEach(npc => {
    const { id, hair, jacket, skin, isFemale, seated, patrol } = npc;

    // Portrait (used in dialogue box)
    const gp = scene.make.graphics({ x: 0, y: 0, add: false });
    drawCharFront(gp, 0, 0, hair, jacket, 0xcc2222, skin, isFemale);
    gp.generateTexture(`npc_${id}`, FW, FH); gp.destroy();

    if (seated) {
      const gs = scene.make.graphics({ x: 0, y: 0, add: false });
      drawCharSeated(gs, 0, hair, jacket, 0xcc2222, skin);
      gs.generateTexture(`npc_${id}_seated`, FW, FH); gs.destroy();
    }

    if (patrol) {
      const gw = scene.make.graphics({ x: 0, y: 0, add: false });
      for (let f = 0; f < 3; f++) drawCharFront(gw, f * FW, f, hair, jacket, 0xcc2222, skin, isFemale);
      for (let f = 0; f < 3; f++) drawCharBack(gw, (f + 3) * FW, f, hair, jacket, isFemale);
      gw.generateTexture(`npc_${id}_walk`, FW * 6, FH); gw.destroy();

      const tex = scene.textures.get(`npc_${id}_walk`);
      tex.add(`${id}_f_idle`,  0,   0, 0, FW, FH);
      tex.add(`${id}_f_stepL`, 0,  32, 0, FW, FH);
      tex.add(`${id}_f_stepR`, 0,  64, 0, FW, FH);
      tex.add(`${id}_b_idle`,  0,  96, 0, FW, FH);
      tex.add(`${id}_b_stepL`, 0, 128, 0, FW, FH);
      tex.add(`${id}_b_stepR`, 0, 160, 0, FW, FH);

      const A = scene.anims;
      A.create({ key: `${id}_walk_front`, frames: [
        { key: `npc_${id}_walk`, frame: `${id}_f_stepL` },
        { key: `npc_${id}_walk`, frame: `${id}_f_idle`  },
        { key: `npc_${id}_walk`, frame: `${id}_f_stepR` },
        { key: `npc_${id}_walk`, frame: `${id}_f_idle`  },
      ], frameRate: 6, repeat: -1 });
      A.create({ key: `${id}_walk_back`, frames: [
        { key: `npc_${id}_walk`, frame: `${id}_b_stepL` },
        { key: `npc_${id}_walk`, frame: `${id}_b_idle`  },
        { key: `npc_${id}_walk`, frame: `${id}_b_stepR` },
        { key: `npc_${id}_walk`, frame: `${id}_b_idle`  },
      ], frameRate: 6, repeat: -1 });
    }
  });
}

// =============================================================
//  BOOT SCENE
// =============================================================
class BootScene extends Phaser.Scene {
  constructor() { super('BootScene'); }

  preload() {
    this.load.audio('bgm', 'assets/audio/jegermarsj.mp3');
  }

  create() {
    makeGrass(this); makePath(this); makeTree(this); makeBench(this);
    makePolse(this); makeBrus(this); makeIs(this); makeFlagg(this);
    makeBallong(this, 0xff3333, 'ballong_red');
    makeBallong(this, 0x3399ff, 'ballong_blue');
    makeBallong(this, 0xffcc00, 'ballong_yellow');
    makePlayerSheet(this);
    makeNPCTextures(this);
    this.scene.start('MenuScene');
  }
}

// =============================================================
//  MENU SCENE
// =============================================================
class MenuScene extends Phaser.Scene {
  constructor() { super('MenuScene'); }

  create() {
    const W = 800, H = 600;

    // Tiled grass background
    this.add.tileSprite(W / 2, H / 2, W, H, 'grass');

    // Decorative trees on the wings
    for (let y = 40; y <= H; y += 80) {
      this.add.image(20, y, 'tree').setScale(0.85).setAlpha(0.8);
      this.add.image(W - 20, y, 'tree').setScale(0.85).setAlpha(0.8);
    }

    // Centre panel
    this.add.rectangle(W / 2, H / 2, 400, 510, 0x000000, 0.62)
      .setStrokeStyle(2, 0xEF2B2D, 1);

    // Norwegian flag
    const fx = W / 2 - 90, fy = 52, fw = 180, fh = 120;
    const g = this.add.graphics();
    g.fillStyle(0x9B7A40); g.fillRect(fx - 8, fy - 12, 8, fh + 24);  // pole
    g.fillStyle(0xEF2B2D); g.fillRect(fx, fy, fw, fh);
    g.fillStyle(0xFFFFFF); g.fillRect(fx, fy + 46, fw, 28); g.fillRect(fx + 62, fy, 28, fh);
    g.fillStyle(0x002868); g.fillRect(fx, fy + 54, fw, 12); g.fillRect(fx + 70, fy, 12, fh);

    // Title
    this.add.text(W / 2, 202, t('title'), {
      fontSize: '36px', fontStyle: 'bold',
      fill: '#FFD700', stroke: '#000000', strokeThickness: 4,
    }).setOrigin(0.5);

    this.add.text(W / 2, 248, t('subtitle'), {
      fontSize: '13px', fill: '#cccccc', stroke: '#000', strokeThickness: 2,
    }).setOrigin(0.5);

    // Buttons
    this._btn(W / 2, 308, t('btn_start'),    () => this.scene.start('GameScene'));
    this._btn(W / 2, 378, t('btn_credits'),  () => this.scene.start('CreditsScene'));
    this._btn(W / 2, 448, t('btn_language'), () => {
      LANG = LANG === 'no' ? 'en' : 'no';
      this.scene.restart();
    });

    this.add.text(W / 2, 536, t('hint_controls'), {
      fontSize: '11px', fill: '#888888',
    }).setOrigin(0.5);

    // Enter / Space to start
    this.input.keyboard.once('keydown-ENTER', () => this.scene.start('GameScene'));
    this.input.keyboard.once('keydown-SPACE', () => this.scene.start('GameScene'));
  }

  _btn(x, y, label, cb) {
    const btn = this.add.text(x, y, `  ${label}  `, {
      fontSize: '22px', fill: '#ffffff',
      backgroundColor: '#7A0F0F',
      padding: { x: 22, y: 10 },
      stroke: '#000000', strokeThickness: 3,
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });
    btn.on('pointerover', () => { btn.setStyle({ fill: '#FFD700', backgroundColor: '#EF2B2D' }); btn.setScale(1.04); });
    btn.on('pointerout',  () => { btn.setStyle({ fill: '#ffffff', backgroundColor: '#7A0F0F' }); btn.setScale(1);    });
    btn.on('pointerdown', cb);
    return btn;
  }
}

// =============================================================
//  CREDITS SCENE
// =============================================================
class CreditsScene extends Phaser.Scene {
  constructor() { super('CreditsScene'); }

  create() {
    const W = 800, H = 600;
    this.add.rectangle(W / 2, H / 2, W, H, 0x081A08);

    // Small flag
    const fx = W / 2 - 55, fy = 28, fw = 110, fh = 74;
    const g = this.add.graphics();
    g.fillStyle(0xEF2B2D); g.fillRect(fx, fy, fw, fh);
    g.fillStyle(0xFFFFFF); g.fillRect(fx, fy + 28, fw, 18); g.fillRect(fx + 37, fy, 18, fh);
    g.fillStyle(0x002868); g.fillRect(fx, fy + 33, fw,  8); g.fillRect(fx + 42, fy,  8, fh);

    this.add.text(W / 2, 120, t('credits_title'), {
      fontSize: '30px', fontStyle: 'bold',
      fill: '#FFD700', stroke: '#000', strokeThickness: 3,
    }).setOrigin(0.5);

    const lines = LANG_DATA[LANG].credits_body;
    lines.forEach((line, i) => {
      if (!line) return; // skip blank lines (spacing handled by index)
      this.add.text(W / 2, 162 + i * 30, line, {
        fontSize: '16px', fill: '#ffffff',
        stroke: '#000', strokeThickness: 2,
      }).setOrigin(0.5);
    });

    this._btn(W / 2, 556, t('btn_back'), () => this.scene.start('MenuScene'));
    this.input.keyboard.once('keydown-ESCAPE', () => this.scene.start('MenuScene'));
  }

  _btn(x, y, label, cb) {
    const btn = this.add.text(x, y, `  ${label}  `, {
      fontSize: '20px', fill: '#ffffff',
      backgroundColor: '#7A0F0F',
      padding: { x: 20, y: 8 },
      stroke: '#000', strokeThickness: 2,
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });
    btn.on('pointerover', () => { btn.setStyle({ fill: '#FFD700', backgroundColor: '#EF2B2D' }); btn.setScale(1.04); });
    btn.on('pointerout',  () => { btn.setStyle({ fill: '#ffffff', backgroundColor: '#7A0F0F' }); btn.setScale(1);    });
    btn.on('pointerdown', cb);
    return btn;
  }
}

// =============================================================
//  DIALOGUE MANAGER
// =============================================================
class DialogueManager {
  constructor(scene) {
    this.scene       = scene;
    this.active      = false;
    this._justClosed = false;
    this.npc         = null;
    this.lineIndex   = 0;
    this.doneTyping  = true;
    this._typeEvent  = null;
    this._lines      = [];

    const D = 200;
    this._bg = scene.add.rectangle(0, 0, 100, 100, 0x000000, 0.90)
      .setDepth(D).setVisible(false);
    this._border = scene.add.rectangle(0, 0, 100, 100)
      .setDepth(D - 1).setVisible(false)
      .setStrokeStyle(2, 0xEF2B2D, 1).setFillStyle(0x000000, 0);
    this._nameText = scene.add.text(0, 0, '', {
      fontSize: '15px', fontStyle: 'bold',
      fill: '#FFD700', stroke: '#000', strokeThickness: 3,
    }).setDepth(D + 1).setVisible(false);
    this._bodyText = scene.add.text(0, 0, '', {
      fontSize: '13px', fill: '#ffffff', lineSpacing: 5,
    }).setDepth(D + 1).setVisible(false);
    this._hint = scene.add.text(0, 0, '', {
      fontSize: '11px', fill: '#aaaaaa',
    }).setDepth(D + 1).setVisible(false).setOrigin(1, 1);
    this._portrait = scene.add.image(0, 0, 'player')
      .setDepth(D + 1).setVisible(false).setScale(1.6);
  }

  updateLayout(cam) {
    const { x, y, width, height } = cam.worldView;
    const BOX_H  = Math.round(height * 0.28);
    const padL   = Math.round(width  * 0.03);
    const padB   = Math.round(height * 0.02);
    const boxCY  = y + height - BOX_H / 2 - padB;
    const textX  = x + padL;
    const rightX = x + width - padL;

    this._bg    .setPosition(x + width / 2, boxCY).setSize(width - padL, BOX_H);
    this._border.setPosition(x + width / 2, boxCY).setSize(width - padL + 4, BOX_H + 4);
    this._nameText.setPosition(textX, y + height - BOX_H - padB + 4);
    this._bodyText.setPosition(textX, y + height - BOX_H - padB + 24)
      .setWordWrapWidth(width - padL * 2 - 56);
    this._hint    .setPosition(rightX, y + height - padB / 2);
    this._portrait.setPosition(rightX - 20, boxCY);
  }

  open(npc) {
    if (this._justClosed) return;
    this.npc       = npc;
    this.lineIndex = 0;
    this.active    = true;
    // Choose language-appropriate lines
    this._lines = (LANG === 'en' && npc.data.linesEn) ? npc.data.linesEn : npc.data.lines;
    this._showLine();
  }

  advance() {
    if (!this.active) return;
    if (!this.doneTyping) {
      if (this._typeEvent) { this._typeEvent.remove(false); this._typeEvent = null; }
      this._bodyText.setText(this._lines[this.lineIndex]);
      this.doneTyping = true;
      const isLast = this.lineIndex >= this._lines.length - 1;
      this._hint.setText(isLast ? t('hint_close') : t('hint_continue'));
      return;
    }
    this.lineIndex++;
    if (this.lineIndex >= this._lines.length) this.close();
    else this._showLine();
  }

  close() {
    this.active      = false;
    this._justClosed = true;
    this.npc         = null;
    if (this._typeEvent) { this._typeEvent.remove(false); this._typeEvent = null; }
    [this._bg, this._border, this._nameText, this._bodyText, this._hint, this._portrait]
      .forEach(o => o.setVisible(false));
  }

  tick()     { this._justClosed = false; }
  isActive() { return this.active; }

  _showLine() {
    const text = this._lines[this.lineIndex];
    const last = this.lineIndex >= this._lines.length - 1;

    this._nameText.setText(this.npc.data.name);
    this._bodyText.setText('');
    this._hint.setText('...');
    this._portrait.setTexture(`npc_${this.npc.data.id}`);
    [this._bg, this._border, this._nameText, this._bodyText, this._hint, this._portrait]
      .forEach(o => o.setVisible(true));

    this.doneTyping = false;
    let i = 0;
    this._typeEvent = this.scene.time.addEvent({
      delay: 28,
      repeat: text.length - 1,
      callback: () => {
        i++;
        this._bodyText.setText(text.slice(0, i));
        if (i >= text.length) {
          this.doneTyping = true;
          this._hint.setText(last ? t('hint_close') : t('hint_continue'));
        }
      },
    });
  }
}

// =============================================================
//  GAME SCENE
// =============================================================
class GameScene extends Phaser.Scene {
  constructor() { super('GameScene'); }

  create() {
    this._map      = generateMap();
    this._lastDir  = 'front';
    this._score    = 0;
    this._timeLeft = GAME_TIME;
    this._gameOver = false;

    this._buildWorld();
    this._createPlayer();
    this._createNPCs();
    this._setupCamera();
    this._setupInput();

    this.dialogue = new DialogueManager(this);

    this._spawnItems();
    this._setupHUD();
    this._setupTimer();

    this.physics.add.overlap(this.player, this._items, this._collectItem, null, this);

    // Background music
    const prev = this.sound.get('bgm');
    if (prev) prev.destroy();
    this._music = this.sound.add('bgm', { loop: true, volume: 0.4 });
    this._music.play();
    this.input.keyboard.on('keydown-M', () => this._music.setMute(!this._music.mute));
  }

  // ---- World ----

  _buildWorld() {
    for (let row = 0; row < MAP_ROWS; row++) {
      for (let col = 0; col < MAP_COLS; col++) {
        const x   = col * TILE + TILE / 2;
        const y   = row * TILE + TILE / 2;
        const key = this._map[row][col] === T_PATH ? 'path' : 'grass';
        this.add.image(x, y, key).setDepth(0);
      }
    }

    // Bench (80 px wide, centred on col 12, row 19)
    this.add.image(12 * TILE + TILE / 2, 19 * TILE + TILE / 2, 'bench').setDepth(0.8);

    // Flag poles along the parade (row 12, every 4 cols)
    for (let col = 1; col < MAP_COLS; col += 4) {
      this.add.image(col * TILE + TILE / 2, 12 * TILE + TILE / 2, 'flagg')
        .setDepth(1.2).setScale(1.1);
    }

    this.obstacles = this.physics.add.staticGroup();
    for (let row = 0; row < MAP_ROWS; row++) {
      for (let col = 0; col < MAP_COLS; col++) {
        if (this._map[row][col] !== T_TREE) continue;
        const x  = col * TILE + TILE / 2;
        const y  = row * TILE + TILE / 2;
        const tr = this.obstacles.create(x, y, 'tree').setDepth(1);
        tr.body.setSize(22, 14);
        tr.body.setOffset(9, 26);
        tr.refreshBody();
      }
    }
  }

  // ---- Player ----

  _createPlayer() {
    const sx = 23 * TILE + TILE / 2;
    const sy = 20 * TILE + TILE / 2;
    this.player = this.physics.add.sprite(sx, sy, 'player', 'f_idle').setDepth(2);
    this.physics.world.setBounds(0, 0, WORLD_W, WORLD_H);
    this.player.setCollideWorldBounds(true);
    this.player.body.setSize(20, 16);
    this.player.body.setOffset(6, 22);
    this.player.play('idle_front');
    this.physics.add.collider(this.player, this.obstacles);
  }

  // ---- NPCs ----

  _createNPCs() {
    this._npcs = NPC_DATA.map(data => {
      const x = data.col * TILE + TILE / 2;
      const y = data.row * TILE + TILE / 2;

      let sprite;
      if (data.patrol) {
        sprite = this.add.sprite(x, y, `npc_${data.id}_walk`, `${data.id}_f_idle`).setDepth(1.5);
        sprite.play(`${data.id}_walk_front`);
      } else if (data.seated) {
        sprite = this.add.image(x, y, `npc_${data.id}_seated`).setDepth(1.5);
      } else {
        sprite = this.add.image(x, y, `npc_${data.id}`).setDepth(1.5);
      }

      const nameTag = this.add.text(x, y - 30, data.name, {
        fontSize: '11px', fill: '#ffffff',
        stroke: '#000000', strokeThickness: 3,
        backgroundColor: '#00000077',
        padding: { x: 4, y: 2 },
      }).setDepth(3).setOrigin(0.5, 1);

      let actSprite = null;
      if (data.activity) {
        actSprite = this.add.image(x + 18, y - 8, data.activity).setScale(0.65).setDepth(2);
        this.tweens.add({
          targets: actSprite, y: actSprite.y - 4,
          duration: 1000 + data.col * 7, yoyo: true, repeat: -1, ease: 'Sine.InOut',
        });
      }

      const prompt = this.add.text(x, y - 48, ' E ', {
        fontSize: '13px', fontStyle: 'bold',
        fill: '#FFD700', stroke: '#000000', strokeThickness: 3,
        backgroundColor: '#000000aa',
        padding: { x: 5, y: 3 },
      }).setDepth(4).setOrigin(0.5, 1).setVisible(false);

      if (data.patrol) {
        const movables = actSprite ? [sprite, nameTag, actSprite, prompt] : [sprite, nameTag, prompt];
        this.tweens.add({
          targets: movables, x: `+=${3 * TILE}`, duration: 2800,
          yoyo: true, repeat: -1, ease: 'Sine.InOut',
          onYoyo:   () => sprite.setFlipX(true),
          onRepeat: () => sprite.setFlipX(false),
        });
      } else if (!data.seated) {
        this.tweens.add({
          targets: [sprite, nameTag], y: '-=3',
          duration: 1200 + data.row * 11, yoyo: true, repeat: -1, ease: 'Sine.InOut',
        });
      }

      return { data, sprite, nameTag, actSprite, prompt };
    });
  }

  // ---- Collectible items ----

  _spawnItems() {
    this._items = this.physics.add.staticGroup();

    // Gather T_PATH tiles in the main festival zone
    const pool = [];
    for (let row = 12; row <= 26; row++) {
      for (let col = 4; col <= 45; col++) {
        if (this._map[row]?.[col] === T_PATH)
          pool.push({ x: col * TILE + TILE / 2, y: row * TILE + TILE / 2 });
      }
    }
    Phaser.Utils.Array.Shuffle(pool);

    // Exclude tiles too close to any NPC or the bench
    const npcXY = NPC_DATA.map(d => ({ x: d.col * TILE + TILE / 2, y: d.row * TILE + TILE / 2 }));
    const tooClose = ({ x, y }) =>
      npcXY.some(p => Math.abs(p.x - x) < TILE * 2.5 && Math.abs(p.y - y) < TILE * 2.5);

    const spots = pool.filter(p => !tooClose(p));

    const types = [
      'polse','polse','polse','polse',
      'brus','brus','brus','brus',
      'is','is','is','is',
      'flagg','flagg','flagg',
      'ballong_red','ballong_red',
      'ballong_blue','ballong_blue',
      'ballong_yellow','ballong_yellow',
    ];

    types.forEach((type, i) => {
      if (i >= spots.length) return;
      const { x, y } = spots[i];
      const spr = this._items.create(x, y, type).setDepth(1.8).setScale(0.75);
      spr.itemType = type;
      spr.body.setSize(26, 26).setOffset(3, 3);
      spr.refreshBody();
      this.tweens.add({
        targets: spr, scaleX: 0.88, scaleY: 0.88,
        duration: 600 + (i * 53) % 500, yoyo: true, repeat: -1, ease: 'Sine.InOut',
      });
    });
  }

  // ---- HUD ----

  _setupHUD() {
    const D = 150;
    this._hudBg = this.add.rectangle(0, 0, 100, 28, 0x000000, 0.60).setDepth(D);
    this._hudScore = this.add.text(0, 0, '', {
      fontSize: '13px', fill: '#ffffff', stroke: '#000', strokeThickness: 2,
    }).setDepth(D + 1);
    this._hudTimer = this.add.text(0, 0, '', {
      fontSize: '13px', fill: '#ffffff', stroke: '#000', strokeThickness: 2,
    }).setDepth(D + 1).setOrigin(1, 0);
    this._hudTitle = this.add.text(0, 0, t('title'), {
      fontSize: '13px', fill: '#FFD700', stroke: '#000', strokeThickness: 2,
    }).setDepth(D + 1).setOrigin(0.5, 0);
    this._updateHUD();
  }

  _updateHUDLayout(cam) {
    const { x, y, width } = cam.worldView;
    this._hudBg   .setPosition(x + width / 2, y + 14).setSize(width, 28);
    this._hudScore.setPosition(x + 5, y + 6);
    this._hudTimer.setPosition(x + width - 5, y + 6);
    this._hudTitle.setPosition(x + width / 2, y + 6);
  }

  _updateHUD() {
    this._hudScore.setText(`${t('hud_collected')}: ${this._score}/${TOTAL_ITEMS}`);
    const s = this._timeLeft;
    this._hudTimer.setText(`${t('hud_time')}: ${s}s`);
    this._hudTimer.setFill(s <= 15 ? '#ff4444' : '#ffffff');
  }

  // ---- Timer ----

  _setupTimer() {
    this._timerEvt = this.time.addEvent({
      delay: 1000,
      repeat: GAME_TIME - 1,
      callback: () => {
        if (this._gameOver) return;
        this._timeLeft--;
        this._updateHUD();
        if (this._timeLeft <= 0) this._endGame(false);
      },
    });
  }

  // ---- Collect callback ----

  _collectItem(player, item) {
    if (this._gameOver || this.dialogue.isActive()) return;
    const { x, y } = item;
    const label = itemLabel(item.itemType);
    item.destroy();
    this._score++;
    this._updateHUD();

    // Floating "+item" label
    const txt = this.add.text(x, y - 10, label, {
      fontSize: '18px', fill: '#FFD700', stroke: '#000000', strokeThickness: 3,
    }).setDepth(20).setOrigin(0.5);
    this.tweens.add({
      targets: txt, y: y - 52, alpha: 0,
      duration: 700, ease: 'Cubic.Out',
      onComplete: () => txt.destroy(),
    });

    // Particle ring
    for (let i = 0; i < 5; i++) {
      const dot = this.add.circle(x, y, 4, 0xFFD700).setDepth(19);
      const ang = (i / 5) * Math.PI * 2;
      this.tweens.add({
        targets: dot,
        x: x + Math.cos(ang) * 32, y: y + Math.sin(ang) * 32,
        alpha: 0, scaleX: 0, scaleY: 0, duration: 500,
        onComplete: () => dot.destroy(),
      });
    }

    if (this._score >= TOTAL_ITEMS) this._endGame(true);
  }

  // ---- End game ----

  _endGame(won) {
    if (this._gameOver) return;
    this._gameOver = true;
    this.player.setVelocity(0, 0);
    if (this._timerEvt) this._timerEvt.remove();
    if (this.dialogue.isActive()) this.dialogue.close();
    if (this._music) this._music.stop();

    const { x, y, width, height } = this.cameras.main.worldView;
    const flash = this.add.rectangle(x + width / 2, y + height / 2, width, height, 0xffffff)
      .setDepth(250).setAlpha(0);
    this.tweens.add({
      targets: flash, alpha: 0.9,
      duration: 220, yoyo: true,
      onComplete: () => this.scene.start('EndScene', {
        won, score: this._score, total: TOTAL_ITEMS, timeLeft: this._timeLeft,
      }),
    });
  }

  // ---- Camera / Input ----

  _setupCamera() {
    this.cameras.main.setBounds(0, 0, WORLD_W, WORLD_H);
    this.cameras.main.setZoom(CAMERA_ZOOM);
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
  }

  _setupInput() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.wasd    = this.input.keyboard.addKeys({
      up:    Phaser.Input.Keyboard.KeyCodes.W,
      down:  Phaser.Input.Keyboard.KeyCodes.S,
      left:  Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    });
    this.eKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
  }

  // ---- Helpers ----

  _nearestNPC() {
    let best = null, bestDist = INTERACT_R;
    for (const npc of this._npcs) {
      const dx   = this.player.x - npc.sprite.x;
      const dy   = this.player.y - npc.sprite.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < bestDist) { best = npc; bestDist = dist; }
    }
    return best;
  }

  // ---- Update ----

  update() {
    if (this._gameOver) { this.player.setVelocity(0, 0); return; }

    this.dialogue.tick();
    this.dialogue.updateLayout(this.cameras.main);
    this._updateHUDLayout(this.cameras.main);

    if (Phaser.Input.Keyboard.JustDown(this.eKey)) {
      if (this.dialogue.isActive()) this.dialogue.advance();
      else { const npc = this._nearestNPC(); if (npc) this.dialogue.open(npc); }
    }

    if (this.dialogue.isActive()) {
      this.player.setVelocity(0, 0);
      this.player.play(this._lastDir === 'back' ? 'idle_back' : 'idle_front', true);
      return;
    }

    const c = this.cursors, w = this.wasd;
    let vx = 0, vy = 0;
    if (c.left.isDown  || w.left.isDown)  vx = -SPEED;
    if (c.right.isDown || w.right.isDown) vx =  SPEED;
    if (c.up.isDown    || w.up.isDown)    vy = -SPEED;
    if (c.down.isDown  || w.down.isDown)  vy =  SPEED;
    if (vx !== 0 && vy !== 0) { vx *= 0.707; vy *= 0.707; }

    this.player.setVelocity(vx, vy);

    const moving = vx !== 0 || vy !== 0;
    if (moving) {
      if (vy < 0) {
        this._lastDir = 'back';
        this.player.play('walk_back', true);
        this.player.setFlipX(false);
      } else {
        this._lastDir = 'front';
        this.player.play('walk_front', true);
        this.player.setFlipX(vx < 0);
      }
    } else {
      this.player.play(this._lastDir === 'back' ? 'idle_back' : 'idle_front', true);
    }

    for (const npc of this._npcs) {
      const dx   = this.player.x - npc.sprite.x;
      const dy   = this.player.y - npc.sprite.y;
      const near = Math.sqrt(dx * dx + dy * dy) < INTERACT_R;
      npc.prompt.setVisible(near);
    }
  }
}

// =============================================================
//  END SCENE
// =============================================================
class EndScene extends Phaser.Scene {
  constructor() { super('EndScene'); }

  create({ won, score, total, timeLeft }) {
    const W = 800, H = 600;
    this.add.rectangle(W / 2, H / 2, W, H, won ? 0x0D2B5E : 0x1A1A1A);
    this.add.rectangle(W / 2, H - 70, W, 140, won ? 0x0A3A0A : 0x0F0F0F);

    // Norwegian flag
    const fx = W / 2 - 60, fy = 30, fw = 120, fh = 80;
    const g = this.add.graphics();
    g.fillStyle(0x9B7A40); g.fillRect(fx - 4, fy, 4, fh + 28);
    g.fillStyle(0xEF2B2D); g.fillRect(fx, fy, fw, fh);
    g.fillStyle(0xFFFFFF); g.fillRect(fx, fy + 31, fw, 18); g.fillRect(fx + 42, fy, 18, fh);
    g.fillStyle(0x002868); g.fillRect(fx, fy + 35, fw, 10); g.fillRect(fx + 46, fy, 10, fh);

    this.add.text(W / 2, 138, t(won ? 'end_won' : 'end_lost'), {
      fontSize: '34px', fontStyle: 'bold',
      fill: '#ffffff', stroke: '#000000', strokeThickness: 5,
    }).setOrigin(0.5);

    const percent = Math.round((score / total) * 100);
    const medal   = percent === 100 ? '🏆' : percent >= 70 ? '🥈' : '🥉';
    this.add.text(W / 2, 192, medal, { fontSize: '40px' }).setOrigin(0.5);

    this.add.text(W / 2, 248, LANG_DATA[LANG].end_score(score, total) + ` (${percent}%)`, {
      fontSize: '21px', fill: '#ffffff', stroke: '#000000', strokeThickness: 3,
    }).setOrigin(0.5);

    if (won) {
      this.add.text(W / 2, 288, LANG_DATA[LANG].end_time_left(timeLeft), {
        fontSize: '17px', fill: '#FFD700', stroke: '#000', strokeThickness: 2,
      }).setOrigin(0.5);
    }

    // Item icon row
    ['polse','brus','is','flagg','ballong_red','ballong_blue','ballong_yellow']
      .forEach((type, i) => this.add.image(165 + i * 79, 345, type).setScale(0.85));

    // Fun fact
    const facts = LANG_DATA[LANG].facts;
    const fact  = facts[Phaser.Math.Between(0, facts.length - 1)];
    this.add.text(W / 2, 390, fact, {
      fontSize: '13px', fill: '#aaccff',
      align: 'center', wordWrap: { width: 580 },
      stroke: '#000', strokeThickness: 2,
    }).setOrigin(0.5);

    // Buttons
    this._btn(W / 2 - 115, 458, t('btn_again'), () => this.scene.start('GameScene'));
    this._btn(W / 2 + 115, 458, t('btn_menu'),  () => this.scene.start('MenuScene'));

    this.add.text(W / 2, 514, t('hint_replay'), {
      fontSize: '12px', fill: '#888899',
    }).setOrigin(0.5);

    this.input.keyboard.once('keydown-SPACE', () => this.scene.start('GameScene'));
    this.input.keyboard.once('keydown-ENTER', () => this.scene.start('GameScene'));
    this.input.keyboard.once('keydown-ESCAPE',() => this.scene.start('MenuScene'));

    if (won) this._spawnConfetti();
  }

  _btn(x, y, label, cb) {
    const btn = this.add.text(x, y, `  ${label}  `, {
      fontSize: '19px', fill: '#ffffff',
      backgroundColor: '#7A0F0F',
      padding: { x: 18, y: 9 },
      stroke: '#000', strokeThickness: 3,
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });
    btn.on('pointerover', () => { btn.setStyle({ fill: '#FFD700', backgroundColor: '#EF2B2D' }); btn.setScale(1.04); });
    btn.on('pointerout',  () => { btn.setStyle({ fill: '#ffffff', backgroundColor: '#7A0F0F' }); btn.setScale(1);    });
    btn.on('pointerdown', cb);
    return btn;
  }

  _spawnConfetti() {
    const colors = [0xEF2B2D, 0xFFFFFF, 0x002868, 0xFFD700];
    for (let i = 0; i < 60; i++) {
      const x    = Phaser.Math.Between(0, 800);
      const rect = this.add.rectangle(x, -10, 8, 8,
        colors[Math.floor(Math.random() * colors.length)]).setDepth(20);
      this.tweens.add({
        targets: rect, y: 640,
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
//  PHASER CONFIG
// =============================================================
new Phaser.Game({
  type:   Phaser.AUTO,
  width:  800,
  height: 600,
  backgroundColor: '#1a4a1a',
  physics: {
    default: 'arcade',
    arcade: { debug: false },
  },
  scene: [BootScene, MenuScene, CreditsScene, GameScene, EndScene],
});
