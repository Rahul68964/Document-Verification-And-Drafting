import React, { useState, useRef } from 'react';
import { BookOpen, Download, Trash2, Save } from 'lucide-react';
import SignatureCanvas from 'react-signature-canvas';
import { jsPDF } from 'jspdf';
import { format } from 'date-fns';
import { useTheme } from '../../context/ThemeContext';

const WillTestament: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [willType, setWillType] = useState('Simple Will');
  const [form, setForm] = useState({
    name: '',
    address: '',
    executor: '',
    beneficiary: '',
    asset: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    guardian: '',
    trustee: '',
    spouseName: '',
    medicalAgent: '',
    organDonation: '',
    statement: ''
  });

  const sigCanvas = useRef<SignatureCanvas>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'willType') {
      setWillType(value);
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const generatePDF = async () => {
    setIsSaving(true);
    try {
      const doc = new jsPDF();
      
      // Header
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(20);
      doc.text('LAST WILL & TESTAMENT', 105, 20, { align: 'center' });
      
      // Content
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');

      let content = '';
      switch (willType) {
        case 'Simple Will':
          content = `I, ${form.name}, declare that my estate shall be distributed as follows:\n\n` +
                   `- Executor: ${form.executor}\n` +
                   `- Beneficiary: ${form.beneficiary} will receive ${form.asset}.\n` +
                   `- Guardian: ${form.guardian} (if applicable)`;
          break;

        case 'Living Will':
          content = `I, ${form.name}, declare that in the event of incapacitation:\n\n` +
                   `- Medical Agent: ${form.medicalAgent}\n` +
                   `- Organ Donation: ${form.organDonation}`;
          break;

        case 'Joint Will':
          content = `We, ${form.name} and ${form.spouseName}, declare that:\n\n` +
                   `- Upon one's passing, the surviving spouse inherits the estate.\n` +
                   `- Executor: ${form.executor}\n` +
                   `- Beneficiary: ${form.beneficiary}`;
          break;

        case 'Testamentary Trust Will':
          content = `I, ${form.name}, establish a trust for:\n\n` +
                   `- Trustee: ${form.trustee}\n` +
                   `- Beneficiaries: ${form.beneficiary}\n` +
                   `- Assets: ${form.asset}`;
          break;

        case 'Holographic Will':
          content = `I, ${form.name}, in my handwriting state:\n\n${form.statement}`;
          break;
      }

      // Basic information
      doc.text(`Name: ${form.name}`, 20, 40);
      doc.text(`Address: ${form.address}`, 20, 50);
      doc.text(`Date: ${form.date}`, 20, 60);

      // Will content
      const contentLines = doc.splitTextToSize(content, 170);
      doc.text(contentLines, 20, 80);

      // Signature
      if (sigCanvas.current && !sigCanvas.current.isEmpty()) {
        const signatureImage = sigCanvas.current.toDataURL('image/png');
        doc.addImage(signatureImage, 'PNG', 20, 200, 50, 20);
        doc.text(`Signed Date: ${form.date}`, 20, 230);
      }

      doc.save('Will_Testament.pdf');
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
          <BookOpen className="w-8 h-8 text-amber-500 mr-3" />
          <h1 className="text-3xl font-bold">Will & Testament</h1>
        </div>

        <div className={`rounded-xl shadow-lg p-8 ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Will Type</label>
              <select
                name="willType"
                value={willType}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg border ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300'
                } focus:ring-2 focus:ring-amber-500 focus:border-transparent`}
              >
                <option>Simple Will</option>
                <option>Living Will</option>
                <option>Joint Will</option>
                <option>Testamentary Trust Will</option>
                <option>Holographic Will</option>
              </select>
            </div>

            {['name', 'address', 'executor', 'beneficiary', 'asset', 'guardian', 'trustee', 'spouseName', 'medicalAgent', 'organDonation']
              .filter(field => {
                if (willType === 'Living Will' && ['executor', 'guardian', 'trustee', 'spouseName'].includes(field)) return false;
                if (willType === 'Joint Will' && ['guardian', 'trustee', 'medicalAgent', 'organDonation'].includes(field)) return false;
                if (willType === 'Testamentary Trust Will' && ['executor', 'medicalAgent', 'organDonation', 'spouseName'].includes(field)) return false;
                if (willType === 'Holographic Will' && field !== 'name' && field !== 'address') return false;
                return true;
              })
              .map((field) => (
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
                    } focus:ring-2 focus:ring-amber-500 focus:border-transparent`}
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
                } focus:ring-2 focus:ring-amber-500 focus:border-transparent`}
              />
            </div>

            {willType === 'Holographic Will' && (
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Statement</label>
                <textarea
                  name="statement"
                  value={form.statement}
                  onChange={handleChange}
                  rows={6}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300'
                  } focus:ring-2 focus:ring-amber-500 focus:border-transparent`}
                  placeholder="Enter your will statement"
                />
              </div>
            )}

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
                  : 'bg-amber-600 hover:bg-amber-700'
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

export default WillTestament;