import React, { useState, useCallback } from 'react';
import { MedicalReportAnalysis, Recommendation, GovernmentScheme, EmergencyProfile, ChatMessage, HealthRiskPrediction } from '../types';
import { analyzeMedicalReport, getHealthRecommendations, findGovernmentSchemes, getChatbotResponse, predictHealthRisks } from '../services/geminiService';
import ReportUpload from './ReportUpload';
import ReportView from './ReportView';
import Recommendations from './Recommendations';
import Schemes from './Schemes';
import HealthTrends from './HealthTrends';
import EmergencyCard from './EmergencyCard';
import HealthChatbot from './HealthChatbot';
import Spinner from './common/Spinner';
import HealthRiskPredictor from './HealthRiskPredictor';

const sampleEmergencyProfile: EmergencyProfile = {
    bloodGroup: 'O+',
    allergies: ['Peanuts', 'Penicillin'],
    chronicConditions: ['Hypertension', 'Type 2 Diabetes'],
    emergencyContact: {
        name: 'Jane Doe',
        phone: '+91 98765 43210'
    }
};

const Dashboard: React.FC = () => {
  const [analysis, setAnalysis] = useState<MedicalReportAnalysis | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [schemes, setSchemes] = useState<GovernmentScheme[]>([]);
  const [risks, setRisks] = useState<HealthRiskPrediction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { sender: 'bot', text: "Hello! I'm your AI Health Assistant. How can I help you today? You can ask me about your report, diet, or general health questions." }
  ]);
  const [isChatbotLoading, setIsChatbotLoading] = useState(false);

  const handleReportSubmit = useCallback(async (data: { text?: string; file?: { mimeType: string; data: string } }) => {
    setIsLoading(true);
    setError(null);
    setAnalysis(null);
    setRecommendations([]);
    setSchemes([]);
    setRisks([]);

    try {
      const reportAnalysis = await analyzeMedicalReport(data);
      setAnalysis(reportAnalysis);

      // Fetch supplemental data in parallel
      const [predictedRisks, recs, govSchemes] = await Promise.all([
          predictHealthRisks(reportAnalysis),
          reportAnalysis.mostConcerning ? getHealthRecommendations([reportAnalysis.mostConcerning]) : Promise.resolve([]),
          reportAnalysis.mostConcerning ? findGovernmentSchemes(reportAnalysis.mostConcerning) : Promise.resolve([])
      ]);
      
      setRisks(predictedRisks);
      setRecommendations(recs as Recommendation[]);
      setSchemes(govSchemes as GovernmentScheme[]);

      setChatMessages(prev => [...prev, { sender: 'bot', text: `I've analyzed your report and potential health risks. Feel free to ask me any questions about it!` }]);
    } catch (err) {
      setError('An error occurred while processing your report. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSendMessage = useCallback(async (message: string) => {
    const newMessages: ChatMessage[] = [...chatMessages, { sender: 'user', text: message }];
    setChatMessages(newMessages);
    setIsChatbotLoading(true);

    try {
        const botResponse = await getChatbotResponse(newMessages);
        setChatMessages(prev => [...prev, { sender: 'bot', text: botResponse }]);
    } catch (err) {
        console.error(err);
        setChatMessages(prev => [...prev, { sender: 'bot', text: "I'm sorry, I encountered an error. Please try again." }]);
    } finally {
        setIsChatbotLoading(false);
    }
  }, [chatMessages]);

  return (
    <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
                 <ReportUpload onSubmit={handleReportSubmit} isLoading={isLoading} />
            </div>
            <div className="md:col-span-1">
                <EmergencyCard profile={sampleEmergencyProfile} />
            </div>
        </div>

      {isLoading && <Spinner />}
      {error && <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded" role="alert"><p>{error}</p></div>}
      
      {analysis && (
        <div className="space-y-8">
          <ReportView analysis={analysis} />
          {risks.length > 0 && <HealthRiskPredictor risks={risks} />}
          <HealthTrends parameters={analysis.parameters} />
          {recommendations.length > 0 && <Recommendations recommendations={recommendations} />}
          {schemes.length > 0 && <Schemes schemes={schemes} />}
        </div>
      )}

      <HealthChatbot
        messages={chatMessages}
        onSendMessage={handleSendMessage}
        isLoading={isChatbotLoading}
        analysisSummary={analysis?.summary || null}
      />
    </div>
  );
};

export default Dashboard;