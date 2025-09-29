import type { ImagePlaceholder } from './placeholder-images';
import { PlaceHolderImages } from './placeholder-images';

const getImage = (id: string): ImagePlaceholder => {
  return (
    PlaceHolderImages.find((img) => img.id === id) || {
      id: 'default',
      imageUrl: 'https://picsum.photos/seed/default/600/400',
      description: 'Default placeholder',
      imageHint: 'abstract',
    }
  );
};

export const books = [
  {
    id: 1,
    title: 'Concepts of Physics',
    author: 'H.C. Verma',
    subject: 'Physics',
    image: getImage('book-physics'),
  },
  {
    id: 2,
    title: 'Organic Chemistry',
    author: 'Paula Yurkanis Bruice',
    subject: 'Chemistry',
    image: getImage('book-chemistry'),
  },
  {
    id: 3,
    title: 'Objective Mathematics',
    author: 'R.D. Sharma',
    subject: 'Mathematics',
    image: getImage('book-math'),
  },
  {
    id: 4,
    title: 'Biology for NEET',
    author: 'S. N. Pandey',
    subject: 'Biology',
    image: getImage('book-biology'),
  },
  {
    id: 5,
    title: 'Indian Polity',
    author: 'M. Laxmikanth',
    subject: 'Social Studies',
    image: getImage('book-polity'),
  },
  {
    id: 6,
    title: 'A Brief History of Time',
    author: 'Stephen Hawking',
    subject: 'Physics',
    image: getImage('book-history-time'),
  },
];

export const pyqs = [
  {
    exam: 'JEE Advanced',
    papers: [
      { year: 2023, link: '#' },
      { year: 2022, link: '#' },
      { year: 2021, link: '#' },
    ],
  },
  {
    exam: 'NEET UG',
    papers: [
      { year: 2023, link: '#' },
      { year: 2022, link: '#' },
      { year: 2021, link: '#' },
    ],
  },
  {
    exam: 'UPSC CSE',
    papers: [
      { year: 2023, link: '#' },
      { year: 2022, link: '#' },
      { year: 2021, link: '#' },
    ],
  },
];

export const lectures = [
  {
    id: 1,
    subject: 'Physics',
    description: 'Master the fundamental principles of the universe.',
    image: getImage('lecture-physics'),
  },
  {
    id: 2,
    subject: 'Chemistry',
    description: 'Explore the world of atoms, molecules, and reactions.',
    image: getImage('lecture-chemistry'),
  },
  {
    id: 3,
    subject: 'Mathematics',
    description: 'Develop your problem-solving and logical skills.',
    image: getImage('lecture-math'),
  },
  {
    id: 4,
    subject: 'Biology',
    description: 'Understand the science of life and living organisms.',
    image: getImage('lecture-biology'),
  },
];

export const mockTests = [
  {
    id: 1,
    title: 'Physics - Kinematics',
    subject: 'Physics',
    questions: 20,
  },
  {
    id: 2,
    title: 'Chemistry - Chemical Bonding',
    subject: 'Chemistry',
    questions: 25,
  },
  {
    id: 3,
    title: 'Maths - Calculus Basics',
    subject: 'Mathematics',
    questions: 15,
  },
  {
    id: 4,
    title: 'Biology - Cell Structure',
    subject: 'Biology',
    questions: 30,
  },
];

export const weeklyTests = [
  {
    id: 1,
    title: 'All-India Open Mock Test #5',
    date: 'July 28, 2024',
    type: 'All-India',
  },
  {
    id: 2,
    title: 'State-wise Championship - Maharashtra',
    date: 'July 30, 2024',
    type: 'State-wise',
  },
  {
    id: 3,
    title: 'All-India Open Mock Test #6',
    date: 'August 4, 2024',
    type: 'All-India',
  },
    {
    id: 4,
    title: 'State-wise Championship - Uttar Pradesh',
    date: 'August 6, 2024',
    type: 'State-wise',
  },
];

export const mcqTopics = {
    Physics: ['Mechanics', 'Thermodynamics', 'Optics', 'Electromagnetism'],
    Chemistry: ['Physical Chemistry', 'Organic Chemistry', 'Inorganic Chemistry'],
    Mathematics: ['Algebra', 'Calculus', 'Trigonometry', 'Geometry'],
    Biology: ['Botany', 'Zoology', 'Genetics', 'Ecology'],
};

export const examUpdates = [
  {
    title: 'JEE Advanced 2024 results announced.',
    date: 'July 15, 2024',
  },
  {
    title: 'NEET UG 2024 application deadline extended.',
    date: 'July 14, 2024',
  },
  {
    title: 'UPSC CSE 2024 Prelims date confirmed.',
    date: 'July 12, 2024',
  },
  {
    title: 'New exam pattern for CAT 2024 revealed.',
    date: 'July 10, 2024',
  },
];
