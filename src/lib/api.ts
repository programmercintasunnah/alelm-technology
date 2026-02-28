import companyData from '../data/company.json';
import servicesData from '../data/services.json';
import portfolioData from '../data/portfolio.json';
import testimonialsData from '../data/testimonials.json';
import faqData from '../data/faq.json';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export interface Company {
  name: string;
  tagline: string;
  taglineEn: string;
  description: string;
  descriptionEn: string;
  vision: string;
  visionEn: string;
  mission: string[];
  missionEn: string[];
  founded: number;
  email: string;
  phone: string;
  address: string;
  socialMedia: {
    instagram: string;
    linkedin: string;
    twitter: string;
    github: string;
  };
}

export interface Service {
  id: number;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  icon: string;
  features: string[];
}

export interface PortfolioItem {
  id: number;
  title: string;
  titleEn: string;
  client: string;
  category: string;
  categoryLabel: string;
  description: string;
  descriptionEn: string;
  image: string;
  technologies: string[];
  year: number;
}

export interface Testimonial {
  id: number;
  name: string;
  nameEn: string;
  position: string;
  positionEn: string;
  company: string;
  testimonial: string;
  testimonialEn: string;
  avatar: string;
  rating: number;
}

export interface FAQ {
  id: number;
  question: string;
  questionEn: string;
  answer: string;
  answerEn: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
  data?: ContactFormData;
}

export async function getCompany(): Promise<Company> {
  await delay(100);
  return companyData as Company;
}

export async function getServices(): Promise<Service[]> {
  await delay(100);
  return servicesData as Service[];
}

export async function getPortfolio(): Promise<PortfolioItem[]> {
  await delay(100);
  return portfolioData as PortfolioItem[];
}

export async function getPortfolioByCategory(category: string): Promise<PortfolioItem[]> {
  await delay(100);
  const portfolio = portfolioData as PortfolioItem[];
  if (category === 'all') return portfolio;
  return portfolio.filter(item => item.category === category);
}

export async function getTestimonials(): Promise<Testimonial[]> {
  await delay(100);
  return testimonialsData as Testimonial[];
}

export async function getFAQ(): Promise<FAQ[]> {
  await delay(100);
  return faqData as FAQ[];
}

export async function submitContact(data: ContactFormData): Promise<ContactResponse> {
  await delay(500);
  
  console.log('Contact form submitted:', data);
  
  return {
    success: true,
    message: 'Pesan Anda telah diterima. Tim kami akan menghubungi Anda dalam 24 jam.',
    data
  };
}

export function getPortfolioCategories(): { value: string; label: string }[] {
  return [
    { value: 'all', label: 'All Projects' },
    { value: 'web', label: 'Web Development' },
    { value: 'mobile', label: 'Mobile Development' },
    { value: 'uiux', label: 'UI/UX Design' }
  ];
}
