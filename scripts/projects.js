const projects = [
{
  id: "rlx-core",
  title: "RLx-Core -> Industrial RL Engine",
  short: "Zero-toy modular RL stack for automation. Phase 6 in progress.",
  long: "",
  video: "assets/rlx_core_vid2.webm",  // video for modal
  thumbnail: "assets/rlx_core_vid1.webm", // video for index page
  tags: [
    "Flax-based RL Engine",
    "Production-Grade Robotics",
    "Custom Isaac Sim Envs",
    "ONNX-Ready Inference",
    "Hydra Config Stack",
    "Sim-to-Real Control",
    "RL for Industrial Automation"
  ],
  links: [
    { label: "GitHub", url: "https://github.com/1Kaustubh122/rlx-core" },
    { label: "Project Overview", url: "rlx-core.html" } 
  ]
},
{
  id: "autodrive",
  title: "RoboRacer Sim Racing League @ ICRA 2025",
  long: "RoboRacer Autonomous Racing is a semi-regular competition organized by an international community of researchers, engineers, and autonomous systems enthusiasts. The teams participating in the 24th RoboRacer Autonomous Racing Competition at ICRA 2025 will write software for a 1:10 scaled autonomous racecar to fulfill the objectives of the competition: drive fast but don’t crash!",
  short : "Qualified for ICRA RoboRacer finals with a reinforcement learning-based driving policy trained in simulation.  Ranked 3rd in qualifiers (ICRA RoboRacer 2025).",
  image: "assets/autodrive_thumb.png", 
  tags: ["Autonomous Racing", "RL", "ICRA 2025", "AutoDrive Ecosystem"],
  links: [
    { label: "Results", url: "https://autodrive-ecosystem.github.io/competitions/roboracer-sim-racing-icra-2025/#results" },
    { label: "YouTube", url: "https://www.youtube.com/watch?v=AmnK0JQ3ayQ" }
  ]
}
];

window.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("project-grid");

  const modal = document.createElement("div");
  modal.id = "project-modal";
  modal.className = "fixed inset-0 z-50 bg-black/70 backdrop-blur flex items-center justify-center hidden";
  modal.innerHTML = `
    <div class="relative w-full max-w-3xl mx-4 rounded-xl overflow-hidden bg-[#111827] shadow-2xl">
      <div id="modal-media" class="w-full aspect-video bg-black"></div>
      <div class="p-6">
        <h3 id="modal-title" class="text-2xl font-extrabold text-cyan-400 mb-2"></h3>
        <p id="modal-long" class="text-slate-300 mb-4 text-sm leading-relaxed"></p>
        <div id="modal-tags" class="flex flex-wrap gap-2 mb-4"></div>
        <div id="modal-links" class="flex flex-wrap gap-4"></div>
      </div>
    </div>
    <button id="close-modal" class="absolute top-6 right-6 text-white bg-black/50 hover:bg-black/70 border border-white/20 shadow-lg hover:shadow-white/30 text-3xl rounded-full w-10 h-10 flex items-center justify-center z-50 transition-all">&times;</button>
  `;
  document.body.appendChild(modal);

  projects.forEach((p) => {
    const card = document.createElement("div");
    card.className = "bg-[#1a1d24] rounded-2xl p-6 shadow-lg hover:shadow-cyan-800/20 transition-all duration-300 cursor-pointer flex flex-col";

    let mediaContent = p.thumbnail
      ? `<video src="${p.thumbnail}" autoplay loop muted playsinline class="rounded-xl mb-4 h-100 w-full object-cover"></video>`
      : `<img src="${p.image}" class="rounded-xl mb-4 h-100 w-full object-cover shadow-inner" />`;

    card.innerHTML = `
      ${mediaContent}
      <h3 class="text-xl font-bold text-cyan-300 mb-1">${p.title}</h3>
      <p class="text-slate-400 text-sm mb-3">${p.short}</p>
      <div class="flex flex-wrap gap-2">${p.tags.map(tag => `<span class="text-xs bg-cyan-800/30 text-cyan-200 px-2 py-0.5 rounded-full">${tag}</span>`).join("")}</div>
    `;

    card.onclick = () => openModal(p);
    grid.appendChild(card);
  });

  document.getElementById("close-modal").onclick = () => {
    modal.classList.add("hidden");
    document.getElementById("modal-media").innerHTML = "";
  };
});

function openModal(project) {
  const mediaDiv = document.getElementById("modal-media");

  if (project.id === "autodrive") {
    mediaDiv.innerHTML = `
      <iframe class="w-full h-full" src="https://www.youtube.com/embed/AmnK0JQ3ayQ" 
              frameborder="0" allowfullscreen></iframe>`;
  } else if (project.video) {
    mediaDiv.innerHTML = `<video src="${project.video}" autoplay loop muted controls class="w-full h-full object-cover"></video>`;
  } else {
    mediaDiv.innerHTML = `<img src="${project.image}" class="w-full h-full object-cover" />`;
  }

  document.getElementById("modal-title").textContent = project.title;
  document.getElementById("modal-long").textContent = project.long;
  document.getElementById("modal-tags").innerHTML = project.tags
    .map(tag => `<span class="text-xs bg-cyan-900/40 text-cyan-200 px-2 py-0.5 rounded-full">${tag}</span>`)
    .join("");
  document.getElementById("modal-links").innerHTML = project.links
    .map(link => `<a href="${link.url}" target="_blank" class="text-cyan-400 hover:underline font-medium">${link.label} →</a>`)
    .join("");

  document.getElementById("project-modal").classList.remove("hidden");
}
