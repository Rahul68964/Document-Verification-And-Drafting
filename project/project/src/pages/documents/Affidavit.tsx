import React, { useState, useRef } from 'react';
import { FileCheck, Download, Trash2, Save } from 'lucide-react';
import SignatureCanvas from 'react-signature-canvas';
import { jsPDF } from 'jspdf';
import { format } from 'date-fns';
import { useTheme } from '../../context/ThemeContext';

const Affidavit: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [form, setForm] = useState({
    state: '',
    country: '',
    court: '',
    caseNumber: '',
    plaintiff: '',
    defendant: '',
    name: '',
    address: '',
    statement1: '',
    statement2: '',
    statement3: '',
    date: format(new Date(), 'yyyy-MM-dd')
  });

  const sigCanvas = useRef<SignatureCanvas>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const generatePDF = async () => {
    setIsSaving(true);
    try {
      const doc = new jsPDF();
      
      // Header
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(20);
      doc.text('AFFIDAVIT', 105, 20, { align: 'center' });
      
      // Content
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      
      const content = [
        `STATE OF: ${form.state}`,
        `COUNTRY OF: ${form.country}`,
        `COURT AND JURISDICTION: ${form.court}`,
        `Case Number: ${form.caseNumber}`,
        `${form.plaintiff} ('Plaintiff') v ${form.defendant} ('Defendant')`,
        `\nI, ${form.name}, of ${form.address}, do hereby swear under oath that:`,
        `\n1. ${form.statement1}`,
        `2. ${form.statement2}`,
        `3. ${form.statement3}`,
        `\nUnder penalty of perjury, I affirm that the above facts are true and correct.`,
        `\nDated: ${form.date}`
      ];

      let y = 40;
      content.forEach(text => {
        const lines = doc.splitTextToSize(text, 170);
        doc.text(lines, 20, y);
        y += 10 * lines.length;
      });

      // Signature
      if (sigCanvas.current && !sigCanvas.current.isEmpty()) {
        doc.text('Signature:', 20, y + 10);
        const signatureImage = sigCanvas.current.toDataURL('image/png');
        doc.addImage(signatureImage, 'PNG', 20, y + 15, 50, 20);
        doc.text(`Printed Name: ${form.name}`, 20, y + 45);
        doc.text(`Date: ${form.date}`, 20, y + 55);
      }

      doc.save('Affidavit.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <FileCheck className="w-8 h-8 text-purple-500 mr-3" />
          <h1 className="text-3xl font-bold">Affidavit</h1>
        </div>

        <div className={`rounded-xl shadow-lg p-8 ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {['state', 'country', 'court', 'caseNumber', 'plaintiff', 'defendant', 'name', 'address'].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium mb-2">
                  {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
                </label>
                <input
                  type="text"
                  name={field}
                  value={form[field as keyof typeof form]}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300'
                  } focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                  placeholder={`Enter ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
                />
              </div>
            ))}

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Date</label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg border ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300'
                } focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
              />
            </div>

            {[1, 2, 3].map((num) => (
              <div key={`statement${num}`} className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Statement {num}</label>
                <textarea
                  name={`statement${num}`}
                  value={form[`statement${num}` as keyof typeof form]}
                  onChange={handleChange}
                  rows={3}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300'
                  } focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                  placeholder={`Enter statement ${num}`}
                />
              </div>
            ))}

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Signature</label>
              <div className={`border-2 rounded-lg ${
                isDarkMode ? 'border-gray-600' : 'border-gray-300'
              }`}>
                <SignatureCanvas
                  ref={sigCanvas}
                  canvasProps={{
                    className: `w-full ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`,
                    style: { height: '150px' }
                  }}
                />
              </div>
              <button
                onClick={() => sigCanvas.current?.clear()}
                className="mt-2 px-4 py-2 text-sm text-red-500 hover:text-red-600 flex items-center"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Clear Signature
              </button>
            </div>
          </div>

          <div className="mt-8 flex justify-end space-x-4">
            <button
              onClick={generatePDF}
              disabled={isSaving}
              className={`px-6 py-3 rounded-lg flex items-center space-x-2 ${
                isSaving
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-purple-600 hover:bg-purple-700'
              } text-white transition-colors duration-200`}
            >
              {isSaving ? (
                <>
                  <Save className="w-5 h-5 animate-spin" />
                  <span>Generating PDF...</span>
                </>
              ) : (
                <>
                  <Download className="w-5 h-5" />
                  <span>Generate PDF</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Affidavit;