// Static content. Projects come from the API (with `fallbackProjects` as a safety net).
export const marquee = ['React', 'Node.js', 'Express', 'MongoDB', 'MySQL', 'PHP Laravel', 'Java', 'Python', 'Kotlin', 'Tailwind', 'Figma', 'Git'];

export const stats = [
  { to: 5, label: 'Projects built' },
  { to: 4, label: 'Years of BSc (Hons)' },
  { to: 2, label: 'Live websites' },
  { to: 16, label: 'Languages & frameworks' },
];

export const skills = [
  { title: 'Frontend', text: 'React.js, JavaScript, HTML, CSS, Bootstrap, Tailwind CSS.' },
  { title: 'Backend & databases', text: 'Node.js, Express.js, PHP (Laravel), MySQL, MongoDB.' },
  { title: 'AI & machine learning', text: 'Python, MediaPipe, EfficientNet, dataset preparation, model training and evaluation.' },
  { title: 'Languages & tools', text: 'Java, Python, C, C++, Kotlin. Git/GitHub, Figma, Postman, Trello.' },
];

export const timeline = [
  { when: '2022', title: 'Started BSc (Hons) at SLIIT', text: 'Information Technology, specializing in Software Engineering.' },
  { when: 'Nov 2022 – Mar 2023', title: 'Intern, Commercial Bank of Ceylon PLC', text: 'Full-time internship in a professional banking environment.' },
  { when: 'Jan 2024 – Present', title: 'Director, Algowrite Pvt Ltd', text: 'Full-time. Building software products and client solutions.' },
  { when: '2026', title: 'Completing my degree', text: 'Graduating as a Software Engineer, ready for the next challenge.' },
];

export const activities = [
  { title: 'Webmaster & Executive Board Member, SLIIT SEDS Club', when: '2024 – Present' },
  { title: 'Member of the Leo Club', when: '2024 – Present' },
  { title: 'Vice Secretary, IT Society, Dharmaloka College', when: '2020 – 2021' },
];

export const fallbackProjects = [
  { title: 'Repair Geek', description: 'Full website for a computer repair shop.', tags: ['JS', 'Laravel'], liveUrl: 'https://repairgeek.lk/' },
  { title: 'SLIIT SEDS Club Website', description: 'Interactive site for the space-exploration club.', tags: ['JS', 'Sanity'], liveUrl: 'https://sliit-seds.github.io/SEDS-Website/' },
];
