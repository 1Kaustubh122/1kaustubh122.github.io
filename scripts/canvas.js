document.addEventListener("DOMContentLoaded", () => {
  // Remove duplicate canvas if exists (for hot reload)
  const oldCanvas = document.getElementById("bg-canvas");
  if (oldCanvas) oldCanvas.remove();

  const canvas = document.createElement("canvas");
  canvas.id = "bg-canvas";
  canvas.className = "fixed top-0 left-0 w-full h-full z-[-1]";
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  const nodes = 100;
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  // These two lines go OUTSIDE draw() at the top
  let offsetX_current = width / 2;
  let offsetX_target = width / 2;

  function draw() {
    ctx.clearRect(0, 0, width, height);
    const time = Date.now() / 1000;

    // Get current section (hero, projects, or default)
    const view = document.body.dataset.view;

    // Set offsetX_target based on section
    if (view === "hero") {
      offsetX_target = width / 2;
    } else if (view === "projects") {
      offsetX_target = width * 0.25;
    } else {
      offsetX_target = width / 2;
    }

    // Smoothly interpolate offsetX_current towards offsetX_target
    const lerpSpeed = 0.08;
    offsetX_current += (offsetX_target - offsetX_current) * lerpSpeed;

    // Main arc group
    for (let i = 0; i < nodes; i++) {
      const x = offsetX_current + Math.sin(i + time) * (width / 3) * Math.sin(time + i * 0.5);
      const y = height / 2 + Math.cos(i + time) * (height / 3) * Math.cos(time + i * 0.5);
      const r = 2 + Math.sin(time + i) * 1.5;

      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = i % 2 === 0 ? "#00fff7aa" : "#00ff99aa";
      ctx.fill();
    }

    // Mirrored for projects section
    if (view === "projects") {
      for (let i = 0; i < nodes; i++) {
        const x = width - offsetX_current + Math.sin(i + time) * (width / 3) * Math.sin(time + i * 0.5);
        const y = height / 2 + Math.cos(i + time) * (height / 3) * Math.cos(time + i * 0.5);
        const r = 2 + Math.sin(time + i) * 1.5;

        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = i % 2 === 0 ? "#00fff7aa" : "#00ff99aa";
        ctx.fill();
      }
    }

    requestAnimationFrame(draw);
  }

  draw();

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  // Ensure IntersectionObserver is set up
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.target.id === 'hero') {
        document.body.dataset.view = entry.isIntersecting ? 'hero' : 'default';
      }
      if (entry.target.id === 'projects') {
        if (entry.isIntersecting) {
          document.body.dataset.view = 'projects';
        } else if (document.body.dataset.view === 'projects') {
          document.body.dataset.view = 'default';
        }
      }
    });
  }, { threshold: 0.5 });

  ['hero', 'projects'].forEach(id => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });
});
