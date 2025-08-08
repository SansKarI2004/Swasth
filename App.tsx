import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import FamilyDashboard from './components/FamilyDashboard';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'individual' | 'family'>('individual');

  return (
    <div className="bg-background min-h-screen font-sans text-text-primary">
      <div className="container mx-auto max-w-7xl p-4">
        <header className="flex justify-between items-center py-4 mb-6">
          <div className="flex items-center space-x-3">
            <div className="bg-primary rounded-lg p-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" /></svg>
            </div>
            <h1 className="text-2xl font-bold text-text-primary">Smart Health Companion</h1>
          </div>
          <div className="flex items-center space-x-4">
             <div className="relative">
                <i className="fas fa-bell text-text-secondary text-xl"></i>
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
             </div>
             <img src="https://picsum.photos/id/237/200/200" alt="User" className="w-10 h-10 rounded-full"/>
          </div>
        </header>
        
        <nav className="mb-8 -mt-2">
          <div className="flex space-x-1 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('individual')}
              aria-current={activeTab === 'individual' ? 'page' : undefined}
              className={`py-3 px-6 font-semibold text-base transition-colors duration-300 border-b-4 ${activeTab === 'individual' ? 'border-primary text-primary' : 'border-transparent text-text-secondary hover:border-gray-300 hover:text-primary'}`}
            >
              <i className="fas fa-user-robot mr-2"></i> My AI Analysis
            </button>
            <button
              onClick={() => setActiveTab('family')}
              aria-current={activeTab === 'family' ? 'page' : undefined}
              className={`py-3 px-6 font-semibold text-base transition-colors duration-300 border-b-4 ${activeTab === 'family' ? 'border-primary text-primary' : 'border-transparent text-text-secondary hover:border-gray-300 hover:text-primary'}`}
            >
              <i className="fas fa-users mr-2"></i> Family Dashboard
            </button>
          </div>
        </nav>

        <main>
          {activeTab === 'individual' && (
            <div className="max-w-4xl mx-auto">
              <Dashboard />
            </div>
           )}
          {activeTab === 'family' && <FamilyDashboard />}
        </main>
        
        <footer className="text-center text-sm text-text-secondary mt-12 pb-4">
          <p>&copy; 2024 Smart Health Companion. All Rights Reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;