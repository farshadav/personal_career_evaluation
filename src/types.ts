export interface Question {
  id: number;
  text: string;
  type: 'slider' | 'multiple-choice';
  options?: string[];
}

export interface Answer {
  questionId: number;
  value: number | string;
}

export interface JobCategory {
  id: string;
  title: string;
  description: string;
  requiredStrengths: string[];
}

export interface UserResult {
  strengths: { [key: string]: number };
  topJobs: { category: JobCategory; score: number }[];
}