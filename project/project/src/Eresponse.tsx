import React, { useState } from "react";
import { Upload, Loader2, XCircle } from "lucide-react";

interface ApiResponse {
  type: string;
  eresponse: string;  // Generic response from E-Sign API
}

export default function DocumentVerification() {
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

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-2xl overflow-hidden p-6">
        <h2 className="text-2xl font-bold text-center text-blue-800">E-Sign Document Verification</h2>

        <div className="mt-6 flex flex-col items-center">
          <input type="file" accept="application/pdf" onChange={handleFileChange} className="hidden" id="file-upload" />
          <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center space-y-3 text-blue-600 hover:text-blue-800 transition">
            <Upload className="w-12 h-12" />
            <span className="font-semibold">{file ? "Change PDF" : "Click to upload document PDF"}</span>
          </label>

          {fileUrl && (
            <iframe src={fileUrl} className="w-full h-[300px] border rounded-lg mt-4" title="PDF Preview"></iframe>
          )}

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
              <>Verify Document</>
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
                <p className="text-lg font-bold text-gray-800">Verification Response:</p>
                <p className="text-xl font-semibold text-blue-700">
                  {data.eresponse || "No response found"}
                </p>
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