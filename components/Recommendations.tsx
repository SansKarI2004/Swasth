import React, { useState } from 'react';
import { Recommendation } from '../types';

interface RecommendationsProps {
  recommendations: Recommendation[];
}

const RecommendationCard: React.FC<{ rec: Recommendation }> = ({ rec }) => {
    const isDiet = rec.category === 'Diet';
    const icon = isDiet ? 'fas fa-utensils' : 'fas fa-running';
    const color = isDiet ? 'bg-green-500' : 'bg-blue-500';

    return (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
            <div className="p-5">
                <div className="flex items-center mb-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${color}`}>
                         <i className={icon}></i>
                    </div>
                    <div className="ml-3">
                        <h4 className="font-bold text-lg text-text-primary">{rec.title}</h4>
                        <p className="text-sm font-semibold text-text-secondary">{rec.category}</p>
                    </div>
                </div>
                <p className="text-text-secondary mb-3">{rec.suggestion}</p>
                <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-text-secondary"><strong className="text-gray-700">Scientific Reason:</strong> {rec.reasoning}</p>
                </div>
            </div>
        </div>
    );
};


const Recommendations: React.FC<RecommendationsProps> = ({ recommendations }) => {
    const [filter, setFilter] = useState<'All' | 'Diet' | 'Lifestyle'>('All');

    const filteredRecs = recommendations.filter(rec => filter === 'All' || rec.category === filter);

    return (
        <div className="bg-white p-6 rounded-2xl shadow-md">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <h2 className="text-2xl font-bold text-text-primary mb-3 sm:mb-0">Health Recommendations</h2>
                <div className="flex space-x-2 bg-gray-100 p-1 rounded-lg">
                    <button onClick={() => setFilter('All')} className={`px-4 py-1.5 text-sm font-semibold rounded-md transition ${filter === 'All' ? 'bg-primary text-white shadow' : 'text-text-secondary'}`}>All</button>
                    <button onClick={() => setFilter('Diet')} className={`px-4 py-1.5 text-sm font-semibold rounded-md transition ${filter === 'Diet' ? 'bg-primary text-white shadow' : 'text-text-secondary'}`}>Diet</button>
                    <button onClick={() => setFilter('Lifestyle')} className={`px-4 py-1.5 text-sm font-semibold rounded-md transition ${filter === 'Lifestyle' ? 'bg-primary text-white shadow' : 'text-text-secondary'}`}>Lifestyle</button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredRecs.map((rec, index) => (
                    <RecommendationCard key={index} rec={rec} />
                ))}
            </div>
        </div>
    );
};

export default Recommendations;
