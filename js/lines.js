function Curve(pos1, pos2, ctrlPos) {
  this.pos1 = pos1;
  this.pos2 = pos2;
  this.ctrlPos = ctrlPos;
  this.vx = 0;
  this.vy = 0;
}

Curve.prototype = {
  constructor: Curve,
  render: function(ctx) {
    ctx.save();
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#fff';
    ctx.beginPath();
    ctx.moveTo(this.pos1.x, this.pos1.y);
    ctx.quadraticCurveTo(this.ctrlPos.x, this.ctrlPos.y, this.pos2.x, this.pos2.y);
    ctx.stroke();
    ctx.restore();
  }
};

var canvas, ctx, width, height, curves, mouse;

init();
function init() {
  canvas = document.querySelector('canvas');
  ctx = canvas.getContext('2d');
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  mouse = getMousePos(canvas);
  curves = [];

  ctx.fillStyle = '#000';
  generateCurves(height / 1.6, 30);
  renderFrame();
}

function generateCurves(range, spacing) {
  var y, curve, index, horSpacing;
  horSpacing = width / 20;
  index = 1;
  for (y = height / 2 - range / 2; y <= height / 2 + range / 2; y += spacing) {
    curve = new Curve({x:0, y: y}, {x: width, y: y}, {x: width / 2, y: y / index});
    curves.push(curve);
    index++;
  }
}

function renderFrame() {
  window.requestAnimationFrame(renderFrame, canvas);
  ctx.fillRect(0, 0, width, height);
  curves.forEach(renderCurve);
}

function renderCurve(curve) {
  var speed, gravity;
  speed = 0.1;
  gravity = 0.84;
  curve.vx += (mouse.x - curve.ctrlPos.x) * speed;
  curve.vy += (mouse.y - curve.ctrlPos.y) * speed;
  curve.vx *= gravity;
  curve.vy *= gravity;
  curve.ctrlPos.x += curve.vx;
  curve.ctrlPos.y += curve.vy;
  curve.render(ctx);
}

function getMousePos(element) {
  var mouse = {x: width / 2, y: height / 1.2};
  element.addEventListener('mousemove', handleMouse, false);
  function handleMouse(e) {
    mouse.x = e.pageX;
    mouse.y = e.pageY;
  }
  return mouse;
}
