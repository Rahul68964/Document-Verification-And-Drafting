import React, { useState, useRef } from "react";
import jsPDF from "jspdf";
import SignatureCanvas from "react-signature-canvas";
import { Home, Download, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { useTheme } from "../../context/ThemeContext";
import "tailwindcss/tailwind.css";

const RentAgreementForm = () => {
  const { isDarkMode } = useTheme();
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
    witness2_name: "",
  });

  const landlordSigPad = useRef(null);
  const tenantSigPad = useRef(null);
  const witness1SigPad = useRef(null);
  const witness2SigPad = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const clearSignature = (sigPad) => {
    if (sigPad.current) sigPad.current.clear();
  };

  const getSignatureData = (sigPad) => {
    return sigPad.current && !sigPad.current.isEmpty()
      ? sigPad.current.toDataURL("image/png")
      : null;
  };

  const handleSubmit = async () => {
    const formDataWithSignatures = {
      landlordName: formData.landlord_name,
      landlordAddress: formData.landlord_address,
      tenantName: formData.tenant_name,
      tenantAddress: formData.tenant_address,
      propertyAddress: formData.property_address,
      rentAmount: formData.rent_amount,
      leaseTerm: formData.lease_term,
      securityDeposit: formData.security_deposit,
      agreementDate: formData.start_date,
      witness1Name: formData.witness1_name,
      witness2Name: formData.witness2_name,
      landlordSignature: getSignatureData(landlordSigPad),
      tenantSignature: getSignatureData(tenantSigPad),
      witness1Signature: getSignatureData(witness1SigPad),
      witness2Signature: getSignatureData(witness2SigPad),
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/draft/rent-agre/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataWithSignatures),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Rent agreement saved successfully!");
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to save rent agreement.");
    }
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
              onClick={() => clearSignature([landlordSigPad, tenantSigPad, witness1SigPad, witness2SigPad][index])}
              className="mt-2 text-red-500 flex items-center"
            >
              <Trash2 className="w-4 h-4 mr-2" />Clear Signature
            </button>
          </div>
        ))}
        <button className="mt-4 w-full bg-blue-500 text-white p-2 rounded" onClick={handleSubmit}>
          Submit Agreement
        </button>
      </div>
    </div>
  );
};

export default RentAgreementForm;