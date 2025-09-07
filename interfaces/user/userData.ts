export interface IUserData {
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userType: string;
  position: string;
  phone: string;
  location: string;
  socialMedia: {
    linkedin: string;
    github: string;
  };
  bio: string;
  careerInfo: {
    currentPosition: string;
    experienceLevel: string;
  }[];
  skills: string[];
  education: {
    school: string;
    fieldOfStudy: string;
    startYear: number;
    endYear: number;
    gpa: number;
  }[];
  settings: {
    notifications: {
      emailInvitations: boolean;
      interviewResults: boolean;
    };
    privacy: {
      profileVisibility: boolean;
      twoFactorAuth: boolean;
    };
  };
}