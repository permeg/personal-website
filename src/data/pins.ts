export type CategoryId = 'industry' | 'projects' | 'teaching' | 'outdoor'

export interface Category {
  id: CategoryId
  label: string
  color: string
  defaultOn: boolean
}

export const categories: Category[] = [
  { id: 'industry', label: 'Industry Experience', color: '#D8A657', defaultOn: true },
  { id: 'projects', label: 'Projects & Research', color: '#7E9CC7', defaultOn: true },
  { id: 'teaching', label: 'Teaching & Community', color: '#D0806A', defaultOn: true },
  { id: 'outdoor', label: 'Outdoor Outings', color: '#9DB56E', defaultOn: false },
]

export interface Pin {
  id: string
  category: CategoryId
  short: string
  landmark: string
  coords: { lat: number; lng: number }
  org: string
  title: string
  description: string
  highlights?: string[]
  tags: string[]
  photo: string | null
  placeholder?: boolean
  labelSide?: 'left' | 'right'
}

export const pins: Pin[] = [
  {
    id: 'aws',
    category: 'industry',
    short: 'AWS',
    landmark: 'South Lake Union',
    coords: { lat: 47.6221, lng: -122.3382 },
    org: 'Software Development Engineer Intern · AWS · Jun–Sep 2026',
    title: 'Rebuilding a lookup that couldn’t scale',
    description:
      'Rebuilt a stream-to-datafeed resolution path from an O(N²) GSI scan to strongly-consistent keyed lookups, removing a scaling ceiling of low-hundreds of streams. Validated an end-to-end change-data-capture pipeline across 3 AWS accounts with zero data loss.',
    highlights: [
      'Root-caused a gamma deployment failure (an IAM policy misconfiguration) from source code alone with no account access, then patched it and hardened three other Lambda roles with the same fragile pattern.',
      'Cut a backfill estimate from 4.5 days to 2 by proving DynamoDB Point-In-Time Recovery exports were byte-compatible with the existing stream reader, then building a replay tool to verify it end to end.',
    ],
    tags: ['DynamoDB', 'Lambda', 'IAM', 'S3', 'DynamoDB Streams'],
    photo: null,
  },
  {
    id: 'kairos',
    category: 'projects',
    short: 'Kairos',
    landmark: 'Gas Works Park',
    coords: { lat: 47.6492, lng: -122.3332 },
    org: 'Software Developer · Kairos · Sep 2025 – Present',
    title: 'Reading focus from a headband',
    description:
      'A C++/Python application that streams EEG from a Muse headband over Bluetooth and LSL, and uses an SVM classifier to trigger live state changes from frequency-band features.',
    highlights: [
      'Designed adaptive thresholding that recalibrates the SVM’s decision boundary across sessions from each user’s own EEG history, reducing false triggers.',
      'Wrote the signal-processing modules in NumPy and SciPy that turn raw streams into real-time focus metrics, using FFT-derived frequency-domain features.',
    ],
    tags: ['C++', 'Python', 'SVM', 'NumPy', 'SciPy', 'LSL'],
    photo: null,
  },
  {
    id: 'synaptech',
    category: 'teaching',
    short: 'Synaptech',
    landmark: 'Pike Place',
    coords: { lat: 47.6097, lng: -122.3422 },
    org: 'Vice President · Synaptech · May 2025 – Present',
    title: '29 mentees, 22 mentors, one solver',
    description:
      'Built the matching system for a five-round mentorship speed-dating event: a two-phase pipeline that replaced 6–10 hours of manual spreadsheet work per cohort.',
    highlights: [
      'Modeled round scheduling as a constraint satisfaction problem in OR-Tools CP-SAT, enforcing mentor capacity and no-repeat pairings to guarantee 145 unique matches over 5 rounds.',
      'Turned top-5 rankings into a Borda-count preference matrix and solved the assignment with SciPy’s Hungarian algorithm, across 51 participants in under a second.',
    ],
    tags: ['Python', 'OR-Tools', 'SciPy', 'Constraint solving'],
    photo: null,
  },
  {
    id: 'husky',
    category: 'projects',
    short: 'Husky Coding',
    labelSide: 'left',
    landmark: 'University District',
    coords: { lat: 47.6553, lng: -122.3035 },
    org: 'Project Technical Lead · Husky Coding Project · Oct 2025 – Jun 2026',
    title: 'A progression-tree app that works offline',
    description:
      'Architected a full-stack mobile app in React Native and TypeScript with a custom state engine and REST API, giving reliable offline persistence and schema validation for multi-attribute user progression trees.',
    highlights: [
      'Containerized the microservices with Docker and Kubernetes, configuring readiness and liveness probes, health checks, and rolling updates to hold 99.9% uptime through deploys.',
      'Designed the relational query patterns and endpoints that sync progression state across concurrent group sessions while cutting redundant fetches.',
    ],
    tags: ['React Native', 'TypeScript', 'Docker', 'Kubernetes', 'REST'],
    photo: null,
  },
  {
    id: 'outdoor',
    category: 'outdoor',
    short: 'Outings',
    landmark: 'Discovery Park',
    coords: { lat: 47.6573, lng: -122.4058 },
    org: 'Outdoor Outings',
    title: 'Trail notes, coming soon',
    description: 'Somewhere to put the hikes, paddles, and long walks. Photos and write-ups will land here.',
    tags: ['Hiking', 'Photography'],
    photo: null,
    placeholder: true,
  },
]
