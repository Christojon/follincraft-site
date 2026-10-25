(function () {
  const laneData = {
    fab: {
      eyebrow: "01 / CUSTOM FABRICATION",
      title: "Custom fabrication at Empire",
      text: "For professional metal fabrication, specialty parts, or shop-built pieces, the project belongs at Empire Metal Products. That gives it the right equipment, processes, and shop support behind it.",
      href: "../services/fabrication/index.html",
      label: "View fabrication details"
    },
    web: {
      eyebrow: "02 / WEBSITES AND TOOLS",
      title: "Websites and tools that solve real workflow problems",
      text: "Small business sites, event flows, forms, payment systems, calculators, and simple tools built around the way the work actually happens.",
      href: "../services/websites/index.html",
      label: "View web and tool details"
    },
    systems: {
      eyebrow: "03 / SYSTEMS AND SETUPS",
      title: "Plan the setup before you buy parts",
      text: "Storage layout, 12V power, camp kitchen flow, packing systems, recovery gear, and field setups are all fair game. I can help sort what matters, what to skip, and what order to tackle it in. This is planning help, not vehicle repair work.",
      href: "../services/systems/index.html",
      label: "View setup planning"
    },
    consulting: {
      eyebrow: "04 / PRACTICAL CONSULTING",
      title: "Turn the rough idea into a usable plan",
      text: "Bring the half-formed idea, weird constraint, or project that needs a second brain. I can help sort materials, measurements, workflows, tradeoffs, and the next useful step.",
      href: "../services/consulting/index.html",
      label: "View consulting details"
    }
  };

  const laneOrder = ["fab", "web", "systems", "consulting"];
  const map = document.querySelector(".project-orbit-map");
  const nodes = document.querySelectorAll(".project-service-node");
  const eyebrow = document.getElementById("projectLaneEyebrow");
  const title = document.getElementById("projectLaneTitle");
  const text = document.getElementById("projectLaneText");
  const link = document.getElementById("projectLaneLink");
  const detail = document.querySelector(".project-orbit-detail");
  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (!map || !nodes.length || !eyebrow || !title || !text || !link) return;

  function setLane(lane) {
    const data = laneData[lane];
    if (!data) return;
    map.dataset.activeLane = lane;
    eyebrow.textContent = data.eyebrow;
    title.textContent = data.title;
    text.textContent = data.text;
    link.href = data.href;
    link.textContent = data.label;
    if (data.external) {
      link.target = "_blank";
      link.rel = "noopener";
    } else {
      link.removeAttribute("target");
      link.removeAttribute("rel");
    }
    nodes.forEach((node) => {
      const active = node.dataset.lane === lane;
      node.classList.toggle("active", active);
      node.setAttribute("aria-pressed", active ? "true" : "false");
    });
    if (detail) {
      detail.classList.remove("is-swapping");
      void detail.offsetWidth;
      detail.classList.add("is-swapping");
    }
  }

  nodes.forEach((node) => {
    node.addEventListener("click", () => setLane(node.dataset.lane));
    node.addEventListener("focus", () => setLane(node.dataset.lane));
    if (canHover) {
      node.addEventListener("pointerenter", () => setLane(node.dataset.lane));
    }
    node.addEventListener("keydown", (event) => {
      const current = laneOrder.indexOf(map.dataset.activeLane || "fab");
      if (["1", "2", "3", "4"].includes(event.key)) {
        setLane(laneOrder[Number(event.key) - 1]);
        event.preventDefault();
      } else if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        setLane(laneOrder[(current + 1) % laneOrder.length]);
        event.preventDefault();
      } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        setLane(laneOrder[(current + laneOrder.length - 1) % laneOrder.length]);
        event.preventDefault();
      }
    });
  });
})();
