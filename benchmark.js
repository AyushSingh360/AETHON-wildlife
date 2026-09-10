const ITERATIONS = 1000000;

// Mock data similar to SPECIES_DATA
const SPECIES_DATA = [
  { id: "tiger-bengal", name: "Bengal Tiger", scientific: "Panthera tigris tigris", status: "endangered", population: 2500, trend: "increasing", habitat: "Tropical Rainforest", icon: "🐯" },
  { id: "snow-leopard", name: "Snow Leopard", scientific: "Panthera uncia", status: "vulnerable", population: 6500, trend: "stable", habitat: "Alpine Highlands", icon: "🐆" },
  { id: "sea-turtle", name: "Green Sea Turtle", scientific: "Chelonia mydas", status: "endangered", population: 85000, trend: "increasing", habitat: "Mangrove Wetlands", icon: "🐢" },
  { id: "asian-elephant", name: "Asian Elephant", scientific: "Elephas maximus", status: "endangered", population: 1850, trend: "increasing", habitat: "Open Savanna", icon: "🐘" },
  { id: "red-panda", name: "Red Panda", scientific: "Ailurus fulgens", status: "endangered", population: 420, trend: "stable", habitat: "Tropical Rainforest", icon: "🐼" },
  { id: "painted-dog", name: "African Wild Dog", scientific: "Lycaon pictus", status: "endangered", population: 660, trend: "increasing", habitat: "Open Savanna", icon: "🐕" },
  { id: "flamingo", name: "Greater Flamingo", scientific: "Phoenicopterus roseus", status: "least-concern", population: 3200, trend: "stable", habitat: "Mangrove Wetlands", icon: "🦩" },
  { id: "himalayan-wolf", name: "Himalayan Wolf", scientific: "Canis lupus chanco", status: "vulnerable", population: 350, trend: "decreasing", habitat: "Alpine Highlands", icon: "🐺" },
  { id: "golden-eagle", name: "Golden Eagle", scientific: "Aquila chrysaetos", status: "least-concern", population: 1200, trend: "stable", habitat: "Alpine Highlands", icon: "🦅" },
  { id: "saltwater-croc", name: "Saltwater Crocodile", scientific: "Crocodylus porosus", status: "least-concern", population: 450, trend: "increasing", habitat: "Mangrove Wetlands", icon: "🐊" },
  { id: "wild-buffalo", name: "Wild Water Buffalo", scientific: "Bubalus arnee", status: "endangered", population: 120, trend: "increasing", habitat: "Open Savanna", icon: "🦬" },
  { id: "orangutan", name: "Bornean Orangutan", scientific: "Pongo pygmaeus", status: "critically-endangered", population: 89, trend: "increasing", habitat: "Tropical Rainforest", icon: "🦧" },
  { id: "rhino", name: "Indian Rhinoceros", scientific: "Rhinoceros unicornis", status: "vulnerable", population: 280, trend: "increasing", habitat: "Tropical Rainforest", icon: "🦏" },
  { id: "pangolin", name: "Sunda Pangolin", scientific: "Manis javanica", status: "critically-endangered", population: 35, trend: "stable", habitat: "Tropical Rainforest", icon: "🦨" },
  { id: "macaw", name: "Scarlet Macaw", scientific: "Ara macao", status: "least-concern", population: 210, trend: "stable", habitat: "Tropical Rainforest", icon: "🦜" },
  { id: "clouded-leopard", name: "Clouded Leopard", scientific: "Neofelis nebulosa", status: "vulnerable", population: 78, trend: "decreasing", habitat: "Tropical Rainforest", icon: "🐈" },
  { id: "tapir", name: "Malayan Tapir", scientific: "Tapirus indicus", status: "endangered", population: 16, trend: "increasing", habitat: "Tropical Rainforest", icon: "🦫" },
  { id: "hornbill", name: "Great Hornbill", scientific: "Buceros bicornis", status: "vulnerable", population: 95, trend: "stable", habitat: "Tropical Rainforest", icon: "🐦" },
];

function oldMethod() {
  const total = SPECIES_DATA.length;
  const endangered = SPECIES_DATA.filter((s) => s.status === "endangered" || s.status === "critically-endangered").length;
  const increasing = SPECIES_DATA.filter((s) => s.trend === "increasing").length;
  return { total, endangered, increasing };
}

function newMethod() {
  const total = SPECIES_DATA.length;
  let endangered = 0;
  let increasing = 0;
  for (let i = 0; i < total; i++) {
    const s = SPECIES_DATA[i];
    if (s.status === "endangered" || s.status === "critically-endangered") {
      endangered++;
    }
    if (s.trend === "increasing") {
      increasing++;
    }
  }
  return { total, endangered, increasing };
}

// Warm up
for (let i = 0; i < 10000; i++) {
  oldMethod();
  newMethod();
}

console.log("Running benchmarks...");

const startOld = performance.now();
for (let i = 0; i < ITERATIONS; i++) {
  oldMethod();
}
const endOld = performance.now();
const timeOld = endOld - startOld;

const startNew = performance.now();
for (let i = 0; i < ITERATIONS; i++) {
  newMethod();
}
const endNew = performance.now();
const timeNew = endNew - startNew;

console.log(`Old method: ${timeOld.toFixed(2)} ms`);
console.log(`New method: ${timeNew.toFixed(2)} ms`);
console.log(`Improvement: ${((timeOld - timeNew) / timeOld * 100).toFixed(2)}% faster`);

// Let's also do a reduce version for fun
function reduceMethod() {
  return SPECIES_DATA.reduce((acc, s) => {
    if (s.status === "endangered" || s.status === "critically-endangered") acc.endangered++;
    if (s.trend === "increasing") acc.increasing++;
    return acc;
  }, { total: SPECIES_DATA.length, endangered: 0, increasing: 0 });
}

// Warm up reduce
for (let i = 0; i < 10000; i++) {
  reduceMethod();
}

const startReduce = performance.now();
for (let i = 0; i < ITERATIONS; i++) {
  reduceMethod();
}
const endReduce = performance.now();
const timeReduce = endReduce - startReduce;

console.log(`Reduce method: ${timeReduce.toFixed(2)} ms`);
