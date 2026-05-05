// Site information
export const SITE_CONFIG = {
  name: "STAY RELENTLESS",
  fullName: "STAY RELENTLESS JIU JITSU MIDLAND",
  tagline: "Stay Relentless",
  description: "Premier Brazilian Jiu Jitsu and MMA training center in Midland, Texas. Est. 2000.",
  phone: "(432) 305-9480",
  whatsapp: "14323059480",
  email: "Midlandbjj@yahoo.com",
  address: "4612 Billingsley Blvd, Midland, TX 79705",
  established: "2000",
  social: {
    instagram: "@midlandbjj",
    facebook: "bjjmidland",
    youtube: "@bjjmidland",
  },
};

// Images
export const IMAGES = {
  hero: "/images/hero-bg.png",
  jaguar: "/images/jaguar-logo.png",
  bjjGi: "/images/bjj-gi.png",
  bjjNoGi: "/images/bjj-nogi.png",
};

// Navigation links
export const NAV_LINKS = [
  { name: "HOME", href: "/" },
  { name: "ABOUT", href: "/about" },
  { name: "CLASSES", href: "/classes" },
  { name: "SCHEDULE", href: "/classes#schedule" },
  { name: "CONTACT", href: "/contact" },
];

// Programs
export const PROGRAMS = [
  {
    id: "bjj-gi",
    name: "BJJ Gi",
    shortName: "GI",
    subtitle: "Traditional Art",
    description: "Master the gentle art with traditional techniques. Develop patience, strategy, and technical precision in the gi.",
    image: "bjjGi",
    level: "All Levels",
    schedule: "Mon-Fri",
    color: "cyan",
  },
  {
    id: "bjj-nogi",
    name: "No-Gi",
    shortName: "NO-GI",
    subtitle: "Modern Combat",
    description: "Fast-paced grappling without the kimono. Perfect for MMA fighters and those seeking dynamic submission wrestling.",
    image: "bjjNoGi",
    level: "All Levels",
    schedule: "Tue-Sat",
    color: "magenta",
  },
  {
    id: "mma",
    name: "MMA",
    shortName: "MMA",
    subtitle: "Complete Fighter",
    description: "Combine striking, wrestling, and submissions. Train like a professional mixed martial artist.",
    image: "hero",
    level: "All Levels",
    schedule: "Mon-Fri",
    color: "orange",
  },
  {
    id: "kids",
    name: "Kids Programs",
    shortName: "KIDS",
    subtitle: "Youth Development",
    description: "Building confidence, discipline, and character through martial arts. Programs for ages 4 and up.",
    image: "jaguar",
    level: "Ages 4+",
    schedule: "Mon-Sat",
    color: "neon-green",
  },
];

// Benefits
export const BENEFITS = [
  {
    title: "World-Class Instruction",
    description: "Train under experienced black belts with proven records in competition and real-world application.",
    icon: "Trophy",
  },
  {
    title: "Tribe Mentality",
    description: "Join a brotherhood of dedicated practitioners committed to mutual growth and excellence.",
    icon: "Users",
  },
  {
    title: "Proven Self-Defense",
    description: "Learn practical techniques that work in real situations. Confidence through capability.",
    icon: "Shield",
  },
  {
    title: "Mental Fortitude",
    description: "Develop unshakeable discipline, focus, and problem-solving skills that extend beyond the mat.",
    icon: "Brain",
  },
  {
    title: "Elite Conditioning",
    description: "Build functional strength, flexibility, and endurance through intensive martial arts training.",
    icon: "Flame",
  },
  {
    title: "Goal-Oriented Progress",
    description: "Clear belt progression system with measurable milestones. Track your journey to mastery.",
    icon: "Target",
  },
];

// Stats
export const STATS = [
  { number: "25+", label: "Years Experience" },
  { number: "500+", label: "Active Members" },
  { number: "50+", label: "Black Belts Produced" },
  { number: "24+", label: "Weekly Classes" },
];

// Instructors
export const INSTRUCTORS = [
  {
    id: "instructor-1",
    name: "Coach Martinez",
    role: "Head Instructor",
    belt: "Black Belt",
    bio: "Over 15 years of experience in Brazilian Jiu Jitsu and MMA. Multiple-time state champion with a passion for developing the next generation of fighters.",
    image: "jaguar",
    specialties: ["Competition BJJ", "Self Defense", "MMA"],
  },
  {
    id: "instructor-2",
    name: "Coach Rodriguez",
    role: "BJJ Instructor",
    belt: "Black Belt",
    bio: "Specializes in technical precision and fundamental development. Known for creating champions at all belt levels.",
    image: "jaguar",
    specialties: ["Gi Jiu Jitsu", "Fundamentals", "Competition Prep"],
  },
  {
    id: "instructor-3",
    name: "Coach Johnson",
    role: "Kids Program Director",
    belt: "Brown Belt",
    bio: "Expert in youth development and character building through martial arts. Creates a safe and fun learning environment for children.",
    image: "jaguar",
    specialties: ["Kids BJJ", "Character Development", "Self Defense"],
  },
];

// Pricing Plans
export const PRICING_PLANS = [
  {
    id: "basic",
    name: "Basic",
    description: "Perfect for getting started",
    price: 99,
    period: "month",
    popular: false,
    features: [
      "2 classes per week",
      "Access to open mat",
      "Loaner gi available",
      "Basic fundamentals curriculum",
    ],
    notIncluded: ["Unlimited classes", "Private sessions", "Competition prep"],
  },
  {
    id: "unlimited",
    name: "Unlimited",
    description: "For the dedicated practitioner",
    price: 149,
    period: "month",
    popular: true,
    features: [
      "Unlimited classes",
      "All programs included",
      "Open mat access",
      "Competition class",
      "Gi included",
      "10% merchandise discount",
    ],
    notIncluded: ["Private sessions"],
  },
  {
    id: "elite",
    name: "Elite",
    description: "Total commitment package",
    price: 249,
    period: "month",
    popular: false,
    features: [
      "Everything in Unlimited",
      "2 private sessions/month",
      "Competition team",
      "Video analysis",
      "Priority scheduling",
      "20% merchandise discount",
    ],
    notIncluded: [],
  },
];

// Schedule
export const SCHEDULE = [
  // Monday
  { day: "Monday", time: "12:00 PM", class: "All Level JJ", type: "bjj-gi" },
  { day: "Monday", time: "4:00 PM", class: "All Level JJ", type: "bjj-gi" },
  { day: "Monday", time: "5:00 PM", class: "Lil' Ninjas", type: "kids" },
  { day: "Monday", time: "5:40 PM", class: "Samurai Gi", type: "kids" },
  { day: "Monday", time: "6:30 PM", class: "All Level JJ", type: "bjj-gi" },
  { day: "Monday", time: "8:30 PM", class: "MMA Wrestling", type: "mma" },
  // Tuesday
  { day: "Tuesday", time: "5:30 AM", class: "All Level NoGi", type: "bjj-nogi" },
  { day: "Tuesday", time: "12:00 PM", class: "All Level NoGi", type: "bjj-nogi" },
  { day: "Tuesday", time: "4:00 PM", class: "All Level JJ", type: "bjj-gi" },
  { day: "Tuesday", time: "5:00 PM", class: "Lil' Ninja NoGi", type: "kids" },
  { day: "Tuesday", time: "5:40 PM", class: "Samurai NoGi", type: "kids" },
  { day: "Tuesday", time: "6:30 PM", class: "All Level NoGi", type: "bjj-nogi" },
  { day: "Tuesday", time: "8:30 PM", class: "MMA Sparring", type: "mma" },
  // Wednesday
  { day: "Wednesday", time: "12:00 PM", class: "All Level JJ", type: "bjj-gi" },
  { day: "Wednesday", time: "4:00 PM", class: "All Level JJ", type: "bjj-gi" },
  { day: "Wednesday", time: "5:00 PM", class: "Lil' Ninjas Gi", type: "kids" },
  { day: "Wednesday", time: "5:40 PM", class: "Samurai Gi", type: "kids" },
  { day: "Wednesday", time: "6:30 PM", class: "All Level JJ", type: "bjj-gi" },
  { day: "Wednesday", time: "8:30 PM", class: "All Level MMA", type: "mma" },
  // Thursday
  { day: "Thursday", time: "5:30 AM", class: "All Level NoGi", type: "bjj-nogi" },
  { day: "Thursday", time: "12:00 PM", class: "All Level NoGi", type: "bjj-nogi" },
  { day: "Thursday", time: "4:00 PM", class: "All Level JJ", type: "bjj-gi" },
  { day: "Thursday", time: "5:00 PM", class: "Lil' Ninja NoGi", type: "kids" },
  { day: "Thursday", time: "5:40 PM", class: "Samurai NoGi", type: "kids" },
  { day: "Thursday", time: "6:30 PM", class: "All Level NoGi", type: "bjj-nogi" },
  { day: "Thursday", time: "8:30 PM", class: "All Level MMA", type: "mma" },
  // Friday
  { day: "Friday", time: "11:00 AM", class: "Combatives", type: "bjj-gi" },
  { day: "Friday", time: "12:00 PM", class: "Thunderdome", type: "bjj-nogi" },
  { day: "Friday", time: "4:00 PM", class: "All Level JJ", type: "bjj-gi" },
  { day: "Friday", time: "5:00 PM", class: "Lil' Ninjas Gi", type: "kids" },
  { day: "Friday", time: "5:40 PM", class: "Samurai Gi", type: "kids" },
  // Saturday
  { day: "Saturday", time: "11:00 AM", class: "All Level MMA", type: "mma" },
  { day: "Saturday", time: "11:00 AM", class: "All Level JJ", type: "bjj-gi" },
  // Sunday
  { day: "Sunday", time: "1:00 PM", class: "Open Mat", type: "bjj-nogi" },
];

const toMinutesFrom12HourTime = (time: string) => {
  const [clock, period] = time.split(" ");
  const [rawHours, minutes] = clock.split(":").map(Number);

  let hours = rawHours;
  if (period === "AM" && hours === 12) hours = 0;
  if (period === "PM" && hours !== 12) hours += 12;

  return hours * 60 + minutes;
};

export const SCHEDULE_TIME_SLOTS = Array.from(
  new Set(SCHEDULE.map((entry) => entry.time))
).sort((a, b) => toMinutesFrom12HourTime(a) - toMinutesFrom12HourTime(b));

// Testimonials
export const TESTIMONIALS = [
  {
    id: "1",
    name: "Marcus Johnson",
    role: "Member since 2019",
    content: "This gym completely changed my life. The coaches are world-class and the community is like family. I came in overweight and depressed, now I'm a purple belt and in the best shape of my life.",
    rating: 5,
  },
  {
    id: "2",
    name: "Sarah Martinez",
    role: "Parent of 2 students",
    content: "Both my kids train here and the transformation has been incredible. They're more confident, disciplined, and focused in school. Coach Johnson is amazing with the youth program.",
    rating: 5,
  },
  {
    id: "3",
    name: "David Chen",
    role: "Law Enforcement Officer",
    content: "As a LEO, the self-defense skills I've learned here have literally saved my life. The combatives program is practical and proven. Highly recommend for anyone in the field.",
    rating: 5,
  },
];
