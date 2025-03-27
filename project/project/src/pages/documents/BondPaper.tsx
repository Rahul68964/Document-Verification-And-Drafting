import React, { useState, useRef, Fragment } from "react";
import jsPDF from "jspdf";
import { Dialog, Transition } from "@headlessui/react";
import SignatureCanvas from "react-signature-canvas";
import { Home, Download, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { useTheme } from "../../context/ThemeContext";
import "tailwindcss/tailwind.css";
import bondImage from "../../components/assets/bond.jpg";

const RentAgreementForm = () => {
  const { isDarkMode } = useTheme();
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [formData, setFormData] = useState({
    landlord_name: "",
    landlord_address: "",
    tenant_name: "",
    tenant_address: "",
    property_address: "",
    rent_amount: "",
    lease_term: "",
    security_deposit: "",
    start_date: format(new Date(), "yyyy-MM-dd"),
    witness1_name: "",
    witness2_name: ""
  });

  const landlordSigPad = useRef(null);
  const tenantSigPad = useRef(null);
  const witness1SigPad = useRef(null);
  const witness2SigPad = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const generatePDF = () => {
    const pdf = new jsPDF();
    const imgWidth = 210;
    const imgHeight = 100;
    pdf.addImage(bondImage, "JPEG", 0, 0, imgWidth, imgHeight);
    pdf.setFontSize(16);
    pdf.text("RENT AGREEMENT", 80, imgHeight + 10);
    pdf.setFontSize(12);
    const agreementText = `RENT AGREEMENT

This Rent Agreement is made on ${formData.start_date} between 
${formData.landlord_name} ("Landlord") residing at ${formData.landlord_address}
and
${formData.tenant_name} ("Tenant") residing at ${formData.tenant_address}.

1. PROPERTY
   The Landlord agrees to rent the property located at ${formData.property_address} to the Tenant.

2. RENT AND SECURITY DEPOSIT
   The Tenant agrees to pay a monthly rent of ${formData.rent_amount} and a security deposit of ${formData.security_deposit}.

3. TERM
   This lease agreement is valid for a period of ${formData.lease_term}.

4. MAINTENANCE AND UTILITIES
   The Tenant is responsible for keeping the property in good condition and will pay for all utilities unless otherwise agreed.

5. RESTRICTIONS
   The Tenant shall not sublet the property, engage in illegal activities, or make modifications without the Landlord’s consent.`;
   pdf.text(agreementText, 10, imgHeight + 20, { maxWidth: 180 });

   const addSignature = (sigPad, label, xPosition, yPosition) => {
    if (sigPad.current && !sigPad.current.isEmpty()) {
      const signatureImage = sigPad.current.toDataURL("image/png");
  
      // Adjusted order: Add signature first, then the label below it
      pdf.addImage(signatureImage, "PNG", xPosition, yPosition, 50, 20);
      pdf.text(label, xPosition, yPosition + 25);
    }
  };
  
  // Adjust Y-coordinates so text is below the signature
  addSignature(landlordSigPad, "Landlord Signature:", 10, imgHeight + 130);
  addSignature(tenantSigPad, "Tenant Signature:", 110, imgHeight + 130);
  addSignature(witness1SigPad, "Witness 1 Signature:", 10, imgHeight + 160);
  addSignature(witness2SigPad, "Witness 2 Signature:", 110, imgHeight + 160);
  
    pdf.save("Rent_Agreement.pdf");
  };

  return (
    <div className="flex flex-col items-center p-5 bg-gray-100 min-h-screen">
      <div className="w-full max-w-2xl bg-white p-5 rounded-lg shadow-md">
        <div className="flex items-center mb-4">
          <Home className="w-8 h-8 text-blue-500 mr-3" />
          <h2 className="text-xl font-bold">Rent Agreement Form</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.keys(formData).map((key) => (
            <input
              key={key}
              name={key}
              value={formData[key]}
              placeholder={key.replace(/_/g, " ")}
              className="p-2 border rounded"
              onChange={handleChange}
            />
          ))}
        </div>
        {["Landlord", "Tenant", "Witness 1", "Witness 2"].map((label, index) => (
          <div key={label} className="mt-4">
            <label className="block">{label} Signature:</label>
            <SignatureCanvas
              ref={[landlordSigPad, tenantSigPad, witness1SigPad, witness2SigPad][index]}
              penColor="black"
              canvasProps={{ className: "border p-2 w-full h-20" }}
            />
            <button
              onClick={() => [landlordSigPad, tenantSigPad, witness1SigPad, witness2SigPad][index].current?.clear()}
              className="mt-2 text-red-500 flex items-center"
            >
              <Trash2 className="w-4 h-4 mr-2" />Clear Signature
            </button>
          </div>
        ))}
        <button className="mt-4 w-full bg-green-500 text-white p-2 rounded" onClick={generatePDF}>
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default RentAgreementForm;