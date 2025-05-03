const canvas = document.getElementById('Matrix');
const context = canvas.getContext('2d');

function resizeMatrixCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeMatrixCanvas();
window.addEventListener('resize', resizeMatrixCanvas);
// --- Matrix Rain Rainbow Overlay ---
// Katakana, Latin, and Numbers for Matrix effect
const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nums = '0123456789';
const alphabet = katakana + latin + nums;

// Font and columns
const fontSize = 16;
let columns = Math.floor(canvas.width / fontSize);
let rainDrops = [];

// Initialize raindrop positions
function initRain() {
  columns = Math.floor(canvas.width / fontSize);
  rainDrops = [];
  for (let x = 0; x < columns; x++) {
    rainDrops[x] = 1;
  }
}
initRain();
window.addEventListener('resize', initRain);

// --- Rainbow color helper ---
function rainbowColor(i, t) {
  // i = column, t = time
  const hue = (i * 18 + t * 0.4) % 360;
  return `hsl(${hue}, 90%, 55%)`;
}

// --- Draw function ---
function draw() {
  // Slightly transparent background for trailing effect
  context.fillStyle = 'rgba(33,37,41, 0.07)';
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.font = fontSize + 'px monospace';
  const now = Date.now() / 20;
  for (let i = 0; i < rainDrops.length; i++) {
    const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
    // Rainbow color per column
    context.fillStyle = rainbowColor(i, now);
    context.fillText(text, i * fontSize, rainDrops[i] * fontSize);
    // Reset drop with some randomness
    if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      rainDrops[i] = 0;
    }
    rainDrops[i]++;
  }
}
setInterval(draw, 30);

