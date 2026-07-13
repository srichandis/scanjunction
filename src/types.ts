export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  link: string;
  imageUrl: string;
  author: string;
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
