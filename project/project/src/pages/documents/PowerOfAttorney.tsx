import React, { useState, useRef } from "react";
import jsPDF from "jspdf";
import SignatureCanvas from "react-signature-canvas";
import { Shield } from "lucide-react";
import { format } from "date-fns";
import { useTheme } from "../../context/ThemeContext";
import "tailwindcss/tailwind.css";

const PowerOfAttorneyForm: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState({
    jurisdiction: "",
    date: format(new Date(), "yyyy-MM-dd"),
    principal: "",
    principal_address: "",
    attorney: "",
    attorney_address: "",
    witness1_name: "",
    witness1_address: "",
    witness2_name: "",
    witness2_address: "",
  });

  const sigPads = {
    principal: useRef<SignatureCanvas | null>(null),
    attorney: useRef<SignatureCanvas | null>(null),
    witness1: useRef<SignatureCanvas | null>(null),
    witness2: useRef<SignatureCanvas | null>(null),
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const generatePDF = () => {
    const pdf = new jsPDF();
    pdf.setFontSize(16);
    pdf.text("POWER OF ATTORNEY", 50, 20);
    pdf.setFontSize(12);

    const poaText = `
    POWER OF ATTORNEY

    JURISDICTION: ${formData.jurisdiction.toUpperCase()}

    This Power of Attorney is executed on ${formData.date}, by ${formData.principal.toUpperCase()}, residing at ${formData.principal_address.toUpperCase()} (hereinafter referred to as the "Principal").
    The Principal hereby appoints ${formData.attorney.toUpperCase()}, residing at ${formData.attorney_address.toUpperCase()} (hereinafter referred to as the "Attorney-in-Fact"), to act on behalf of the Principal in matters specified below.

    --------------------------------------------------------------------

    1. AUTHORITY GRANTED
    The Attorney-in-Fact shall have the full authority to act on behalf of the Principal, including but not limited to the following powers:
    - Managing financial and banking transactions
    - Representing the Principal in legal matters
    - Buying, selling, and managing real estate and other assets
    - Signing contracts and legal documents on behalf of the Principal
    - Making business-related decisions
    The Attorney-in-Fact shall act in the best interests of the Principal and adhere to all applicable laws and regulations.

    --------------------------------------------------------------------

    2. DURATION OF POWER
    This Power of Attorney shall remain valid UNTIL REVOKED IN WRITING by the Principal. Any revocation must be formally documented and communicated to the Attorney-in-Fact and relevant authorities.
      --------------------------------------------------------------------
      3. RESTRICTIONS & LIMITATIONS
    The Attorney-in-Fact is prohibited from:
    - Transferring or gifting the Principal’s property without explicit consent
    - Delegating authority to another person unless expressly authorized
    - Using the Principal’s assets for personal gain

    --------------------------------------------------------------------

    4. ACCEPTANCE OF ATTORNEY-IN-FACT
    The Attorney-in-Fact, ${formData.attorney.toUpperCase()}, acknowledges and accepts the responsibilities and obligations under this Power of Attorney. The Attorney-in-Fact agrees to act faithfully and in the best interests of the Principal.
    
    --------------------------------------------------------------------
    
    5. WITNESSES
    This Power of Attorney is signed and executed in the presence of the following witnesses:

    Witness 1:
    - NAME: ${formData.witness1_name.toUpperCase()}
    - ADDRESS: ${formData.witness1_address.toUpperCase()}
    
    Witness 2:
    - NAME: ${formData.witness2_name.toUpperCase()}
    - ADDRESS: ${formData.witness2_address.toUpperCase()}
  

    --------------------------------------------------------------------

    6. SIGNATURES & ACKNOWLEDGEMENT
    By signing below, the parties affirm that they have read and understood this document and agree to its terms.

    PRINCIPAL: _________________
    NAME: ${formData.principal.toUpperCase()}

    ATTORNEY-IN-FACT: _________________
    NAME: ${formData.attorney.toUpperCase()}

    DATE: ${formData.date}

    --------------------------------------------------------------------

    7. NOTARIZATION (IF REQUIRED)
    This document may be notarized for added legal validity.`;

    pdf.text(pdf.splitTextToSize(poaText, 180), 10, 30);
    pdf.addPage();
    pdf.text("Page 2 - Signatures & Acknowledgements", 50, 20);

    const addSignature = (name: string, title: string, y: number, sigPadRef: React.RefObject<SignatureCanvas>) => {
      pdf.text(`${title}:`, 10, y);
      pdf.text(`NAME: ${name.toUpperCase()}`, 10, y + 10);
      if (sigPadRef.current) {
        const imgData = sigPadRef.current.getTrimmedCanvas().toDataURL("image/png");
        pdf.addImage(imgData, "PNG", 10, y + 20, 50, 20);
      }
    };

    addSignature(formData.principal, "PRINCIPAL", 50, sigPads.principal);
    addSignature(formData.attorney, "ATTORNEY-IN-FACT", 100, sigPads.attorney);
    addSignature(formData.witness1_name, "WITNESS 1", 150, sigPads.witness1);
    addSignature(formData.witness2_name, "WITNESS 2", 200, sigPads.witness2);

    pdf.save("Power_of_Attorney.pdf");
  };

  return (
    <div className="flex flex-col items-center p-5 bg-gray-100 min-h-screen">
      <div className="w-full max-w-2xl bg-white p-5 rounded-lg shadow-md">
        <div className="flex items-center mb-4">
          <Shield className="w-8 h-8 text-red-500 mr-3" />
          <h2 className="text-xl font-bold">Power of Attorney Form</h2>
        </div>

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

        {Object.entries(sigPads).map(([key, ref]) => (
          <div key={key} className="mt-4">
            <p className="text-sm font-bold capitalize">{key.replace("_", " ")} Signature:</p>
            <SignatureCanvas
              ref={ref}
              penColor="black"
              canvasProps={{ width: 300, height: 100, className: "border" }}
            />
          </div>
        ))}

        <button
          className="mt-4 w-full bg-blue-500 text-white p-2 rounded"
          onClick={generatePDF}
        >
          Generate PDF
        </button>
      </div>
    </div>
  );
};

export default PowerOfAttorneyForm;