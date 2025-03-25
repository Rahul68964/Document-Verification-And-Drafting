import React, { useState } from "react";
import { Upload, File, CheckCircle, Loader2 } from "lucide-react";

interface ApiResponse {
  type: string;
  details: string;
  verification: string;
}

export default function PdfUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    if (event.target.files) {
      const selectedFile = event.target.files[0];
      if (selectedFile.type === "application/pdf") {
        setFile(selectedFile);
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
      setData(result);
    } catch (error) {
      console.error("Error uploading file:", error);
      setError("An error occurred during upload. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
          <h1 className="text-2xl font-bold flex items-center gap-3">
            <File className="w-8 h-8" />
            PDF Extractor
          </h1>
          <p className="text-sm text-blue-100 mt-2">
            Upload a PDF to extract its key information
          </p>
        </div>

        <div className="p-6 space-y-4">
          <div className="border-2 border-dashed border-blue-200 rounded-lg p-6 text-center">
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />
            <label 
              htmlFor="file-upload" 
              className="cursor-pointer flex flex-col items-center space-y-3 text-blue-600 hover:text-blue-800 transition"
            >
              <Upload className="w-12 h-12" />
              <span className="font-semibold">
                {file ? file.name : "Click to upload PDF"}
              </span>
              <span className="text-sm text-gray-500">
                Maximum file size: 10MB
              </span>
            </label>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            onClick={handleUpload}
            disabled={!file || loading}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 
              bg-gradient-to-r from-blue-500 to-purple-600 
              text-white font-bold rounded-lg 
              hover:from-blue-600 hover:to-purple-700 
              disabled:opacity-50 disabled:cursor-not-allowed 
              transition-all duration-300 ease-in-out"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin w-5 h-5" />
                Processing...
              </>
            ) : (
              <>
                <Upload className="w-5 h-5" />
                Upload & Extract
              </>
            )}
          </button>

          {data && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-500" />
                <h2 className="text-lg font-bold text-blue-800">{data.type}</h2>
              </div>
              <p className="text-sm text-gray-700 whitespace-pre-line">
                {data.details}
              </p>
              <div className="border-t border-blue-100 pt-3 mt-3">
                <p className="text-sm font-semibold text-blue-600">
                  Verification: {data.verification}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}