// Section interactions: reveal, accordions
(function () {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Scroll reveal
  if (!reducedMotion && "IntersectionObserver" in window) {
    const revealElements = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    revealElements.forEach(function (element) {
      observer.observe(element);
    });
  } else {
    document.querySelectorAll(".reveal").forEach(function (element) {
      element.classList.add("is-visible");
    });
  }

  // Feature accordions (mobile)
  document.querySelectorAll(".feature-card__header").forEach(function (button) {
    button.addEventListener("click", function () {
      if (window.innerWidth >= 1024) return;

      const card = button.closest(".feature-card");
      const isExpanded = card.classList.contains("is-expanded");

      document.querySelectorAll(".feature-card.is-expanded").forEach(function (other) {
        if (other !== card) {
          other.classList.remove("is-expanded");
          other.querySelector(".feature-card__header").setAttribute("aria-expanded", "false");
        }
      });

      card.classList.toggle("is-expanded", !isExpanded);
      button.setAttribute("aria-expanded", String(!isExpanded));
    });
  });

  // Diagram connection animation
  if (!reducedMotion && "IntersectionObserver" in window) {
    const diagrams = document.querySelectorAll(".diagram-animate");
    const diagramObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-animated");
          diagramObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    diagrams.forEach(function (diagram) {
      diagramObserver.observe(diagram);
    });
  }
})();
