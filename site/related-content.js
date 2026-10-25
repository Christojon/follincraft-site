(function () {
  "use strict";

  const CAMP_GUIDES = {
    "best-arizona": { title: "Best campsites in Arizona", desc: "The short list I would actually send someone to first.", href: "/camp/best-arizona/" },
    "best-lakeside": { title: "Best lake camping in Arizona", desc: "Arizona lake campgrounds where the water is part of the trip.", href: "/camp/best-lakeside/" },
    "weekend-phoenix": { title: "Easiest weekend camps from Phoenix", desc: "The realistic options when you want a good weekend, not a logistics marathon.", href: "/camp/weekend-phoenix/" },
    "phoenix-hot-weather-camping": { title: "Best camping near Phoenix in summer", desc: "Higher elevation, shade, water, and cooler nights for summer camping near Phoenix.", href: "/camp/phoenix-hot-weather-camping/" },
    "first-time-arizona-campsites": { title: "Best beginner campgrounds in Arizona", desc: "Low-drama Arizona campgrounds for first-time campers who need the trip to feel worth repeating.", href: "/camp/first-time-arizona-campsites/" },
    "camping-for-people-who-hate-camping": { title: "Best places for people who hate camping", desc: "Comfort-first camps for people who do not want a hard-mode weekend.", href: "/camp/camping-for-people-who-hate-camping/" },
    "best-cool-weather": { title: "Best cool-weather camps", desc: "Where I would go first when the point is better air, layers, and sleeping well.", href: "/camp/best-cool-weather/" },
    "best-showers": { title: "Best campgrounds with showers", desc: "The developed campgrounds where a real shower actually matters.", href: "/camp/best-showers/" },
    "best-beginner": { title: "Best easy camps for new campers", desc: "Easy beginner-friendly camps where the first trip can feel manageable and worth repeating.", href: "/camp/best-beginner/" },
    "best-beach": { title: "Best beach camping", desc: "The coastal camps that still feel worth it once wind, sand, and setup reality show up.", href: "/camp/best-beach/" },
    "best-quiet": { title: "Best quiet camps", desc: "The calmer picks where spacing and lower noise really improve the stay.", href: "/camp/best-quiet/" },
    "best-summer-escape": { title: "Best camps for summer escape", desc: "The cooler-air camps I'd drive to once the valley heat gets old.", href: "/camp/best-summer-escape/" }
  };

  Object.assign(CAMP_GUIDES, {
    "mogollon-rim": { title: "Best camping near Payson and the Mogollon Rim", desc: "High-country lake, creek, and pine camps near Payson and the Mogollon Rim.", href: "/camp/mogollon-rim/" },
    "flagstaff": { title: "Best camping near Flagstaff, Arizona", desc: "Lake campgrounds, pine forests, dispersed sites, and high-country weekends near Flagstaff.", href: "/camp/flagstaff/" },
    "prescott": { title: "Prescott camping", desc: "A shorter-drive mix of pines, lakes, developed sites, and shoulder-season trips.", href: "/camp/prescott/" },
    "white-mountains": { title: "White Mountains camping", desc: "Cooler eastern Arizona lake camps and longer-weekend escapes.", href: "/camp/white-mountains/" },
    "southern-california-beach": { title: "Southern California beach camping", desc: "Coastal campgrounds where ocean access, wind, and reservations drive the plan.", href: "/camp/southern-california-beach/" },
    "hawaii": { title: "Hawaii camping", desc: "Beach parks, forest camps, permits, weather, and lighter island setups.", href: "/camp/hawaii/" }
  });

  const GEAR_GUIDES = {
    "actually-use": { title: "Gear I actually use", desc: "The camp-bin staples that keep earning the trip.", href: "/gear/actually-use/" },
    "buy-again": { title: "What I'd buy again", desc: "The shortlist of items I would replace without much hesitation.", href: "/gear/buy-again/" },
    "beginner": { title: "Beginner camp gear", desc: "A calmer starting point for useful gear without over-optimization.", href: "/gear/beginner/" },
    "car-camping": { title: "Best gear for car camping", desc: "Drive-in picks for food, water, comfort, power, and vehicle backup.", href: "/gear/car-camping/" },
    "first-five": { title: "The first five things I'd buy", desc: "The fastest way to build a useful starter kit without wasting money.", href: "/gear/first-five/" },
    "cold-weather": { title: "Cold-weather camp gear", desc: "The pieces that matter more once the forecast gets less forgiving.", href: "/gear/cold-weather/" },
    "after-dark": { title: "Gear that makes camp easier after dark", desc: "Lighting, backup power, and safety margin after sunset.", href: "/gear/after-dark/" },
    "camp-kitchen": { title: "Best camp kitchen gear", desc: "Stove, water, cookware, food storage, and kitchen organization.", href: "/gear/camp-kitchen/" },
    "camp-comfort": { title: "Best camp comfort gear", desc: "Chairs, tables, blankets, fans, and comfort gear that earns room.", href: "/gear/camp-comfort/" },
    "vehicle-power": { title: "Vehicle camp power and systems", desc: "Batteries, charging, airflow, water, heat, and remote connectivity.", href: "/gear/vehicle-power/" },
    "recovery-kit": { title: "Recovery and tire gear", desc: "Air, traction, plugs, jump backup, and communication for camp roads.", href: "/gear/recovery-kit/" },
    "camp-tools": { title: "Camp tools that earn space", desc: "Knives, saws, hatchets, stakes, and repair tools with real camp jobs.", href: "/gear/camp-tools/" },
    "camera-trip-kit": { title: "Camera gear for camp and travel", desc: "A compact camera, lens, tripod, power, and connectivity kit.", href: "/gear/camera-trip-kit/" }
  };

  const HOWTO_GUIDES = {
    "choose-campsite": { title: "How to choose a campsite", desc: "Read wind, shade, drainage, privacy, and camp flow before you unpack.", href: "/how-to/choose-campsite/" },
    "pack-car-camping": { title: "Pack for car camping", desc: "Build a loadout around setup order, camp zones, and the ride home.", href: "/how-to/pack-car-camping/" },
    "set-up-camp-fast": { title: "Set up camp fast", desc: "Make camp functional first, comfortable second, and nice after that.", href: "/how-to/pack-car-camping/#arrival" },
    "keep-camp-organized": { title: "Keep camp organized", desc: "Give every object a home so camp still works after meals and after dark.", href: "/how-to/pack-car-camping/#reset" },
    "camp-kitchen": { title: "Build a simple camp kitchen", desc: "A cleaner workflow for food, water, prep, cleanup, and trash.", href: "/how-to/camp-kitchen/" },
    "keep-cooler-cold": { title: "Keep a cooler cold longer", desc: "Pre-chill, pack tight, separate drinks, and stop feeding the cooler warm air.", href: "/how-to/camp-kitchen/#cold-storage" },
    "camp-dishes-gray-water": { title: "Manage dishes and gray water", desc: "Keep food smell, wastewater, and cleanup from taking over camp.", href: "/how-to/camp-kitchen/#dishes" },
    "camp-handwashing-station": { title: "Set up a hand-washing station", desc: "Put water, soap, towel, and wastewater control where people will use them.", href: "/how-to/camp-kitchen/#handwashing" },
    "sleep-better-tent": { title: "Sleep better in a tent: fix what wakes you up", desc: "Fix the ground, pad, airflow, dry clothes, and pillow before bedtime.", href: "/how-to/sleep-better-tent/" },
    "weather-turns": { title: "Camp when weather turns", desc: "Set up for drainage, wind, dry storage, and the moment conditions stop being fun.", href: "/how-to/choose-campsite/#weather" },
    "start-campfire": { title: "A small campfire, from permission to cold ashes", desc: "Build a small, legal, controllable fire with staged dry fuel and airflow.", href: "/how-to/start-campfire/" },
  };

  const HOWTO_LANES = {
    campSetup: ["choose-campsite", "pack-car-camping", "set-up-camp-fast", "keep-camp-organized", "sleep-better-tent", "weather-turns"],
    kitchen: ["camp-kitchen", "keep-cooler-cold", "camp-dishes-gray-water", "camp-handwashing-station", "cook-over-coals", "put-out-campfire"],
    shelter: ["guy-out-tent", "pitch-tarp-wind", "bowline-knot", "taut-line-hitch", "truckers-hitch", "clove-hitch"],
    fire: ["start-campfire", "put-out-campfire", "cook-over-coals", "split-kindling", "use-hatchet-safely", "sharpen-knife"],
    vehicle: ["air-down-tires", "get-unstuck", "use-traction-boards", "plug-tire", "jump-start-car", "charge-dead-battery", "test-car-battery", "use-generator-safely"],
    trailer: ["back-up-trailer", "hook-up-trailer", "back-into-campsite", "use-ratchet-straps", "use-tire-chains", "air-down-tires"],
    navigation: ["read-topo-map", "choose-campsite", "weather-turns", "filter-water", "arizona-heat", "pack-car-camping"],
    repair: ["fix-stuck-zipper", "patch-air-mattress", "plug-tire", "use-multimeter", "sharpen-knife", "use-ratchet-straps"],
    shop: ["read-tape-measure", "use-dial-caliper", "use-multimeter", "sharpen-knife", "use-ratchet-straps", "use-hatchet-safely"]
  };

  const GUIDE_RELATED = {
    camp: {
      "best-arizona": {
        relatedGuides: ["best-lakeside", "weekend-phoenix", "best-cool-weather"],
        crossGuides: ["beginner", "car-camping", "actually-use"],
        utility: [
          { title: "Browse all camp notes", desc: "Open the full campsite library with ratings, maps, and filters.", href: "/camp/" },
          { title: "Campground & Dispersed Finder", desc: "Jump into the map-based planning tool.", href: "/repo/campgrounds.html" },
          { title: "Car Camping Checklist", desc: "Turn the camp shortlist into a practical packed setup.", href: "/repo/car_camping_checklist.html" }
        ]
      },
      "best-lakeside": {
        relatedGuides: ["best-arizona", "best-cool-weather", "weekend-phoenix"],
        crossGuides: ["car-camping", "actually-use", "buy-again"],
        utility: [
          { title: "Browse all camp notes", desc: "See the full campsite list, not just the water picks.", href: "/camp/" },
          { title: "Campground & Dispersed Finder", desc: "Use the map to compare lakes and nearby alternatives.", href: "/repo/campgrounds.html" },
          { title: "Car Camping Checklist", desc: "A simpler packing path if the lake trip is supposed to stay easy.", href: "/repo/car_camping_checklist.html" }
        ]
      },
      "weekend-phoenix": {
        relatedGuides: ["best-arizona", "best-beginner", "best-showers"],
        crossGuides: ["first-five", "beginner", "car-camping"],
        utility: [
          { title: "Browse all camp notes", desc: "Open the full camp list if you want more than the easy weekend lane.", href: "/camp/" },
          { title: "Car Camping Checklist", desc: "Use the checklist if the goal is a low-drama quick departure.", href: "/repo/car_camping_checklist.html" },
          { title: "Campground & Dispersed Finder", desc: "Compare quick weekend options on the map instead of guessing from memory.", href: "/repo/campgrounds.html" }
        ]
      },
      "phoenix-hot-weather-camping": {
        relatedGuides: ["best-summer-escape", "best-cool-weather", "weekend-phoenix"],
        crossGuides: ["car-camping", "camp-comfort", "actually-use"],
        utility: [
          { title: "Browse all camp notes", desc: "Open the full campsite library when you want more high-country escape options.", href: "/camp/" },
          { title: "Campground & Dispersed Finder", desc: "Use the map when elevation, shade, and drive time matter more than guesswork.", href: "/repo/campgrounds.html" },
          { title: "Car Camping Checklist", desc: "Keep the hot-weather escape simple enough to leave town fast.", href: "/repo/car_camping_checklist.html" }
        ]
      },
      "first-time-arizona-campsites": {
        relatedGuides: ["best-beginner", "best-arizona", "weekend-phoenix"],
        crossGuides: ["beginner", "first-five", "car-camping"],
        utility: [
          { title: "Browse all camp notes", desc: "Open the full camp list once the beginner lane starts feeling too narrow.", href: "/camp/" },
          { title: "Car Camping Checklist", desc: "A calmer packing path for the first trip, without turning it into a gear project.", href: "/repo/car_camping_checklist.html" },
          { title: "Campground & Dispersed Finder", desc: "Compare easier developed options before committing to a first campsite.", href: "/repo/campgrounds.html" }
        ]
      },
      "camping-for-people-who-hate-camping": {
        relatedGuides: ["best-beginner", "best-showers", "best-beach"],
        crossGuides: ["camp-comfort", "beginner", "car-camping"],
        utility: [
          { title: "Browse all camp notes", desc: "Find more low-friction camps where the site is not trying to punish anyone.", href: "/camp/" },
          { title: "Car Camping Checklist", desc: "Use the comfort-first packing lane so the trip has fewer obvious failure points.", href: "/repo/car_camping_checklist.html" },
          { title: "Campground & Dispersed Finder", desc: "Use the map to avoid sending a skeptical camper into the wrong kind of weekend.", href: "/repo/campgrounds.html" }
        ]
      },
      "best-cool-weather": {
        relatedGuides: ["best-arizona", "best-lakeside", "best-beginner"],
        crossGuides: ["cold-weather", "actually-use", "buy-again"],
        utility: [
          { title: "Browse all camp notes", desc: "Open the full camp archive if you want more forecast-friendly options.", href: "/camp/" },
          { title: "Campground & Dispersed Finder", desc: "Use the map to compare altitude and region quickly.", href: "/repo/campgrounds.html" },
          { title: "Backpacking Checklist", desc: "The tighter list if cool-weather camp starts drifting into extra gear and extra nonsense.", href: "/repo/backpacking_checklist.html" }
        ]
      },
      "best-showers": {
        relatedGuides: ["best-beginner", "weekend-phoenix", "best-arizona"],
        crossGuides: ["car-camping", "first-five", "beginner"],
        utility: [
          { title: "Browse all camp notes", desc: "See the full campsite list if showers are only one part of the trip math.", href: "/camp/" },
          { title: "Car Camping Checklist", desc: "Pair the easier campgrounds with an easier packing list.", href: "/repo/car_camping_checklist.html" },
          { title: "Campground & Dispersed Finder", desc: "Compare other developed options without leaving the camp lane.", href: "/repo/campgrounds.html" }
        ]
      },
      "best-beginner": {
        relatedGuides: ["weekend-phoenix", "best-showers", "best-arizona"],
        crossGuides: ["first-five", "beginner", "car-camping"],
        utility: [
          { title: "Browse all camp notes", desc: "Open the full camp list when you're ready to leave the beginner lane.", href: "/camp/" },
          { title: "Car Camping Checklist", desc: "Use the checklist to keep the first trip simple.", href: "/repo/car_camping_checklist.html" },
          { title: "Campground & Dispersed Finder", desc: "Use the map to keep the first trip in the low-drama lane.", href: "/repo/campgrounds.html" }
        ]
      },
      "best-beach": {
        relatedGuides: ["best-summer-escape", "best-quiet", "best-showers"],
        crossGuides: ["car-camping", "camp-comfort", "after-dark"],
        utility: [
          { title: "Browse all camp notes", desc: "Open the full camp archive if you want more than just the coastal lane.", href: "/camp/" },
          { title: "Car Camping Checklist", desc: "Keep the beach setup simple enough that the shoreline still feels fun.", href: "/repo/car_camping_checklist.html" },
          { title: "Campground & Dispersed Finder", desc: "Compare beach and near-water options on the map.", href: "/repo/campgrounds.html" }
        ]
      },
      "best-quiet": {
        relatedGuides: ["best-summer-escape", "best-beginner", "best-arizona"],
        crossGuides: ["actually-use", "camp-comfort", "car-camping"],
        utility: [
          { title: "Browse all camp notes", desc: "Open the full camp archive if you want more than just the low-noise picks.", href: "/camp/" },
          { title: "Campground & Dispersed Finder", desc: "Compare the quieter regions and lake-adjacent options on the map.", href: "/repo/campgrounds.html" },
          { title: "Car Camping Checklist", desc: "Use the checklist when the goal is a calmer, lower-drama setup.", href: "/repo/car_camping_checklist.html" }
        ]
      },
      "best-summer-escape": {
        relatedGuides: ["best-cool-weather", "best-quiet", "best-lakeside"],
        crossGuides: ["cold-weather", "after-dark", "camp-comfort"],
        utility: [
          { title: "Browse all camp notes", desc: "Open the full camp archive for the rest of the high-country options.", href: "/camp/" },
          { title: "Campground & Dispersed Finder", desc: "Compare altitude, region, and distance before the heat gets old.", href: "/repo/campgrounds.html" },
          { title: "Backpacking Checklist", desc: "A tighter loadout if the cooler-air trip starts drifting lighter and simpler.", href: "/repo/backpacking_checklist.html" }
        ]
      },
      "mogollon-rim": {
        relatedGuides: ["best-summer-escape", "best-lakeside", "weekend-phoenix"],
        crossGuides: ["car-camping", "camp-comfort", "cold-weather"],
        utility: [
          { title: "Browse all camp notes", desc: "Open the full campsite library with filters and maps.", href: "/camp/" },
          { title: "Campground & Dispersed Finder", desc: "Compare Rim campgrounds and backup areas on the map.", href: "/repo/campgrounds.html" },
          { title: "Car Camping Checklist", desc: "Pack the high-country weekend without overbuilding the loadout.", href: "/repo/car_camping_checklist.html" }
        ]
      },
      "flagstaff": {
        relatedGuides: ["best-cool-weather", "best-quiet", "best-summer-escape"],
        crossGuides: ["recovery-kit", "car-camping", "after-dark"],
        utility: [
          { title: "Browse all camp notes", desc: "Open the full camp library if you want more high-country options.", href: "/camp/" },
          { title: "Campground & Dispersed Finder", desc: "Use the map before committing to a forest-road plan.", href: "/repo/campgrounds.html" },
          { title: "Car Camping Checklist", desc: "Keep the Flagstaff kit flexible for developed or dispersed plans.", href: "/repo/car_camping_checklist.html" }
        ]
      },
      "prescott": {
        relatedGuides: ["weekend-phoenix", "best-beginner", "best-showers"],
        crossGuides: ["beginner", "car-camping", "camp-comfort"],
        utility: [
          { title: "Browse all camp notes", desc: "Compare Prescott with the rest of the Arizona camp library.", href: "/camp/" },
          { title: "Campground & Dispersed Finder", desc: "Check the map when elevation and drive time are both in play.", href: "/repo/campgrounds.html" },
          { title: "Car Camping Checklist", desc: "Use the lower-drama packing lane for developed Prescott trips.", href: "/repo/car_camping_checklist.html" }
        ]
      },
      "white-mountains": {
        relatedGuides: ["best-lakeside", "best-cool-weather", "best-summer-escape"],
        crossGuides: ["cold-weather", "car-camping", "camp-kitchen"],
        utility: [
          { title: "Browse all camp notes", desc: "Open the full library if the longer drive needs a stronger shortlist.", href: "/camp/" },
          { title: "Campground & Dispersed Finder", desc: "Use the map to compare lakes, towns, and longer-route backup plans.", href: "/repo/campgrounds.html" },
          { title: "Car Camping Checklist", desc: "Keep the longer weekend packed without forgetting the basics.", href: "/repo/car_camping_checklist.html" }
        ]
      },
      "southern-california-beach": {
        relatedGuides: ["best-beach", "best-showers", "best-summer-escape"],
        crossGuides: ["camp-comfort", "after-dark", "car-camping"],
        utility: [
          { title: "Browse all camp notes", desc: "Open the full campsite library beyond the coast.", href: "/camp/" },
          { title: "Campground & Dispersed Finder", desc: "Compare shoreline options and inland backups on the map.", href: "/repo/campgrounds.html" },
          { title: "Car Camping Checklist", desc: "Pack the beach setup so wind, sand, and damp evenings do not take over.", href: "/repo/car_camping_checklist.html" }
        ]
      },
      "hawaii": {
        relatedGuides: ["best-beach", "best-quiet", "camping-for-people-who-hate-camping"],
        crossGuides: ["camp-comfort", "camp-kitchen", "after-dark"],
        utility: [
          { title: "Browse all camp notes", desc: "Open the wider camp library if Hawaii is part of a bigger trip comparison.", href: "/camp/" },
          { title: "Campground & Dispersed Finder", desc: "Use the map as a planning reference, then confirm permits directly.", href: "/repo/campgrounds.html" },
          { title: "Car Camping Checklist", desc: "Trim the kit down for a lighter island setup.", href: "/repo/car_camping_checklist.html" }
        ]
      }
    },
    gear: {
      "actually-use": {
        relatedGuides: ["buy-again", "car-camping", "vehicle-power"],
        crossGuides: ["best-beginner", "weekend-phoenix", "best-cool-weather"],
        utility: [
          { title: "Browse all gear", desc: "Open the full gear shelf by category and search.", href: "/gear/" },
          { title: "Car Camping Checklist", desc: "See where these staples fit in a real packing flow.", href: "/repo/car_camping_checklist.html" },
          { title: "Campground & Dispersed Finder", desc: "Pair the gear with places where the setup actually makes sense.", href: "/repo/campgrounds.html" }
        ]
      },
      "buy-again": {
        relatedGuides: ["actually-use", "first-five", "after-dark"],
        crossGuides: ["weekend-phoenix", "best-arizona", "best-beginner"],
        utility: [
          { title: "Browse all gear", desc: "Open the full gear shelf if you want the wider review library.", href: "/gear/" },
          { title: "Car Camping Checklist", desc: "See which rebuy items solve the most practical packing gaps.", href: "/repo/car_camping_checklist.html" },
          { title: "Campground & Dispersed Finder", desc: "Useful reminder that the site choice can matter as much as the next purchase.", href: "/repo/campgrounds.html" }
        ]
      },
      "beginner": {
        relatedGuides: ["first-five", "car-camping", "camp-kitchen"],
        crossGuides: ["best-beginner", "weekend-phoenix", "best-showers"],
        utility: [
          { title: "Browse all gear", desc: "Open the full gear shelf when you're ready to go beyond the starter lane.", href: "/gear/" },
          { title: "Backpacking Checklist", desc: "Use the checklist if you're trying to keep the first kit honest.", href: "/repo/backpacking_checklist.html" },
          { title: "Car Camping Checklist", desc: "The calmer packing path when you're just trying to get the first setup right.", href: "/repo/car_camping_checklist.html" }
        ]
      },
      "car-camping": {
        relatedGuides: ["camp-kitchen", "camp-comfort", "vehicle-power"],
        crossGuides: ["best-showers", "weekend-phoenix", "best-lakeside"],
        utility: [
          { title: "Browse all gear", desc: "Open the full gear shelf for the wider comfort-and-camp-bin lane.", href: "/gear/" },
          { title: "Car Camping Checklist", desc: "Use the checklist if you want to turn these picks into a real packing flow.", href: "/repo/car_camping_checklist.html" },
          { title: "Campground & Dispersed Finder", desc: "Useful when the comfort setup depends as much on where you land as what you pack.", href: "/repo/campgrounds.html" }
        ]
      },
      "first-five": {
        relatedGuides: ["beginner", "camp-kitchen", "after-dark"],
        crossGuides: ["best-beginner", "weekend-phoenix", "best-showers"],
        utility: [
          { title: "Browse all gear", desc: "Open the full gear shelf once the starter list stops being enough.", href: "/gear/" },
          { title: "Backpacking Checklist", desc: "Use the checklist to turn this starter stack into a real trip loadout.", href: "/repo/backpacking_checklist.html" },
          { title: "Car Camping Checklist", desc: "Use the checklist to turn the starter stack into a real trip loadout.", href: "/repo/car_camping_checklist.html" }
        ]
      },
      "cold-weather": {
        relatedGuides: ["camp-comfort", "after-dark", "car-camping"],
        crossGuides: ["best-cool-weather", "best-arizona", "best-lakeside"],
        utility: [
          { title: "Browse all gear", desc: "Open the full gear shelf for the rest of the system around the cold-weather kit.", href: "/gear/" },
          { title: "Campground & Dispersed Finder", desc: "Use the map to pair the right gear with the right camp.", href: "/repo/campgrounds.html" },
          { title: "Car Camping Checklist", desc: "Make sure the cold-weather extras do not crowd out the basics.", href: "/repo/car_camping_checklist.html" }
        ]
      },
      "after-dark": {
        relatedGuides: ["camp-comfort", "vehicle-power", "recovery-kit"],
        crossGuides: ["best-quiet", "best-showers", "best-summer-escape"],
        utility: [
          { title: "Browse all gear", desc: "Open the full gear shelf for the rest of the after-dark system.", href: "/gear/" },
          { title: "Car Camping Checklist", desc: "Use the checklist if you want the evening setup to stay simple.", href: "/repo/car_camping_checklist.html" },
          { title: "Campground & Dispersed Finder", desc: "The site choice matters as much as the light once camp gets dark.", href: "/repo/campgrounds.html" }
        ]
      },
      "camp-kitchen": {
        relatedGuides: ["car-camping", "first-five", "camp-comfort"],
        crossGuides: ["best-showers", "weekend-phoenix", "best-summer-escape"],
        utility: [
          { title: "Browse all gear", desc: "Open the full gear shelf for the wider kitchen and food setup lane.", href: "/gear/" },
          { title: "Car Camping Checklist", desc: "Turn the kitchen picks into a real packed loadout.", href: "/repo/car_camping_checklist.html" },
          { title: "Camp Cookbook", desc: "A simple meal lane once the kitchen setup actually works.", href: "/repo/cookbook.html" }
        ]
      },
      "camp-comfort": {
        relatedGuides: ["car-camping", "buy-again", "after-dark"],
        crossGuides: ["best-beach", "best-quiet", "best-summer-escape"],
        utility: [
          { title: "Browse all gear", desc: "Open the full gear shelf for the rest of the comfort lane.", href: "/gear/" },
          { title: "Car Camping Checklist", desc: "The practical packing list that keeps comfort from turning into clutter.", href: "/repo/car_camping_checklist.html" },
          { title: "Campground & Dispersed Finder", desc: "Useful reminder that the right campsite can matter as much as the next comfort item.", href: "/repo/campgrounds.html" }
        ]
      },
      "vehicle-power": {
        relatedGuides: ["car-camping", "recovery-kit", "after-dark"],
        crossGuides: ["best-summer-escape", "best-quiet", "weekend-phoenix"],
        utility: [
          { title: "Browse all gear", desc: "Open the full shelf around the vehicle systems.", href: "/gear/" },
          { title: "Car Camping Checklist", desc: "Turn the vehicle system into something you pack and maintain.", href: "/repo/car_camping_checklist.html" },
          { title: "Campground & Dispersed Finder", desc: "Match the system to the kind of trip it actually supports.", href: "/repo/campgrounds.html" }
        ]
      },
      "recovery-kit": {
        relatedGuides: ["vehicle-power", "car-camping", "camp-tools"],
        crossGuides: ["best-quiet", "best-summer-escape", "best-arizona"],
        utility: [
          { title: "Browse all gear", desc: "Open the full shelf for truck, tool, and camp support gear.", href: "/gear/" },
          { title: "Car Camping Checklist", desc: "Make the recovery lane part of the packed kit.", href: "/repo/car_camping_checklist.html" },
          { title: "Campground & Dispersed Finder", desc: "Useful when the road into camp matters as much as the campsite.", href: "/repo/campgrounds.html" }
        ]
      },
      "camp-tools": {
        relatedGuides: ["recovery-kit", "actually-use", "car-camping"],
        crossGuides: ["best-cool-weather", "best-arizona", "best-quiet"],
        utility: [
          { title: "Browse all gear", desc: "Open the full shelf for the rest of the practical tool lane.", href: "/gear/" },
          { title: "Car Camping Checklist", desc: "Keep the tool kit useful instead of bloated.", href: "/repo/car_camping_checklist.html" },
          { title: "Camp basics", desc: "Choose a site, pack, cook, sleep and manage a campfire.", href: "/how-to/" }
        ]
      },
      "camera-trip-kit": {
        relatedGuides: ["vehicle-power", "actually-use", "after-dark"],
        crossGuides: ["best-arizona", "best-beach", "best-summer-escape"],
        utility: [
          { title: "Browse all gear", desc: "Open the full shelf beyond the media kit.", href: "/gear/" },
          { title: "Projects", desc: "See where better documentation and photos support the work.", href: "/projects/" },
          { title: "Campground & Dispersed Finder", desc: "Find the places worth documenting well.", href: "/repo/campgrounds.html" }
        ]
      }
    }
  };

  const TOOL_INDEX = {
    sheet_metal_gauge_reference: { title: "Sheet Metal Gauge Reference", desc: "Quick gauge and thickness lookup for steel, stainless, and aluminum.", href: "/repo/sheet_metal_gauge_reference.html" },
    pipe_table: { title: "Pipe Schedule Table", desc: "OD, wall, ID, and weight references for fabrication work.", href: "/repo/pipe_table.html" },
    cut_list_calculator: { title: "Cut List Calculator", desc: "Plan cuts, kerf, and scrap before you start cutting.", href: "/repo/cut_list_calculator.html" },
    panel_layout_calculator: { title: "Panel Layout Calculator", desc: "Lay parts onto sheet stock and check material use.", href: "/repo/panel_layout_calculator.html" },
    campgrounds: { title: "Campground & Dispersed Finder", desc: "Map-based campground planning help and quick camp discovery.", href: "/repo/campgrounds.html" },
    car_camping_checklist: { title: "Car Camping Checklist", desc: "Drive-in shelter, kitchen, lighting, and safety list.", href: "/repo/car_camping_checklist.html" },
    backpacking_checklist: { title: "Backpacking Checklist", desc: "A focused overnight and weekend checklist for trail trips.", href: "/repo/backpacking_checklist.html" },
    cookbook: { title: "Camp Cookbook", desc: "Meals and ingredient lists that travel well.", href: "/repo/cookbook.html" },
    critter_hazards: { title: "Desert Critter ID & Hazards", desc: "Quick desert hazard notes for rattlers, scorpions, bees, and other trouble.", href: "/repo/critter_hazards.html" },
    desert_plants_reference: { title: "Desert Plant ID", desc: "Cactus, mesquite, palo verde, ocotillo, agave, wildflowers, thorns, and toxic plants.", href: "/repo/desert_plants_reference.html" }
  };

  const PROJECT_TOOL_MAP = {
    adventuretime: ["cut_list_calculator", "panel_layout_calculator"],
    "empire-site": ["sheet_metal_gauge_reference", "pipe_table", "panel_layout_calculator"],
    "cnc-router": ["cut_list_calculator", "panel_layout_calculator", "pipe_table"],
    "chevy-c10": ["pipe_table", "sheet_metal_gauge_reference", "cut_list_calculator"],
    "rooftop-solar": ["panel_layout_calculator", "cut_list_calculator"],
    "xj-cherokee": ["pipe_table", "cut_list_calculator"],
    "van-rack": ["pipe_table", "cut_list_calculator", "panel_layout_calculator"],
    "mailbox-pillar": ["pipe_table", "panel_layout_calculator"],
    "xj-battery": ["panel_layout_calculator", "cut_list_calculator"]
  };

  const CAMP_GEAR_MAP = {
    havilandlake: ["columbiarainjacket", "colemanvintage", "goalzerolighthouse"],
    sanclementebeach: ["keltylatestart", "columbiarainjacket", "goalzerolighthouse"],
    lakecuyamaca: ["wiseowlstakes", "columbiarainjacket", "goalzerolighthouse"],
    lakeview2: ["keltylatestart", "colemanvintage", "goalzerolighthouse"],
    marshall: ["keltylatestart", "staticv", "nemopillow"],
    bearcanyon: ["katadynbefree", "keltylatestart", "staticv"],
    woodscanyon: ["keltylatestart", "msrpocketrocket", "goalzerolighthouse"],
    ashurst: ["enohammock", "colemanvintage", "goalzerolighthouse"],
    caballolake: ["colemanvintage", "goalzerolighthouse", "gciwildernessrecliner"],
    endoftheworld: ["wiseowlstakes", "columbiarainjacket", "goalzerolighthouse"]
  };

  const GEAR_CAMP_MAP = {
    shelter: ["sanclementebeach", "marshall", "woodscanyon"],
    cooking: ["ashurst", "caballolake", "lakeview2"],
    water: ["bearcanyon", "woodscanyon", "lakeview2"],
    comfort: ["sanclementebeach", "ashurst", "lakeview2"],
    packs: ["weekend-phoenix", "best-beginner", "first-time-arizona-campsites"],
    tools: ["best-arizona", "weekend-phoenix", "best-quiet"],
    lighting: ["lakeview2", "caballolake", "sanclementebeach"],
    vehicle: ["weekend-phoenix", "best-summer-escape", "best-arizona"],
    clothing: ["best-cool-weather", "weekend-phoenix"],
    camera: ["endoftheworld", "best-arizona", "best-lakeside"]
  };

  function qs(selector, root = document) {
    return root.querySelector(selector);
  }

  function pathParts() {
    let rawPath = window.location.pathname || "";
    if (location.protocol === "file:") {
      const lower = rawPath.toLowerCase();
      const sectionMarkers = ["/camp/", "/gear/", "/how-to/", "/projects/", "/repo/", "/search/", "/contact/"];
      const sectionIdx = sectionMarkers
        .map((marker) => lower.indexOf(marker))
        .filter((idx) => idx >= 0)
        .sort((a, b) => a - b)[0];
      if (sectionIdx >= 0) {
        rawPath = rawPath.slice(sectionIdx);
      }
    }
    return rawPath.split("/").filter(Boolean);
  }

  function currentKind() {
    return pathParts()[0] || "";
  }

  function currentSlug() {
    return pathParts()[1] || "";
  }

  function gearSlugFromPage(item) {
    return cleanHref(item?.page || "")
      .split("/")
      .filter(Boolean)
      .pop() || "";
  }

  function resolveGearDataId(id) {
    const raw = String(id || "").trim();
    if (!raw) return "";
    if ((window.GEAR_DATA || {})[raw]) return raw;

    const match = Object.entries(window.GEAR_DATA || {})
      .find(([, item]) => gearSlugFromPage(item) === raw);
    return match ? match[0] : raw;
  }

  function cardLink(item) {
    return item ? `<a class="tool-link-item" href="${cleanHref(item.href)}"><strong>${item.title}</strong><span>${item.desc}</span></a>` : "";
  }

  function cleanHref(value) {
    if (!value) return value;
    const href = String(value).replace(/\/index\.html(?=$|[?#])/, "/");
    if (!href.startsWith("/") || location.protocol !== "file:") return href;
    const rawPath = location.pathname || "";
    const lower = rawPath.toLowerCase();
    const sectionMarkers = ["/camp/", "/gear/", "/how-to/", "/projects/", "/repo/", "/search/", "/contact/"];
    const sectionIdx = sectionMarkers
      .map((marker) => lower.indexOf(marker))
      .filter((idx) => idx >= 0)
      .sort((a, b) => a - b)[0];
    if (sectionIdx === undefined) return href;

    const siteRoot = `file://${rawPath.slice(0, sectionIdx)}`;
    const [basePath, hash = ""] = href.split("#");
    const normalized = basePath.endsWith("/") ? `${basePath}index.html` : basePath;
    return `${siteRoot}${normalized}${hash ? `#${hash}` : ""}`;
  }

  function searchableCampText(item) {
    return [item?.title, item?.notes, ...(item?.tags || [])].join(" ").toLowerCase();
  }

  function searchableGearText(item) {
    return [item?.title, item?.review, item?.myTake, item?.category, ...(item?.meta || [])].join(" ").toLowerCase();
  }

  function scoreCampSimilarity(current, other) {
    if (!current || !other) return 0;
    let score = 0;
    const currentText = searchableCampText(current);
    const otherText = searchableCampText(other);
    const currentTags = new Set((current.tags || []).map((tag) => String(tag).toLowerCase()));
    const otherTags = new Set((other.tags || []).map((tag) => String(tag).toLowerCase()));

    if (current.region === other.region) score += 5;

    currentTags.forEach((tag) => {
      if (otherTags.has(tag)) score += 2;
    });

    const pairedSignals = [
      /lake|reservoir|marina|shore|water/,
      /beach|ocean|coast|bluff/,
      /quiet|calm|tucked|spacing|relaxed/,
      /showers|flush|restroom|bathroom/,
      /easy|simple|family|friendly|quick|convenient/,
      /cool|cold|pine|shade|mountain|high-country/
    ];

    pairedSignals.forEach((pattern) => {
      if (pattern.test(currentText) && pattern.test(otherText)) score += 3;
    });

    score += Number(other.rating?.overall || 0) * 0.15;
    return score;
  }

  function campGuideKeysFor(item) {
    const text = searchableCampText(item);
    const keys = [];
    const isArizona = ["flagstaff", "payson", "prescott", "white-mountains", "southern-az"].includes(item.region);
    const regionGuide = regionGuideForCamp(item);

    if (regionGuide) keys.push(regionGuide.key);
    if (isArizona) keys.push("best-arizona");
    if (isArizona && /easy|simple|quick|close|family|friendly|developed|weekend/.test(text)) {
      keys.push("weekend-phoenix", "best-beginner");
    }
    if (/lake|reservoir|marina|shore|water/.test(text)) keys.push("best-lakeside");
    if (/showers|flush|restroom|bathroom/.test(text)) keys.push("best-showers");
    if (/beach|ocean|coast|bluff/.test(text) || ["oahu", "hawaii", "southern-california"].includes(item.region)) keys.push("best-beach");
    if (/quiet|calm|tucked|spacing|relaxed|lower traffic/.test(text)) keys.push("best-quiet");
    if (/cool|cold|pine|shade|mountain|high-country/.test(text) || ["flagstaff", "payson", "prescott", "white-mountains"].includes(item.region)) {
      keys.push("best-cool-weather", "best-summer-escape");
    }
    if (!keys.length) keys.push("best-beginner");
    return unique(keys.map((key) => CAMP_GUIDES[key])).slice(0, 3);
  }

  function regionGuideForCamp(item) {
    const key = {
      payson: "mogollon-rim",
      flagstaff: "flagstaff",
      prescott: "prescott",
      "white-mountains": "white-mountains",
      "southern-california": "southern-california-beach",
      oahu: "hawaii",
      hawaii: "hawaii"
    }[item.region];
    if (!key || !CAMP_GUIDES[key]) return null;
    return { key, ...CAMP_GUIDES[key] };
  }

  function insertCampRegionLink(item) {
    if (qs(".camp-region-context")) return;
    const region = regionGuideForCamp(item);
    const breadcrumbs = qs(".breadcrumbs");
    if (!region || !breadcrumbs?.parentElement) return;

    const row = document.createElement("div");
    row.className = "camp-breadcrumb-row";
    breadcrumbs.insertAdjacentElement("beforebegin", row);
    row.appendChild(breadcrumbs);

    const link = document.createElement("a");
    link.className = "camp-region-context";
    link.href = cleanHref(region.href);
    link.innerHTML = `<span>Part of</span><strong>${region.title}</strong>`;
    row.appendChild(link);
  }

  function gearGuideKeysFor(item) {
    const text = searchableGearText(item);
    const keys = [];
    const category = item?.category || "";

    if (category === "shelter" || category === "water") keys.push("beginner", "first-five");
    if (category === "cooking") keys.push("camp-kitchen", "car-camping");
    if (category === "comfort") keys.push("camp-comfort", "car-camping");
    if (category === "packs") keys.push("car-camping", "actually-use", "beginner");
    if (category === "tools") keys.push("camp-tools", "recovery-kit", "actually-use");
    if (category === "lighting") keys.push("after-dark", "vehicle-power", "actually-use");
    if (category === "vehicle") keys.push("vehicle-power", "recovery-kit", "car-camping");
    if (category === "clothing") keys.push("cold-weather", "buy-again");
    if (category === "camera") keys.push("camera-trip-kit", "vehicle-power", "actually-use");
    if (/starter|beginner|first/.test(text)) keys.push("beginner", "first-five");
    if (/cold|rain|storm|weather|layer/.test(text)) keys.push("cold-weather");
    if (/comfort|chair|table|fire pit|hammock/.test(text)) keys.push("camp-comfort");
    if (/kitchen|stove|grill|cook|dinnerware/.test(text)) keys.push("camp-kitchen");
    if (/night|lantern|headlamp|light/.test(text)) keys.push("after-dark");
    if (/battery|charger|inverter|fan|pump|diesel|starlink|12v|vehicle|van|rv/.test(text)) keys.push("vehicle-power");
    if (/tire|compressor|recovery|deflator|jump|plug|traction/.test(text)) keys.push("recovery-kit");
    if (/knife|saw|hatchet|stake|multitool|tool/.test(text)) keys.push("camp-tools");
    if (/camera|lens|tripod|photo|video|media/.test(text)) keys.push("camera-trip-kit");
    keys.push("actually-use", "buy-again");

    return unique(keys.map((key) => GEAR_GUIDES[key])).slice(0, 3);
  }

  function campDecisionData(item) {
    const text = searchableCampText(item);
    const tags = (item?.tags || []).join(", ");
    let bestFor = "a trip where the campsite itself needs to feel worth the drive, not just acceptable once you arrive.";
    let chooseBecause = "it has a stronger sense of place than the average stopover and feels like an actual destination.";
    let watchFor = "the extra logistics that come with committing to a more specific kind of camp.";

    if (/backcountry|crossings|filtration|creek shoes|commitment|rugged|boulder/.test(text)) {
      bestFor = "people who want the hike, the creek, and the setting to be the trip, not just the place they sleep.";
      chooseBecause = "it pays you back with a more memorable canyon-and-water experience than a normal campground can.";
      watchFor = "the effort, water management, and slower in-and-out rhythm that come with a real backcountry outing.";
    } else if (/lake|reservoir|shore|water/.test(text)) {
      bestFor = "weekends where being near the water is the point, not just a nice extra.";
      chooseBecause = "the lake changes how the whole trip feels once camp is set and the day slows down.";
      watchFor = "more exposure, busier weekends, and weather that can shift the comfort level fast.";
    } else if (/beach|ocean|coast|reef|sand/.test(text)) {
      bestFor = "coastal trips where you actually want to live outside and stay near the shoreline for most of the day.";
      chooseBecause = "the setting does a lot of the work for you when the water and open space are part of the plan.";
      watchFor = "wind, sand, and the fact that beach camps get less forgiving when setup or weather goes sideways.";
    } else if (/quiet|calm|tucked|spacing|relaxed/.test(text)) {
      bestFor = "lower-drama camp trips where space, noise level, and the overall feel matter more than amenities.";
      chooseBecause = "it gives you a calmer version of camp instead of a crowded campground experience.";
      watchFor = "fewer convenience features and a trip that depends more on your own setup being dialed.";
    } else if (/showers|flush|restroom|bathroom|developed/.test(text)) {
      bestFor = "easier drive-in trips where comfort and low friction matter more than roughing it.";
      chooseBecause = "it keeps the weekend simple and removes a lot of the little annoyances that derail casual trips.";
      watchFor = "more people, less solitude, and a setting that may feel practical before it feels romantic.";
    } else if (/cool|cold|pine|shade|mountain|high-country/.test(text)) {
      bestFor = "getting out of the heat and actually sleeping well instead of surviving another warm night.";
      chooseBecause = "cooler air and tree cover change the whole quality of the trip once summer gets old.";
      watchFor = "colder nights, extra layers, and weather that demands a little more planning.";
    }

    return {
      kicker: "QUICK READ",
      title: "How I'd decide on this camp",
      intro: `The short version: this is best when you want ${bestFor.replace(/\.$/, "")}.`,
      items: [
        { label: "Best For", text: bestFor },
        { label: "Why Pick It", text: chooseBecause },
        { label: tags ? "Plan Around" : "Tradeoff", text: tags ? `${watchFor} The prep notes here are a good place to start: ${tags}.` : watchFor }
      ]
    };
  }

  function gearDecisionData(item) {
    const text = searchableGearText(item);
    const meta = (item?.meta || []).join(", ");
    let bestFor = "keeping a camp kit more functional without overcomplicating it.";
    let whyItWins = "it solves a practical problem well enough that it keeps earning space on real trips.";
    let tradeoff = "it still has to justify its bulk, cost, or single-purpose nature against simpler options.";

    if (item?.category === "shelter") {
      bestFor = "a sleep setup that improves the whole trip instead of becoming the weak link.";
      whyItWins = "good shelter and sleep gear changes whether camp feels restorative or just survivable.";
      tradeoff = "weight and packed size still matter, especially if the trip starts drifting lighter or farther.";
    } else if (item?.category === "cooking") {
      bestFor = "meals and camp routines that need to feel easy enough to repeat, not like a chore.";
      whyItWins = "kitchen gear earns its keep when it removes friction every single time you use it.";
      tradeoff = "extra cooking comfort can turn into clutter fast if the rest of the setup is not disciplined.";
    } else if (item?.category === "comfort") {
      bestFor = "car-camping trips where staying comfortable keeps you outside longer and makes camp feel settled.";
      whyItWins = "comfort gear is worth it when it gets used constantly instead of just sounding nice in theory.";
      tradeoff = "this lane gets bloated quickly, so every comfort item has to prove it is not just taking up room.";
    } else if (item?.category === "lighting") {
      bestFor = "camps that still need to work once the sun is gone and setup is not finished yet.";
      whyItWins = "good lighting makes the whole camp function better, not just the obvious nighttime tasks.";
      tradeoff = "battery management and redundancy matter more than they first seem.";
    } else if (item?.category === "water") {
      bestFor = "hot, dry, or longer trips where water stops being a background detail and starts driving the plan.";
      whyItWins = "water gear earns space when it prevents the whole trip from depending on one spigot, one bottle, or one lucky refill.";
      tradeoff = "capacity, weight, and cleaning matter, so the right answer depends on whether you are hiking, driving, or base-camping.";
    } else if (item?.category === "packs") {
      bestFor = "keeping the kit organized enough that setup, teardown, and day use do not become one big gear pile.";
      whyItWins = "carry and organization gear pays off when you can find what you need without unpacking the entire vehicle.";
      tradeoff = "extra bags and organizers can become clutter if they do not match the way you actually pack.";
    } else if (item?.category === "tools") {
      bestFor = "field fixes, small camp jobs, and the kind of problems that get worse when the right tool is back at home.";
      whyItWins = "tools earn space when they turn a trip problem into a short interruption instead of the whole story.";
      tradeoff = "the tool still depends on judgment, maintenance, and knowing when a fix is only temporary.";
    } else if (item?.category === "vehicle") {
      bestFor = "vehicle-based camp systems where power, water, heat, cooling, storage, or recovery have to work repeatedly.";
      whyItWins = "vehicle gear changes the whole rhythm of a trip when it makes the rig more self-sufficient and less fragile.";
      tradeoff = "install quality, power draw, mounting, and service access matter more here than the product listing does.";
    } else if (item?.category === "camera") {
      bestFor = "travel and camp shooting where the camera needs to stay useful without becoming the whole loadout.";
      whyItWins = "camera gear is best when it stays easy to bring, easy to use, and good enough to keep reaching for.";
      tradeoff = "specialized image gains can disappear fast if the gear gets bigger, fussier, or easier to leave behind.";
    } else if (item?.category === "clothing") {
      bestFor = "weather swings where one simple layer can keep the trip comfortable instead of making the forecast the boss.";
      whyItWins = "good clothing earns space when it keeps working through wind, rain, cold mornings, and lazy camp time.";
      tradeoff = "layers are only useful if they pack reasonably, dry predictably, and fit the rest of the kit.";
    }

    if (/beginner|starter|first/.test(text)) {
      bestFor = "a first version of the kit that needs to be useful immediately, not endlessly optimized.";
    } else if (/cold|rain|storm|weather|layer/.test(text)) {
      bestFor = "forecast-sensitive trips where comfort and safety change quickly once the weather turns.";
    }

    return {
      kicker: "QUICK READ",
      title: "How I'd decide on this gear",
      intro: `The short version: this makes the most sense when you want ${bestFor.replace(/\.$/, "")}.`,
      items: [
        { label: "Best Fit", text: bestFor },
        { label: "Why It Earns Space", text: whyItWins },
        { label: meta ? "Tradeoff" : "Watch For", text: meta ? `${tradeoff} The useful shorthand on this one: ${meta}.` : tradeoff }
      ]
    };
  }

  function projectDecisionData(item) {
    const meta = (item?.meta || []).join(", ").toLowerCase();
    let goodFor = "seeing how a practical one-off build got solved without turning into a bloated concept project.";
    let whatMatters = "the details that keep the finished thing usable, serviceable, and worth having around for years.";
    let takeaway = "small decisions about materials, mounting, and access usually matter more than flashy features.";

    if (/web|stripe|ux|seo|mobile|content/.test(meta)) {
      goodFor = "examples of practical site work where clarity and daily usability mattered more than trend-chasing.";
      whatMatters = "the structure, copy, and interaction decisions that keep a site easy to understand and easy to use.";
      takeaway = "better hierarchy and fewer friction points usually outperform louder design moves.";
    } else if (/4x4|electrical|cooling|overland/.test(meta)) {
      goodFor = "vehicle projects where reliability and field serviceability matter more than showing off a parts list.";
      whatMatters = "routing, access, heat, mounting, and all the boring details that decide whether the upgrade actually lasts.";
      takeaway = "the right mechanical choices usually look quieter than the wrong ones.";
    } else if (/fabrication|cnc|metalwork|welding|powder/.test(meta)) {
      goodFor = "fabrication work where the point is a durable result, not just a fun sketch or a one-day mockup.";
      whatMatters = "material choice, structure, finish, and future service access, because those are what hold up over time.";
      takeaway = "a project gets better fast when the build decisions are driven by use, weather, and maintenance instead of novelty.";
    } else if (/energy|solar/.test(meta)) {
      goodFor = "power and layout work where planning, access, and maintenance matter as much as the hardware itself.";
      whatMatters = "layout, serviceability, and the choices that keep the system understandable later.";
      takeaway = "the practical design work is usually where the value really comes from.";
    }

    return {
      kicker: "QUICK READ",
      title: "What makes this project useful",
      intro: `The short version: this is a good page for ${goodFor.replace(/\.$/, "")}.`,
      items: [
        { label: "Good For", text: goodFor },
        { label: "What Mattered", text: whatMatters },
        { label: "Takeaway", text: takeaway }
      ]
    };
  }

  function normalizeCamp(id) {
    const item = (window.CAMP_DATA || {})[id];
    return item ? { title: item.title, desc: item.notes || "Real trip notes and campsite details.", href: cleanHref(item.page || `/camp/${id}/`) } : null;
  }

  function normalizeGear(id) {
    const item = (window.GEAR_DATA || {})[id];
    return item ? { title: item.title, desc: item.review || item.myTake || "Gear notes from real use.", href: cleanHref(item.page || `/gear/${id}/`) } : null;
  }

  function normalizeProject(id) {
    const item = (window.PROJECT_DATA || {})[id];
    return item ? { title: item.title, desc: item.desc || "More built work and project notes.", href: cleanHref(item.url || `/projects/${id}/`) } : null;
  }

  function normalizeHowTo(id) {
    if (["patch-air-mattress","read-tape-measure","use-dial-caliper","use-multimeter","back-up-trailer","pitch-tarp-wind","air-down-tires","arizona-heat","back-into-campsite","bowline-knot","clove-hitch","filter-water","get-unstuck","guy-out-tent","jump-start-car","plug-tire","put-out-campfire","split-kindling","taut-line-hitch","test-car-battery","truckers-hitch","use-hatchet-safely","use-ratchet-straps","use-traction-boards"].includes(id)) return null;
    const merged = {"set-up-camp-fast": "pack-car-camping", "keep-camp-organized": "pack-car-camping", "keep-cooler-cold": "camp-kitchen", "camp-dishes-gray-water": "camp-kitchen", "camp-handwashing-station": "camp-kitchen", "weather-turns": "choose-campsite"};
    if (["charge-dead-battery", "cook-over-coals", "fix-stuck-zipper", "hook-up-trailer", "read-topo-map", "sharpen-knife", "use-generator-safely", "use-tire-chains"].includes(id)) return null;
    id = merged[id] || id;
    const item = HOWTO_GUIDES[id];
    if (item) return item;
    const title = String(id || "")
      .split("-")
      .filter(Boolean)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    return title ? { title, desc: "Another practical Follincraft camp guide.", href: `/how-to/${id}/` } : null;
  }

  function unique(items) {
    const seen = new Set();
    return items.filter((item) => {
      if (!item || seen.has(item.href)) return false;
      seen.add(item.href);
      return true;
    });
  }

  function howToLaneFor(slug) {
    if (["camp-kitchen", "keep-cooler-cold", "camp-dishes-gray-water", "camp-handwashing-station", "cook-over-coals"].includes(slug)) return "kitchen";
    if (["guy-out-tent", "pitch-tarp-wind", "bowline-knot", "taut-line-hitch", "truckers-hitch", "clove-hitch"].includes(slug)) return "shelter";
    if (["start-campfire", "put-out-campfire", "split-kindling", "use-hatchet-safely", "sharpen-knife"].includes(slug)) return "fire";
    if (["air-down-tires", "get-unstuck", "use-traction-boards", "plug-tire", "jump-start-car", "charge-dead-battery", "test-car-battery", "use-generator-safely"].includes(slug)) return "vehicle";
    if (["back-up-trailer", "hook-up-trailer", "back-into-campsite", "use-ratchet-straps", "use-tire-chains"].includes(slug)) return "trailer";
    if (["read-topo-map", "filter-water", "arizona-heat", "weather-turns"].includes(slug)) return "navigation";
    if (["fix-stuck-zipper", "patch-air-mattress"].includes(slug)) return "repair";
    if (["read-tape-measure", "use-dial-caliper", "use-multimeter"].includes(slug)) return "shop";
    return "campSetup";
  }

  function howToGearFor(lane) {
    const byLane = {
      campSetup: ["car-camping", "actually-use", "camp-comfort"],
      kitchen: ["camp-kitchen", "car-camping", "actually-use"],
      shelter: ["beginner", "cold-weather", "camp-tools"],
      fire: ["camp-tools", "camp-kitchen", "actually-use"],
      vehicle: ["recovery-kit", "vehicle-power", "car-camping"],
      trailer: ["recovery-kit", "vehicle-power", "camp-tools"],
      navigation: ["car-camping", "actually-use", "recovery-kit"],
      repair: ["camp-tools", "recovery-kit", "actually-use"],
      shop: ["camp-tools", "recovery-kit", "actually-use"]
    };
    return unique((byLane[lane] || byLane.campSetup).map((key) => GEAR_GUIDES[key])).slice(0, 3);
  }

  function howToTripFor(lane) {
    const byLane = {
      campSetup: ["best-beginner", "weekend-phoenix", "first-time-arizona-campsites"],
      kitchen: ["best-showers", "weekend-phoenix", "best-beginner"],
      shelter: ["best-cool-weather", "best-quiet", "best-summer-escape"],
      fire: ["best-cool-weather", "best-quiet", "weekend-phoenix"],
      vehicle: ["best-quiet", "best-summer-escape", "best-arizona"],
      trailer: ["best-showers", "weekend-phoenix", "best-beginner"],
      navigation: ["best-summer-escape", "best-quiet", "best-arizona"],
      repair: ["best-quiet", "weekend-phoenix", "best-arizona"],
      shop: ["best-arizona", "weekend-phoenix", "best-beginner"]
    };
    return unique((byLane[lane] || byLane.campSetup).map((key) => CAMP_GUIDES[key])).slice(0, 3);
  }

  function findHowToRelated(slug) {
    const lane = howToLaneFor(slug);
    const related = unique((HOWTO_LANES[lane] || HOWTO_LANES.campSetup)
      .filter((key) => key !== slug)
      .map(normalizeHowTo).filter((item) => item && item.href.split("#")[0] !== `/how-to/${slug}/`)).slice(0, 3);

    return {
      inline: true,
      kicker: "NEXT USEFUL THING",
      title: "Keep building the system",
      intro: "Related skills, matching gear guides, and trip pages that make this camp guide more useful in the field.",
      groups: [
        { kicker: "HOW-TO", title: "Related skills", items: related },
        { kicker: "GEAR", title: "Gear that fits this skill", items: howToGearFor(lane) },
        { kicker: "TRIPS", title: "Where this matters", items: howToTripFor(lane) }
      ]
    };
  }

  function findCampRelated(id) {
    const current = (window.CAMP_DATA || {})[id];
    if (!current) return null;
    insertCampRegionLink(current);

    const sameRegion = Object.entries(window.CAMP_DATA || {})
      .filter(([otherId]) => otherId !== id)
      .sort((a, b) => scoreCampSimilarity(current, b[1]) - scoreCampSimilarity(current, a[1]))
      .slice(0, 3)
      .map(([otherId]) => normalizeCamp(otherId));

    const guides = campGuideKeysFor(current);
    const gear = unique((CAMP_GEAR_MAP[id] || ["keltylatestart", "goalzerolighthouse", "msrpocketrocket"]).map(normalizeGear)).slice(0, 3);

    return {
      decision: campDecisionData(current),
      kicker: "KEEP GOING",
      title: "More ways to build the same trip",
      intro: "A few related camps, useful gear picks, and browse paths that fit this same kind of outing.",
      groups: [
        { kicker: "Similar camps", title: "Keep the same trip energy", items: sameRegion },
        { kicker: "Gear I'd bring here", title: "The stuff that fits this camp", items: gear },
        { kicker: "Browse paths", title: "Start from a broader shortlist", items: guides }
      ]
    };
  }

  function findGearRelated(id) {
    const gearId = resolveGearDataId(id);
    const current = (window.GEAR_DATA || {})[gearId];
    if (!current) return null;

    const sameCategory = Object.entries(window.GEAR_DATA || {})
      .filter(([otherId, item]) => otherId !== gearId && item.category === current.category)
      .slice(0, 3)
      .map(([otherId]) => normalizeGear(otherId));

    const guides = gearGuideKeysFor(current);
    const tripRefs = unique((GEAR_CAMP_MAP[current.category] || ["best-beginner", "best-arizona", "weekend-phoenix"])
      .map((key) => CAMP_GUIDES[key] || normalizeCamp(key))).slice(0, 3);

    return {
      decision: gearDecisionData(current),
      kicker: "USED IN CONTEXT",
      title: "Where this piece leads next",
      intro: "More gear in the same lane, plus camp pages and guides where this kind of item actually earns its keep.",
      groups: [
        { kicker: "Related gear", title: "Stay in the same category", items: sameCategory },
        { kicker: "Guides", title: "See the bigger shortlist", items: guides },
        { kicker: "Trips", title: "Trips where this makes sense", items: tripRefs }
      ]
    };
  }

  function findProjectRelated(id) {
    const current = (window.PROJECT_DATA || {})[id];
    if (!current) return null;

    const moreProjects = Object.keys(window.PROJECT_DATA || {})
      .filter((otherId) => otherId !== id)
      .slice(0, 3)
      .map(normalizeProject);

    const tools = unique((PROJECT_TOOL_MAP[id] || ["cut_list_calculator", "panel_layout_calculator", "pipe_table"])
      .map((toolId) => TOOL_INDEX[toolId])).slice(0, 3);

    const guides = [
      { title: "Shop math and references", desc: "Start in the fabrication section of Tools & Resources.", href: "/repo/#fabrication-tools" },
      { title: "Packing, planning, and food", desc: "The camp-prep side of the tool shelf.", href: "/repo/#camping-tools" },
      { title: "Useful once you're out there", desc: "Fast field references and practical safety notes.", href: "/repo/#field-tools" }
    ];

    return {
      decision: projectDecisionData(current),
      kicker: "BUILD OUTWARD",
      title: "More work around this project",
      intro: "The neighboring projects, shop references, and tools that live in the same orbit as this build.",
      groups: [
        { kicker: "More built work", title: "Stay in project mode", items: moreProjects },
        { kicker: "Related tools", title: "References that support this work", items: tools },
        { kicker: "Utility paths", title: "Open the useful parts of Tools", items: guides }
      ]
    };
  }

  function setGearCtaLink(link, item, fallbackLabel) {
    if (!link || !item) return;
    const href = cleanHref(item.page || item.url || `/gear/${item.id}/`);
    if (!href) return;
    link.href = href;
    link.removeAttribute("aria-disabled");
    link.classList.remove("is-disabled");
    if (fallbackLabel && item.title) {
      link.setAttribute("aria-label", `${fallbackLabel}: ${item.title}`);
    }
  }

  function initGearCtaNav() {
    const prevEl = qs("#ctaPrevGear");
    const nextEl = qs("#ctaNextGear");
    if (!prevEl && !nextEl) return;

    const data = window.GEAR_DATA || {};
    const currentId = resolveGearDataId(document.body.dataset.gearId || currentSlug());
    const items = Object.entries(data)
      .map(([id, item]) => ({ id, ...item }))
      .filter((item) => item.page || item.url);

    const idx = items.findIndex((item) => item.id === currentId || gearSlugFromPage(item) === currentSlug());

    if (!items.length || idx === -1) {
      [prevEl, nextEl].forEach((link) => {
        if (!link) return;
        link.href = cleanHref("/gear/");
        link.setAttribute("aria-disabled", "true");
      });
      return;
    }

    const prevItem = items[(idx - 1 + items.length) % items.length];
    const nextItem = items[(idx + 1) % items.length];
    setGearCtaLink(prevEl, prevItem, "Previous gear");
    setGearCtaLink(nextEl, nextItem, "Next gear");
  }

  function findGuideRelated(kind, slug) {
    const lane = GUIDE_RELATED[kind]?.[slug];
    if (!lane) return null;

    const relatedGuides = unique((lane.relatedGuides || []).map((key) =>
      kind === "camp" ? CAMP_GUIDES[key] : GEAR_GUIDES[key]
    )).slice(0, 3);

    const crossGuides = unique((lane.crossGuides || []).map((key) =>
      kind === "camp" ? (GEAR_GUIDES[key] || CAMP_GUIDES[key]) : (CAMP_GUIDES[key] || GEAR_GUIDES[key])
    )).slice(0, 3);

    const utilities = unique(lane.utility || []).slice(0, 3);

    return {
      inline: true,
      kicker: "KEEP EXPLORING",
      title: kind === "camp" ? "More camp roundups" : "More gear guides",
      intro: kind === "camp"
        ? "Other roundup pages, matching gear guides, and planning tools for this kind of trip."
        : "Other gear guides, matching camp roundups, and planning tools for this kind of setup.",
      groups: [
        { kicker: kind === "camp" ? "ROUNDUP" : "GUIDE", title: kind === "camp" ? "Other camp roundups" : "Other gear guides", items: relatedGuides },
        { kicker: kind === "camp" ? "GUIDE" : "ROUNDUP", title: kind === "camp" ? "Matching gear guides" : "Matching camp roundups", items: crossGuides },
        { kicker: "TOOLS", title: "Planning tools", items: utilities }
      ]
    };
  }

  function buildSection(config) {
    if (!config) return null;
    const section = document.createElement("section");
    section.className = `related-section${config.inline ? " related-section-inline" : ""}`;
    section.innerHTML = config.inline ? `
        <div class="section-headline related-headline">
          <div>
            <p class="section-kicker">${config.kicker}</p>
            <h2 class="title">${config.title}</h2>
            <p class="lead section-intro">${config.intro}</p>
          </div>
        </div>
        <div class="tool-list-grid related-grid">
          ${config.groups.map((group) => `
            <article class="tool-list-card">
              <p class="section-kicker">${group.kicker}</p>
              <h3>${group.title}</h3>
              <div class="tool-link-list">
                ${group.items.map(cardLink).join("")}
              </div>
            </article>
          `).join("")}
        </div>
    ` : `
      <div class="wrap">
        <div class="section-headline related-headline">
          <div>
            <p class="section-kicker">${config.kicker}</p>
            <h2 class="title">${config.title}</h2>
            <p class="lead section-intro">${config.intro}</p>
          </div>
        </div>
        <div class="tool-list-grid related-grid">
          ${config.groups.map((group) => `
            <article class="tool-list-card">
              <p class="section-kicker">${group.kicker}</p>
              <h3>${group.title}</h3>
              <div class="tool-link-list">
                ${group.items.map(cardLink).join("")}
              </div>
            </article>
          `).join("")}
        </div>
      </div>
    `;
    return section;
  }

  function insertBeforeAnchor(section) {
    const main = qs("main");
    if (!main) return;

    if (document.body.dataset.guideLayout === "editorial") {
      const articleWrap = qs(".category-section > .wrap", main);
      if (articleWrap && section.classList.contains("related-section-inline")) {
        const anchor = qs(".section-link-strip", articleWrap);
        if (anchor?.parentElement) {
          anchor.parentElement.insertBefore(section, anchor);
        } else {
          articleWrap.appendChild(section);
        }
        return;
      }

      const anchor = qs(".section-link-strip", main);
      if (anchor?.parentElement) {
        anchor.parentElement.insertBefore(section, anchor);
        return;
      }
    }

    const anchor = qs(".cta-band", main) || qs("#contact", main)?.closest("section");
    if (anchor?.parentElement) {
      anchor.parentElement.insertBefore(section, anchor);
    } else {
      main.appendChild(section);
    }
  }

  function init() {
    const kind = currentKind();
    const slug = currentSlug();
    const isGuidePage = document.body.dataset.guideLayout === "editorial";
    if (kind === "gear" && !isGuidePage) initGearCtaNav();
    if ((document.body.dataset.pageId === "category" && !isGuidePage) || qs(".related-section")) return;

    let config = null;

    if (isGuidePage && (kind === "camp" || kind === "gear")) {
      config = findGuideRelated(kind, slug);
    } else if (isGuidePage && kind === "how-to") {
      config = findHowToRelated(slug);
    } else {
      if (kind === "camp") config = findCampRelated(slug);
      if (kind === "gear") config = findGearRelated(document.body.dataset.gearId || slug);
      if (kind === "projects") config = findProjectRelated(slug);
    }

    const section = buildSection(config);
    if (section) insertBeforeAnchor(section);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
