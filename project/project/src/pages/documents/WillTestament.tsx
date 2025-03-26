import React, { useState, useRef } from "react";
import jsPDF from "jspdf";
import SignatureCanvas from "react-signature-canvas";
import { Shield } from "lucide-react";
import { format } from "date-fns";
import "tailwindcss/tailwind.css";

interface Beneficiary {
  name: string;
  asset: string;
}

const WillDocument: React.FC = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    address: "",
    jurisdiction: "",
    executor_name: "",
    alternate_executor: "",
    witness1_name: "",
    witness1_address: "",
    witness2_name: "",
    witness2_address: "",
    funeral_wishes: "",
    special_requests: "",
    beneficiaries: [] as Beneficiary[],
    date: format(new Date(), "yyyy-MM-dd"),
  });

  const sigPads = {
    testator: useRef<SignatureCanvas | null>(null),
    executor: useRef<SignatureCanvas | null>(null),
    witness1: useRef<SignatureCanvas | null>(null),
    witness2: useRef<SignatureCanvas | null>(null),
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleBeneficiaryChange = (index: number, field: keyof Beneficiary, value: string) => {
    setFormData((prevData) => {
      const updatedBeneficiaries = [...prevData.beneficiaries];

      if (!updatedBeneficiaries[index]) {
        updatedBeneficiaries[index] = { name: "", asset: "" };
      }

      updatedBeneficiaries[index] = { ...updatedBeneficiaries[index], [field]: value };

      return { ...prevData, beneficiaries: updatedBeneficiaries };
    });
  };

  const addBeneficiary = () => {
    setFormData((prevData) => ({
      ...prevData,
      beneficiaries: [...prevData.beneficiaries, { name: "", asset: "" }],
    }));
  };

  const generatePDF = () => {
    const pdf = new jsPDF();
    pdf.setFontSize(16);
    pdf.text("LAST WILL AND TESTAMENT", 50, 20);
    pdf.setFontSize(12);

    let beneficiaryText = "";
    formData.beneficiaries.forEach((ben) => {
      beneficiaryText += `- ${ben.name.toUpperCase()} receives ${ben.asset}\n`;
    });

    const willText = `
    LAST WILL AND TESTAMENT

    I, ${formData.full_name.toUpperCase()}, residing at ${formData.address.toUpperCase()}, in ${formData.jurisdiction.toUpperCase()}, being of sound mind, declare this to be my Last Will and Testament.

    1. Executor Appointment
    I appoint ${formData.executor_name.toUpperCase()} as my Executor. If they are unable or unwilling to serve, ${formData.alternate_executor.toUpperCase()} will act as alternate Executor.

    2. Beneficiaries and Asset Distribution
    ${beneficiaryText || "No specific beneficiaries listed."}

    3. Additional Provisions
    - Funeral Wishes: ${formData.funeral_wishes || "None"}
    - Special Instructions: ${formData.special_requests || "None"}

    4. Signatures & Witnesses
    Signed on this ${formData.date}.
    `;

    pdf.text(pdf.splitTextToSize(willText, 180), 10, 30);
    // pdf.text("Signatures", 80, 90);

    const addSignature = (title: string, x: number, y: number, sigPadRef: React.RefObject<SignatureCanvas>) => {
      pdf.text(`${title}:`, x, y);
      if (sigPadRef.current && !sigPadRef.current.isEmpty()) {
        const imgData = sigPadRef.current.getTrimmedCanvas().toDataURL("image/png");
        pdf.addImage(imgData, "PNG", x, y + 10, 50, 20);
      } else {
        pdf.text("No signature provided", x, y + 10);
      }
    };

    addSignature("TESTATOR", 10, 130, sigPads.testator);
    addSignature("EXECUTOR", 110, 130, sigPads.executor);
    addSignature("WITNESS 1", 10, 180, sigPads.witness1);
    addSignature("WITNESS 2", 110, 180, sigPads.witness2);

    pdf.save("Last_Will_and_Testament.pdf");
  };

  return (
    <div className="flex flex-col items-center p-5 bg-gray-100 min-h-screen">
      <div className="w-full max-w-2xl bg-white p-5 rounded-lg shadow-md">
        <div className="flex items-center mb-4">
          <Shield className="w-8 h-8 text-red-500 mr-3" />
          <h2 className="text-xl font-bold">Last Will and Testament</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(formData).map(([key, value]) =>
            key !== "beneficiaries" ? (
              <input
                key={key}
                name={key}
                value={value as string}
                placeholder={key.replace(/_/g, " ")}
                className="p-2 border rounded"
                onChange={handleChange}
              />
            ) : null
          )}
        </div>

        <div className="mt-4">
          <h3 className="font-bold">Beneficiaries</h3>
          {formData.beneficiaries.map((ben, index) => (
            <div key={index} className="flex gap-2 mt-2">
              <input
                type="text"
                placeholder="Beneficiary Name"
                className="p-2 border rounded"
                value={ben.name}
                onChange={(e) => handleBeneficiaryChange(index, "name", e.target.value)}
              />
              <input
                type="text"
                placeholder="Asset/Percentage"
                className="p-2 border rounded"
                value={ben.asset}
                onChange={(e) => handleBeneficiaryChange(index, "asset", e.target.value)}
              />
            </div>
          ))}
          <button className="mt-2 bg-green-500 text-white p-2 rounded" onClick={addBeneficiary}>
            Add Beneficiary
          </button>
        </div>

        <div className="mt-4">
          <h3 className="font-bold">Signatures</h3>
          {Object.keys(sigPads).map((role) => (
            <div key={role} className="mt-2">
              <p className="font-semibold">{role.toUpperCase()}</p>
              <SignatureCanvas
                ref={sigPads[role]}
                penColor="black"
                canvasProps={{ width: 300, height: 100, className: "border p-1" }}
              />
              <button className="mt-2 bg-red-500 text-white p-1 rounded" onClick={() => sigPads[role].current?.clear()}>
                Clear
              </button>
            </div>
          ))}
        </div>

        <button className="mt-4 w-full bg-blue-500 text-white p-2 rounded" onClick={generatePDF}>
          Generate PDF
        </button>
      </div>
    </div>
  );
};

export default WillDocument;