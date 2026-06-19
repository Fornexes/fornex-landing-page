// Header scroll behavior and mobile menu (Solo & Co introducao pattern)
(function () {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".site-header__toggle");
  const mobileMenu = document.querySelector(".mobile-menu");
  const menuOverlay = document.querySelector(".menu-overlay");
  const menuClose = document.querySelector(".mobile-menu__close");
  const mobileLinks = document.querySelectorAll(".mobile-menu__link");
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  if (!header) return;

  document.documentElement.style.setProperty("--header-height", header.offsetHeight + "px");

  let lastScrollY = window.scrollY;
  let ticking = false;
  let menuOpen = false;
  let isProgrammaticScroll = false;
  let scrollEndTimer = null;

  function syncHeaderHeight() {
    document.documentElement.style.setProperty("--header-height", header.offsetHeight + "px");
  }

  window.addEventListener("resize", syncHeaderHeight, { passive: true });

  function finishProgrammaticScroll() {
    if (!isProgrammaticScroll) return;

    isProgrammaticScroll = false;
    lastScrollY = window.scrollY;
    header.classList.remove("is-hidden");
  }

  function updateHeader() {
    ticking = false;

    if (menuOpen) return;

    const currentScrollY = window.scrollY;

    if (currentScrollY > 80) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }

    // Hide header only on manual scroll down, not during anchor navigation
    if (!isProgrammaticScroll) {
      if (currentScrollY > lastScrollY && currentScrollY > 120) {
        header.classList.add("is-hidden");
      } else {
        header.classList.remove("is-hidden");
      }

      lastScrollY = currentScrollY;
    }
  }

  function scheduleScrollEndCheck() {
    window.clearTimeout(scrollEndTimer);
    scrollEndTimer = window.setTimeout(finishProgrammaticScroll, 120);
  }

  window.addEventListener("scroll", function () {
    if (!ticking) {
      window.requestAnimationFrame(updateHeader);
      ticking = true;
    }

    if (isProgrammaticScroll) {
      scheduleScrollEndCheck();
    }
  }, { passive: true });

  if ("onscrollend" in window) {
    window.addEventListener("scrollend", finishProgrammaticScroll, { passive: true });
  }

  function openMobileMenu() {
    menuOpen = true;
    mobileMenu.classList.add("is-open");
    mobileMenu.setAttribute("aria-hidden", "false");
    menuOverlay.classList.add("is-visible");
    menuOverlay.hidden = false;
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Fechar menu de navegação");
    document.body.classList.add("menu-open");
    document.body.style.overflow = "hidden";
  }

  function closeMobileMenu() {
    menuOpen = false;
    mobileMenu.classList.remove("is-open");
    mobileMenu.setAttribute("aria-hidden", "true");
    menuOverlay.classList.remove("is-visible");
    menuOverlay.hidden = true;
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Abrir menu de navegação");
    document.body.classList.remove("menu-open");
    document.body.style.overflow = "";
    updateHeader();
  }

  function scrollToTarget(target) {
    isProgrammaticScroll = true;
    header.classList.remove("is-hidden");
    syncHeaderHeight();

    const headerHeight = header.offsetHeight;
    const targetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    window.scrollTo({
      top: Math.max(0, targetTop),
      behavior: prefersReducedMotion ? "auto" : "smooth"
    });

    if (prefersReducedMotion) {
      finishProgrammaticScroll();
    } else {
      scheduleScrollEndCheck();
    }
  }

  if (toggle && mobileMenu && menuOverlay) {
    toggle.addEventListener("click", function () {
      if (menuOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    menuClose?.addEventListener("click", closeMobileMenu);
    menuOverlay.addEventListener("click", closeMobileMenu);

    mobileLinks.forEach(function (link) {
      link.addEventListener("click", closeMobileMenu);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && menuOpen) {
        closeMobileMenu();
        toggle.focus();
      }
    });
  }

  anchorLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();
      closeMobileMenu();
      scrollToTarget(target);
    });
  });
})();
