import React, { useState } from "react";
import { Upload, Loader2, XCircle } from "lucide-react";

interface ApiResponse {
  type: string;
  details: string;
}

export default function ElectionCardVerification() {
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    if (event.target.files) {
      const selectedFile = event.target.files[0];
      if (selectedFile.type === "application/pdf") {
        setFile(selectedFile);
        setFileUrl(URL.createObjectURL(selectedFile));
      } else {
        setError("Please upload a valid PDF file.");
      }
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://127.0.0.1:8000/model/upload/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload file");
      }

      const result: ApiResponse = await response.json();
      console.log("API Response:", result);
      setData(result);
      setShowModal(true);
    } catch (error) {
      console.error("Error uploading file:", error);
      setError("An error occurred during upload. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const extractElectionDetails = (details: string): { name: string | null; voterId: string | null; dob: string | null; age: number | null } => {
    const cleanDetails: string = details.replace(/\*/g, ""); // Remove asterisks (*)
  
    let name: string | null = null;
    let voterId: string | null = null;
    let dob: string | null = null;
    let age: number | null = null;
  
    const nameMatch = cleanDetails.match(/Name:\s*([\w\s"]+)/);
    if (nameMatch) {
      name = nameMatch[1].trim().replace(/father/gi, "").replace(/["]+/g, "").trim();
    }
  
    const voterIdMatch = cleanDetails.match(/Identification Number:\s*([\w\d]+)/);
    if (voterIdMatch) {
      voterId = voterIdMatch[1];
    }
  
    const dobMatch = cleanDetails.match(/Date of Birth:\s*(\d{2}-\d{2}-\d{4})/);
    if (dobMatch) {
      dob = dobMatch[1];
  
      // Calculate Age
      const birthYear = parseInt(dob.split("-")[2], 10);
      const currentYear = new Date().getFullYear();
      age = currentYear - birthYear;
    }
  
    return { name, voterId, dob, age };
  };

  const extractedDetails = data && data.type === "Election Card" ? extractElectionDetails(data.details) : null;
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-center text-blue-800">Election Card Verification</h2>

        <div className="mt-6 flex flex-col items-center">
          <input type="file" accept="application/pdf" onChange={handleFileChange} className="hidden" id="file-upload" />
          <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center space-y-3 text-blue-600 hover:text-blue-800">
            <Upload className="w-12 h-12" />
            <span className="font-semibold">{file ? "Change PDF" : "Click to upload Election Card PDF"}</span>
          </label>
          {fileUrl && <iframe src={fileUrl} className="w-full h-[300px] border rounded-lg mt-4" title="PDF Preview"></iframe>}
          <button onClick={handleUpload} disabled={!file || loading} className="mt-4 w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            {loading ? (<><Loader2 className="animate-spin w-5 h-5" /> Processing...</>) : (<>Verify Election Card</>)}
          </button>
        </div>
        {error && <p className="mt-4 text-red-600 font-semibold">{error}</p>}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-blue-800">Verification Result</h3>
                <button onClick={() => setShowModal(false)}><XCircle className="w-6 h-6" /></button>
              </div>
              <div className="mt-4">
                {data?.type === "Election Card" ? (
                  <>
                    <p><strong>Name:</strong> {extractedDetails?.name}</p>
                    <p><strong>Voter ID:</strong> {extractedDetails?.voterId}</p>
                    <p><strong>Date of Birth:</strong> {extractedDetails?.dob}</p>
                    <p><strong>Age:</strong> {extractedDetails?.age}</p>
                  </>
                ) : (
                  <p className="text-lg font-semibold text-red-600 text-center">This is not an Election Card</p>
                )}
              </div>
              <button onClick={() => setShowModal(false)} className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Close</button>
            </div>
          </div>
        )}
        {data?.type !== "Election Card" && <p className="mt-6 p-4 text-lg font-semibold text-red-600 text-center">This is not an Election Card</p>}
        {extractedDetails && (
          <div className="mt-6 p-4 border rounded-lg bg-gray-100 shadow">
            <h3 className="text-lg font-bold text-blue-800">Extracted Details</h3>
            <p><strong>Name:</strong> {extractedDetails.name}</p>
            <p><strong>Voter ID:</strong> {extractedDetails.voterId}</p>
            <p><strong>Date of Birth:</strong> {extractedDetails.dob}</p>
            <p><strong>Age:</strong> {extractedDetails.age}</p>
          </div>
        )}
      </div>
    </div>
  );
}