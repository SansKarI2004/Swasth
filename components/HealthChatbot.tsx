import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';

interface HealthChatbotProps {
    messages: ChatMessage[];
    onSendMessage: (message: string) => void;
    isLoading: boolean;
    analysisSummary: string | null;
}

// Helper function to parse basic markdown for bold text
const renderFormattedText = (text: string): React.ReactNode => {
    // Splits the string by bold markdown, keeping the delimiters.
    // e.g., "text **bold** more text" -> ["text ", "**bold**", " more text"]
    const parts = text.split(/(\*\*.*?\*\*)/g);

    return parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            // It's a bold part, remove the asterisks and wrap in <strong>
            return <strong key={index}>{part.substring(2, part.length - 2)}</strong>;
        }
        // It's a normal text part
        return <React.Fragment key={index}>{part}</React.Fragment>;
    });
};


const HealthChatbot: React.FC<HealthChatbotProps> = ({ messages, onSendMessage, isLoading, analysisSummary }) => {
    const [input, setInput] = useState('');
    const messagesEndRef = useRef<null | HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(scrollToBottom, [messages]);

    const handleSend = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (input.trim() && !isLoading) {
            onSendMessage(input.trim());
            setInput('');
        }
    };
    
    const handleSuggestionClick = (suggestion: string) => {
        if (!isLoading) {
            let finalSuggestion = suggestion;
            if (suggestion.includes("[REPORT_SUMMARY]")) {
                finalSuggestion = suggestion.replace("[REPORT_SUMMARY]", `Here is the summary of my report: "${analysisSummary}"`);
            }
            onSendMessage(finalSuggestion);
        }
    }
    
    const suggestions = [
        "Natural ways to improve Vitamin D?",
        "Benefits and side effects of Paracetamol?",
        "How to manage high cholesterol?",
    ];

    if (analysisSummary) {
        suggestions.unshift("Explain my report summary in simpler terms: [REPORT_SUMMARY]");
    }

    return (
        <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col h-[36rem]">
            <h2 className="text-2xl font-bold text-text-primary mb-4 flex items-center">
                <i className="fas fa-comment-medical mr-3 text-primary"></i>
                AI Health Chat
            </h2>
            <div className="flex-grow overflow-y-auto mb-4 p-2 pr-4 bg-background rounded-lg border">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex my-2 w-full ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`rounded-xl p-3 max-w-[85%] sm:max-w-[75%] break-words ${msg.sender === 'user' ? 'bg-primary text-white' : 'bg-gray-200 text-text-primary'}`}>
                            <p className="text-sm whitespace-pre-wrap">
                                {msg.sender === 'bot' ? renderFormattedText(msg.text) : msg.text}
                            </p>
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                         <div className="rounded-xl p-3 bg-gray-200 text-text-primary">
                            <p className="text-sm flex items-center">
                                <span className="animate-pulse mr-1">.</span>
                                <span className="animate-pulse [animation-delay:0.2s] mr-1">.</span>
                                <span className="animate-pulse [animation-delay:0.4s]">.</span>
                                <span className="ml-2 text-xs text-text-secondary">AI is typing...</span>
                            </p>
                         </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>
            
            <div className="mb-4 flex flex-wrap gap-2">
                {suggestions.slice(0, analysisSummary ? 4 : 3).map(s => (
                    <button key={s} onClick={() => handleSuggestionClick(s)} disabled={isLoading} className="px-3 py-1 bg-primary-light text-primary text-xs font-semibold rounded-full hover:bg-primary-dark hover:text-white disabled:opacity-50 transition-colors text-left">
                        {s.split(':')[0]}
                    </button>
                ))}
            </div>

            <form onSubmit={handleSend} className="flex items-center space-x-3">
                <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask a health question..."
                    className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition"
                    disabled={isLoading}
                />
                <button type="submit" disabled={isLoading || !input.trim()} className="bg-primary text-white font-bold w-12 h-12 flex-shrink-0 rounded-lg hover:bg-primary-dark transition-all disabled:bg-gray-400 flex items-center justify-center">
                    <i className="fas fa-paper-plane"></i>
                </button>
            </form>
        </div>
    );
}

export default HealthChatbot;