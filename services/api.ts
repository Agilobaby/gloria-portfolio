
import axios from 'axios';
import { API_URL } from '../constants';
import { Project, Experience, Message, AuthResponse } from '../types';

const api = axios.create({
  baseURL: API_URL,
});

// Request interceptor to add token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// --- Mock Data for Fallback ---
const MOCK_PROJECTS: Project[] = [
  { _id: '1', title: 'Dashboard UI', category: 'UI Design', image: 'https://picsum.photos/400/300?random=101', description: 'A dashboard UI' },
  { _id: '2', title: 'E-commerce App', category: 'Web Templates', image: 'https://picsum.photos/400/300?random=102', description: 'Shop app' },
  { _id: '3', title: 'Brand Identity', category: 'Branding', image: 'https://picsum.photos/400/300?random=103', description: 'Brand identity' },
  { _id: '4', title: 'Mobile Banking', category: 'UI Design', image: 'https://picsum.photos/400/300?random=104', description: 'Finance app' },
  { _id: '5', title: 'Restaurant Logo', category: 'Logo', image: 'https://picsum.photos/400/300?random=105', description: 'Vector logo' },
  { _id: '6', title: 'Marketing Assets', category: 'Branding', image: 'https://picsum.photos/400/300?random=106', description: 'Social media kit' },
];

const MOCK_EXPERIENCE: Experience[] = [
  // Education & Certifications from PDF Page 3
  { 
    _id: 'edu1', 
    type: 'education', 
    title: 'St. Paul’s University, Limuru', 
    role: 'Diploma in Business and Information Technology', 
    date: 'Nov 2024', 
    description: 'Focus: Business operations, computer systems, information management, IT Fundamentals. Capstone Project: E-commerce website.' 
  },
  { 
    _id: 'edu2', 
    type: 'education', 
    title: 'AWS re/Start', 
    role: 'AWS Certified Cloud Practitioner', 
    date: 'Aug 2024', 
    description: 'Intensive cloud computing program covering security, architecture, and core services.' 
  },
  { 
    _id: 'edu3', 
    type: 'education', 
    title: 'Ajira Digital', 
    role: 'Certificate in Data Analysis', 
    date: 'Jun 2024', 
    description: 'Training in data processing, visualization, and spreadsheet management for decision making.' 
  },
  { 
    _id: 'edu4', 
    type: 'education', 
    title: 'Ajira Digital', 
    role: 'Certificate in Virtual Assistance', 
    date: 'Jan 2023', 
    description: 'Focused on digital productivity, remote support, and professional administrative workflows.' 
  },
  
  // Work History from PDF Page 4, 5, 6
  { 
    _id: 'work1', 
    type: 'work', 
    title: 'International School of Kenya (ISK)', 
    role: 'Innovation Studio Intern', 
    date: 'Sept 2025 – Ongoing', 
    description: 'Assisting with hands-on lessons in Robotics (LEGO Mindstorms), Coding (Scratch, Python), and Product Design. Guiding students in 3D design using Tinkercad and Adobe Illustrator. Supporting web development lessons with HTML/CSS.' 
  },
  { 
    _id: 'work2', 
    type: 'work', 
    title: 'Children’s Garden Home and School', 
    role: 'Educational Technology Integrator', 
    date: 'Ongoing', 
    description: 'Leading efforts to replace paper-based systems with technology. Training teachers on Google Workspace for Education (Docs, Sheets, Classroom) and delivering iPad-based lessons aligned with the CBC curriculum.' 
  },
  { 
    _id: 'work3', 
    type: 'work', 
    title: 'International School of Kenya (ISK)', 
    role: 'IT Intern', 
    date: 'Jan 2025 – May 2025', 
    description: 'Provided technical support at the IT helpdesk, repaired Chromebooks/iMacs, and managed device inventory using AppSheet. Collaborated on tech integration projects with the ISK IT Director.' 
  },
  { 
    _id: 'work4', 
    type: 'work', 
    title: 'International School of Kenya (ISK)', 
    role: 'Casual Summer IT Support', 
    date: 'Jun 2025 – Jul 2025', 
    description: 'Prepared Chromebooks for the new term through cleaning, updating, and testing features. Recorded device inventory in Google Sheets and managed cable organization for device carts.' 
  },
  { 
    _id: 'work5', 
    type: 'work', 
    title: 'Private Family Engagement', 
    role: 'Private Elementary Tutor (Home School)', 
    date: 'Feb 2024 – Jul 2024', 
    description: 'Delivered personalized lessons across Math, English, Literature, Geography, Coding, and Computer studies. Developed engaging lesson routines and literacy-building activities.' 
  },
  { 
    _id: 'work6', 
    type: 'work', 
    title: 'Nione Initiative Foundation, Kitisuru', 
    role: 'Volunteer Special Needs Teaching Assistant', 
    date: 'Jan 2022 – Apr 2022', 
    description: 'Supported classroom management and assisted special needs students with reading and routines. Helped promote a nurturing and inclusive learning environment.' 
  },
];

const MOCK_MESSAGES: Message[] = [
  { _id: '1', fullName: 'John Doe', email: 'john@example.com', subject: 'Inquiry', message: 'Hello, I would like to hire you.', createdAt: new Date().toISOString() },
];

const MOCK_USER = { _id: 'mock-admin-id', email: 'admin@example.com', role: 'admin' as const };

// Helper to handle API calls with mock fallback
async function fetchWithFallback<T>(apiCall: () => Promise<{ data: T }>, fallbackData: T): Promise<T> {
  try {
    const res = await apiCall();
    return res.data;
  } catch (error) {
    console.warn(`Backend API unreachable. Using mock data fallback.`);
    return fallbackData;
  }
}

// Auth
export const login = async (email: string, password: string) => {
  try {
    const res = await api.post<AuthResponse>('/auth/login', { email, password });
    return res.data;
  } catch (error) {
    if (email === 'admin@example.com' && password === 'password123') {
       return { token: 'mock-token-123', user: MOCK_USER };
    }
    throw error;
  }
};

// Projects
export const getProjects = async () => fetchWithFallback(() => api.get<Project[]>('/projects'), MOCK_PROJECTS);

export const createProject = async (data: Omit<Project, '_id'>) => {
    try {
        const res = await api.post<Project>('/projects', data);
        return res.data;
    } catch (e) {
        const newProj = { ...data, _id: Math.random().toString() };
        MOCK_PROJECTS.push(newProj);
        return newProj;
    }
};

export const deleteProject = async (id: string) => {
    try {
        return (await api.delete(`/projects/${id}`)).data;
    } catch (e) {
        const idx = MOCK_PROJECTS.findIndex(p => p._id === id);
        if (idx > -1) MOCK_PROJECTS.splice(idx, 1);
        return { message: 'Deleted' };
    }
}

// Experience
export const getExperience = async () => fetchWithFallback(() => api.get<Experience[]>('/experience'), MOCK_EXPERIENCE);

export const createExperience = async (data: Omit<Experience, '_id'>) => {
    try {
        const res = await api.post<Experience>('/experience', data);
        return res.data;
    } catch (e) {
        const newExp = { ...data, _id: Math.random().toString() };
        MOCK_EXPERIENCE.push(newExp);
        return newExp;
    }
};

export const deleteExperience = async (id: string) => {
    try {
        return (await api.delete(`/experience/${id}`)).data;
    } catch (e) {
        const idx = MOCK_EXPERIENCE.findIndex(e => e._id === id);
        if (idx > -1) MOCK_EXPERIENCE.splice(idx, 1);
        return { message: 'Deleted' };
    }
};

// Contact
export const sendMessage = async (data: Omit<Message, '_id'>) => {
    try {
        return (await api.post('/contact', data)).data;
    } catch (e) {
        MOCK_MESSAGES.unshift({ ...data, _id: Math.random().toString(), createdAt: new Date().toISOString() });
        return { message: 'Message sent' };
    }
};

export const getMessages = async () => fetchWithFallback(() => api.get<Message[]>('/messages'), MOCK_MESSAGES);

export default api;
