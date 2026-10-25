(function () {
  "use strict";

  const shellBaseUrl = (() => {
    try {
      const script = document.currentScript || document.querySelector('script[src$="category-shell.js"]');
      return new URL("./", script ? script.src : location.href).href;
    } catch (error) {
      return "";
    }
  })();

  function siteUrl(path) {
    if (!shellBaseUrl) return path;
    return new URL(path.replace(/^\/+/, ""), shellBaseUrl).href;
  }

  function toSiteHref(href) {
    if (!href) return href;
    if (/^(https?:|mailto:|tel:|javascript:)/i.test(href)) return href;
    if (!href.startsWith("/")) return href;
    if (location.protocol !== "file:") return href;

    if (href === "/") return siteUrl("index.html");
    if (href.startsWith("/#")) return `${siteUrl("index.html")}${href.slice(1)}`;

    const [basePath, hash = ""] = href.split("#");
    const normalized = basePath.endsWith("/") ? `${basePath}index.html` : basePath;
    return `${siteUrl(normalized)}${hash ? `#${hash}` : ""}`;
  }

  function rewriteFileModeLinks(root = document) {
    if (location.protocol !== "file:") return;
    root.querySelectorAll('a[href^="/"]').forEach((link) => {
      const raw = link.getAttribute("href");
      const next = toSiteHref(raw);
      if (next) link.setAttribute("href", next);
    });
  }

  function appendShell() {
    const main = document.querySelector("main");
    if (!main || document.querySelector(".category-shell-contact")) return;

    const shell = document.createElement("div");
    shell.innerHTML = `
      <section id="contact" class="category-shell-contact">
        <div class="wrap">
          <div class="inline-contact-head">
            <div>
              <p class="section-kicker">Get in touch</p>
              <h3 class="title">Contact</h3>
              <p class="lead">Tell me what you're building, fixing, or trying to figure out. Fabrication work, websites, tools, camp systems, gear questions, and rough ideas are all welcome.</p>
              <p class="lead section-note">The best first message says what you want done, what is in the way, and any links, photos, measurements, or deadlines I should know about.</p>
            </div>
            <div class="inline-contact-photo" aria-label="Chris Follin">
              <img src="${siteUrl("assets/people/chris-follin-portrait.jpg")}" alt="Chris Follin" loading="lazy">
            </div>
          </div>
          <form
            id="contactForm"
            action="https://formspree.io/f/xgvlgzzg"
            method="POST"
            class="contact-box"
          >
            <div class="row">
              <input name="name" class="input" placeholder="Your name" aria-label="Your name" required aria-required="true">
              <input name="email" class="input" placeholder="Your email" aria-label="Your email address" type="email" required aria-required="true">
            </div>
            <textarea name="message" class="input" placeholder="Message" aria-label="Message" required aria-required="true"></textarea>
          <input type="hidden" name="_subject" value="Follincraft: New message from site">
          <input type="text" name="_gotcha" aria-label="Leave this field empty" autocomplete="off" tabindex="-1" style="display:none">
            <button class="btn solid" type="submit">Send Message</button>
            <p id="contactStatus" class="lead" role="status" aria-live="polite" style="display:none;margin-top:8px"></p>
            <p class="form-privacy-note">Messages are delivered through Formspree. <a href="${siteUrl("privacy/index.html")}">Privacy details</a>.</p>
          </form>
        </div>
      </section>

      <footer class="category-shell-footer">
        <div class="wrap category-shell-footer-grid">
          <div>
            <h3>About Follincraft</h3>
            <p class="lead" style="font-size:14px;color:var(--muted)">
              Twenty-plus years of fabrication, design, code, and field notes in one place. Shop builds, camp-tested gear, and practical tools for making the next decision faster.
            </p>
          </div>

          <div>
            <h3>Location</h3>
            <p class="lead" style="font-size:14px;color:var(--muted)">Based in Phoenix, Arizona.</p>
            <iframe
              class="footer-map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d423286.2740571041!2d-112.0205025!3d33.4483769!2m3!1f0!2f0!3f0!2m3!1i1024!2i768!4f13.1!3m3!1m2!1s0x872b12ed65b0c3e3%3A0x9d2a4d5d4c8c2b1e!2sPhoenix%2C+AZ!5e0!3m2!1sen!2sus!4v1694700000000!5m2!1sen!2sus"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              allowfullscreen
            ></iframe>
          </div>

          <div>
            <h3>Connect</h3>
            <div class="footer-links">
              <a href="https://linkedin.com/in/chrisfollin" target="_blank" rel="noopener" class="btn">LinkedIn</a>
              <a href="https://www.instagram.com/follincraft/" target="_blank" rel="noopener" class="btn">Instagram</a>
              <a href="mailto:cfollin84@gmail.com" class="btn">Email Me</a>
            </div>
            <p class="lead" style="margin-top:16px;font-size:14px;color:var(--muted)">
              Fabrication, code, camp systems, or the half-formed idea you want to make real.
            </p>
          </div>
        </div>
        <p class="footer-legal"><a href="${siteUrl("privacy/index.html")}">Privacy</a> &middot; <a href="${siteUrl("disclosure/index.html")}">Affiliate disclosure</a></p>
        <p class="footer-copy"><span>All Rights Reserved &copy; <span id="year"></span>. Designed and Built by Chris Follin</span></p>
      </footer>
    `;

    const fragment = document.createDocumentFragment();
    while (shell.firstElementChild) {
      fragment.appendChild(shell.firstElementChild);
    }
    main.after(fragment);

    const year = document.getElementById("year");
    if (year) year.textContent = String(new Date().getFullYear());
    rewriteFileModeLinks(document);

    if (location.hash === "#contact") {
      const scrollToContact = () => {
        const contact = document.getElementById("contact");
        if (!contact) return;
        const navHeight = document.querySelector("header")?.offsetHeight || 0;
        const top = contact.getBoundingClientRect().top + window.scrollY - navHeight - 18;
        window.scrollTo({ top, behavior: "auto" });
      };
      requestAnimationFrame(scrollToContact);
      setTimeout(scrollToContact, 120);
    }
  }

  function initCategoryCarousels() {
    const collectionLaneIds = ["campCollectionsGrid", "gearCollectionsGrid"];

    function resetLanePosition(lane) {
      if (!lane) return;
      const previousBehavior = lane.style.scrollBehavior;
      lane.style.scrollBehavior = "auto";
      lane.scrollLeft = 0;
      requestAnimationFrame(() => {
        lane.scrollLeft = 0;
        requestAnimationFrame(() => {
          lane.scrollLeft = 0;
          setTimeout(() => {
            lane.scrollLeft = 0;
            lane.style.scrollBehavior = previousBehavior;
          }, 0);
        });
      });
    }

    collectionLaneIds.forEach((id) => {
      const lane = document.getElementById(id);
      resetLanePosition(lane);
    });

    document.querySelectorAll('.carousel-arrow[data-target]').forEach((btn) => {
      btn.addEventListener("click", () => {
        const targetId = btn.getAttribute("data-target");
        const lane = targetId ? document.getElementById(targetId) : null;
        if (!lane) return;
        const firstCard = lane.querySelector(":scope > *");
        const dir = btn.getAttribute("data-dir") === "prev" ? -1 : 1;
        const laneStyles = window.getComputedStyle(lane);
        const gap = parseFloat(laneStyles.columnGap || laneStyles.gap || "0") || 0;
        const cardWidth = firstCard ? firstCard.getBoundingClientRect().width : lane.clientWidth;
        lane.scrollBy({ left: dir * (cardWidth + gap), behavior: "smooth" });
      });
    });

    window.addEventListener("load", () => {
      collectionLaneIds.forEach((id) => resetLanePosition(document.getElementById(id)));
    });

    window.addEventListener("pageshow", () => {
      collectionLaneIds.forEach((id) => resetLanePosition(document.getElementById(id)));
    });

    window.addEventListener("resize", () => {
      collectionLaneIds.forEach((id) => resetLanePosition(document.getElementById(id)));
    });
  }

  function initMobileMenu() {
    const menuBtn = document.getElementById("menuBtn");
    const mobileMenu = document.getElementById("mobileMenu");
    if (!menuBtn || !mobileMenu) return;

    menuBtn.addEventListener("click", () => {
      const open = mobileMenu.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
      mobileMenu.setAttribute("aria-hidden", open ? "false" : "true");
    });
  }

  function initBuyLinks() {
    document.addEventListener("click", (event) => {
      const link = event.target.closest("a.btn.buy, a.gear-detail-buy");
      if (!link) return;
      const href = link.getAttribute("href");
      if (!href || !/^https?:\/\//i.test(href)) return;
      event.preventDefault();
      window.location.href = href;
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    appendShell();
    initMobileMenu();
    initCategoryCarousels();
    initBuyLinks();
  });
})();
