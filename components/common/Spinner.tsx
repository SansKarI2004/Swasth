import React from 'react';

const Spinner: React.FC = () => (
  <div className="flex justify-center items-center p-8">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    <p className="ml-4 text-text-secondary font-semibold">Analyzing your report...</p>
  </div>
);

export default Spinner;
