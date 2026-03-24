/**
 * Backgrid - Interactive color grid canvas background
 * Original: Benjamin Kaiser, 2012
 * Modernized: 2026 — no jQuery, dark/light theme support
 */
class Backgrid {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.size = options.size || 28;
    this.spacing = options.spacing || 18;
    this.radius = options.radius || 90;
    this.speed = (options.speed || 3) / 100;
    this.vibrancy = options.vibrancy || 1.0;
    this.colors = options.colors || ['#EF2B6F', '#29E8AE', '#6C28FF', '#FF2855', '#21E6ED'];

    // Exclusion zone: pass a CSS selector or element to carve out a clear area
    this.exclusionEl = options.exclusionEl
      ? (typeof options.exclusionEl === 'string' ? document.querySelector(options.exclusionEl) : options.exclusionEl)
      : null;
    this.exclusionPadding = options.exclusionPadding || 20;
    this._exclusionRect = null;

    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.grid = [];
    this.mouseX = 0;
    this.mouseY = 0;
    this.didMoveMouse = false;
    this.animId = null;

    this._setupCanvas();
    this._bindEvents();
  }

  _getThemeColors() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    return {
      bg: isDark ? '#0d0d1a' : '#ffffff',
      base: isDark ? '#1a1a30' : '#eeeeee',
    };
  }

  _hexToRgb(hex) {
    const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return r ? { r: parseInt(r[1], 16), g: parseInt(r[2], 16), b: parseInt(r[3], 16) } : { r: 0, g: 0, b: 0 };
  }

  _lerpColor(a, b, t) {
    return {
      r: Math.round(a.r * (1 - t) + b.r * t),
      g: Math.round(a.g * (1 - t) + b.g * t),
      b: Math.round(a.b * (1 - t) + b.b * t),
    };
  }

  _setupCanvas() {
    Object.assign(this.canvas.style, {
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      zIndex: '0',
    });
    this.container.style.position = 'relative';
    this.container.insertBefore(this.canvas, this.container.firstChild);
    this._resize();
  }

  _resize() {
    const rect = this.container.getBoundingClientRect();
    this.w = rect.width;
    this.h = rect.height;
    this.canvas.width = this.w * devicePixelRatio;
    this.canvas.height = this.h * devicePixelRatio;
    this.ctx.scale(devicePixelRatio, devicePixelRatio);
    this._updateExclusionRect();
    this._buildGrid();
  }

  _updateExclusionRect() {
    if (!this.exclusionEl) { this._exclusionRect = null; return; }
    const canvasRect = this.canvas.getBoundingClientRect();
    const elRect = this.exclusionEl.getBoundingClientRect();
    const pad = this.exclusionPadding;
    this._exclusionRect = {
      left: elRect.left - canvasRect.left - pad,
      top: elRect.top - canvasRect.top - pad,
      right: elRect.right - canvasRect.left + pad,
      bottom: elRect.bottom - canvasRect.top + pad,
    };
  }

  _buildGrid() {
    this.grid = [];
    const { size, spacing, colors } = this;
    const cols = Math.floor(this.w / (size + spacing));
    const rows = Math.floor(this.h / (size + spacing));
    const xOff = Math.floor((this.w % (size + spacing)) / 2) + spacing / 2;
    const yOff = Math.floor((this.h % (size + spacing)) / 2) + spacing / 2;

    this._updateExclusionRect();
    const ex = this._exclusionRect;

    for (let x = 0; x < cols; x++) {
      for (let y = 0; y < rows; y++) {
        const cx = x * (size + spacing) + xOff;
        const cy = y * (size + spacing) + yOff;

        // Skip cells that fall inside the exclusion zone
        if (ex && cx + size > ex.left && cx < ex.right && cy + size > ex.top && cy < ex.bottom) {
          continue;
        }

        this.grid.push({
          x: cx,
          y: cy,
          row: y,
          color: this._hexToRgb(colors[Math.floor(Math.random() * colors.length)]),
          intensity: 0,
        });
      }
    }
    this.totalRows = rows;
  }

  _bindEvents() {
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => this._resize(), 100);
    });

    document.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouseX = e.clientX - rect.left;
      this.mouseY = e.clientY - rect.top;
      this.didMoveMouse = true;
    });
  }

  start() {
    this._buildGrid();
    const loop = () => {
      this._update();
      this._render();
      this.animId = requestAnimationFrame(loop);
    };
    loop();
  }

  glide() {
    let row = 0;
    const step = () => {
      for (const cell of this.grid) {
        if (cell.row === row) cell.intensity = this.vibrancy;
      }
      row++;
      if (row <= this.totalRows) setTimeout(step, 120);
    };
    step();
  }

  _update() {
    for (const cell of this.grid) {
      cell.intensity -= this.speed;
      if (this.didMoveMouse) {
        const dx = cell.x - this.mouseX + this.size / 2;
        const dy = cell.y - this.mouseY + this.size / 2;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < this.radius) {
          cell.intensity = this.vibrancy;
        }
      }
      if (cell.intensity < 0) cell.intensity = 0;
    }
    this.didMoveMouse = false;
  }

  _render() {
    const { ctx, w, h, size } = this;
    const theme = this._getThemeColors();
    const baseRgb = this._hexToRgb(theme.base);

    ctx.fillStyle = theme.bg;
    ctx.fillRect(0, 0, w, h);

    for (const cell of this.grid) {
      const c = this._lerpColor(baseRgb, cell.color, cell.intensity);
      ctx.fillStyle = `rgb(${c.r},${c.g},${c.b})`;
      ctx.beginPath();
      ctx.roundRect(cell.x, cell.y, size, size, 4);
      ctx.fill();
    }
  }

  destroy() {
    if (this.animId) cancelAnimationFrame(this.animId);
    this.canvas.remove();
  }
}

// Polyfill roundRect for older browsers
if (!CanvasRenderingContext2D.prototype.roundRect) {
  CanvasRenderingContext2D.prototype.roundRect = function(x, y, w, h, r) {
    this.moveTo(x + r, y);
    this.lineTo(x + w - r, y);
    this.arcTo(x + w, y, x + w, y + r, r);
    this.lineTo(x + w, y + h - r);
    this.arcTo(x + w, y + h, x + w - r, y + h, r);
    this.lineTo(x + r, y + h);
    this.arcTo(x, y + h, x, y + h - r, r);
    this.lineTo(x, y + r);
    this.arcTo(x, y, x + r, y, r);
  };
}
