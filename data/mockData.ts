import { FamilyMember } from '../types';

export const familyData: FamilyMember[] = [
  {
    id: '1',
    name: 'You',
    relationship: 'Self',
    avatarUrl: 'https://picsum.photos/id/237/200/200',
    dob: '1988-05-20',
    vitals: [
      { date: '2024-07-20T08:00:00Z', bloodPressure: '122/78', heartRate: 68, temperature: 36.8, bloodSugar: 95 },
      { date: '2024-07-21T08:00:00Z', bloodPressure: '120/80', heartRate: 70, temperature: 36.9, bloodSugar: 92 },
    ],
    medications: [
      { id: 'med1', name: 'Vitamin D3', dosage: '2000 IU', frequency: 'Once a day', reason: 'Supplement' },
      { id: 'med2', name: 'Lisinopril', dosage: '10mg', frequency: 'Once a day', reason: 'Hypertension' },
    ],
    appointments: [
      { id: 'apt1', doctorName: 'Dr. Smith', specialty: 'Cardiologist', date: '2024-08-15T10:00:00Z', reason: 'Annual Checkup' },
      { id: 'apt2', doctorName: 'Dr. Jones', specialty: 'Dentist', date: '2024-09-01T14:30:00Z', reason: 'Dental Cleaning' },
    ],
    wellnessLog: [
      { date: '2024-07-21T21:00:00Z', mood: 'Happy', sleepHours: 7.5, activity: '30 min walk' },
      { date: '2024-07-22T21:00:00Z', mood: 'Energetic', sleepHours: 8, activity: '1 hour gym' },
    ],
    documents: [
      { id: 'doc1', name: 'Annual Blood Test', type: 'Lab Report', uploadDate: '2024-05-10T09:00:00Z', fileUrl: '#' },
      { id: 'doc2', name: 'Lisinopril Rx', type: 'Prescription', uploadDate: '2024-01-15T11:00:00Z', fileUrl: '#' },
    ],
  },
  {
    id: '2',
    name: 'Jane Doe',
    relationship: 'Spouse',
    avatarUrl: 'https://picsum.photos/id/1/200/200',
    dob: '1990-11-12',
    vitals: [
      { date: '2024-07-21T09:00:00Z', bloodPressure: '110/70', heartRate: 75, temperature: 37.0 },
    ],
    medications: [
      { id: 'med3', name: 'Iron Supplement', dosage: '65mg', frequency: 'Once a day', reason: 'Anemia' },
    ],
    appointments: [
      { id: 'apt3', doctorName: 'Dr. Wells', specialty: 'Gynecologist', date: '2024-10-05T11:00:00Z', reason: 'Annual Visit' },
    ],
    wellnessLog: [
       { date: '2024-07-22T21:00:00Z', mood: 'Neutral', sleepHours: 7, activity: 'Yoga session' },
    ],
    documents: [
      { id: 'doc3', name: 'Thyroid Panel', type: 'Lab Report', uploadDate: '2024-06-20T14:00:00Z', fileUrl: '#' },
      { id: 'doc4', name: 'Dermatologist Note', type: 'Doctor Note', uploadDate: '2024-07-02T16:00:00Z', fileUrl: '#' },
    ],
  },
  {
    id: '3',
    name: 'Leo Doe',
    relationship: 'Child',
    avatarUrl: 'https://picsum.photos/id/1025/200/200',
    dob: '2018-03-01',
    vitals: [],
    medications: [],
    appointments: [
      { id: 'apt4', doctorName: 'Dr. Adams', specialty: 'Pediatrician', date: '2024-09-10T09:30:00Z', reason: 'Vaccination' },
    ],
    wellnessLog: [],
    documents: [
       { id: 'doc5', name: 'Birth Certificate', type: 'Test Result', uploadDate: '2018-03-01T18:00:00Z', fileUrl: '#' },
    ],
  },
];