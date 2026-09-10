const { performance } = require('perf_hooks');

// Mock data generation
const generateData = (size) => {
  const statuses = ['ongoing', 'completed', 'nearing-completion'];
  return Array.from({ length: size }, (_, i) => ({
    id: `study-${i}`,
    status: statuses[i % statuses.length],
    teamSize: (i % 10) + 1,
  }));
};

const data = generateData(1000000); // 1 million items

console.log(`Benchmarking with ${data.length} items...`);

// Original approach
const measureOriginal = () => {
  const start = performance.now();
  const stats = {
    total: data.length,
    ongoing: data.filter((r) => r.status === "ongoing").length,
    completed: data.filter((r) => r.status === "completed").length,
    totalResearchers: data.reduce((a, r) => a + r.teamSize, 0),
  };
  const end = performance.now();
  return { time: end - start, stats };
};

// Optimized approach
const measureOptimized = () => {
  const start = performance.now();
  let ongoing = 0;
  let completed = 0;
  let totalResearchers = 0;

  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    if (item.status === 'ongoing') ongoing++;
    else if (item.status === 'completed') completed++;
    totalResearchers += item.teamSize;
  }

  const stats = {
    total: data.length,
    ongoing,
    completed,
    totalResearchers,
  };
  const end = performance.now();
  return { time: end - start, stats };
};

// Warmup
for (let i = 0; i < 10; i++) {
  measureOriginal();
  measureOptimized();
}

// Run benchmarks
const runs = 50;
let originalTotal = 0;
let optimizedTotal = 0;

for (let i = 0; i < runs; i++) {
  originalTotal += measureOriginal().time;
  optimizedTotal += measureOptimized().time;
}

console.log(`Original average time: ${(originalTotal / runs).toFixed(2)}ms`);
console.log(`Optimized average time: ${(optimizedTotal / runs).toFixed(2)}ms`);
console.log(`Improvement: ${((originalTotal - optimizedTotal) / originalTotal * 100).toFixed(2)}% faster`);

// Verify correctness
const oStats = measureOriginal().stats;
const nStats = measureOptimized().stats;

console.log('Results match:', JSON.stringify(oStats) === JSON.stringify(nStats));
if (JSON.stringify(oStats) !== JSON.stringify(nStats)) {
    console.log('Original stats:', oStats);
    console.log('Optimized stats:', nStats);
}
