document.addEventListener("DOMContentLoaded", () => {
  const sections = ["hero", "philosophy", "projects", "contact"];
  const navLinks = document.querySelectorAll(".nav-link");

  function activateNav(current) {
    navLinks.forEach(link => {
      if (link.dataset.section === current) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }

  function getCurrentSection() {
    let index = 0;
    for (let i = 0; i < sections.length; i++) {
      const sec = document.getElementById(sections[i]);
      if (!sec) continue;
      const rect = sec.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 0.32) {
        index = i;
      }
    }
    return sections[index];
  }

  function onScroll() {
    const section = getCurrentSection();
    activateNav(section);
  }

  // Update on nav-link click
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      setTimeout(onScroll, 16); // Wait for scroll to finish
    });
  });

  // Update on scroll, resize, hashchange
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  window.addEventListener("hashchange", onScroll);

  onScroll();
});
