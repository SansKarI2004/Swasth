import React from 'react';
import { WellnessEntry } from '../../types';

interface WellnessLogProps {
  wellnessLog: WellnessEntry[];
}

const moodIcons: { [key in WellnessEntry['mood']]: string } = {
    Happy: 'fa-smile-beam text-yellow-500',
    Energetic: 'fa-bolt text-orange-500',
    Neutral: 'fa-meh text-gray-500',
    Sad: 'fa-frown text-blue-500',
    Anxious: 'fa-flushed text-purple-500',
};

const WellnessLog: React.FC<WellnessLogProps> = ({ wellnessLog }) => {
  const latestLog = wellnessLog.length > 0 ? wellnessLog[wellnessLog.length - 1] : null;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col">
      <h3 className="text-xl font-bold text-text-primary mb-4 flex items-center"><i className="fas fa-leaf text-accent mr-3"></i>Wellness Log</h3>
      <div className="flex-grow">
        {latestLog ? (
            <div className="space-y-3">
                <div className={`p-4 rounded-lg bg-yellow-50 flex items-center space-x-4`}>
                    <i className={`fas ${moodIcons[latestLog.mood]} text-4xl`}></i>
                    <div>
                        <p className="font-bold text-yellow-800">{latestLog.mood}</p>
                        <p className="text-sm text-text-secondary">Last entry: {new Date(latestLog.date).toLocaleDateString()}</p>
                    </div>
                </div>
                 <div className="grid grid-cols-2 gap-3 text-center">
                    <div className="bg-gray-100 p-2 rounded-lg">
                        <p className="text-xs font-semibold text-text-secondary">Sleep</p>
                        <p className="font-bold text-lg">{latestLog.sleepHours} hrs</p>
                    </div>
                     <div className="bg-gray-100 p-2 rounded-lg">
                        <p className="text-xs font-semibold text-text-secondary">Activity</p>
                        <p className="font-bold text-lg truncate">{latestLog.activity}</p>
                    </div>
                 </div>
            </div>
        ) : (
          <div className="flex items-center justify-center h-full text-text-secondary">
            <p>No wellness entries yet.</p>
          </div>
        )}
      </div>
      <button className="mt-6 w-full bg-primary-light text-primary font-semibold py-2.5 px-4 rounded-lg hover:bg-primary hover:text-white transition-colors duration-200">
        <i className="fas fa-plus-circle mr-2"></i>Add Wellness Entry
      </button>
    </div>
  );
};

export default WellnessLog;