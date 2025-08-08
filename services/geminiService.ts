import { GoogleGenAI, Type } from "@google/genai";
import { MedicalReportAnalysis, Recommendation, GovernmentScheme, ChatMessage, HealthRiskPrediction } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const reportAnalysisSchema = {
    type: Type.OBJECT,
    properties: {
        reportType: { type: Type.STRING, description: 'Category of the report, e.g., Blood Test, Urine Test, Scan.' },
        summary: { type: Type.STRING, description: 'A brief, easy-to-understand summary of the medical report findings for a patient.' },
        parameters: {
            type: Type.ARRAY,
            description: 'List of key medical parameters from the report.',
            items: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING, description: 'Name of the parameter, e.g., Hemoglobin.' },
                    value: { type: Type.STRING, description: 'Measured value of the parameter.' },
                    unit: { type: Type.STRING, description: 'Unit of measurement, e.g., g/dL.' },
                    status: { type: Type.STRING, description: 'Status of the value (Normal, Low, High, Borderline, Concerning).' },
                    referenceRange: { type: Type.STRING, description: 'The normal reference range for this parameter.' },
                },
                required: ['name', 'value', 'unit', 'status', 'referenceRange']
            }
        },
        timelineTrend: { type: Type.STRING, description: 'Analysis of trends over time if previous data is available. e.g., "Hemoglobin is dropping in the last 3 reports". If no past data, state that.' },
        mostImproving: { type: Type.STRING, description: 'The single most positive or improving health parameter. Null if not applicable.' },
        mostConcerning: { type: Type.STRING, description: 'The single most concerning health parameter that needs attention. Null if not applicable.' },
    },
    required: ['reportType', 'summary', 'parameters', 'timelineTrend', 'mostImproving', 'mostConcerning']
};

export const analyzeMedicalReport = async (input: { text?: string, file?: { mimeType: string, data: string } }): Promise<MedicalReportAnalysis> => {
    try {
        const prompt = `Analyze the following medical report content from the provided text or file. Extract key parameters, provide a simple summary, and identify trends. The user is a patient, so explain in simple terms.`;

        let contents;

        if (input.file) {
            const filePart = {
                inlineData: {
                    mimeType: input.file.mimeType,
                    data: input.file.data,
                }
            };
            const textPart = { text: prompt };
            contents = { parts: [textPart, filePart] };
        } else if (input.text) {
            contents = `${prompt}\n\nReport Content:\n${input.text}`;
        } else {
            throw new Error('No report text or file provided to analyze.');
        }

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents,
            config: {
                responseMimeType: 'application/json',
                responseSchema: reportAnalysisSchema,
            },
        });

        const jsonText = response.text.trim();
        return JSON.parse(jsonText) as MedicalReportAnalysis;
    } catch (error) {
        console.error('Error analyzing medical report:', error);
        throw new Error('Failed to analyze medical report with Gemini API.');
    }
};


const recommendationsSchema = {
    type: Type.ARRAY,
    items: {
        type: Type.OBJECT,
        properties: {
            title: { type: Type.STRING, description: 'Catchy title for the recommendation, e.g., "Boost Your Iron".' },
            category: { type: Type.STRING, description: 'Category: Diet or Lifestyle.' },
            suggestion: { type: Type.STRING, description: 'Specific, actionable suggestion. Include Indian dietary options where applicable.' },
            reasoning: { type: Type.STRING, description: 'The scientific or medical reasoning behind the suggestion, explained simply.' }
        },
        required: ['title', 'category', 'suggestion', 'reasoning']
    }
};


export const getHealthRecommendations = async (healthConcerns: string[]): Promise<Recommendation[]> => {
    try {
        const prompt = `Based on the following health concerns: ${healthConcerns.join(', ')}, provide a list of personalized diet and lifestyle recommendations. Focus on organic, natural options and include Indian dietary choices where relevant. Explain the science behind each suggestion in a simple way.`;
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: 'application/json',
                responseSchema: recommendationsSchema
            },
        });
        
        const jsonText = response.text.trim();
        return JSON.parse(jsonText) as Recommendation[];
    } catch (error) {
        console.error('Error getting health recommendations:', error);
        throw new Error('Failed to get health recommendations from Gemini API.');
    }
};

const schemesSchema = {
    type: Type.ARRAY,
    items: {
        type: Type.OBJECT,
        properties: {
            name: { type: Type.STRING, description: "Name of the Indian government health scheme." },
            description: { type: Type.STRING, description: "Brief description of the scheme." },
            eligibility: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Key eligibility criteria." },
            benefits: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Key benefits provided by the scheme." },
            applicationLink: { type: Type.STRING, description: "Official link to apply or learn more." }
        },
        required: ['name', 'description', 'eligibility', 'benefits', 'applicationLink']
    }
};

export const findGovernmentSchemes = async (healthCondition: string): Promise<GovernmentScheme[]> => {
    try {
        const prompt = `Find relevant Indian government health schemes for a patient with the following condition: ${healthCondition}. Provide details on eligibility, benefits, and how to apply.`;
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: 'application/json',
                responseSchema: schemesSchema
            },
        });

        const jsonText = response.text.trim();
        return JSON.parse(jsonText) as GovernmentScheme[];
    } catch (error) {
        console.error('Error finding government schemes:', error);
        throw new Error('Failed to find government schemes with Gemini API.');
    }
};

const healthRiskPredictionSchema = {
    type: Type.ARRAY,
    items: {
        type: Type.OBJECT,
        properties: {
            riskName: { type: Type.STRING, description: "Name of the potential health risk, e.g., 'Risk of Iron Deficiency Anemia'." },
            riskLevel: { type: Type.STRING, description: "The assessed level of risk: High, Moderate, or Low." },
            reasoning: { type: Type.STRING, description: "Explanation for why this risk is predicted, based on the provided data." },
            preventiveRecommendations: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "A list of actionable preventive recommendations to mitigate this risk."
            },
            alert: { type: Type.STRING, description: "A clear alert message for the user, suggesting when to consult a doctor." }
        },
        required: ['riskName', 'riskLevel', 'reasoning', 'preventiveRecommendations', 'alert']
    }
};

export const predictHealthRisks = async (analysis: MedicalReportAnalysis): Promise<HealthRiskPrediction[]> => {
    try {
        const prompt = `Based on the following medical report analysis, predict potential future health risks. For each identified risk, provide a risk level (High, Moderate, Low), the reasoning based on the data, a list of specific preventive recommendations, and a concise alert for a potential doctor visit.

        Medical Report Analysis:
        - Summary: ${analysis.summary}
        - Most Concerning Parameter: ${analysis.mostConcerning || 'None'}
        - Timeline Trend: ${analysis.timelineTrend}
        - Key Parameters: ${analysis.parameters.map(p => `${p.name}: ${p.value} ${p.unit} (${p.status})`).join(', ')}
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: 'application/json',
                responseSchema: healthRiskPredictionSchema,
            },
        });

        const jsonText = response.text.trim();
        return JSON.parse(jsonText) as HealthRiskPrediction[];
    } catch (error) {
        console.error('Error predicting health risks:', error);
        throw new Error('Failed to predict health risks with Gemini API.');
    }
};


export const getChatbotResponse = async (history: ChatMessage[]): Promise<string> => {
    try {
        // The history for the chat model should not include the latest message, which is the prompt.
        const modelHistory = history.slice(0, -1).map(msg => ({
            role: msg.sender === 'user' ? 'user' : 'model',
            parts: [{ text: msg.text }]
        }));

        const lastMessage = history[history.length - 1];
        if (!lastMessage || lastMessage.sender !== 'user') {
             throw new Error("The last message in the history must be from the user.");
        }
        
        const chat = ai.chats.create({
            model: 'gemini-2.5-flash',
            history: modelHistory,
            config: {
                systemInstruction: 'You are a friendly and knowledgeable health assistant named "Smart Health Companion". Your role is to provide helpful, safe, and general health information based on user queries. You should never provide a medical diagnosis or prescribe medication. Always advise users to consult with a qualified healthcare professional for personal medical advice. Your answers should be clear, concise, and easy for a non-medical person to understand. When presenting information in a list format, use bold headings for each item followed by the explanation on a new line. Use markdown for bolding (e.g., `**My Heading**`). Do not use bullet points like `*` or `-`. Separate each item with a blank line.',
            }
        });
        
        const response = await chat.sendMessage({ message: lastMessage.text });
        
        return response.text;

    } catch (error) {
        console.error('Error getting chatbot response:', error);
        throw new Error('Failed to get response from Health Chatbot.');
    }
};