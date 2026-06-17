/* =========================================================
   VASAI Token Official Website
   File: js/main.js
   Tech: Pure JavaScript
   ========================================================= */

(function () {
  "use strict";

  const header = document.querySelector(".site-header");
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const faqItems = document.querySelectorAll(".faq-item");
  const revealItems = document.querySelectorAll(".reveal");
  const contactForm = document.querySelector(".contact-form");

  /* ---------- Header Scroll State ---------- */
  function updateHeaderState() {
    if (!header) return;

    if (window.scrollY > 18) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", updateHeaderState);
  window.addEventListener("load", updateHeaderState);

  /* ---------- Mobile Menu ---------- */
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
      navLinks.classList.toggle("open");
      menuToggle.classList.toggle("active");
    });

    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("open");
        menuToggle.classList.remove("active");
      });
    });
  }

  /* ---------- Current Page Active Nav ---------- */
  function setActiveNavLink() {
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    const links = document.querySelectorAll(".nav-links a");

    links.forEach(function (link) {
      const href = link.getAttribute("href");

      if (href === currentPath) {
        link.classList.add("active");
      }

      if (currentPath.startsWith("article-") && href === "insights.html") {
        link.classList.add("active");
      }
    });
  }

  setActiveNavLink();

  /* ---------- Reveal Animation ---------- */
  if ("IntersectionObserver" in window && revealItems.length > 0) {
    const revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12
      }
    );

    revealItems.forEach(function (item) {
      revealObserver.observe(item);
    });
  } else {
    revealItems.forEach(function (item) {
      item.classList.add("visible");
    });
  }

  /* ---------- FAQ Accordion ---------- */
  if (faqItems.length > 0) {
    faqItems.forEach(function (item) {
      const button = item.querySelector(".faq-question");
      const answer = item.querySelector(".faq-answer");

      if (!button || !answer) return;

      button.addEventListener("click", function () {
        const isOpen = item.classList.contains("active");

        faqItems.forEach(function (otherItem) {
          const otherAnswer = otherItem.querySelector(".faq-answer");
          otherItem.classList.remove("active");

          if (otherAnswer) {
            otherAnswer.style.maxHeight = null;
          }
        });

        if (!isOpen) {
          item.classList.add("active");
          answer.style.maxHeight = answer.scrollHeight + "px";
        }
      });
    });
  }

  /* ---------- Contact Form Demo Handling ---------- */
  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const submitButton = contactForm.querySelector("button[type='submit']");
      const originalText = submitButton ? submitButton.textContent : "";

      if (submitButton) {
        submitButton.textContent = "Message Prepared";
        submitButton.disabled = true;
      }

      setTimeout(function () {
        alert(
          "Thank you for contacting VASAI Token. This static GitHub Pages form is prepared for front-end display. Please connect it to your preferred form service if you need live submissions."
        );

        contactForm.reset();

        if (submitButton) {
          submitButton.textContent = originalText;
          submitButton.disabled = false;
        }
      }, 450);
    });
  }

  /* ---------- Smooth Internal Anchor Offset ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (event) {
      const targetId = anchor.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      const headerHeight = header ? header.offsetHeight : 0;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight - 16;

      window.scrollTo({
        top: targetTop,
        behavior: "smooth"
      });
    });
  });

  /* ---------- Simple Counter Animation ---------- */
  const counters = document.querySelectorAll("[data-count]");

  if ("IntersectionObserver" in window && counters.length > 0) {
    const counterObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;

          const counter = entry.target;
          const target = Number(counter.getAttribute("data-count"));
          const suffix = counter.getAttribute("data-suffix") || "";
          const duration = 1200;
          const startTime = performance.now();

          function updateCounter(currentTime) {
            const progress = Math.min((currentTime - startTime) / duration, 1);
            const value = Math.floor(progress * target);

            counter.textContent = value.toLocaleString() + suffix;

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              counter.textContent = target.toLocaleString() + suffix;
            }
          }

          requestAnimationFrame(updateCounter);
          counterObserver.unobserve(counter);
        });
      },
      {
        threshold: 0.35
      }
    );

    counters.forEach(function (counter) {
      counterObserver.observe(counter);
    });
  }
})();
