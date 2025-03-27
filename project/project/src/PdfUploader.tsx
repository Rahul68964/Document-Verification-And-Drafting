import React, { useState } from "react";
import { Upload, Loader2 } from "lucide-react";
import { useTheme } from "./context/ThemeContext";

interface ApiResponse {
  type: string;
  details: string;
  verification: string;
}

export default function PdfUploader() {
  const { isDarkMode } = useTheme();
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    if (event.target.files) {
      const selectedFile = event.target.files[0];
      if (selectedFile.type === "application/pdf") {
        setFile(selectedFile);
        setFileUrl(URL.createObjectURL(selectedFile));
      } else {
        setError("Please upload a PDF file.");
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
    } catch (error) {
      console.error("Error uploading file:", error);
      setError("An error occurred during upload. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const formatExtractedDetails = (details: string): JSX.Element[] => {
    const lines = details.split("\n").map(line => line.trim()).filter(line => line);

    let formattedDetails: JSX.Element[] = [];
    let currentSection = "";

    lines.forEach((line) => {
      if (
        line.includes("Names:") ||
        line.includes("Dates:") ||
        line.includes("Identification Numbers:") ||
        line.includes("Locations:")
      ) {
        currentSection = line.replace(/[*]/g, "").trim();
        formattedDetails.push(
          <p key={currentSection} className="font-bold mt-3 text-blue-800">{currentSection}</p>
        );
      } else {
        formattedDetails.push(
          <p key={line} className="ml-4 text-gray-700 dark:text-gray-300">• {line.replace(/[*]/g, "").trim()}</p>
        );
      }
    });

    return formattedDetails;
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-6 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className={`w-full max-w-6xl ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} shadow-2xl rounded-2xl overflow-hidden flex h-[80vh]`}>
        
        <div className="w-1/2 p-6 flex flex-col">
          {file && <h2 className="text-lg font-semibold mb-2">{file.name}</h2>}

          <input type="file" accept="application/pdf" onChange={handleFileChange} className="hidden" id="file-upload" />
          <label htmlFor="file-upload" className={`cursor-pointer flex flex-col items-center space-y-3 transition ${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}`}>
            <Upload className="w-12 h-12" />
            <span className="font-semibold">{file ? "Change PDF" : "Click to upload PDF"}</span>
          </label>

          <button
            onClick={handleUpload}
            disabled={!file || loading}
            className={`mt-4 w-full flex items-center justify-center gap-3 px-4 py-3 
              bg-gradient-to-r from-blue-500 to-indigo-600 
              text-white font-bold rounded-lg 
              hover:from-blue-600 hover:to-indigo-700 
              disabled:opacity-50 disabled:cursor-not-allowed 
              transition-all duration-300 ease-in-out`}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin w-5 h-5" />
                Processing...
              </>
            ) : (
              <>Upload & Extract</>
            )}
          </button>

          {fileUrl && (
            <iframe src={fileUrl} className="w-full h-[60%] border rounded-lg mt-4" title="PDF Preview"></iframe>
          )}
        </div>

        <div className="w-1/2 p-6 flex flex-col">
          {data && (
            <div className={`border rounded-lg p-5 space-y-4 overflow-y-auto h-full ${isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-blue-50 border-blue-200 text-gray-900'}`}>
              <p className="text-lg font-bold text-blue-800">Extracted Information</p>

              <p className="text-lg font-bold">Type:</p>
              <p className="text-sm">{data.type}</p>

              <p className="text-lg font-bold mt-2">Details:</p>
              <div className="text-sm space-y-2">{formatExtractedDetails(data.details)}</div>

              <p className="text-lg font-bold mt-2">Verification:</p>
              <p className="text-sm">{data.verification}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}