export const profile = {
  name: 'Megan Pereira',
  location: 'Seattle, WA',
  coords: '47.6062° N, 122.3321° W',
  email: 'meganannepereira@gmail.com',
  linkedin: 'https://www.linkedin.com/in/permeg',
  linkedinLabel: 'linkedin.com/in/permeg',
  github: 'https://github.com/permeg',
  githubLabel: 'github.com/permeg',
}

export const now = [
  { where: 'Amazon Web Services', what: 'Software Development Engineer Intern', when: 'Summer 2026' },
  { where: 'Synaptech', what: 'Vice President', when: 'May 2025 – now' },
  { where: 'Kairos', what: 'Software Developer', when: 'Sep 2025 – now' },
  { where: 'UW Allen School', what: 'Teaching Assistant', when: 'Sep 2026 – now' },
]

export const skills = [
  { label: 'Languages', items: ['Java', 'Python', 'TypeScript', 'C', 'JavaScript', 'HTML/CSS', 'C++', 'SQL'] },
  {
    label: 'Frameworks & tools',
    items: ['React', 'Node.js', 'MATLAB', 'FastAPI', 'Flask', 'Docker', 'Git', 'Linux/Unix', 'AWS', 'Bash'],
  },
  {
    label: 'Core competencies',
    items: ['Full-stack development', 'API design', 'CI/CD automation', 'OOP', 'Software testing (JUnit)'],
  },
]

export const education = {
  org: 'University of Washington — Seattle · Expected Jun 2027',
  title: 'B.S. Computer Science & Economics',
  description:
    'Studying computer science alongside economics on the Seattle campus, with coursework leaning toward algorithms, systems, and machine learning.',
  tags: [
    'Data Structures & Algorithms',
    'Software Design & Implementation',
    'Artificial Intelligence',
    'Machine Learning',
    'Systems Programming',
    'Linear Algebra',
  ],
}

// Earlier and smaller roles that don't get a landmark on the map.
export const ledger = [
  {
    org: 'UW Paul G. Allen School',
    role: 'Teaching Assistant',
    when: 'Sep 2026 – Present',
    place: 'Seattle',
    note: 'Supporting students in the Allen School’s computer science courses.',
  },
  {
    org: 'Husky Satellite Lab',
    role: 'Reaction Wheels Software Engineer',
    when: 'Jan – Aug 2025',
    place: 'Seattle',
    note: 'ESP32 wireless bridge holding 230,400 bps for HIL simulation, plus a live Flask/Plotly dashboard for quaternion, RPM, and PWM data.',
  },
  {
    org: 'EMiT Labs, UW',
    role: 'Research Intern',
    when: 'Sep 2023 – Jun 2024',
    place: 'Seattle',
    note: 'C++/Python toolchain for mixed-signal IC layout that sped design convergence 80% using the Adam optimizer; cut reported bugs 60% in the shared MAGICAL repo.',
  },
  {
    org: 'OpenExa',
    role: 'Software Engineer Intern',
    when: 'Aug 2023 – Jun 2024',
    place: 'Bellevue',
    note: 'Led a five-person team building a Next.js financial dashboard; cut SQL query cost 40% with BigQuery and Gemini, and release cycles 70% with Cloud Build.',
  },
  {
    org: 'Coding with Kids',
    role: 'Coding Instructor',
    when: 'Apr – Oct 2024',
    place: 'Seattle',
    note: 'Taught Python and robotics to 50+ elementary and middle school students in classrooms and camps.',
  },
  {
    org: 'Bellevue ByteCamp',
    role: 'Camp Founder',
    when: 'Jun 2023 – Present',
    place: 'Bellevue',
    note: 'Runs an annual programming camp for 100+ students: curriculum, instructors, and logistics.',
  },
  {
    org: 'Venture Academy Tutors',
    role: 'Tutor',
    when: 'Sep 2020 – Jun 2024',
    place: 'Bellevue',
    note: 'Tutored 30+ students in mathematics and Spanish, tailoring lessons student by student.',
  },
]
