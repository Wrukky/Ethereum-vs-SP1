const ctx = document.getElementById('blockChart').getContext('2d');
const ethStatus = document.getElementById('eth-status');
const sp1Status = document.getElementById('sp1-status');
const modeSelector = document.getElementById('sp1-mode');

let labels = [];
let ethData = [];
let sp1Data = [];
let t = 0;

const sp1Timings = {
  standard: () => 6 + Math.sin(t / 5) + Math.random(),
  optimized: () => 4 + Math.sin(t / 4) + Math.random() * 0.5,
  cluster: () => 2 + Math.sin(t / 3) * 0.5 + Math.random() * 0.3,
  hypercube: () => 10 + Math.sin(t / 6) * 0.5 + (Math.random() - 0.5)

};

const ethGradient = ctx.createLinearGradient(0, 0, 0, 400);
ethGradient.addColorStop(0, 'rgba(59, 130, 246, 0.5)');
ethGradient.addColorStop(1, 'rgba(59, 130, 246, 0)');

const sp1Gradient = ctx.createLinearGradient(0, 0, 0, 400);
sp1Gradient.addColorStop(0, 'rgba(236, 72, 153, 0.5)');
sp1Gradient.addColorStop(1, 'rgba(236, 72, 153, 0)');

const chart = new Chart(ctx, {
  type: 'line',
  data: {
    labels,
    datasets: [
      {
        label: 'Ethereum Today',
        data: ethData,
        borderColor: 'rgba(59, 130, 246, 1)',
        backgroundColor: ethGradient,
        fill: true,
        tension: 0.4,
        pointRadius: 0
      },
      {
        label: 'SP1 Proving',
        data: sp1Data,
        borderColor: 'rgba(236, 72, 153, 1)',
        backgroundColor: sp1Gradient,
        fill: true,
        tension: 0.4,
        pointRadius: 0
      }
    ]
  },
  options: {
    responsive: true,
    animation: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      tooltip: {
        enabled: true,
        backgroundColor: '#111827',
        titleColor: '#f472b6',
        bodyColor: '#fff',
        padding: 10,
        borderColor: '#f472b6',
        borderWidth: 1,
      },
      legend: {
        labels: { color: '#fff' }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Seconds', color: '#fff' },
        ticks: { color: '#ccc' }
      },
      x: {
        title: { display: true, text: 'Time', color: '#fff' },
        ticks: { color: '#ccc' }
      }
    }
  }
});

function updateSimulation() {
  const time = new Date().toLocaleTimeString();
  const sp1Mode = modeSelector.value;

  const ethTime = 12 + Math.sin(t / 5) * 0.3 + Math.random() * 0.2;
  const sp1Time = sp1Timings[sp1Mode]();

  ethStatus.textContent = `Block proved in ${ethTime.toFixed(1)}s`;
  sp1Status.textContent = `Block proved in ${sp1Time.toFixed(1)}s`;

  labels.push(time);
  ethData.push(ethTime);
  sp1Data.push(sp1Time);

  if (labels.length > 30) {
    labels.shift(); ethData.shift(); sp1Data.shift();
  }

  chart.update();
  t++;
}

setInterval(updateSimulation, 2000);

const body = document.getElementById('body');
const toggleBtn = document.getElementById('toggleTheme');

// Load theme preference
if (localStorage.getItem('theme') === 'light') {
  enableLightMode();
}

toggleBtn.addEventListener('click', () => {
  if (body.classList.contains('bg-black')) {
    enableLightMode();
    localStorage.setItem('theme', 'light');
  } else {
    enableDarkMode();
    localStorage.setItem('theme', 'dark');
  }
});

function enableLightMode() {
  body.classList.remove('bg-black', 'text-white');
  body.classList.add('bg-white', 'text-black');
  toggleBtn.textContent = 'Toggle Dark Mode';
}

function enableDarkMode() {
  body.classList.remove('bg-white', 'text-black');
  body.classList.add('bg-black', 'text-white');
  toggleBtn.textContent = 'Toggle Light Mode';
}



