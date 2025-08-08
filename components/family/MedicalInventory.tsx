import React, { useState } from 'react';
import { MedicalDocument } from '../../types';

interface MedicalInventoryProps {
  documents: MedicalDocument[];
  memberName: string;
}

const getDocIcon = (type: MedicalDocument['type']) => {
    switch(type) {
        case 'Lab Report': return 'fa-vials text-purple-500';
        case 'Prescription': return 'fa-file-prescription text-blue-500';
        case 'Test Result': return 'fa-file-medical-alt text-red-500';
        case 'Doctor Note': return 'fa-notes-medical text-green-500';
        case 'Invoice': return 'fa-file-invoice-dollar text-orange-500';
        default: return 'fa-file-alt text-gray-500';
    }
}

const MedicalInventory: React.FC<MedicalInventoryProps> = ({ documents, memberName }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const filteredDocs = documents.filter(doc =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.type.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a,b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime());

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md h-full flex flex-col">
      <h3 className="text-xl font-bold text-text-primary mb-4">{memberName}'s Medical Inventory</h3>
      
      <div className="relative mb-4">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <i className="fas fa-search text-gray-400"></i>
        </span>
        <input 
            type="text" 
            placeholder="Search documents..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full p-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition"
        />
      </div>

      <button className="w-full mb-4 bg-primary text-white font-semibold py-2.5 px-4 rounded-lg hover:bg-primary-dark transition-colors">
        <i className="fas fa-upload mr-2"></i>Upload Document
      </button>

      <div className="flex-grow mt-2 space-y-3 overflow-y-auto pr-2 -mr-2" style={{maxHeight: '450px'}}>
        {filteredDocs.length > 0 ? filteredDocs.map(doc => (
          <div key={doc.id} className="bg-gray-50 p-3 rounded-lg flex items-center justify-between hover:bg-gray-100 transition-colors">
            <div className="flex items-center space-x-3 overflow-hidden">
                <i className={`fas ${getDocIcon(doc.type)} text-xl w-6 text-center`}></i>
                <div className="overflow-hidden">
                    <p className="font-semibold text-text-primary truncate">{doc.name}</p>
                    <p className="text-sm text-text-secondary">{doc.type} - {new Date(doc.uploadDate).toLocaleDateString()}</p>
                </div>
            </div>
            <div className="space-x-1 flex-shrink-0 ml-2">
                <button aria-label="View document" className="text-text-secondary hover:text-primary w-8 h-8 rounded-full hover:bg-primary-light transition"><i className="fas fa-eye"></i></button>
                <button aria-label="Delete document" className="text-text-secondary hover:text-red-500 w-8 h-8 rounded-full hover:bg-red-100 transition"><i className="fas fa-trash"></i></button>
            </div>
          </div>
        )) : (
            <div className="text-center text-text-secondary pt-10">
                <p>No documents found{searchTerm && ' for your search'}.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default MedicalInventory;