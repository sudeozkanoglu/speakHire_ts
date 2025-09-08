import { IconType } from "react-icons";
import { FaCode, FaDatabase, FaUsers, FaBrain, FaDocker } from "react-icons/fa";

export interface InterviewCard {
  id: number;
  title: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  category: string;
  icon: IconType;
  duration: string;
  questions: number;
  rating: number;
}

export const interviewCards = [
    {
      id: 1,
      title: "Frontend Developer",
      description: "React, JavaScript, CSS, HTML konularında sorular içerir.",
      difficulty: "Beginner",
      category: "Frontend",
      icon: FaCode,
      duration: "45 min",
      questions: 25,
      rating: 4.8,
    },
    {
      id: 2,
      title: "Backend Developer",
      description: "Node.js, Express.js, SQL konularında sorular içerir.",
      difficulty: "Intermediate",
      category: "Backend",
      icon: FaDatabase,
      duration: "60 min",
      questions: 30,
      rating: 4.7,
    },
    {
      id: 3,
      title: "HR Mülakatı",
      description: "Davranışsal sorular, ekip çalışması ve liderlik.",
      difficulty: "Beginner",
      category: "HR",
      icon: FaUsers,
      duration: "30 min",
      questions: 20,
      rating: 4.9,
    },
    {
      id: 4,
      title: "Full Stack Developer",
      description: "Frontend ve Backend teknolojilerinin tamamı.",
      difficulty: "Advanced",
      category: "FullStack",
      icon: FaCode,
      duration: "90 min",
      questions: 45,
      rating: 4.6,
    },
    {
      id: 5,
      title: "AI/ML Engineer",
      description: "Machine Learning, Deep Learning, Python.",
      difficulty: "Advanced",
      category: "AI",
      icon: FaBrain,
      duration: "75 min",
      questions: 35,
      rating: 4.8,
    },
    {
      id: 6,
      title: "DevOps Engineer",
      description: "Docker, Kubernetes, CI/CD, AWS konuları.",
      difficulty: "Intermediate",
      category: "DevOps",
      icon: FaDocker,
      duration: "50 min",
      questions: 28,
      rating: 4.7,
    },
  ];