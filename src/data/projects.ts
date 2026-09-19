export interface Project {
  id: string
  index: string
  org: string
  title: string
  description: string
  highlights: string[]
  tags: string[]
}

export const projects: Project[] = [
  {
    id: 'kairos',
    index: '01',
    org: 'Kairos · Sep 2025 – Present',
    title: 'Real-time EEG state detection app',
    description:
      'A C++/Python app that classifies streaming EEG from a Muse headband, received over Bluetooth and LSL, with an SVM.',
    highlights: [
      'Adaptive thresholding recalibrates the decision boundary per user across sessions.',
      'FFT-based feature extraction in NumPy and SciPy feeds the classifier live.',
    ],
    tags: ['C++', 'Python', 'SVM', 'NumPy', 'SciPy'],
  },
  {
    id: 'husky',
    index: '02',
    org: 'Husky Coding Project · Oct 2025 – Jun 2026',
    title: 'Offline-capable progression-tree mobile app',
    description:
      'A React Native and TypeScript app with a custom state engine and REST API for multi-attribute progression trees, containerized on Kubernetes.',
    highlights: [
      'Offline persistence with schema validation.',
      '99.9% uptime through rolling deploys with readiness and liveness probes.',
    ],
    tags: ['React Native', 'TypeScript', 'Docker', 'Kubernetes'],
  },
  {
    id: 'synaptech',
    index: '03',
    org: 'Synaptech · May 2025 – Present',
    title: 'Mentor–mentee matching system',
    description:
      'Two-phase pipeline that pairs 29 mentees with 22 mentors across five rounds: CP-SAT for the schedule, the Hungarian algorithm for the preferences.',
    highlights: [
      '145 unique matches guaranteed, 51 participants matched in under a second.',
      'Replaced 6–10 hours of manual spreadsheet work per cohort.',
    ],
    tags: ['Python', 'OR-Tools', 'SciPy'],
  },
  {
    id: 'marketbeacon',
    index: '04',
    org: 'MarketBeacon · React, Express, Finnhub API',
    title: 'Full-stack stock alert system',
    description:
      'A stock-alert system with sub-5-second latency and 98% uptime, with monitoring and logging set up like a production service.',
    highlights: [
      'Async REST endpoints tuned for 500+ concurrent requests.',
      'Prometheus and Grafana for metrics, the ELK stack for logs.',
      'TypeScript validation and Jest tests lifted coverage from 70% to 95%.',
    ],
    tags: ['React', 'Express', 'Prometheus', 'Grafana', 'Jest'],
  },
  {
    id: 'bookswap',
    index: '05',
    org: 'BookSwap · React, Node.js',
    title: 'Peer-to-peer textbook exchange web app',
    description:
      'Led a four-person team to design and launch a marketplace for students trading textbooks, cutting their costs by 30–50% per transaction.',
    highlights: [
      'REST backend serving 100+ concurrent requests with nationwide search and filtering.',
      'Shaped by 20+ user interviews and surveys, with accessibility fixes from the results.',
      'CI/CD on Vercel and Render held 99.9% uptime through beta with 20+ users.',
    ],
    tags: ['React', 'Node.js', 'react-dnd', 'GitHub API', 'CI/CD'],
  },
  {
    id: 'reaction-wheels',
    index: '06',
    org: 'Husky Satellite Lab · Jan – Aug 2025',
    title: 'Reaction wheel telemetry bridge and dashboard',
    description:
      'Live telemetry for satellite reaction-wheel testing: an ESP32 wireless link and a Flask/Plotly dashboard for hardware-in-the-loop simulation.',
    highlights: [
      'Stable 230,400 bps transmission over a Python–Arduino serial passthrough.',
      'Real-time plots of quaternion, RPM, and PWM data.',
    ],
    tags: ['ESP32', 'Python', 'Flask', 'Plotly'],
  },
]
