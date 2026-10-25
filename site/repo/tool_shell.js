(function () {
  "use strict";

  function toSiteHref(href) {
    if (!href) return href;
    if (/^(https?:|mailto:|tel:|javascript:)/i.test(href)) return href;
    if (!href.startsWith("/")) return href;
    if (location.protocol !== "file:") return href;

    const marker = "follincraft%20clean";
    const rawPath = location.pathname || "";
    const markerIdx = rawPath.toLowerCase().indexOf(marker);
    if (markerIdx === -1) return href;

    const siteRoot = `file://${rawPath.slice(0, markerIdx + marker.length)}`;
    if (href === "/") return `${siteRoot}/index.html`;
    if (href.startsWith("/#")) return `${siteRoot}/index.html${href.slice(1)}`;

    const [basePath, hash = ""] = href.split("#");
    const normalized = basePath.endsWith("/") ? `${basePath}index.html` : basePath;
    return `${siteRoot}${normalized}${hash ? `#${hash}` : ""}`;
  }

  function rewriteFileModeLinks(root = document) {
    if (location.protocol !== "file:") return;
    root.querySelectorAll('a[href^="/"]').forEach((link) => {
      const raw = link.getAttribute("href");
      const next = toSiteHref(raw);
      if (next) link.setAttribute("href", next);
    });
  }

  function normalizeTitle(raw) {
    return (raw || "")
      .replace(/\s+[—-]\s+Follincraft.*$/i, "")
      .replace(/\s+\|\s+Follincraft.*$/i, "")
      .replace(/^Follincraft\s+[—-]\s+/i, "")
      .trim();
  }

  function buildHeader() {
    return `
      <div class="tool-site-shell">
        <header>
          <div class="wrap nav">
            <div class="brand">
              <div class="logo"><a href="/" style="text-decoration:none;color:inherit"><span class="pair"><span class="f">F</span><span class="c">C</span></span></a></div>
              <h1>Follin<span style="color:var(--accent)">craft</span></h1>
            </div>
            <nav id="topNav">
              <a href="/projects/">Projects</a>
              <a href="/camp/">Camp</a>
              <a href="/how-to/">How-To</a>
              <a href="/gear/">Gear</a>
              <a href="/repo/">Tools</a>
              <a href="/search/">Search</a>
              <a href="/#contact">Contact</a>
            </nav>
          </div>
        </header>
      </div>
    `;
  }

  function buildFooter() {
    return `
      <footer class="tool-shell-footer" style="padding:40px 0; background:var(--panel); border-top:1px solid var(--accent);">
        <div class="wrap" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(300px, 1fr)); gap:30px; text-align:left;">
          <div>
            <h3 style="color:var(--accent); margin-bottom:16px; font-size:20px;">About Follincraft</h3>
            <p class="lead" style="font-size:14px; color:var(--muted);">
              A personal showcase of 20+ years in metal fabrication, design, coding, and outdoor adventures. From clean welds and CNC builds in the shop to camping gear recommendations and code scripts that streamline workflows. It's all about making things work better.
            </p>
          </div>

          <div>
            <h3 style="color:var(--accent); margin-bottom:16px; font-size:20px;">Location</h3>
            <p class="lead" style="font-size:14px; color:var(--muted);">Based in Phoenix, Arizona.</p>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d423286.2740571041!2d-112.0205025!3d33.4483769!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x872b12ed65b0c3e3%3A0x9d2a4d5d4c8c2b1e!2sPhoenix%2C+AZ!5e0!3m2!1sen!2sus!4v1694700000000!5m2!1sen!2sus"
              width="100%"
              height="200"
              style="border:1px solid var(--line); border-radius:10px; margin-top:10px"
              allowfullscreen
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          <div>
            <h3 style="color:var(--accent); margin-bottom:16px; font-size:20px;">Connect</h3>
            <div style="display:flex; gap:10px; justify-content:left; flex-wrap:wrap;">
              <a href="https://linkedin.com/in/chrisfollin" target="_blank" rel="noopener" class="btn">LinkedIn</a>
              <a href="https://www.instagram.com/follincraft/" target="_blank" rel="noopener" class="btn">Instagram</a>
              <a href="mailto:cfollin84@gmail.com" class="btn">Email Me</a>
            </div>
            <p class="lead" style="margin-top:16px; font-size:14px; color:var(--muted);">
              Fabrication, code, camp systems, or the half-formed idea you want to make real.
            </p>
          </div>
        </div>

        <p style="text-align:center; font-size:12px; color:var(--muted); margin-top:30px; border-top:1px solid var(--line); padding-top:20px;">
          <span>All Rights Reserved © <span data-tool-shell-year></span>. Designed and Built by Chris Follin</span>
        </p>
      </footer>
    `;
  }

  function wrapContent() {
    if (document.querySelector(".tool-site-shell")) return;

    document.body.classList.add("tool-utility-page");
    const pageTitle = normalizeTitle(document.title);

    const shell = document.createElement("div");
    shell.innerHTML = buildHeader();

    const content = document.createElement("div");
    content.className = "tool-shell-content";

    const nodes = Array.from(document.body.childNodes);
    nodes.forEach((node) => {
      if (node === shell) return;
      content.appendChild(node);
    });

    if (content.querySelector(".hero .hero-row")) {
      document.body.classList.add("tool-checklist-page");
    }
    if (content.querySelector(".chips") && content.querySelector(".grid .card")) {
      document.body.classList.add("tool-reference-page");
    }

    document.body.appendChild(shell.firstElementChild);
    document.body.appendChild(content);
    const footer = document.createElement("div");
    footer.innerHTML = buildFooter();
    document.body.appendChild(footer.firstElementChild);
    const yearEl = document.querySelector("[data-tool-shell-year]");
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());
    rewriteFileModeLinks(document);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", wrapContent);
  } else {
    wrapContent();
  }
})();
