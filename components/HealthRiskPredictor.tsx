import React from 'react';
import { HealthRiskPrediction } from '../types';

const getRiskColor = (level: HealthRiskPrediction['riskLevel']) => {
    switch (level) {
        case 'High': return { text: 'text-red-700', bg: 'bg-red-100', border: 'border-red-500' };
        case 'Moderate': return { text: 'text-yellow-700', bg: 'bg-yellow-100', border: 'border-yellow-500' };
        case 'Low': return { text: 'text-green-700', bg: 'bg-green-100', border: 'border-green-500' };
        default: return { text: 'text-gray-700', bg: 'bg-gray-100', border: 'border-gray-500' };
    }
};

const RiskCard: React.FC<{ risk: HealthRiskPrediction }> = ({ risk }) => {
    const colors = getRiskColor(risk.riskLevel);
    return (
        <div className={`bg-white p-5 rounded-xl shadow-sm border-l-4 ${colors.border}`}>
            <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-bold text-text-primary flex items-center pr-2">
                    <i className={`fas fa-shield-alt mr-2 ${colors.text}`}></i>
                    {risk.riskName}
                </h3>
                <span className={`font-bold px-3 py-1 rounded-full text-sm ${colors.bg} ${colors.text} flex-shrink-0`}>
                    {risk.riskLevel} Risk
                </span>
            </div>

            <div className="space-y-4">
                <div>
                    <h4 className="font-semibold text-text-secondary mb-1 flex items-center">
                        <i className="fas fa-search-plus mr-2 w-4 text-center"></i>Reasoning
                    </h4>
                    <p className="text-text-primary text-sm pl-6">{risk.reasoning}</p>
                </div>

                <div>
                    <h4 className="font-semibold text-text-secondary mb-2 flex items-center">
                        <i className="fas fa-lightbulb mr-2 w-4 text-center"></i>Preventive Steps
                    </h4>
                    <ul className="list-disc list-inside text-text-primary space-y-1 text-sm pl-6">
                        {risk.preventiveRecommendations.map((rec, i) => <li key={i}>{rec}</li>)}
                    </ul>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg mt-4">
                     <h4 className="font-semibold text-yellow-800 flex items-center">
                        <i className="fas fa-exclamation-triangle mr-2"></i>Doctor's Visit Alert
                    </h4>
                    <p className="text-yellow-900 text-sm">{risk.alert}</p>
                </div>
            </div>
        </div>
    );
};

const HealthRiskPredictor: React.FC<{ risks: HealthRiskPrediction[] }> = ({ risks }) => {
    if (!risks || risks.length === 0) {
        return null;
    }

    return (
        <div className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-2xl font-bold text-text-primary mb-4 flex items-center">
                <i className="fas fa-chart-line mr-3 text-primary"></i> Future Health Risk Analysis
            </h2>
            <div className="space-y-6">
                {risks.map((risk, index) => <RiskCard key={index} risk={risk} />)}
            </div>
        </div>
    );
};

export default HealthRiskPredictor;