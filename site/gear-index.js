(function () {
  "use strict";

  const CATEGORY_LABELS = {
    shelter: "Shelter & Sleep",
    cooking: "Cooking & Food",
    water: "Water & Filtration",
    comfort: "Camp Comfort",
    packs: "Packs & Carry",
    tools: "Tools & Repair",
    lighting: "Lighting & Power",
    vehicle: "Vehicle & Van",
    camera: "Camera & Media",
    clothing: "Clothing"
  };

  const CATEGORY_SECTIONS = [
    {
      id: "shelter",
      kicker: "Sleep System",
      title: "Shelter & Sleep",
      note: "Start here if bad sleep ruins the whole trip. Shelter, insulation, pillows, stakes, blankets, and the weather margin that keeps nights recoverable."
    },
    {
      id: "cooking",
      kicker: "Camp Kitchen",
      title: "Cooking & Food",
      note: "The food system that prevents cooler chaos, missing utensils, and half-planned meals from taking over the best part of camp."
    },
    {
      id: "water",
      kicker: "Water",
      title: "Water & Filtration",
      note: "Filters, cans, pumps, and storage for the trips where water needs to be clean, reachable, and boringly reliable."
    },
    {
      id: "comfort",
      kicker: "Stay Awhile",
      title: "Camp Comfort",
      note: "Chairs, tables, blankets, hammocks, heat, airflow, and the small comforts that make camp feel like a place to stay, not just a place to sleep."
    },
    {
      id: "packs",
      kicker: "Carry",
      title: "Packs & Carry",
      note: "Bags, organizers, towels, and carry pieces that keep the vehicle, tent, and day kit from becoming one large mystery pile."
    },
    {
      id: "tools",
      kicker: "Fix & Cut",
      title: "Tools & Repair",
      note: "Cutting, fixing, tire, recovery, and communication gear for the problems that should be handled, not allowed to end the trip."
    },
    {
      id: "lighting",
      kicker: "Power",
      title: "Lighting & Power",
      note: "Headlamps, lanterns, batteries, chargers, and power pieces that keep camp usable after dark and away from outlets."
    },
    {
      id: "vehicle",
      kicker: "Vehicle Systems",
      title: "Vehicle & Van",
      note: "The vehicle-camp layer: fridges, compressors, chargers, heaters, fans, water, power systems, and road-trip hardware that need to work as a system."
    },
    {
      id: "camera",
      kicker: "Media",
      title: "Camera & Media",
      note: "Camera and support gear that improves photos and video while staying small enough that the trip still comes first."
    },
    {
      id: "clothing",
      kicker: "Layers",
      title: "Clothing",
      note: "Simple layers that earn a permanent spot because weather usually finds the weakest part of the kit first."
    }
  ];

  function qs(selector, root = document) {
    return root.querySelector(selector);
  }

  function assetPath(value) {
    if (!value) return "";
    const path = String(value);
    if (/^(https?:)?\/\//.test(path)) return path;
    if (path.startsWith("/") && location.protocol === "file:") return `..${path}`;
    if (path.startsWith("/")) return path;
    return `/${path}`;
  }

  function cleanHref(value) {
    if (!value) return value;
    const href = String(value).replace(/\/index\.html(?=$|[?#])/, "/");
    if (!href.startsWith("/") || location.protocol !== "file:") return href;
    const [basePath, hash = ""] = href.split("#");
    const normalized = basePath.endsWith("/") ? `${basePath}index.html` : basePath;
    return `..${normalized}${hash ? `#${hash}` : ""}`;
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function setupCustomSelect(selectName, onChange) {
    const root = document.querySelector(`.fc-select[data-select="${selectName}"]`);
    if (!root) return null;

    const trigger = root.querySelector(".fc-select-trigger");
    const label = root.querySelector(".fc-select-label");
    const options = Array.from(root.querySelectorAll(".fc-select-option"));
    let current = options.find((option) => option.classList.contains("is-selected"))?.dataset.value || "";

    function closeOthers() {
      document.querySelectorAll(".fc-select.is-open").forEach((el) => {
        if (el === root) return;
        el.classList.remove("is-open");
        el.querySelector(".fc-select-trigger")?.setAttribute("aria-expanded", "false");
      });
    }

    function setValue(value, dispatch = true) {
      current = value;
      options.forEach((option) => {
        const selected = option.dataset.value === value;
        option.classList.toggle("is-selected", selected);
        option.setAttribute("aria-selected", selected ? "true" : "false");
        if (selected && label) label.textContent = option.textContent || "";
      });
      root.dataset.value = value;
      if (dispatch && typeof onChange === "function") onChange(value);
    }

    trigger?.addEventListener("click", () => {
      const isOpen = root.classList.contains("is-open");
      closeOthers();
      root.classList.toggle("is-open", !isOpen);
      trigger.setAttribute("aria-expanded", !isOpen ? "true" : "false");
    });

    options.forEach((option) => {
      option.addEventListener("click", () => {
        setValue(option.dataset.value || "");
        root.classList.remove("is-open");
        trigger?.setAttribute("aria-expanded", "false");
      });
    });

    document.addEventListener("click", (event) => {
      if (!event.target.closest(".fc-select")) {
        root.classList.remove("is-open");
        trigger?.setAttribute("aria-expanded", "false");
      }
    });

    setValue(current, false);
    return {
      getValue: () => current
    };
  }

  function render() {
    const data = Object.entries(window.GEAR_DATA || {}).map(([id, item], index) => ({ id, index, ...item }));
    const grid = qs("[data-index-grid]");
    const empty = qs("[data-index-empty]");
    const count = qs("[data-index-count]");
    const search = qs("[data-index-search]");
    if (!grid) return;

    if (!data.length) {
      const fallbackCount = grid.querySelectorAll(".category-card-link").length;
      if (count && fallbackCount) count.textContent = `${fallbackCount} ${fallbackCount === 1 ? "item" : "items"}`;
      if (empty) empty.hidden = fallbackCount !== 0;
      return;
    }

    const categorySelect = setupCustomSelect("gearCategory", draw);
    const sortSelect = setupCustomSelect("gearSort", draw);

    function haystack(item) {
      return [item.title, item.review, item.myTake, item.category, ...(item.meta || [])].join(" ").toLowerCase();
    }

    function cardHTML(item) {
      const href = cleanHref(item.page || item.url || "#");
      const thumb = assetPath(item.thumb || "");
      const title = item.title || "";
      const desc = item.review || item.myTake || "";
      const category = CATEGORY_LABELS[item.category] || item.category || "Gear";
      const meta = (item.meta || []).slice(0, 4);

      return `
        <a class="category-card-link" href="${href}">
          <article class="card category-card gear-card">
            <div class="thumb">
              ${thumb ? `<img src="${thumb}" alt="${escapeHtml(title)}" loading="lazy">` : ""}
            </div>
            <div class="card-body">
              <div class="card-meta">${escapeHtml(category.toUpperCase())}</div>
              <h4>${escapeHtml(title)}</h4>
              ${desc ? `<p class="desc">${escapeHtml(desc)}</p>` : ""}
              ${meta.length ? `<div class="card-tags">${meta.map((tag) => `<span class="pill">${escapeHtml(String(tag))}</span>`).join("")}</div>` : ""}
            </div>
          </article>
        </a>
      `;
    }

    function visibleItems() {
      const query = (search?.value || "").trim().toLowerCase();
      const selectedCategory = categorySelect?.getValue?.() || "all";
      return data.filter((item) => {
        if (selectedCategory !== "all" && String(item.category || "") !== selectedCategory) return false;
        if (!query) return true;
        return haystack(item).includes(query);
      });
    }

    function sortItems(items) {
      const sort = sortSelect?.getValue?.() || "featured";
      if (sort === "az") {
        return [...items].sort((a, b) => (a.title || "").localeCompare(b.title || ""));
      }
      return [...items].sort((a, b) => a.index - b.index);
    }

    function sectionHTML(section, items) {
      if (!items.length) return "";
      return `
        <section class="gear-topic-section" id="gear-${escapeHtml(section.id)}" data-gear-section="${escapeHtml(section.id)}">
          <div class="gear-topic-head">
            <p class="section-kicker">${escapeHtml(section.kicker)}</p>
            <h2>${escapeHtml(section.title)}</h2>
            <p>${escapeHtml(section.note)}</p>
          </div>
          <div class="index-grid gear-index-grid">
            ${sortItems(items).map(cardHTML).join("")}
          </div>
        </section>
      `;
    }

    function draw() {
      const list = visibleItems();
      const byCategory = new Map();
      list.forEach((item) => {
        const key = item.category || "tools";
        if (!byCategory.has(key)) byCategory.set(key, []);
        byCategory.get(key).push(item);
      });

      const knownSections = CATEGORY_SECTIONS.map((section) => sectionHTML(section, byCategory.get(section.id) || "")).join("");
      const knownIds = new Set(CATEGORY_SECTIONS.map((section) => section.id));
      const extras = Array.from(byCategory.entries())
        .filter(([id]) => !knownIds.has(id))
        .map(([id, items]) => sectionHTML({
          id,
          kicker: "Gear",
          title: CATEGORY_LABELS[id] || id,
          note: "Other pieces that still need a clean category."
        }, items))
        .join("");

      grid.innerHTML = knownSections + extras;
      if (count) count.textContent = `${list.length} ${list.length === 1 ? "item" : "items"}`;
      if (empty) empty.hidden = list.length !== 0;
    }

    search?.addEventListener("input", draw);
    draw();
  }

  document.addEventListener("DOMContentLoaded", render);
})();
