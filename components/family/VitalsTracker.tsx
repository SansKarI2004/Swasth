import React from 'react';
import { VitalSign } from '../../types';

interface VitalsTrackerProps {
  vitals: VitalSign[];
}

const VitalsTracker: React.FC<VitalsTrackerProps> = ({ vitals }) => {
  const latestVitals = vitals.length > 0 ? vitals[vitals.length - 1] : null;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col">
      <h3 className="text-xl font-bold text-text-primary mb-4 flex items-center"><i className="fas fa-heartbeat text-red-500 mr-3"></i>Vitals Tracker</h3>
      <div className="flex-grow">
        {latestVitals ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-red-50 p-3 rounded-lg">
                    <p className="text-sm text-red-700 font-semibold">Blood Pressure</p>
                    <p className="text-xl font-bold text-red-900">{latestVitals.bloodPressure}</p>
                </div>
                 <div className="bg-red-50 p-3 rounded-lg">
                    <p className="text-sm text-red-700 font-semibold">Heart Rate</p>
                    <p className="text-xl font-bold text-red-900">{latestVitals.heartRate} <span className="text-sm font-normal">bpm</span></p>
                </div>
                 <div className="bg-red-50 p-3 rounded-lg">
                    <p className="text-sm text-red-700 font-semibold">Temperature</p>
                    <p className="text-xl font-bold text-red-900">{latestVitals.temperature}°C</p>
                </div>
                 {latestVitals.bloodSugar && (
                    <div className="bg-red-50 p-3 rounded-lg">
                        <p className="text-sm text-red-700 font-semibold">Blood Sugar</p>
                        <p className="text-xl font-bold text-red-900">{latestVitals.bloodSugar} <span className="text-sm font-normal">mg/dL</span></p>
                    </div>
                )}
            </div>
            <p className="text-xs text-text-secondary text-center">Last updated: {new Date(latestVitals.date).toLocaleDateString()}</p>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-text-secondary">
            <p>No vitals logged yet.</p>
          </div>
        )}
      </div>
      <button className="mt-6 w-full bg-primary-light text-primary font-semibold py-2.5 px-4 rounded-lg hover:bg-primary hover:text-white transition-colors duration-200">
        <i className="fas fa-plus-circle mr-2"></i>Log New Vitals
      </button>
    </div>
  );
};

export default VitalsTracker;