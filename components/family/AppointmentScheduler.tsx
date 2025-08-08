import React from 'react';
import { Appointment } from '../../types';

interface AppointmentSchedulerProps {
  appointments: Appointment[];
}

const AppointmentScheduler: React.FC<AppointmentSchedulerProps> = ({ appointments }) => {
  const upcomingAppointments = appointments
    .filter(apt => new Date(apt.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col">
      <h3 className="text-xl font-bold text-text-primary mb-4 flex items-center"><i className="fas fa-calendar-alt text-secondary mr-3"></i>Upcoming Appointments</h3>
      <div className="flex-grow space-y-3">
        {upcomingAppointments.length > 0 ? (
          upcomingAppointments.map(apt => (
            <div key={apt.id} className="bg-green-50 p-3 rounded-lg border-l-4 border-secondary">
              <p className="font-bold text-green-800">{new Date(apt.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
              <p className="text-sm text-text-primary">Dr. {apt.doctorName} ({apt.specialty})</p>
              <p className="text-xs text-text-secondary">Reason: {apt.reason}</p>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center h-full text-text-secondary">
            <p>No upcoming appointments.</p>
          </div>
        )}
      </div>
      <button className="mt-6 w-full bg-primary-light text-primary font-semibold py-2.5 px-4 rounded-lg hover:bg-primary hover:text-white transition-colors duration-200">
        <i className="fas fa-plus-circle mr-2"></i>Add Appointment
      </button>
    </div>
  );
};

export default AppointmentScheduler;