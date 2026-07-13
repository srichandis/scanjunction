export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  date: string;
  link: string;
  imageUrl: string;
  author: string;
  categories?: number[];
  categoryNames?: string[];
}

export interface BlogCategory {
  id: number;
  name: string;
  slug: string;
  count: number;
}

export interface Testimonial {
  id: number;
  name: string;
  timeAgo: string;
  rating: number;
  text: string;
  avatar?: string;
}

export interface DigitizingItem {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
}

export interface TransformationItem {
  id: number;
  title: string;
  category: string;
  beforeUrl: string;
  afterUrl: string;
}

export interface StepItem {
  number: number;
  title: string;
  description: string;
  icon: string;
}

export interface FaqItem {
  id: number;
  question: string;
  answer: string;
}
