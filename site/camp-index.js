(function () {
  "use strict";

  const REGION_LABELS = {
    flagstaff: "Flagstaff",
    payson: "Mogollon Rim",
    prescott: "Prescott",
    "white-mountains": "White Mountains",
    "southern-az": "Southern AZ",
    "new-mexico": "New Mexico",
    colorado: "Colorado",
    "southern-california": "Southern California",
    "west-clear-creek": "West Clear Creek",
    oahu: "Oahu",
    hawaii: "Hawaii",
    utah: "Utah"
  };

  const REGION_SECTIONS = [
    {
      id: "colorado",
      kicker: "Mountain Escape",
      title: "Colorado",
      note: "Longer drives from Phoenix rewarded with clear lakes, green forest, high elevation, and genuinely cool summer air."
    },
    {
      id: "southern-california",
      kicker: "Coast & Mountains",
      title: "Southern California",
      note: "Beach bluffs, mountain lakes, and the trips where the weather does a lot of the work."
    },
    {
      id: "southern-az",
      kicker: "Desert Season",
      title: "Southern Arizona",
      note: "Lower-desert and borderland camps that make more sense when the Phoenix heat backs off."
    },
    {
      id: "new-mexico",
      kicker: "Nearby Escape",
      title: "New Mexico",
      note: "A little farther from Phoenix, but useful when you want cooler air, different terrain, or a new loop."
    },
    {
      id: "flagstaff",
      kicker: "High Country",
      title: "Flagstaff",
      note: "Pines, lakes, cooler nights, and the obvious first move when the desert starts cooking."
    },
    {
      id: "payson",
      kicker: "Mogollon Rim",
      title: "Mogollon Rim",
      note: "Fast elevation, forest roads, developed campgrounds, and the classic weekend escape from Phoenix."
    },
    {
      id: "prescott",
      kicker: "Granite & Pines",
      title: "Prescott",
      note: "A practical middle ground: cooler than town, easier than the Rim, and close enough for short trips."
    },
    {
      id: "white-mountains",
      kicker: "Cooler Nights",
      title: "White Mountains",
      note: "Higher country for longer drives, summer relief, lakes, and trips that feel farther away in a good way."
    },
    {
      id: "west-clear-creek",
      kicker: "Creek Country",
      title: "West Clear Creek",
      note: "Water, crossings, and canyon shade where the details matter more than the map pin."
    },
    {
      id: "oahu",
      kicker: "Island Camps",
      title: "Oahu",
      note: "Coastal camp notes where access, weather, and reservations matter as much as the view."
    },
    {
      id: "hawaii",
      kicker: "Island Camps",
      title: "Hawaii",
      note: "Big Island and island-trip camps where the setting changes the whole camping equation."
    },
    {
      id: "utah",
      kicker: "Red Rock Trips",
      title: "Utah",
      note: "Desert camp options for bigger drives, cooler seasons, and scenery that carries the trip."
    }
  ];

  function qs(selector, root = document) {
    return root.querySelector(selector);
  }

  function assetPath(value) {
    if (!value) return "";
    const path = String(value);
    if (/^(https?:)?\/\//.test(path) || path.startsWith("/")) return path;
    return `/${path}`;
  }

  function cleanHref(value) {
    if (!value) return value;
    return String(value).replace(/\/index\.html(?=$|[?#])/, "/");
  }

  function getStars(rating) {
    const value = Number(rating || 0);
    if (!value) return "";
    const rounded = Math.max(0, Math.min(5, Math.round(value)));
    return "★".repeat(rounded) + "☆".repeat(5 - rounded);
  }

  function regionLabel(key) {
    return REGION_LABELS[key] || key || "";
  }

  function isNewCamp(item) {
    return (item.tags || []).some((tag) => String(tag).trim().toLowerCase() === "new");
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
      option.setAttribute("role", "option");
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
      getValue: () => current,
      setValue
    };
  }

  function sortCamps(list, sortMode) {
    const collator = new Intl.Collator(undefined, { sensitivity: "base" });
    if (sortMode === "rating") {
      return [...list].sort((a, b) => (Number(b.rating?.overall || 0) - Number(a.rating?.overall || 0)) || collator.compare(a.title || "", b.title || ""));
    }
    if (sortMode === "az") {
      return [...list].sort((a, b) => collator.compare(a.title || "", b.title || ""));
    }
    if (sortMode === "state") {
      return [...list].sort((a, b) => collator.compare(regionLabel(a.region), regionLabel(b.region)) || collator.compare(a.title || "", b.title || ""));
    }
    if (sortMode === "locale") {
      return [...list].sort((a, b) => collator.compare(regionLabel(a.region), regionLabel(b.region)) || collator.compare(a.title || "", b.title || ""));
    }
    return [...list].sort((a, b) => {
      const aNew = isNewCamp(a) ? 1 : 0;
      const bNew = isNewCamp(b) ? 1 : 0;
      if (bNew !== aNew) return bNew - aNew;
      return (Number(b.rating?.overall || 0) - Number(a.rating?.overall || 0)) || collator.compare(a.title || "", b.title || "");
    });
  }

  function cardHTML(item) {
    const href = cleanHref(item.page || `/camp/${item.id}/`);
    const thumb = assetPath(item.thumb || "");
    const score = item.rating?.overall ? Number(item.rating.overall).toFixed(1) : "";
    const meta = regionLabel(item.region).toUpperCase();
    const tags = Array.isArray(item.tags) ? item.tags : [];

    return `
      <a class="category-card-link" href="${href}">
        <article class="card category-card camp-card">
          <div class="thumb">
            ${isNewCamp(item) ? `<div class="camp-badge-new">New</div>` : ""}
            ${thumb ? `<img src="${thumb}" alt="${escapeHtml(item.title || "Camp")}" loading="lazy">` : ""}
          </div>
          <div class="card-body">
            ${meta ? `<div class="card-meta">${escapeHtml(meta)}</div>` : ""}
            <h4>${escapeHtml(item.title || "")}</h4>
            ${score ? `<div class="camp-rating"><span class="stars">${getStars(item.rating.overall)}</span><span class="score">${score}</span></div>` : ""}
            ${item.notes ? `<p class="desc">${escapeHtml(item.notes)}</p>` : ""}
            ${tags.length ? `<div class="card-tags">${tags.map((tag) => `<span class="pill">${escapeHtml(String(tag))}</span>`).join("")}</div>` : ""}
          </div>
        </article>
      </a>
    `;
  }

  function sectionHTML(section, items, sortMode) {
    const sorted = sortCamps(items, sortMode);
    if (!sorted.length) return "";
    return `
      <section class="camp-topic-section">
        <div class="camp-topic-head">
          <div>
            <p class="section-kicker">${escapeHtml(section.kicker)}</p>
            <h2>${escapeHtml(section.title)}</h2>
            <p>${escapeHtml(section.note)}</p>
          </div>
          <span class="camp-section-count">${sorted.length} ${sorted.length === 1 ? "spot" : "spots"}</span>
        </div>
        <div class="index-grid camp-location-grid">
          ${sorted.map(cardHTML).join("")}
        </div>
      </section>
    `;
  }

  function groupedHTML(items, sortMode) {
    const sections = REGION_SECTIONS.map((section) => sectionHTML(
      section,
      items.filter((item) => item.region === section.id),
      sortMode
    )).filter(Boolean);

    const known = new Set(REGION_SECTIONS.map((section) => section.id));
    const extras = Object.entries(items.reduce((groups, item) => {
      if (known.has(item.region)) return groups;
      const key = item.region || "other";
      groups[key] = groups[key] || [];
      groups[key].push(item);
      return groups;
    }, {})).map(([region, groupItems]) => sectionHTML({
      id: region,
      kicker: "More Camps",
      title: regionLabel(region) || "Other Camps",
      note: "Additional camp notes that do not fit one of the main regions yet."
    }, groupItems, sortMode)).filter(Boolean);

    return [...sections, ...extras].join("");
  }

  function popupHTML(item) {
    const href = cleanHref(item.page || `/camp/${item.id}/`);
    const thumb = assetPath(item.thumb || "");
    const rating = item.rating?.overall ? Number(item.rating.overall).toFixed(1) : "";
    return `
      <div class="camp-map-popup-card">
        ${thumb ? `<a href="${href}" class="camp-map-popup-thumb-link"><img class="camp-map-popup-thumb" src="${thumb}" alt="${escapeHtml(item.title || "Camp")}"></a>` : ""}
        <div class="camp-map-popup-body">
          <div class="camp-map-popup-title">${escapeHtml(item.title || "Camp")}</div>
          <div class="camp-map-popup-meta">${escapeHtml(regionLabel(item.region))}</div>
          ${rating ? `<div class="camp-map-popup-rating"><span class="stars">${getStars(item.rating.overall)}</span><span class="score">${rating}</span></div>` : ""}
          ${item.notes ? `<div class="camp-map-popup-notes">${escapeHtml(item.notes)}</div>` : ""}
          ${Array.isArray(item.tags) && item.tags.length ? `<div class="camp-map-popup-tags">${item.tags.slice(0, 3).map((tag) => `<span class="pill">${escapeHtml(String(tag))}</span>`).join("")}</div>` : ""}
          <a href="${href}" class="camp-map-popup-link">Open camp</a>
        </div>
      </div>
    `;
  }

  function render() {
    const data = Object.entries(window.CAMP_DATA || {}).map(([id, item]) => ({ id, ...item }));
    const grid = qs("[data-index-grid]");
    const empty = qs("[data-index-empty]");
    const count = qs("[data-index-count]");
    const search = qs("[data-index-search]");
    const tabs = Array.from(document.querySelectorAll(".camp-view-btn"));
    const cardsView = qs("#campCardsView");
    const mapView = qs("#campMapView");
    const localeSelect = setupCustomSelect("campLocale", draw);
    const sortSelect = setupCustomSelect("campSort", draw);

    if (!data.length) {
      const fallbackCount = grid?.querySelectorAll(".category-card-link").length || 0;
      if (count && fallbackCount) count.textContent = `${fallbackCount} ${fallbackCount === 1 ? "item" : "items"}`;
      if (empty) empty.hidden = fallbackCount !== 0;
      return;
    }

    let map = null;
    let markersLayer = null;

    function matches(item) {
      const query = (search?.value || "").trim().toLowerCase();
      const activeLocale = localeSelect?.getValue?.() || "";
      if (activeLocale && item.region !== activeLocale) return false;
      if (!query) return true;
      const haystack = [item.title, item.notes, item.region, ...(item.tags || [])].join(" ").toLowerCase();
      return haystack.includes(query);
    }

    function filteredItems() {
      return data.filter(matches);
    }

    function ensureMap() {
      if (map || !window.L) return;
      map = window.L.map("campMap", {
        zoomControl: true,
        scrollWheelZoom: true
      });
      window.fcCampMap = map;
      map.setView([34.25, -111.7], 5);
      window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18,
        attribution: "&copy; OpenStreetMap contributors"
      }).addTo(map);
      markersLayer = window.L.layerGroup().addTo(map);
    }

    function renderMarkers(items) {
      ensureMap();
      if (!map || !markersLayer) return;
      markersLayer.clearLayers();

      const visible = items.filter((item) => !Number.isNaN(parseFloat(item.lat)) && !Number.isNaN(parseFloat(item.lng)));
      if (!visible.length) return;

      const bounds = [];
      visible.forEach((item) => {
        const lat = parseFloat(item.lat);
        const lng = parseFloat(item.lng);
        const marker = window.L.marker([lat, lng], {
          icon: window.L.divIcon({
            className: "fc-camp-marker-wrap",
            html: `<div style="width:16px;height:16px;border-radius:999px;background:var(--accent);border:2px solid #000;box-shadow:0 0 0 6px rgba(234,88,12,.15);"></div>`,
            iconSize: [16, 16],
            iconAnchor: [8, 8],
            popupAnchor: [0, -8]
          })
        });
        marker.bindPopup(popupHTML(item));
        marker.addTo(markersLayer);
        bounds.push([lat, lng]);
      });

      if (bounds.length === 1) {
        map.setView(bounds[0], 9);
      } else {
        map.fitBounds(bounds, { padding: [30, 30] });
      }
    }

    function setView(view) {
      const showCards = view !== "map";
      tabs.forEach((button) => {
        const active = button.dataset.view === view;
        button.classList.toggle("is-active", active);
        button.setAttribute("aria-selected", active ? "true" : "false");
      });
      if (cardsView) {
        cardsView.hidden = !showCards;
        cardsView.classList.toggle("is-active", showCards);
      }
      if (mapView) {
        mapView.hidden = showCards;
        mapView.classList.toggle("is-active", !showCards);
      }
      if (!showCards) {
        const items = filteredItems();
        renderMarkers(items);
        setTimeout(() => {
          map?.invalidateSize();
        }, 180);
      }
    }

    function draw() {
      const items = filteredItems();
      const sortMode = sortSelect?.getValue?.() || "featured";
      if (grid) grid.innerHTML = groupedHTML(items, sortMode);
      if (count) count.textContent = `${items.length} ${items.length === 1 ? "item" : "items"}`;
      if (empty) empty.hidden = items.length !== 0;
      if (!mapView?.hidden) renderMarkers(sortCamps(items, sortMode));
    }

    tabs.forEach((button) => {
      button.addEventListener("click", () => setView(button.dataset.view || "cards"));
    });

    search?.addEventListener("input", draw);
    draw();
    setView("cards");
  }

  document.addEventListener("DOMContentLoaded", render);
})();
