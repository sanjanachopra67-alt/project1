// Client-side ML simulation — mimics a Flask /predict endpoint
// In production, replace with actual API call to Flask backend

export interface StudentInput {
  studyHours: number;
  attendance: number;
  previousGrades: number;
  extracurricular: number;
  internetAccess: number;
  parentalEducation: number;
  assignmentCompletion: number;
}

export interface PredictionResult {
  predictedScore: number;
  performanceLevel: string;
  confidence: number;
  featureContributions: { feature: string; contribution: number }[];
}

// Simulated model weights (resembling a trained Random Forest output)
const weights = {
  studyHours: 0.22,
  attendance: 0.18,
  previousGrades: 0.25,
  extracurricular: 0.05,
  internetAccess: 0.03,
  parentalEducation: 0.08,
  assignmentCompletion: 0.19,
};

export function predict(input: StudentInput): PredictionResult {
  // Normalize inputs to 0-100 scale
  const normalized = {
    studyHours: Math.min(input.studyHours / 40, 1) * 100,
    attendance: input.attendance,
    previousGrades: input.previousGrades,
    extracurricular: input.extracurricular ? 100 : 0,
    internetAccess: input.internetAccess ? 100 : 0,
    parentalEducation: (input.parentalEducation / 4) * 100,
    assignmentCompletion: input.assignmentCompletion,
  };

  // Weighted sum
  let score = 0;
  const contributions: { feature: string; contribution: number }[] = [];

  for (const [key, weight] of Object.entries(weights)) {
    const val = normalized[key as keyof typeof normalized] * weight;
    score += val;
    contributions.push({
      feature: key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase()),
      contribution: Math.round(val * 10) / 10,
    });
  }

  // Add some realistic variance
  score = Math.round(Math.min(100, Math.max(0, score + (Math.random() * 6 - 3))));

  const performanceLevel =
    score >= 85 ? "Excellent" : score >= 65 ? "Good" : score >= 50 ? "Average" : "Needs Improvement";

  const confidence = Math.round(82 + Math.random() * 12);

  return {
    predictedScore: score,
    performanceLevel,
    confidence,
    featureContributions: contributions.sort((a, b) => b.contribution - a.contribution),
  };
}

// Sample dataset for visualization
export const sampleData = [
  { studyHours: 35, attendance: 95, grade: 92, name: "Student A" },
  { studyHours: 28, attendance: 88, grade: 85, name: "Student B" },
  { studyHours: 20, attendance: 75, grade: 72, name: "Student C" },
  { studyHours: 15, attendance: 60, grade: 58, name: "Student D" },
  { studyHours: 10, attendance: 45, grade: 42, name: "Student E" },
  { studyHours: 30, attendance: 92, grade: 88, name: "Student F" },
  { studyHours: 22, attendance: 80, grade: 76, name: "Student G" },
  { studyHours: 38, attendance: 98, grade: 95, name: "Student H" },
  { studyHours: 5, attendance: 30, grade: 35, name: "Student I" },
  { studyHours: 25, attendance: 85, grade: 78, name: "Student J" },
];

export const modelMetrics = {
  accuracy: 89.4,
  mae: 3.21,
  rmse: 4.57,
  r2: 0.894,
  trainingSize: 8500,
  testSize: 1500,
  features: 7,
  algorithm: "Random Forest Regressor",
};

export const featureImportance = [
  { feature: "Previous Grades", importance: 0.25 },
  { feature: "Study Hours", importance: 0.22 },
  { feature: "Assignment Completion", importance: 0.19 },
  { feature: "Attendance", importance: 0.18 },
  { feature: "Parental Education", importance: 0.08 },
  { feature: "Extracurricular", importance: 0.05 },
  { feature: "Internet Access", importance: 0.03 },
];
