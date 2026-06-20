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

  // Platform feature cards (mobile tap)
  document.querySelectorAll(".platform-feature").forEach(function (feature) {
    feature.addEventListener("click", function () {
      if (window.innerWidth >= 1024) return;

      const isActive = feature.classList.contains("is-active");

      document.querySelectorAll(".platform-feature.is-active").forEach(function (other) {
        if (other !== feature) {
          other.classList.remove("is-active");
        }
      });

      feature.classList.toggle("is-active", !isActive);
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
