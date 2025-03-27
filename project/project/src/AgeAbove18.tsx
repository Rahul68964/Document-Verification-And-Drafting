import React, { useState } from "react";
import { Upload, Loader2, XCircle, CheckCircle, AlertTriangle } from "lucide-react";

interface ApiResponse {
  details: string; // API returns a string with multiple details including DOB
}

export default function AgeVerification() {
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
      console.log("API Response:", result); // Debugging

      setData(result);
      setShowModal(true);
    } catch (error) {
      console.error("Error uploading file:", error);
      setError("An error occurred during upload. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Extract Date of Birth (DOB) from details string
  const extractDOB = (details: string): string | null => {
    const dobMatch = details.match(/(\d{2}\/\d{2}\/\d{4})/); // Matches "DD/MM/YYYY"
    console.log("Extracted DOB:", dobMatch ? dobMatch[1] : "Not Found");
    return dobMatch ? dobMatch[1] : null;
  };

  // ✅ Corrected Age Calculation Function
  const calculateAge = (dob: string | null): number | null => {
    if (!dob) return null;

    console.log("Received DOB:", dob);

    let [day, month, year] = dob.split("/").map(num => parseInt(num, 10));

    if (!day || !month || !year || year < 1900 || month > 12 || day > 31) {
      console.error("Invalid DOB format:", { day, month, year });
      return null;
    }

    const birthDate = new Date(year, month - 1, day); // Month is 0-based in JS
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();

    if (
      today.getMonth() < birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())
    ) {
      age -= 1;
    }

    console.log("Calculated Age:", age);
    return age;
  };

  const dob = data ? extractDOB(data.details) : null;
  const age = dob ? calculateAge(dob) : null;
  const isEligible = age !== null && age >= 18;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-2xl overflow-hidden p-6">
        <h2 className="text-2xl font-bold text-center text-blue-800">Age Verification</h2>

        <div className="mt-6 flex flex-col items-center">
          <input type="file" accept="application/pdf" onChange={handleFileChange} className="hidden" id="file-upload" />
          <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center space-y-3 text-blue-600 hover:text-blue-800 transition">
            <Upload className="w-12 h-12" />
            <span className="font-semibold">{file ? "Change PDF" : "Click to upload PDF"}</span>
          </label>

          {fileUrl && <iframe src={fileUrl} className="w-full h-[300px] border rounded-lg mt-4" title="PDF Preview"></iframe>}

          <button
            onClick={handleUpload}
            disabled={!file || loading}
            className="mt-4 w-full flex items-center justify-center gap-3 px-4 py-3 
              bg-gradient-to-r from-blue-500 to-blue-600 
              text-white font-bold rounded-lg 
              hover:from-blue-600 hover:to-blue-700 
              disabled:opacity-50 disabled:cursor-not-allowed 
              transition-all duration-300 ease-in-out"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin w-5 h-5" />
                Processing...
              </>
            ) : (
              <>Verify Age</>
            )}
          </button>
        </div>

        {error && <p className="mt-4 text-red-600 font-semibold">{error}</p>}

        {/* Modal */}
        {showModal && data && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-blue-800">Verification Result</h3>
                <button onClick={() => setShowModal(false)} className="text-gray-600 hover:text-gray-800">
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              <div className="mt-4">
                {dob ? (
                  <>
                    <p className="text-lg font-bold text-gray-800">Date of Birth:</p>
                    <p className="text-xl font-semibold text-blue-700">{dob}</p>

                    <p className="text-lg font-bold text-gray-800 mt-2">Current Age:</p>
                    <p className="text-xl font-semibold text-blue-700">
                      {age !== null ? `${age} years` : "Age not calculated"}
                    </p>
                  </>
                ) : (
                  <p className="text-lg font-semibold text-red-600 text-center">
                    Date of Birth not found
                  </p>
                )}
              </div>

              {/* ✅ Voting Eligibility Label */}
              <div className="mt-4 flex justify-center">
                {isEligible ? (
                  <div className="flex items-center text-green-600 font-semibold">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Eligible to vote (Age: {age})
                  </div>
                ) : (
                  <div className="flex items-center text-red-600 font-semibold">
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    Not eligible to vote (Age: {age})
                  </div>
                )}
              </div>

              <button
                onClick={() => setShowModal(false)}
                className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}