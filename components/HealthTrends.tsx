import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { HealthParameter } from '../types';

interface HealthTrendsProps {
  parameters: HealthParameter[];
}

// Mocking historical data for trend visualization
const generateMockHistory = (param: HealthParameter) => {
    const value = parseFloat(param.value);
    if (isNaN(value)) return [];
    
    return [
        { name: 'Mar', value: value * (Math.random() * 0.2 + 0.9) }, // -10% to +10%
        { name: 'Apr', value: value * (Math.random() * 0.2 + 0.95) },
        { name: 'May', value: value * (Math.random() * 0.1 + 1.0) },
        { name: 'Jun', value: value },
    ].map(d => ({...d, value: parseFloat(d.value.toFixed(1))}));
};


const HealthTrends: React.FC<HealthTrendsProps> = ({ parameters }) => {
  // We'll visualize the first few numerical parameters for demonstration
  const numericalParams = parameters.filter(p => !isNaN(parseFloat(p.value))).slice(0, 3);
  
  if (numericalParams.length === 0) {
      return null;
  }
  
  const chartData = numericalParams.map(param => ({
      name: param.name,
      data: generateMockHistory(param)
  }));


  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold text-text-primary mb-6">Health Trends (Last 4 Months)</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {chartData.map(chart => (
            <div key={chart.name}>
                <h3 className="text-center font-semibold text-text-primary mb-2">{chart.name}</h3>
                <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={chart.data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                        <XAxis dataKey="name" stroke="#4A5568" fontSize={12} />
                        <YAxis stroke="#4A5568" fontSize={12} />
                        <Tooltip
                            contentStyle={{
                                background: 'white',
                                border: '1px solid #e0e0e0',
                                borderRadius: '0.5rem',
                            }}
                        />
                        <Legend wrapperStyle={{fontSize: "14px"}} />
                        <Line type="monotone" dataKey="value" stroke="#0062FF" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} name={chart.name} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        ))}
      </div>
    </div>
  );
};

export default HealthTrends;
