export interface Project {
  _id?: string;
  title: string;
  category: string;
  image: string; // URL or placeholder
  link?: string;
  description?: string;
}

export interface Experience {
  _id?: string;
  type: 'education' | 'work';
  title: string; // e.g. "University of Toronto" or "Lead Web Designer"
  role: string; // e.g. "Student" or "Developer"
  date: string; // "Jan 2016 - Dec 2021"
  description: string;
}

export interface Message {
  _id?: string;
  fullName: string;
  email: string;
  subject?: string;
  message: string;
  createdAt?: string;
}

export interface User {
  _id: string;
  email: string;
  role: 'admin';
}

export interface AuthResponse {
  token: string;
  user: User;
}
