
export enum Language {
  EN = 'EN',
  TR = 'TR'
}

export enum Theme {
  LIGHT = 'LIGHT',
  DARK = 'DARK'
}

export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  website: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  year: string;
}

export interface CVData {
  personal: PersonalInfo;
  aboutMe: string;
  experience: Experience[];
  education: Education[];
  skills: string[];
  projects: string[];
  certifications: string[];
  languages: string[];
  references: string;
}

export interface CVVersion {
  title: string;
  description: string;
  htmlContent: string;
  styleSlug: string;
}

export interface AIResponse {
  versions: CVVersion[];
}
