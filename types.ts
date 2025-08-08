export interface HealthParameter {
  name: string;
  value: string;
  unit: string;
  status: 'Normal' | 'Low' | 'High' | 'Borderline' | 'Concerning';
  referenceRange: string;
}

export interface MedicalReportAnalysis {
  reportType: string;
  summary: string;
  parameters: HealthParameter[];
  timelineTrend: string;
  mostImproving: string | null;
  mostConcerning: string | null;
}

export interface Recommendation {
  title: string;
  category: 'Diet' | 'Lifestyle';
  suggestion: string;
  reasoning: string;
}

export interface GovernmentScheme {
  name: string;
  description: string;
  eligibility: string[];
  benefits: string[];
  applicationLink: string;
}

export interface HealthRiskPrediction {
  riskName: string;
  riskLevel: 'High' | 'Moderate' | 'Low';
  reasoning: string;
  preventiveRecommendations: string[];
  alert: string;
}

export interface EmergencyProfile {
    bloodGroup: string;
    allergies: string[];
    chronicConditions: string[];
    emergencyContact: {
        name: string;
        phone: string;
    }
}

export type ChatSender = 'user' | 'bot';

export interface ChatMessage {
  sender: ChatSender;
  text: string;
}

// START: New types for Family Dashboard
export interface VitalSign {
  date: string;
  bloodPressure: string; // e.g., "120/80"
  heartRate: number; // bpm
  temperature: number; // Celsius
  bloodSugar?: number; // mg/dL
}

export interface Medication {
  id: string;
  name: string;
  dosage: string; // e.g., "500mg"
  frequency: string; // e.g., "Twice a day"
  reason: string;
}

export interface Appointment {
  id: string;
  doctorName: string;
  specialty: string;
  date: string; // ISO string
  reason: string;
  notes?: string;
}

export interface WellnessEntry {
  date: string; // ISO string
  mood: 'Happy' | 'Neutral' | 'Sad' | 'Anxious' | 'Energetic';
  sleepHours: number;
  activity: string; // e.g., "30 min walk"
}

export interface MedicalDocument {
  id: string;
  name: string;
  type: 'Lab Report' | 'Prescription' | 'Test Result' | 'Doctor Note' | 'Invoice';
  uploadDate: string; // ISO string
  fileUrl: string; // a mock URL
}

export interface FamilyMember {
  id: string;
  name: string;
  relationship: 'Self' | 'Spouse' | 'Child' | 'Parent' | 'Other';
  avatarUrl: string;
  dob: string;
  vitals: VitalSign[];
  medications: Medication[];
  appointments: Appointment[];
  wellnessLog: WellnessEntry[];
  documents: MedicalDocument[];
}
// END: New types for Family Dashboard