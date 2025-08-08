import React from 'react';
import { Medication } from '../../types';

interface MedicationManagerProps {
  medications: Medication[];
}

const MedicationManager: React.FC<MedicationManagerProps> = ({ medications }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col">
      <h3 className="text-xl font-bold text-text-primary mb-4 flex items-center"><i className="fas fa-pills text-primary mr-3"></i>Medication Manager</h3>
      <div className="flex-grow space-y-3">
        {medications.length > 0 ? (
          medications.map(med => (
            <div key={med.id} className="bg-primary-light p-3 rounded-lg">
              <div className="flex justify-between items-center">
                  <p className="font-bold text-primary-dark">{med.name}</p>
                  <p className="text-sm font-semibold text-primary">{med.dosage}</p>
              </div>
              <p className="text-sm text-text-secondary">{med.frequency} - for {med.reason}</p>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center h-full text-text-secondary">
            <p>No medications listed.</p>
          </div>
        )}
      </div>
      <button className="mt-6 w-full bg-primary-light text-primary font-semibold py-2.5 px-4 rounded-lg hover:bg-primary hover:text-white transition-colors duration-200">
        <i className="fas fa-plus-circle mr-2"></i>Add Medication
      </button>
    </div>
  );
};

export default MedicationManager;