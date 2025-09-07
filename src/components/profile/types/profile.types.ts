export interface Education {
  _id?: string;
  school?: string;
  fieldOfStudy?: string;
  startYear?: number;
  endYear?: number;
  gpa?: number;
}

export interface InterviewStats {
  total?: number;
  passed?: number;
  failed?: number;
  successRate?: number;
}

export interface UserProfile {
  _id?: string;
  firstName?: string;
  lastName?: string;
  userName?: string;
  email?: string;
  password?: string;
  phone?: string;
  location?: string;
  position?: string;
  experience?: string;
  avatar?: string;
  socialMedia: {
    linkedin?: string;
    github?: string;
  };
  bio?: string;
  careerInfo: {
    currentPosition?: string;
    experienceLevel?: string;
  },
  skills?: string[];
  education?: Education[];
  interviews?: InterviewStats;
  createdAt?: Date;
  updatedAt?: Date;
  settings?: {
    notifications?: {
      emailInvitations?: boolean;
      interviewResults?: boolean;
    },
    privacy?: {
      profileVisibility?: boolean;
      twoFactorAuth?: boolean;
    }
  }
}

export interface EditingSections {
  personal: boolean;
  social: boolean;
  career: boolean;
  skills: boolean;
  education: boolean;
}

export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export interface ModernCardProps {
  children: React.ReactNode;
  title?: string;
  editSection?: keyof EditingSections;
  isEditing?: boolean;
  onToggleEdit?: (section: keyof EditingSections) => void;
  onDelete?: (id?: string) => void;
  onSave?: () => Promise<void> | void;
}

export interface ProfileHeaderProps {
  userProfile: UserProfile;
  tabValue: number;
  onTabChange: (event: React.SyntheticEvent, newValue: number) => void;
}

// Base Tab Props
export interface BaseTabProps {
  value: number;
  index: number;
}

export interface PersonalInfoTabProps extends BaseTabProps {
  userProfile: UserProfile;
  editingSections: EditingSections;
  onToggleEdit: (section: keyof EditingSections) => void;
  onUpdated: (user: UserProfile) => void;
}

export interface CareerTabProps extends BaseTabProps {
  userProfile: UserProfile;
  editingSections: EditingSections;
  onToggleEdit: (section: keyof EditingSections) => void;
  onUpdated: (user: UserProfile) => void;
}

export interface EducationTabProps extends BaseTabProps {
  userProfile: UserProfile;
  editingSections: EditingSections;
  onToggleEdit: (section: keyof EditingSections) => void;
  onUpdated: (user: UserProfile) => void;
}

export interface InterviewStatsTabProps extends BaseTabProps {
  userProfile: UserProfile;
}

export interface SettingsTabProps extends BaseTabProps {
  userProfile: UserProfile;
  onUpdated: (user: UserProfile) => void;
}

export interface PersonalInfoCardProps {
  userProfile: UserProfile;
  isEditing: boolean;
  onToggleEdit: () => void;
  onUpdated: (user: UserProfile) => void;
}

export interface SocialMediaCardProps {
  userProfile: UserProfile;
  isEditing: boolean;
  onToggleEdit: () => void; 
  onUpdated: (user: UserProfile) => void;
}

export interface CareerInfoCardProps {
  userProfile: UserProfile;
  isEditing: boolean;
  onToggleEdit: () => void; 
  onUpdated: (user: UserProfile) => void;
}

export interface SkillsCardProps {
  userProfile: UserProfile;
  isEditing: boolean;
  onToggleEdit: () => void; 
  onUpdated: (user: UserProfile) => void;
}

export interface EducationCardProps {
  userProfile: UserProfile;
  education: Education[];
  isEditing: boolean;    
  onToggleEdit?: (section: keyof EditingSections) => void;
  onUpdated: (user: UserProfile) => void;
}

export interface SettingsCardProps {
  userProfile: UserProfile;
  onUpdated: (user: UserProfile) => void;
}

// Form Data Types
export interface PersonalInfoFormData {
  name: string;
  email: string;
  phone: string;
  location: string;
}

export interface SocialMediaFormData {
  linkedin: string;
  github: string;
  bio: string;
}

export interface CareerFormData {
  position: string;
  experience: string;
}

// API Response Types
export interface ProfileUpdateResponse {
  success: boolean;
  message: string;
  data?: UserProfile;
}

export interface ProfileFetchResponse {
  success: boolean;
  data: UserProfile;
  message?: string;
}

// Enum Types
export enum ExperienceLevel {
  JUNIOR = 'Junior (0-2 yıl)',
  MID = 'Mid-level (3-5 yıl)',
  SENIOR = 'Senior (5-8 yıl)',
  LEAD = 'Lead (8+ yıl)',
  PRINCIPAL = 'Principal (10+ yıl)'
}

export enum TabIndex {
  PERSONAL = 0,
  CAREER = 1,
  EDUCATION = 2,
  INTERVIEWS = 3,
  SETTINGS = 4
}