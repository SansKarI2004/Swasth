import React from 'react';
import { MedicalReportAnalysis, HealthParameter } from '../types';

interface ReportViewProps {
  analysis: MedicalReportAnalysis;
}

const getStatusColor = (status: HealthParameter['status']) => {
  switch (status) {
    case 'Low':
    case 'High':
    case 'Concerning':
      return 'text-red-500 bg-red-100';
    case 'Borderline':
      return 'text-yellow-600 bg-yellow-100';
    case 'Normal':
      return 'text-green-600 bg-green-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
};

const ParameterCard: React.FC<{ param: HealthParameter }> = ({ param }) => (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex justify-between items-start">
            <h4 className="font-semibold text-text-primary">{param.name}</h4>
            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getStatusColor(param.status)}`}>{param.status}</span>
        </div>
        <p className="text-2xl font-bold text-primary mt-1">{param.value} <span className="text-lg text-text-secondary font-normal">{param.unit}</span></p>
        <p className="text-sm text-text-secondary mt-1">Ref: {param.referenceRange}</p>
    </div>
);


const ReportView: React.FC<ReportViewProps> = ({ analysis }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md space-y-6">
        <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-text-primary">Report Analysis</h2>
            <span className="font-semibold bg-primary-light text-primary px-3 py-1 rounded-full">{analysis.reportType}</span>
        </div>
      
        {/* Summary Card */}
        <div className="bg-primary-light p-5 rounded-xl border-l-4 border-primary">
            <h3 className="font-bold text-lg text-primary-dark mb-2 flex items-center"><i className="fas fa-file-medical-alt mr-2"></i> AI Summary</h3>
            <p className="text-text-primary">{analysis.summary}</p>
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {analysis.mostConcerning && (
                <div className="bg-red-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-red-700 flex items-center"><i className="fas fa-exclamation-triangle mr-2"></i> Most Concerning</h4>
                    <p className="text-red-900">{analysis.mostConcerning}</p>
                </div>
            )}
            {analysis.mostImproving && (
                 <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-700 flex items-center"><i className="fas fa-chart-line mr-2"></i> Most Improving</h4>
                    <p className="text-green-900">{analysis.mostImproving}</p>
                </div>
            )}
            <div className="bg-gray-100 p-4 rounded-lg md:col-span-2">
                <h4 className="font-semibold text-gray-700 flex items-center"><i className="fas fa-history mr-2"></i> Timeline Trend</h4>
                <p className="text-gray-900">{analysis.timelineTrend}</p>
            </div>
        </div>

        {/* Key Parameters */}
        <div>
            <h3 className="text-xl font-bold text-text-primary mb-4">Key Parameters</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {analysis.parameters.map(param => <ParameterCard key={param.name} param={param} />)}
            </div>
        </div>

    </div>
  );
};

export default ReportView;
