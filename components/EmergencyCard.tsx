import React from 'react';
import { EmergencyProfile } from '../types';

interface EmergencyCardProps {
    profile: EmergencyProfile;
}

const EmergencyCard: React.FC<EmergencyCardProps> = ({ profile }) => {
    const handleSOS = () => {
        alert(`SOS Activated! Notifying ${profile.emergencyContact.name} at ${profile.emergencyContact.phone}.`);
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-md h-full flex flex-col">
            <h2 className="text-xl font-bold text-text-primary mb-4">Emergency Card</h2>
            <div className="space-y-3 text-sm flex-grow">
                <div className="flex justify-between">
                    <span className="font-semibold text-text-secondary">Blood Group</span>
                    <span className="font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded">{profile.bloodGroup}</span>
                </div>
                <div>
                    <span className="font-semibold text-text-secondary">Allergies</span>
                    <p className="text-text-primary">{profile.allergies.join(', ')}</p>
                </div>
                <div>
                    <span className="font-semibold text-text-secondary">Chronic Conditions</span>
                    <p className="text-text-primary">{profile.chronicConditions.join(', ')}</p>
                </div>
                 <div>
                    <span className="font-semibold text-text-secondary">Emergency Contact</span>
                    <p className="text-text-primary">{profile.emergencyContact.name} ({profile.emergencyContact.phone})</p>
                </div>
            </div>
            <button 
                onClick={handleSOS}
                className="w-full mt-6 bg-red-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-red-700 transition-all flex items-center justify-center text-lg"
            >
                <i className="fas fa-phone-alt fa-shake mr-3"></i>
                SOS
            </button>
        </div>
    );
}

export default EmergencyCard;
