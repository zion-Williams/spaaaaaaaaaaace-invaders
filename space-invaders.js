blockSize = 6;

enemyLayout = [`
   x     x
    x   x
   xxxxxxx
  xx xxx xx
 xxxxxxxxxxx
 x xxxxxxx x
 x x     x x
    xx xx   
`,`
   x     x
    x   x
x  xxxxxxx  x
x xx xxx xx x
 xxxxxxxxxxx
   xxxxxxx  
   x     x  
    xx xx   
`
]

player = {
    x: 0,
    y: 90,
    width: 15,
    height: 5
}

function Enemy(x, y) {
    this.layout = enemyLayout.map(e => {
    let arr = e.split('\n');
    arr.shift();
    arr.splice(-1, 1);
    return arr;
  })
  this.x = x;
  this.y = y;
}

enemies = [];
for (let i = 0; i < 4; i++) {
    enemies.push(new Enemy(16 * i, 1));
}

rowBase = 0;
maxCol = parseInt(canvas.width / blockSize) - 13;

ctx = canvas.getContext('2d');
direction = 1;
round = 1;
setInterval(drawNextFrame, 200);

function drawNextFrame() {
    round = (round + 1) % 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    enemies.forEach(enemy => {
        drawEnemy(enemy, round);
        enemy.x += direction;
        if (enemy.x == 0 || enemy.x == maxCol) {
            direction *= -1;
            rowBase += 8;
        }
    })

    drawPlayer();
}

keysdown = {}

onkeydown = e => {
    keys[e.key == true]
}

onkeyup = e => {
    keys[e.key == false]
}

function drawPlayer() {
    ctx.fillRect(player.x * blockSize, player.y * blockSize, player.width * blockSize, player.height * blockSize);
    ctx.fillRect((player.x + 5) * blockSize, (player.y - 3) * blockSize, 4 * blockSize, 5 * blockSize);
}

function drawEnemy(enemy, frameNum) {
    let frame = enemy.layout[frameNum];
    frame.forEach((line, row) => {
        drawLine(line, row, enemy);
    });
}

function drawLine(line, row, enemy) {
    line.split('').forEach((c, col) => {
        if (c == 'x') {
            ctx.fillRect((col + enemy.x) * blockSize, (row + enemy.y + rowBase) * blockSize, blockSize, blockSize);
        }
    });
}