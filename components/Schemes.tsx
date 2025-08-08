import React from 'react';
import { GovernmentScheme } from '../types';

interface SchemesProps {
  schemes: GovernmentScheme[];
}

const SchemeCard: React.FC<{ scheme: GovernmentScheme }> = ({ scheme }) => (
    <div className="bg-primary-light p-5 rounded-xl border-l-4 border-primary-dark">
        <h3 className="text-xl font-bold text-primary-dark">{scheme.name}</h3>
        <p className="text-text-secondary my-2">{scheme.description}</p>
        
        <div className="mt-4 space-y-3">
            <div>
                <h4 className="font-semibold text-text-primary mb-1">Benefits:</h4>
                <ul className="list-disc list-inside text-text-secondary space-y-1">
                    {scheme.benefits.map((benefit, i) => <li key={i}>{benefit}</li>)}
                </ul>
            </div>
            <div>
                <h4 className="font-semibold text-text-primary mb-1">Eligibility:</h4>
                 <ul className="list-disc list-inside text-text-secondary space-y-1">
                    {scheme.eligibility.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
            </div>
        </div>
        
        <div className="mt-5">
            <a 
                href={scheme.applicationLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center bg-primary text-white font-semibold py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors"
            >
                Learn More & Apply <i className="fas fa-external-link-alt ml-2"></i>
            </a>
        </div>
    </div>
);


const Schemes: React.FC<SchemesProps> = ({ schemes }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold text-text-primary mb-4 flex items-center"><i className="fas fa-landmark mr-3 text-primary"></i> Government Schemes</h2>
      <div className="space-y-6">
        {schemes.map((scheme, index) => <SchemeCard key={index} scheme={scheme} />)}
      </div>
    </div>
  );
};

export default Schemes;
