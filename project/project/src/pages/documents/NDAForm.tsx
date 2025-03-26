import React, { useState, useRef, Fragment } from "react";
import jsPDF from "jspdf";
import { Dialog, Transition } from "@headlessui/react";
import SignatureCanvas from "react-signature-canvas";
import { Shield, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { useTheme } from "../../context/ThemeContext";
import "tailwindcss/tailwind.css";

const NDAForm: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const [formData, setFormData] = useState({
    jurisdiction: "",
    date: format(new Date(), "yyyy-MM-dd"),
    disclosing_party: "",
    disclosing_address: "",
    receiving_party: "",
    receiving_address: "",
    purpose: "",
    witness1_name: "",
    witness2_name: "",
  });

  // Separate signature references
  const disclosingSigPad = useRef<SignatureCanvas | null>(null);
  const receivingSigPad = useRef<SignatureCanvas | null>(null);
  const witness1SigPad = useRef<SignatureCanvas | null>(null);
  const witness2SigPad = useRef<SignatureCanvas | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const generateNDAContent = () => {
    return `NON-DISCLOSURE AGREEMENT\n\nJURISDICTION: ${formData.jurisdiction}\n\nThis Agreement is made on ${formData.date} between \n${formData.disclosing_party} ("Disclosing Party") residing at ${formData.disclosing_address}\nand\n${formData.receiving_party} ("Receiving Party") residing at ${formData.receiving_address}.\n\n1. PURPOSE\n   The parties wish to disclose confidential information for the purpose of ${formData.purpose}.\n\n2. OBLIGATIONS\n   The Receiving Party shall not disclose confidential information without prior consent.\n\n3. TERM\n   This Agreement shall remain in effect indefinitely unless terminated in writing.\n\n4. SIGNATURES\n   IN WITNESS WHEREOF, the parties have executed this Agreement.\n\n `;
  };

  const generatePDF = () => {
    const pdf = new jsPDF();
    pdf.setFontSize(16);
    pdf.text("NON-DISCLOSURE AGREEMENT", 50, 20);
    pdf.setFontSize(12);

    const ndaText = generateNDAContent();
    const textLines = pdf.splitTextToSize(ndaText, 180);
    pdf.text(textLines, 10, 40);

    // Function to add signature if available
    const addSignature = (sigPadRef: React.RefObject<SignatureCanvas>, label: string, x: number, y: number) => {
      if (sigPadRef.current && !sigPadRef.current.isEmpty()) {
        const signatureImage = sigPadRef.current.toDataURL("image/png");
        
        pdf.addImage(signatureImage, "PNG", x, y, 50, 20); // Signature first
        pdf.text(label, x, y + 25); // Label below the signature
      }
    };
    
    // // Adding signatures
    // addSignature(disclosingSigPad, "Disclosing Party Signature:" , 10, 220);
    // addSignature(receivingSigPad, "Receiving Party Signature:", 110, 220);
    // addSignature(witness1SigPad, "Witness 1 Signature:", 10, 250);
    // addSignature(witness2SigPad, "Witness 2 Signature:", 110, 250);

    addSignature(disclosingSigPad, `Disclosing Party Signature:\n${formData.disclosing_party}`, 10, 150);
addSignature(receivingSigPad, `Receiving Party Signature:\n${formData.receiving_party}`, 110, 150);
addSignature(witness1SigPad, `Witness 1 Signature:\n${formData.witness1_name}`, 10, 180);
addSignature(witness2SigPad, `Witness 2 Signature:\n${formData.witness2_name}`, 110, 180);

        
    pdf.save("NDA_Agreement.pdf");
  };
  disclosingSigPad
  receivingSigPad
  return (
    <div className="flex flex-col items-center p-5 bg-gray-100 min-h-screen">
      <div className="w-full max-w-2xl bg-white p-5 rounded-lg shadow-md">
        <div className="flex items-center mb-4">
          <Shield className="w-8 h-8 text-red-500 mr-3" />
          <h2 className="text-xl font-bold">NDA Form</h2>
        </div>

        {/* Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(formData).map(([key, value]) => (
            <input
              key={key}
              name={key}
              value={value}
              placeholder={key.replace(/_/g, " ")}
              className="p-2 border rounded"
              onChange={handleChange}
            />
          ))}
        </div>

        {/* Signature Canvas Sections */}
        <div className="mt-4">
          <label className="block">Disclosing Party Signature:</label>
          <SignatureCanvas
            ref={disclosingSigPad}
            penColor="black"
            canvasProps={{ className: "border p-2 w-full h-20" }}
          />
          <button onClick={() => disclosingSigPad.current?.clear()} className="mt-2 text-red-500 flex items-center">
            <Trash2 className="w-4 h-4 mr-2" />
            Clear Signature
          </button>
        </div>

        <div className="mt-4">
          <label className="block">Receiving Party Signature:</label>
          <SignatureCanvas
            ref={receivingSigPad}
            penColor="black"
            canvasProps={{ className: "border p-2 w-full h-20" }}
          />
          <button onClick={() => receivingSigPad.current?.clear()} className="mt-2 text-red-500 flex items-center">
            <Trash2 className="w-4 h-4 mr-2" />
            Clear Signature
          </button>
        </div>

        <div className="mt-4">
          <label className="block">Witness 1 Signature:</label>
          <SignatureCanvas
            ref={witness1SigPad}
            penColor="black"
            canvasProps={{ className: "border p-2 w-full h-20" }}
          />
          <button onClick={() => witness1SigPad.current?.clear()} className="mt-2 text-red-500 flex items-center">
            <Trash2 className="w-4 h-4 mr-2" />
            Clear Signature
          </button>
        </div>

        <div className="mt-4">
          <label className="block">Witness 2 Signature:</label>
          <SignatureCanvas
            ref={witness2SigPad}
            penColor="black"
            canvasProps={{ className: "border p-2 w-full h-20" }}
          />
          <button onClick={() => witness2SigPad.current?.clear()} className="mt-2 text-red-500 flex items-center">
            <Trash2 className="w-4 h-4 mr-2" />
            Clear Signature
          </button>
        </div>

        {/* Preview Button */}
        <button className="mt-4 w-full bg-blue-500 text-white p-2 rounded" onClick={() => setIsPreviewOpen(true)}>
          See Preview
        </button>

        {/* Download PDF Button */}
        <button className="mt-4 w-full bg-green-500 text-white p-2 rounded" onClick={generatePDF}>
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default NDAForm;
