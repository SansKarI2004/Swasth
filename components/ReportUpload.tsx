import React, { useState, useRef } from 'react';

interface ReportUploadProps {
  onSubmit: (data: { text?: string; file?: { mimeType: string; data: string } }) => void;
  isLoading: boolean;
}

const ReportUpload: React.FC<ReportUploadProps> = ({ onSubmit, isLoading }) => {
  const [reportText, setReportText] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
        setFile(selectedFile);
        setReportText('');
    }
  };
  
  const handleClearFile = () => {
    setFile(null);
    if(fileInputRef.current) {
        fileInputRef.current.value = "";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        const base64Data = dataUrl.substring(dataUrl.indexOf(',') + 1);
        onSubmit({ file: { mimeType: file.type, data: base64Data } });
      };
      reader.readAsDataURL(file);
    } else if (reportText.trim()) {
      onSubmit({ text: reportText });
    }
  };
  
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-xl font-bold text-text-primary mb-4">Analyze New Report</h2>
      <p className="text-text-secondary mb-4">Upload a file (PDF, JPG) or paste the text from your report to get an instant analysis.</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="report-text" className="block text-sm font-medium text-text-secondary mb-2">Paste Report Text</label>
          <textarea
            id="report-text"
            rows={8}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition disabled:bg-gray-100"
            placeholder="e.g., Hemoglobin: 11.2 g/dL, Platelet Count: 250,000..."
            value={reportText}
            onChange={(e) => {
                setReportText(e.target.value);
                if (file) handleClearFile();
            }}
            disabled={isLoading || !!file}
          />
        </div>

        {file && (
          <div className="mb-4 p-3 bg-primary-light rounded-lg flex items-center justify-between text-sm">
            <div className="flex items-center space-x-3 overflow-hidden">
                <i className="fas fa-file-alt text-primary flex-shrink-0"></i>
                <span className="font-medium text-text-primary truncate">{file.name}</span>
            </div>
            <button type="button" onClick={handleClearFile} disabled={isLoading} className="text-red-500 hover:text-red-700 disabled:opacity-50 flex-shrink-0 ml-2">
                <i className="fas fa-times-circle"></i>
            </button>
          </div>
        )}

        <div className="flex items-center justify-between space-x-4">
          <div className="flex-1">
             <label htmlFor="file-upload" className={`w-full cursor-pointer bg-primary-light text-primary font-semibold py-3 px-4 rounded-lg inline-flex items-center justify-center hover:bg-primary hover:text-white transition-colors ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                <i className="fas fa-upload mr-2"></i>
                <span>{file ? 'Change File' : 'Upload File'}</span>
             </label>
             <input ref={fileInputRef} id="file-upload" type="file" className="hidden" onChange={handleFileChange} accept=".pdf,.jpg,.jpeg,.png" disabled={isLoading}/>
          </div>
          <button
            type="submit"
            disabled={isLoading || (!reportText.trim() && !file)}
            className="flex-1 bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-primary-dark transition-all disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? <><i className="fas fa-spinner fa-spin mr-2"></i> Analyzing...</> : <><i className="fas fa-bolt mr-2"></i> Get Analysis</>}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReportUpload;