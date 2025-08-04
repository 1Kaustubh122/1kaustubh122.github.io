const projects = [
{
  id: "rlx-core",
  title: "RLx-Core — Industrial RL Engine",
  short: "Zero-toy modular RL stack for automation. Phase 6 in progress.",
  long: "", 
  image: "assets/isaac-sim.png",
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
    id: "f1tenth",
    title: "ICRA F1Tenth — Top 3 Finish",
    short: "The RoboRacer AutoDRIVE (formerly F1TENTH @ ICRA) is a 1:10‑scale autonomous racing platform—physical and simulated—where teams write software to drive fast, avoid crashes, and compete in real or virtual races under standard hardware/software specs.",
    long: "Achieved top-3 at ICRA F1Tenth with an RL policy trained in simulation and transferred to real hardware. Built full-stack—from Gazebo sim to real-time deployment. Full source + logs public.",
    image: "assets/f1tenth.gif",
    tags: ["Sim-to-Real", "RL", "ROS2", "Computer Vision", "Autonomous Driving"],
    links: [
      { label: "GitHub", url: "https://github.com/1Kaustubh122/icra-f1tenth" },
      { label: "Results PDF", url: "assets/ICRA_Result.pdf" }
    ]
  }
];

window.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("project-grid");
  const modal = document.createElement("div");
  modal.id = "project-modal";
  modal.className = "fixed inset-0 bg-black/70 backdrop-blur z-50 hidden items-center justify-center";
  modal.innerHTML = `
    <div class="bg-[#0f1117] max-w-2xl w-full mx-4 rounded-xl p-6 relative">
      <button id="close-modal" class="absolute top-3 right-4 text-slate-400 hover:text-white text-2xl">&times;</button>
      <img id="modal-img" class="rounded mb-4 max-h-64 object-cover w-full" />
      <h3 id="modal-title" class="text-2xl font-bold text-cyan-400 mb-2"></h3>
      <p id="modal-long" class="text-slate-300 mb-4"></p>
      <div id="modal-tags" class="flex flex-wrap gap-2 mb-4"></div>
      <div id="modal-links" class="flex flex-wrap gap-4"></div>
    </div>`;
  document.body.appendChild(modal);

  projects.forEach((p) => {
    const card = document.createElement("div");
    card.className = "bg-[#1a1d24] rounded-xl p-4 shadow hover:shadow-xl transition cursor-pointer flex flex-col";
    card.innerHTML = `
      <img src="${p.image}" class="rounded mb-3 max-h-40 object-cover" />
      <h3 class="text-lg font-semibold text-cyan-300">${p.title}</h3>
      <p class="text-slate-400 text-sm mb-2">${p.short}</p>
      <div class="flex flex-wrap gap-1">${p.tags.map(tag => `<span class="text-xs bg-cyan-800/20 text-cyan-300 px-2 py-0.5 rounded-full">${tag}</span>`).join("")}</div>`;
    card.onclick = () => openModal(p);
    grid.appendChild(card);
  });

  document.getElementById("close-modal").onclick = () => {
    modal.classList.add("hidden");
  };
});

function openModal(project) {
  document.getElementById("modal-img").src = project.image;
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