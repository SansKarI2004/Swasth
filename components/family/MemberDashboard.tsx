import React from 'react';
import { FamilyMember } from '../../types';
import VitalsTracker from './VitalsTracker';
import MedicationManager from './MedicationManager';
import AppointmentScheduler from './AppointmentScheduler';
import WellnessLog from './WellnessLog';

interface MemberDashboardProps {
  member: FamilyMember;
}

const MemberDashboard: React.FC<MemberDashboardProps> = ({ member }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-text-primary">
        {member.name}'s Health Hub
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <VitalsTracker vitals={member.vitals} />
        <WellnessLog wellnessLog={member.wellnessLog} />
        <MedicationManager medications={member.medications} />
        <AppointmentScheduler appointments={member.appointments} />
      </div>
    </div>
  );
};

export default MemberDashboard;