export interface Project {
  id: string;
  number: string;
  name: string;
}

export interface Department {
  code: string;
  allocation: number;
  participants: number;
  submissions: number;
  marks: number;
  projects: Project[];
  // New fields to be extracted from Excel
  totalMarksSubmitted?: number;
  completed?: number;
  totalMarksCompleted?: number;
  completedPointsAvg?: number;
  submissionRatio?: number;
  participationRatio?: number;
  leaderboardCm?: number;
}