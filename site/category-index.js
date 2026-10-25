(function () {
  "use strict";

  const ROOT_TOOLS = [
    {
      id: "sheet_metal_gauge_reference",
      title: "Sheet Metal Gauge Reference",
      desc: "Quick gauge and thickness lookup for steel, stainless, and aluminum.",
      meta: ["Reference", "Sheet metal", "Shop"],
      thumb: "/assets/sheet_metal_gauge.jpg",
      page: "/repo/sheet_metal_gauge_reference.html"
    },
    {
      id: "pipe_table",
      title: "Pipe Schedule Table",
      desc: "NPS pipe sizes with OD, wall, ID, and weight references.",
      meta: ["Reference", "Pipe", "Fabrication"],
      thumb: "/assets/quote_tool.jpg",
      page: "/repo/pipe_table.html"
    },
    {
      id: "cut_list_calculator",
      title: "Cut List Calculator",
      desc: "Plan stock lengths, cuts, kerf, and scrap before you start cutting.",
      meta: ["Calculator", "Cut list", "Shop"],
      thumb: "/assets/sawblade.jpg",
      page: "/repo/cut_list_calculator.html"
    },
    {
      id: "material_weight_cost_estimator",
      title: "Material Takeoff & Weight Builder",
      desc: "Build a printable material takeoff with shape weights, surface area, and linear footage.",
      meta: ["Takeoff", "Weight", "Shop"],
      thumb: "/assets/quote_tool.jpg",
      page: "/repo/material_weight_cost_estimator.html"
    },
    {
      id: "panel_layout_calculator",
      title: "Panel Layout Calculator",
      desc: "Lay rectangular parts onto sheet stock and see material use.",
      meta: ["Calculator", "Panels", "Layout"],
      thumb: "/assets/panel_layout.jpg",
      page: "/repo/panel_layout_calculator.html"
    },
    {
      id: "dxf_nesting",
      title: "DXF Nesting Layout",
      desc: "Upload simple DXF profiles, nest parts onto sheet stock, and print a labeled layout.",
      meta: ["Calculator", "DXF", "Nesting"],
      thumb: "/assets/panel_layout.jpg",
      page: "/repo/dxf_nesting.html"
    },
    {
      id: "backpacking_checklist",
      title: "Backpacking Checklist",
      desc: "A focused overnight and weekend checklist for trail trips.",
      meta: ["Checklist", "Backpacking", "Camp"],
      thumb: "/assets/tent.jpg",
      page: "/repo/backpacking_checklist.html"
    },
    {
      id: "car_camping_checklist",
      title: "Car Camping Checklist",
      desc: "Drive-in camp packing list for shelter, kitchen, lighting, and safety.",
      meta: ["Checklist", "Car camping", "Camp"],
      thumb: "/assets/truck0.jpg",
      page: "/repo/car_camping_checklist.html"
    },
    {
      id: "cookbook",
      title: "Camp Cookbook",
      desc: "Camp meals and ingredient lists that work away from the kitchen.",
      meta: ["Cookbook", "Camp", "Food"],
      thumb: "/gear/solostove/solostove-camp-opt.jpg",
      page: "/repo/cookbook.html"
    },
    {
      id: "campgrounds",
      title: "Campground & Dispersed Finder",
      desc: "A map-style campground and dispersed camping finder.",
      meta: ["Map", "Camp", "Reference"],
      thumb: "/assets/clearcreek1.jpg",
      page: "/repo/campgrounds.html"
    },
    {
      id: "critter_hazards",
      title: "Desert Critter ID & Hazards",
      desc: "Quick desert hazard notes for rattlers, scorpions, bees, and other trouble.",
      meta: ["Safety", "Desert", "Camp"],
      thumb: "/assets/bear.jpg",
      page: "/repo/critter_hazards.html"
    },
    {
      id: "desert_plants_reference",
      title: "Desert Plant ID",
      desc: "Cactus, mesquite, palo verde, ocotillo, agave, wildflowers, thorns, and toxic plants.",
      meta: ["Plants", "Desert", "Field"],
      thumb: "/assets/clearcreek2.jpg",
      page: "/repo/desert_plants_reference.html"
    }
  ];

  const ROOT_CODE = [
    {
      id: "angle-miter-calculator",
      type: "Code",
      title: "Angle + Miter Cut Calculator",
      desc: "How the cut-reference calculator handles outside, centerline, and inside dimensions before opening the live tool.",
      meta: ["Calculator", "Angles", "Fabrication"],
      thumb: "/assets/sawblade.jpg",
      page: "/code/angle_miter_calculator/"
    },
    {
      id: "sheet-metal-weight-calculator",
      type: "Code",
      title: "Sheet Metal Weight Calculator",
      desc: "The workflow behind fast material-weight checks, plus a direct path to the browser calculator.",
      meta: ["Calculator", "Material", "Fabrication"],
      thumb: "/code/metal_weight/metal_weight.jpg",
      page: "/code/metal_weight/"
    },
    {
      id: "cut-length-calculator",
      type: "Code",
      title: "Cut Length Calculator",
      desc: "A fabrication helper for cut planning, lengths, and cleaner shop math.",
      meta: ["Calculator", "Cutting", "Fabrication"],
      thumb: "/code/cut_length_calculator/cut_length.avif",
      page: "/code/cut_length_calculator/"
    },
    {
      id: "panel-layout-calculator",
      type: "Code",
      title: "Panel Layout Calculator",
      desc: "Lay rectangular panels onto sheet stock and compare material use before cutting.",
      meta: ["Calculator", "Panels", "Layout"],
      thumb: "/code/panel_layout/shear.jpeg",
      page: "/code/panel_layout/"
    }
  ];

  const ROOT_GEAR_GUIDES = [
    { id: "gear-actually-use", type: "Gear Guide", title: "Gear I actually use", desc: "The camp-bin staples that keep earning the trip.", meta: ["Gear", "Editorial", "Camp kit"], thumb: "/gear/nemopillow/nemopillow.png", page: "/gear/actually-use/" },
    { id: "gear-buy-again", type: "Gear Guide", title: "What I'd buy again", desc: "The shortlist of items I would replace without much hesitation.", meta: ["Gear", "Editorial", "Recommended"], thumb: "/gear/msrpocketrocket/msrpocketrocket.png", page: "/gear/buy-again/" },
    { id: "gear-beginner", type: "Gear Guide", title: "Beginner camp gear", desc: "A calmer starting point for useful gear without over-optimization.", meta: ["Gear", "Beginner", "Starter kit"], thumb: "/gear/colemanvintage/colemanvintage.png", page: "/gear/beginner/" },
    { id: "gear-car-camping", type: "Gear Guide", title: "Best gear for car camping", desc: "The comfort-heavy picks that make drive-in trips easier and better.", meta: ["Gear", "Car camping", "Comfort"], thumb: "/gear/gciwildernessrecliner/gciwilderness-camp-opt.jpg", page: "/gear/car-camping/" },
    { id: "gear-first-five", type: "Gear Guide", title: "The first five things I'd buy", desc: "The fastest way to build a useful starter kit without wasting money.", meta: ["Gear", "Starter kit", "Shortlist"], thumb: "/gear/blackdiamondstorm/blackdiamond.png", page: "/gear/first-five/" },
    { id: "gear-cold-weather", type: "Gear Guide", title: "Cold-weather camp gear", desc: "The pieces that matter more once the forecast gets less forgiving.", meta: ["Gear", "Cold weather", "Comfort"], thumb: "/gear/columbiarainjacket/columbiarainjacket-forest-opt.jpg", page: "/gear/cold-weather/" },
    { id: "gear-after-dark", type: "Gear Guide", title: "Gear that makes camp easier after dark", desc: "The lighting and backup gear that keep camp usable after sunset.", meta: ["Gear", "Lighting", "Power"], thumb: "/gear/garmininreachmini2/garmininreachmini2-dark.png", page: "/gear/after-dark/" },
    { id: "gear-camp-kitchen", type: "Gear Guide", title: "Best camp kitchen gear", desc: "The stove, kitchen, and dinnerware picks that keep meals simple.", meta: ["Gear", "Kitchen", "Cooking"], thumb: "/gear/solostove/solostove-camp-opt.jpg", page: "/gear/camp-kitchen/" },
    { id: "gear-camp-comfort", type: "Gear Guide", title: "Best camp comfort gear", desc: "The comfort picks that make camp nicer to stay in without turning into clutter.", meta: ["Gear", "Comfort", "Camp kit"], thumb: "/gear/outlandfirepit/outlandfirepit-camp-opt.jpg", page: "/gear/camp-comfort/" },
    { id: "gear-vehicle-power", type: "Gear Guide", title: "Vehicle camp power and systems", desc: "Batteries, charging, airflow, water, heat, and connectivity for vehicle-based camp setups.", meta: ["Gear", "Vehicle", "Power"], thumb: "/gear/lifepo4200ah/lifepo4200ah-dark.png", page: "/gear/vehicle-power/" },
    { id: "gear-recovery-kit", type: "Gear Guide", title: "Recovery and tire gear", desc: "Air, traction, tire repair, jump, and communication gear for camp roads.", meta: ["Gear", "Recovery", "Truck kit"], thumb: "/gear/xbullrecoveryboards/xbullrecoveryboards.png", page: "/gear/recovery-kit/" },
    { id: "gear-camp-tools", type: "Gear Guide", title: "Camp tools that earn space", desc: "Knives, saws, hatchets, stakes, and repair tools with actual jobs around camp.", meta: ["Gear", "Tools", "Field kit"], thumb: "/gear/silkygomboy240/silkygomboy240-dark.png", page: "/gear/camp-tools/" },
    { id: "gear-camera-trip-kit", type: "Gear Guide", title: "Camera gear for camp and travel", desc: "A compact camera, lens, tripod, power, and connectivity kit for documenting trips and projects.", meta: ["Gear", "Camera", "Media"], thumb: "/gear/sonyzve10/zve10.png", page: "/gear/camera-trip-kit/" }
  ];

  const ROOT_CAMP_ARTICLES = [
    { id: "phoenix-hot-weather-camping", type: "Camp Article", title: "Best camping near Phoenix in summer", desc: "Elevation, shade, water, and places where summer camping has a fighting chance.", meta: ["Camp", "Phoenix", "Summer escape"], thumb: "/camp/woodscanyon/woodscanyon1.jpg", page: "/camp/phoenix-hot-weather-camping/" },
    { id: "first-time-arizona-campsites", type: "Camp Article", title: "Best beginner campgrounds in Arizona", desc: "Low-drama Arizona places where a first camp trip can feel easy instead of punishing.", meta: ["Camp", "Arizona", "Beginner"], thumb: "/camp/ashurst/ashurst1.jpg", page: "/camp/first-time-arizona-campsites/" },
    { id: "camping-for-people-who-hate-camping", type: "Camp Article", title: "Best places for people who hate camping", desc: "Camps where the view, water, comfort, or nearby backup does more work than the tent.", meta: ["Camp", "Comfort", "Easy win"], thumb: "/camp/sanclementebeach/sanclementebeach1.jpg", page: "/camp/camping-for-people-who-hate-camping/" },
    { id: "best-arizona", type: "Camp Article", title: "Best campsites in Arizona", desc: "The Arizona shortlist I would actually send someone to first.", meta: ["Camp", "Arizona", "Roundup"], thumb: "/camp/endoftheworld/eotw1.jpg", page: "/camp/best-arizona/" },
    { id: "mogollon-rim", type: "Camp Region", title: "Best camping near Payson and the Mogollon Rim", desc: "High-country lake, creek, and pine camps near Payson and the Mogollon Rim.", meta: ["Camp", "Mogollon Rim", "Region"], thumb: "/camp/woodscanyon/woodscanyon1.jpg", page: "/camp/mogollon-rim/" },
    { id: "flagstaff", type: "Camp Region", title: "Best camping near Flagstaff, Arizona", desc: "Lake campgrounds, pine forests, dispersed sites, and high-country weekends near Flagstaff.", meta: ["Camp", "Flagstaff", "Region"], thumb: "/camp/ashurst/ashurst1.jpg", page: "/camp/flagstaff/" },
    { id: "prescott", type: "Camp Region", title: "Prescott camping", desc: "A shorter-drive mix of pines, lakes, developed sites, and shoulder-season trips.", meta: ["Camp", "Prescott", "Region"], thumb: "/camp/deadhorseranch/deadhorse1.jpg", page: "/camp/prescott/" },
    { id: "white-mountains", type: "Camp Region", title: "White Mountains camping", desc: "Cooler eastern Arizona lake camps and longer-weekend escapes.", meta: ["Camp", "White Mountains", "Region"], thumb: "/camp/showlowlake/showlowlake1.jpg", page: "/camp/white-mountains/" },
    { id: "southern-california-beach", type: "Camp Region", title: "Southern California beach camping", desc: "Coastal campgrounds where ocean access, wind, and reservations drive the plan.", meta: ["Camp", "Southern California", "Beach"], thumb: "/camp/sanclementebeach/sanclementebeach1.jpg", page: "/camp/southern-california-beach/" },
    { id: "hawaii", type: "Camp Region", title: "Hawaii camping", desc: "Beach parks, forest camps, permits, weather, and lighter island setups.", meta: ["Camp", "Hawaii", "Region"], thumb: "/camp/bellowsfield/bellowsfield1.jpg", page: "/camp/hawaii/" },
    { id: "best-lakeside", type: "Camp Article", title: "Best lake camping in Arizona", desc: "Arizona lake campgrounds where the water is part of the trip, not just the map pin.", meta: ["Camp", "Lake", "Roundup"], thumb: "/camp/bearcanyon/bearcanyon1-opt.jpg", page: "/camp/best-lakeside/" },
    { id: "weekend-phoenix", type: "Camp Article", title: "Easiest weekend camps from Phoenix", desc: "Shorter-drive options when the logistics matter as much as the campsite.", meta: ["Camp", "Phoenix", "Weekend"], thumb: "/camp/mogollon/mogollon4.jpg", page: "/camp/weekend-phoenix/" },
    { id: "best-cool-weather", type: "Camp Article", title: "Best cool-weather camps", desc: "Places where the forecast does more of the work.", meta: ["Camp", "Cool weather", "Roundup"], thumb: "/camp/marshall/marshall1.jpg", page: "/camp/best-cool-weather/" },
    { id: "best-showers", type: "Camp Article", title: "Best campgrounds with showers", desc: "Developed campground picks where a real shower changes the whole trip.", meta: ["Camp", "Showers", "Developed"], thumb: "/camp/foolshollow/foolshollow1.jpg", page: "/camp/best-showers/" },
    { id: "best-beginner", type: "Camp Article", title: "Best easy camps for new campers", desc: "Easy beginner-friendly camps where the first trip can feel manageable and worth repeating.", meta: ["Camp", "Beginner", "Easy setup"], thumb: "/camp/lakeview2/lakeview2-1.jpg", page: "/camp/best-beginner/" },
    { id: "best-beach", type: "Camp Article", title: "Best beach camping", desc: "Shoreline camps that still feel worth it once the wind, sand, and setup reality show up.", meta: ["Camp", "Beach", "Roundup"], thumb: "/camp/sanclementebeach/sanclementebeach1.jpg", page: "/camp/best-beach/" },
    { id: "best-quiet", type: "Camp Article", title: "Best quiet camps", desc: "Calmer sites and less noise when the whole point is a better mood.", meta: ["Camp", "Quiet", "Roundup"], thumb: "/camp/powellsprings/powellsprings1.jpg", page: "/camp/best-quiet/" },
    { id: "best-summer-escape", type: "Camp Article", title: "Best camps for summer escape", desc: "Cooler-air camps I would actually drive to once the valley heat stops being funny.", meta: ["Camp", "Summer", "Phoenix"], thumb: "/camp/showlowlake/showlowlake1.jpg", page: "/camp/best-summer-escape/" }
  ];

  const ROOT_HOW_TO = [
    {
      id: "choose-campsite",
      type: "Camp basics",
      title: "Choose a campsite that still works after dark",
      desc: "Read the ground, reject hazards, compare tradeoffs and keep a weather exit plan.",
      meta: ["Planning", "Site choice", "Beginner"],
      thumb: "/assets/how-to/real/choose-campsite-layout.jpg",
      page: "/how-to/choose-campsite/"
    },
    {
      id: "pack-car-camping",
      type: "Camp basics",
      title: "Pack, set up, and pack out a car camp",
      desc: "One system from loading the vehicle through arrival, evening reset and the ride home.",
      meta: ["Packing", "Car camping", "Weekend"],
      thumb: "/assets/how-to/real/pack-car-camping-colorado.jpg",
      page: "/how-to/pack-car-camping/"
    },
    {
      id: "sleep-better-tent",
      type: "Camp basics",
      title: "Sleep better in a tent: fix what wakes you up",
      desc: "Separate cold, pressure, slope and dampness before changing your sleep setup. A pre-bed check and next-trip log.",
      meta: ["Sleep", "Comfort", "Tent"],
      thumb: "/assets/how-to/real/sleep-better-volcanoes.jpg",
      page: "/how-to/sleep-better-tent/"
    },
    {
      id: "camp-kitchen",
      type: "Camp basics",
      title: "A camp kitchen that works from dinner to dishes",
      desc: "Handwashing, cold food, a worked meal, dishes and overnight storage in one guide.",
      meta: ["Kitchen", "Food", "Cleanup"],
      thumb: "/assets/how-to/real/camp-kitchen-pacheta.jpg",
      page: "/how-to/camp-kitchen/"
    },
    {
      id: "start-campfire",
      type: "Camp basics",
      title: "A small campfire, from permission to cold ashes",
      desc: "Prepare suitable fuel, keep the fire controlled, and finish with a cold-check—not a five-minute deadline.",
      meta: ["Fire", "Camp basics", "Safety"],
      thumb: "/assets/how-to/review-2026-09/kindling-sizes-v2.jpg",
      page: "/how-to/start-campfire/"
    },
  ];

  const qs = (selector, root = document) => root.querySelector(selector);

  function entries(type) {
    if (type === "projects") {
      return featuredFirst(Object.entries(window.PROJECT_DATA || {}))
        .map(([id, item]) => normalizeProject(id, item));
    }
    if (type === "camp") {
      return Object.entries(window.CAMP_DATA || {}).map(([id, item]) => normalizeCamp(id, item));
    }
    if (type === "gear") {
      return Object.entries(window.GEAR_DATA || {}).map(([id, item]) => normalizeGear(id, item));
    }
    if (type === "code") return ROOT_CODE;
    if (type === "how-to") return ROOT_HOW_TO;
    if (type === "repo") return ROOT_TOOLS.map((item) => ({ ...item, type: "Tools" }));
    if (type === "search") {
      return [
        ...entries("projects"),
        ...entries("camp"),
        ...ROOT_CAMP_ARTICLES,
        ...entries("how-to"),
        ...ROOT_GEAR_GUIDES,
        ...entries("gear"),
        ...entries("repo")
      ];
    }
    return [];
  }

  function normalizeProject(id, item) {
    return {
      id,
      type: "Projects",
      title: item.title || id,
      desc: item.desc || "",
      meta: item.meta || [],
      badge: item.badge || item.status || item.flag || "",
      thumb: assetPath(item.thumb || item.images?.[0] || ""),
      page: item.url || item.page || `/projects/${id}/`
    };
  }

  function isFeaturedItem(item) {
    const badge = String(item?.badge || item?.status || item?.flag || "").trim().toLowerCase();
    if (badge === "new" || badge === "featured") return true;
    if (Array.isArray(item?.tags)) {
      return item.tags.some((tag) => {
        const value = String(tag).trim().toLowerCase();
        return value === "new" || value === "featured";
      });
    }
    return false;
  }

  function featuredFirst(entries) {
    return entries
      .map(([id, item], index) => ({ id, item, index }))
      .sort((a, b) => {
        const af = isFeaturedItem(a.item) ? 1 : 0;
        const bf = isFeaturedItem(b.item) ? 1 : 0;
        if (bf !== af) return bf - af;
        return a.index - b.index;
      })
      .map(({ id, item }) => [id, item]);
  }

  function normalizeCamp(id, item) {
    const region = item.region ? String(item.region).replace(/-/g, " ") : "";
    return {
      id,
      type: "Camp",
      title: item.title || id,
      desc: item.notes || "",
      meta: [region, ...(item.tags || [])].filter(Boolean),
      thumb: assetPath(item.thumb || ""),
      page: item.page || `/camp/${id}/`,
      score: item.rating?.overall ? Number(item.rating.overall).toFixed(1) : ""
    };
  }

  function normalizeGear(id, item) {
    return {
      id,
      type: "Gear",
      title: item.title || id,
      desc: item.review || item.myTake || "",
      meta: [item.category, ...(item.meta || [])].filter(Boolean),
      thumb: assetPath(item.thumb || ""),
      page: item.page || `/gear/${id}/`
    };
  }

  function haystack(item) {
    return [item.title, item.desc, item.type, ...(item.meta || [])].join(" ").toLowerCase();
  }

  function matchesQuery(item, query) {
    const text = haystack(item);
    const terms = query.split(/\s+/).filter(Boolean);
    return terms.every((term) => text.includes(term));
  }

  function assetPath(value) {
    if (!value) return "";
    const path = String(value);
    if (/^(https?:)?\/\//.test(path)) return path;
    if (path.startsWith("/") && location.protocol === "file:") {
      const marker = "follincraft%20clean";
      const rawPath = location.pathname || "";
      const markerIdx = rawPath.toLowerCase().indexOf(marker);
      if (markerIdx !== -1) {
        return `file://${rawPath.slice(0, markerIdx + marker.length)}${path}`;
      }
    }
    if (path.startsWith("/")) return path;
    return `/${path}`;
  }

  function card(item) {
    const indexType = document.body.dataset.indexType || "";
    const meta = (item.meta || []).slice(0, 4);
    const badgeText = String(item.badge || "").trim();
    const badgeKey = badgeText.toLowerCase();
    const isNew = badgeKey === "new" || meta.some((tag) => String(tag).trim().toLowerCase() === "new");
    const visibleBadge = badgeKey === "new" || badgeKey === "featured" ? badgeText : "";
    const showMeta = indexType === "search";
    if (indexType === "projects") {
      return `
        <a class="category-card-link" href="${item.page}">
          <article class="card clickable project-card">
            <div class="thumb" style="position:relative;">
              ${visibleBadge ? `<div class="camp-badge-new">${escapeHtml(visibleBadge)}</div>` : ""}
              ${item.thumb ? `<img src="${item.thumb}" alt="${escapeHtml(item.title)}" loading="lazy">` : ""}
            </div>
            <div class="card-body">
              <h4>${escapeHtml(item.title)}</h4>
              ${item.desc ? `<p class="desc">${escapeHtml(item.desc)}</p>` : ""}
              ${meta.length ? `<div class="card-tags">${meta.map((tag) => `<span class="pill">${escapeHtml(String(tag))}</span>`).join("")}</div>` : ""}
            </div>
          </article>
        </a>
      `;
    }
    return `
      <a class="category-card-link" href="${item.page}">
        <article class="card category-card ${escapeHtml(String(item.type || "").toLowerCase())}-card">
          <div class="thumb">
            ${isNew ? `<div class="camp-badge-new">New</div>` : ""}
            ${item.thumb ? `<img src="${item.thumb}" alt="${escapeHtml(item.title)}" loading="lazy">` : ""}
          </div>
          <div class="card-body">
            ${showMeta ? `<div class="card-meta">${escapeHtml(item.type)}</div>` : ""}
            <h4>${escapeHtml(item.title)}</h4>
          ${
            item.score
              ? `<div class="camp-rating">
                  <span class="stars">${getStars(item.score)}</span>
                  <span class="score">${item.score}</span>
                </div>`
              : ""
          }
            ${item.desc ? `<p class="desc">${escapeHtml(item.desc)}</p>` : ""}
            ${meta.length ? `<div class="card-tags">${meta.map((tag) => `<span class="pill">${escapeHtml(String(tag))}</span>`).join("")}</div>` : ""}
          </div>
        </article>
      </a>
    `;
  }

  const SEARCH_SECTIONS = [
    {
      type: "Camp",
      kicker: "Camp",
      title: "Camp locations",
      note: "Places, campground notes, ratings, and trip-specific camp details."
    },
    {
      type: "Camp Article",
      kicker: "Articles",
      title: "Camp articles",
      note: "Roundups, shortlists, and opinionated camp planning pages."
    },
    {
      type: "Camp basics",
      kicker: "Skills",
      title: "Camp basics",
      note: "Campsite choice, packing, kitchen, sleep and campfire guides."
    },
    {
      type: "Gear",
      kicker: "Gear",
      title: "Gear items",
      note: "Individual gear pages with use cases, tradeoffs, and camp notes."
    },
    {
      type: "Gear Guide",
      kicker: "Articles",
      title: "Gear articles",
      note: "Roundups, buying guides, and opinionated gear shortlists."
    },
    {
      type: "Tools",
      kicker: "Tools",
      title: "Tools and references",
      note: "Calculators, checklists, tables, maps, and quick reference pages."
    },
    {
      type: "Projects",
      kicker: "Projects",
      title: "Projects",
      note: "Fabrication, vehicle, and shop project writeups."
    }
  ];

  function searchSectionHTML(section, items) {
    if (!items.length) return "";
    return `
      <section class="search-result-section">
        <div class="search-result-head">
          <div>
            <p class="section-kicker">${escapeHtml(section.kicker)}</p>
            <h2>${escapeHtml(section.title)}</h2>
            <p>${escapeHtml(section.note)}</p>
          </div>
          <span class="search-section-count">${items.length} ${items.length === 1 ? "result" : "results"}</span>
        </div>
        <div class="index-grid search-result-grid">
          ${items.map(card).join("")}
        </div>
      </section>
    `;
  }

  function searchGroupedHTML(items) {
    const sections = SEARCH_SECTIONS.map((section) => searchSectionHTML(
      section,
      items.filter((item) => item.type === section.type)
    )).filter(Boolean);

    const known = new Set(SEARCH_SECTIONS.map((section) => section.type));
    const extras = Object.entries(items.reduce((groups, item) => {
      if (known.has(item.type)) return groups;
      const type = item.type || "Other";
      groups[type] = groups[type] || [];
      groups[type].push(item);
      return groups;
    }, {})).map(([type, groupItems]) => searchSectionHTML({
      type,
      kicker: "More",
      title: type,
      note: "Additional results from the site."
    }, groupItems)).filter(Boolean);

    return [...sections, ...extras].join("");
  }

  function getStars(rating) {
    const value = Number(rating || 0);
    if (!value) return "";
    const full = Math.floor(value);
    const half = value % 1 >= 0.5;
    const empty = Math.max(0, 5 - full - (half ? 1 : 0));
    return "\u2605".repeat(full) + (half ? "\u2606" : "") + "\u2606".repeat(empty);
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function render() {
    const type = document.body.dataset.indexType;
    const grid = qs("[data-index-grid]");
    const count = qs("[data-index-count]");
    const input = qs("[data-index-search]");
    const empty = qs("[data-index-empty]");
    if (!type || !grid) return;

    const all = entries(type);
    if (!all.length) {
      const fallbackCount = grid.querySelectorAll(".category-card-link").length;
      if (count && fallbackCount) count.textContent = `${fallbackCount} ${fallbackCount === 1 ? "item" : "items"}`;
      if (empty) empty.hidden = fallbackCount !== 0;
      return;
    }

    const draw = () => {
      const query = (input?.value || "").trim().toLowerCase();
      const filtered = query ? all.filter((item) => matchesQuery(item, query)) : all;
      grid.innerHTML = type === "search" ? searchGroupedHTML(filtered) : filtered.map(card).join("");
      if (count) count.textContent = `${filtered.length} ${filtered.length === 1 ? "item" : "items"}`;
      if (empty) empty.hidden = filtered.length !== 0;
    };

    input?.addEventListener("input", draw);
    draw();
  }

  document.addEventListener("DOMContentLoaded", render);
})();
