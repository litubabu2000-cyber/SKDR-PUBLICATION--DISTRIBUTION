import type { ImagePlaceholder } from './placeholder-images';
import { PlaceHolderImages } from './placeholder-images';

const getImage = (id: string): ImagePlaceholder => {
  return (
    PlaceHolderImages.find((img) => img.id === id) || {
      id: 'default',
      imageUrl: 'https://picsum.photos/seed/default/400/600',
      description: 'Default placeholder',
      imageHint: 'book cover',
    }
  );
};

export const books = [
  {
    id: 1,
    title: 'The Midnight Library',
    author: 'Matt Haig',
    price: 14.99,
    image: getImage('book-midnight-library'),
  },
  {
    id: 2,
    title: 'The Silent Patient',
    author: 'Alex Michaelides',
    price: 12.5,
    image: getImage('book-silent-patient'),
  },
  {
    id: 3,
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    price: 18.0,
    image: getImage('book-hail-mary'),
  },
  {
    id: 4,
    title: 'Dune',
    author: 'Frank Herbert',
    price: 15.99,
    image: getImage('book-dune'),
  },
  {
    id: 5,
    title: 'Klara and the Sun',
    author: 'Kazuo Ishiguro',
    price: 16.5,
    image: getImage('book-klara-sun'),
  },
  {
    id: 6,
    title: 'Where the Crawdads Sing',
    author: 'Delia Owens',
    price: 11.99,
    image: getImage('book-crawdads'),
  },
  {
    id: 7,
    title: 'Atomic Habits',
    author: 'James Clear',
    price: 13.99,
    image: getImage('book-atomic-habits'),
  },
  {
    id: 8,
    title: 'The Four Winds',
    author: 'Kristin Hannah',
    price: 17.0,
    image: getImage('book-four-winds'),
  },
];
