export interface Question {
  id: string;
  question: string;
  category: "Technical" | "Behavioral" | "System Design" | "Coding" | "HR" | "AI/ML" | "Cloud" | "Data Science" | string;
  rationale: string;
  gradingCriteria: string;
}

export interface AnswerAnalysis {
  scoreOverall: number;
  scoreCommunication: number;
  scoreTechnical: number;
  scoreStarMethod: number;
  scoreGrammar: number;
  scoreVocabulary: number;
  scoreConfidence: number;
  scoreProblemSolving: number;
  speakingSpeed: number; // Words per minute
  thinkingTime: number; // Seconds
  emotionIndicator: "Confident" | "Focused" | "Calm" | "Anxious" | "Determined" | string;
  feedbackStrengths: string[];
  feedbackWeaknesses: string[];
  grammarFeedback: string;
  vocabularyFeedback: string;
  overallImpression: string;
  recruiterNotes: string;
  starMethodAnalysis: string;
  keywordsUsed: string[];
  missingKeywords: string[];
  improvementSuggestions: string[];
  suggestedModelResponse: string;
  fallback?: boolean;
}

export interface SessionHistoryItem {
  question: Question;
  answer: string;
  analysis: AnswerAnalysis | null;
  timeTakenSeconds?: number;
}

export interface SessionEvaluation {
  overallSummary: string;
  keyStrengths: string[];
  growthAreas: string[];
  hiringRecommendation: "Strong Hire" | "Hire" | "Leaning No" | "No Hire" | string;
  actionPlan: string[];
  resumeOptimizations: string[];
  
  // Enterprise Analytics additions
  overallScore: number;
  roleMatchPercentage: number;
  interviewReadinessPercentage: number;
  atsReadinessPercentage: number;
  scoreProblemSolving: number;
  scoreBehavioral: number;
  scoreCoding: number;
  scoreLeadership: number;
  scoreConfidence: number;
  shouldRecruit: "Yes" | "Maybe" | "No";
}

export interface ResumePreset {
  name: string;
  role: string;
  experienceLevel: "Junior" | "Mid-Level" | "Senior";
  resumeText: string;
  jobDescription: string;
}

export interface InterviewSetupDetails {
  role: string;
  company: string;
  experienceLevel: "Junior" | "Mid-Level" | "Senior";
  interviewType: "Technical" | "Behavioral" | "HR" | "System Design" | "Coding" | "AI/ML" | "Cloud" | "Data Science" | "Mixed";
  difficultyLevel: "Easy" | "Medium" | "Hard" | "Expert";
  interviewDuration: number; // in minutes
  numQuestions: number;
}

export interface AppSettings {
  geminiModel: string;
  temperature: number;
  language: string;
  voiceName: string;
  theme: "dark" | "light" | "system";
  defaultDuration: number;
  autoSave: boolean;
  notifications: boolean;
}

export interface UserBadge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  progress: number; // 0 to 100
  unlocked: boolean;
}

export interface UserProfile {
  name: string;
  email: string;
  headline: string;
  streak: number;
  totalInterviews: number;
  averageScore: number;
  rank: number;
  badges: UserBadge[];
}

export interface LearningRoadmap {
  role: string;
  atsScore: number;
  skillsGap: string[];
  missingKeywords: string[];
  courses: { title: string; provider: string; duration: string; link: string }[];
  projects: { title: string; description: string; techStack: string[] }[];
  certifications: string[];
  books: string[];
  practiceQuestions: string[];
  leetcodeProblems: { title: string; difficulty: "Easy" | "Medium" | "Hard"; link: string }[];
  interviewTopics: string[];
}

export interface ATSAnalysisResult {
  score: number;
  extractedSkills: string[];
  extractedProjects: string[];
  extractedExperience: string[];
  extractedEducation: string[];
  extractedCertifications: string[];
  skillGap: string[];
  missingKeywords: string[];
  improvementSuggestions: string[];
  comparisonRole: string;
}

export interface RecruiterMetricReport {
  candidateName: string;
  resumeMatchPercentage: number;
  skillMatchPercentage: number;
  cultureFitPercentage: number;
  riskLevel: "Low" | "Medium" | "High";
  hiringConfidence: number; // 0 to 100
  technicalReadiness: number; // 0 to 100
  communicationReadiness: number; // 0 to 100
  topSkills: string[];
  weakSkills: string[];
  overallRecommendation: string;
}
