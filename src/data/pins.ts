export type CategoryId = 'industry' | 'projects' | 'research' | 'teaching'

export interface Category {
  id: CategoryId
  label: string
  color: string
  defaultOn: boolean
}

export const categories: Category[] = [
  { id: 'industry', label: 'Industry Experience', color: '#D8A657', defaultOn: true },
  { id: 'projects', label: 'Projects', color: '#7E9CC7', defaultOn: true },
  { id: 'research', label: 'Research', color: '#A78FC9', defaultOn: true },
  { id: 'teaching', label: 'Teaching & Community', color: '#D0806A', defaultOn: true },
]

/** A freely licensed photo in public/photos, with the credit its license requires. */
export interface Photo {
  file: string
  author: string
  license: string
  href: string
  /** CSS object-position, to keep the subject in frame when cropped to 16:9. */
  position?: string
}

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
  photo: Photo | null
  /** Put the pin's name on the left of the dot (for pins near the map's right edge). */
  labelSide?: 'left' | 'right'
}

export const pins: Pin[] = [
  {
    id: 'aws',
    category: 'industry',
    short: 'AWS',
    landmark: 'Amazon Spheres',
    coords: { lat: 47.6157, lng: -122.3395 },
    org: 'Software Development Engineer Intern · AWS · Jun–Sep 2026',
    title: 'DynamoDB Stream ingestion for an analytics platform',
    description:
      'Built change-data-capture ingestion for DynamoDB: a producer’s table changes flow through a DynamoDB Stream and a Lambda, get flattened, and land in storage as a queryable datafeed. The work spanned 7+ packages across 2 teams.',
    highlights: [
      'Proved the full path in gamma with a real producer table streamed cross-account: a 4-record batch resolved the right datafeed and wrote 4 rows to S3 with zero drops.',
      'Redesigned datafeed resolution from an O(N²) scan of a single GSI partition (capped at 3,000 RCU/s) to two strongly consistent lookups.',
    ],
    tags: ['DynamoDB Streams', 'Lambda', 'IAM', 'CloudFormation', 'Step Functions', 'EventBridge', 'CloudWatch', 'S3'],
    photo: {
      file: 'aws.jpg',
      author: 'Sea Cow',
      license: 'CC BY-SA 4.0',
      href: 'https://commons.wikimedia.org/wiki/File:Amazon_spheres_W.jpg',
      position: '50% 50%',
    },
  },
  {
    id: 'allen',
    category: 'teaching',
    short: 'Allen School',
    landmark: 'Bill & Melinda Gates Center',
    coords: { lat: 47.6529, lng: -122.3045 },
    org: 'Teaching Assistant · UW Paul G. Allen School · Sep 2026 – Present',
    title: 'Teaching Assistant for Intro to Java (CSE 121)',
    description:
      'Teaching assistant for CSE 121, the Allen School’s introductory Java course.',
    highlights: [
      'Led weekly sections for 20+ students, reinforcing key Java concepts.',
    ],
    tags: ['Java', 'Teaching'],
    photo: {
      file: 'allen.jpg',
      author: 'Joe Mabel',
      license: 'CC BY-SA 4.0',
      href: 'https://commons.wikimedia.org/wiki/File:University_of_Washington_-_Bill_and_Melinda_Gates_Center_for_CSE_01.jpg',
      position: '50% 40%',
    },
  },
  {
    id: 'kairos',
    category: 'projects',
    short: 'Kairos',
    landmark: 'Gas Works Park',
    coords: { lat: 47.6457, lng: -122.3345 },
    org: 'Software Developer · Kairos · Sep 2025 – Present',
    title: 'Real-time EEG state detection app',
    description:
      'A C++/Python application that reads live EEG from a Muse headband over Bluetooth and LSL, and uses an SVM classifier to trigger state changes from frequency-band features.',
    highlights: [
      'Designed adaptive thresholding that recalibrates the SVM’s decision boundary across sessions from each user’s own EEG history, reducing false triggers.',
      'Wrote the NumPy and SciPy signal-processing modules that turn raw streams into real-time focus metrics, using FFT-derived frequency-domain features.',
    ],
    tags: ['C++', 'Python', 'SVM', 'NumPy', 'SciPy', 'LSL'],
    photo: {
      file: 'kairos.jpg',
      author: 'Visitor7',
      license: 'CC BY-SA 3.0',
      href: 'https://commons.wikimedia.org/wiki/File:Gas_Works_Park_(Seattle,_Washington).jpg',
      position: '50% 55%',
    },
  },
  {
    id: 'synaptech',
    category: 'projects',
    short: 'Synaptech',
    landmark: 'Ballard Locks',
    coords: { lat: 47.6653, lng: -122.3975 },
    org: 'Vice President · Synaptech · May 2025 – Present',
    title: 'Mentor–mentee matching system for a speed-matching event',
    description:
      'Built the matching system for a five-round mentorship speed-dating event. A two-phase pipeline pairs 29 mentees with 22 mentors and replaced 6–10 hours of manual spreadsheet matching per cohort.',
    highlights: [
      'Modeled round scheduling as a constraint satisfaction problem in OR-Tools CP-SAT, enforcing mentor capacity and no-repeat pairings to guarantee 145 unique matches over 5 rounds.',
      'Turned top-5 rankings into a Borda-count preference matrix and solved the assignment with SciPy’s Hungarian algorithm, across 51 participants in under a second.',
    ],
    tags: ['Python', 'OR-Tools', 'SciPy', 'Constraint solving'],
    photo: {
      file: 'synaptech.jpg',
      author: 'Seachaz',
      license: 'CC BY-SA 4.0',
      href: 'https://commons.wikimedia.org/wiki/File:Ballard_Locks.jpg',
      position: '50% 50%',
    },
  },
  {
    id: 'husky',
    category: 'projects',
    short: 'Husky Coding Project',
    landmark: 'Pike Place Market',
    coords: { lat: 47.6097, lng: -122.3422 },
    org: 'Project Technical Lead · Husky Coding Project · Oct 2025 – Jun 2026',
    title: 'Technical lead for an RPG-style React Native app',
    description:
      'Architected a full-stack mobile RPG-style app to dynamically manage complex user progression and community-driven goal synchronization. The app features a custom state engine and REST API, providing offline persistence and schema validation for multi-attribute user progression trees.',
    highlights: [
      'Containerized the microservices with Docker and Kubernetes, configuring readiness and liveness probes, health checks, and rolling updates to hold 99.9% uptime through deploys.',
      'Designed the relational query patterns and endpoints that sync progression state across concurrent group sessions while cutting redundant fetches.',
    ],
    tags: ['React Native', 'TypeScript', 'Docker', 'Kubernetes', 'REST'],
    photo: {
      file: 'husky.jpg',
      author: 'Daniel Schwen',
      license: 'CC BY-SA 4.0',
      href: 'https://commons.wikimedia.org/wiki/File:Pike_Place_Market_Seattle.jpg',
      position: '50% 40%',
    },
  },
  {
    id: 'emit',
    category: 'research',
    short: 'EMiT Labs',
    landmark: 'Discovery Park',
    coords: { lat: 47.66, lng: -122.417 },
    org: 'Research Intern · EMiT Labs, UW · Sep 2023 – Jun 2024',
    title: 'Mixed-signal IC layout optimization toolchain',
    description:
      'Built a C++/Python toolchain for mixed-signal IC layout automation that sped up design convergence by 80% using the Adam optimizer.',
    highlights: [
      'Added encrypted PDK support so the toolchain met data-protection standards.',
      'Maintained the MAGICAL repository for 10+ researchers, cutting reported bugs 60% through refactoring and CI testing.',
    ],
    tags: ['C++', 'Python', 'Adam optimizer', 'CI testing'],
    photo: {
      file: 'emit.jpg',
      author: 'Joe Mabel',
      license: 'CC BY-SA 4.0',
      href: 'https://commons.wikimedia.org/wiki/File:Seattle_-_Discovery_Park_20.jpg',
      position: '50% 60%',
    },
  },
  {
    id: 'openexa',
    category: 'industry',
    short: 'OpenExa',
    landmark: 'Space Needle',
    coords: { lat: 47.6205, lng: -122.3493 },
    org: 'Software Engineer Intern · OpenExa · Aug 2023 – Jun 2024',
    title: 'Team lead for a full-stack financial dashboard',
    description:
      'Led a five-member team to build a financial dashboard in Next.js, run with Kanban, that improved asset management for internal stakeholders.',
    highlights: [
      'Used the Google Gemini API and BigQuery to make complex SQL queries 40% more efficient.',
      'Automated cloud deployments with Google Cloud Build, cutting release cycles by 70%.',
    ],
    tags: ['Next.js', 'BigQuery', 'Gemini API', 'Cloud Build', 'SQL'],
    photo: {
      file: 'openexa.jpg',
      author: 'Dietmar Rabich',
      license: 'CC BY-SA 4.0',
      href: 'https://commons.wikimedia.org/wiki/File:Seattle_(WA,_USA),_Space_Needle_--_2022_--_1498.jpg',
      position: '50% 12%',
    },
  },
  {
    id: 'cwk',
    category: 'teaching',
    short: 'Coding with Kids',
    landmark: 'Washington Park Arboretum',
    coords: { lat: 47.6375, lng: -122.296 },
    labelSide: 'left',
    org: 'Coding Instructor · Coding with Kids · Apr – Oct 2024',
    title: 'Coding instructor for 50+ elementary and middle school students',
    description:
      'Taught Python and robotics in classrooms and camps, leading groups of 5 to 25 students.',
    highlights: [
      'Designed and delivered custom lessons built around problem-solving, creativity, and teamwork.',
      'Adapted teaching strategies to different ages and skill levels to build confidence and lasting interest in coding.',
    ],
    tags: ['Python', 'Robotics', 'Curriculum design'],
    photo: {
      file: 'cwk.jpg',
      author: 'Another Believer',
      license: 'CC BY-SA 4.0',
      href: 'https://commons.wikimedia.org/wiki/File:Washington_Park_Arboretum,_Seattle,_August_2024_(1).jpg',
      position: '50% 55%',
    },
  },
  {
    id: 'bytecamp',
    category: 'teaching',
    short: 'Bellevue ByteCamp',
    landmark: 'Fremont Troll',
    coords: { lat: 47.651, lng: -122.3472 },
    org: 'Camp Founder · Bellevue ByteCamp · Jun 2023 – Present',
    title: 'Founder of an annual programming camp for 100+ students',
    description:
      'Runs the camp’s curriculum, instructor coordination, and scheduling for over 100 students each year.',
    highlights: [
      'Built a supportive learning environment through sustained mentorship, with high year-over-year retention and measurable growth in participant confidence.',
      'Sets professionalism standards and gives constructive feedback to staff and instructors.',
    ],
    tags: ['Curriculum', 'Leadership', 'Mentorship'],
    photo: {
      file: 'bytecamp.jpg',
      author: 'Sambusak74',
      license: 'CC BY-SA 4.0',
      href: 'https://commons.wikimedia.org/wiki/File:Fremont_troll.jpg',
      position: '50% 35%',
    },
  },
]
