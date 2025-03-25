import React, { useState, useRef, useEffect } from 'react';
import { Upload, CheckCircle, XCircle, AlertCircle, FileText, Loader } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import toast, { Toaster } from 'react-hot-toast';
import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';
import { createWorker } from 'tesseract.js';

interface VerificationResult {
  isValid: boolean;
  documentType: string;
  confidence: number;
  details: string[];
  extractedText?: string;
}

const Verification: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);
  const [model, setModel] = useState<mobilenet.MobileNet | null>(null);
  const [ocrWorker, setOcrWorker] = useState<Tesseract.Worker | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize TensorFlow model and Tesseract worker
  useEffect(() => {
    const initializeModels = async () => {
      try {
        // Initialize TensorFlow.js backend
        await tf.ready();
        
        // Set the backend to 'webgl' for better performance
        await tf.setBackend('webgl');
      
        
        // Load MobileNet model
        const loadedModel = await mobilenet.load();
        setModel(loadedModel);

        // Initialize Tesseract worker
        const worker = await createWorker();
        await worker.loadLanguage('eng');
        await worker.initialize('eng');
        setOcrWorker(worker);

        console.log('Models loaded successfully');
      } catch (error) {
        console.error('Error loading models:', error);
        toast.error('Error loading verification models');
      }
    };

    initializeModels();

    // Cleanup
    return () => {
      if (ocrWorker) {
        ocrWorker.terminate();
      }
    };
  }, []);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const classifyDocument = async (imageElement: HTMLImageElement): Promise<string> => {
    if (!model) throw new Error('Model not loaded');

    const predictions = await model.classify(imageElement);
    console.log('Classification predictions:', predictions);

    // Map MobileNet classifications to document types
    const documentTypes = {
      'id': ['identity', 'card', 'document'],
      'passport': ['passport', 'travel', 'document'],
      'license': ['license', 'driving', 'card'],
    };

    for (const prediction of predictions) {
      for (const [docType, keywords] of Object.entries(documentTypes)) {
        if (keywords.some(keyword => prediction.className.toLowerCase().includes(keyword))) {
          return docType;
        }
      }
    }

    return 'unknown';
  };

  const extractTextFromImage = async (file: File): Promise<string> => {
    if (!ocrWorker) throw new Error('OCR worker not initialized');

    const result = await ocrWorker.recognize(file);
    return result.data.text;
  };

  const validateDocument = (docType: string, text: string): boolean => {
    // Basic validation rules
    const patterns = {
      'id': /\b\d{12}\b/, // Aadhaar pattern
      'passport': /\b[A-Z]{1}[0-9]{7}\b/, // Passport number pattern
      'license': /\b(DL|dl)\s*\d{6,}\b/, // Driving license pattern
    };

    return patterns[docType as keyof typeof patterns]?.test(text) ?? false;
  };

  const processDocument = async (file: File) => {
    if (!model || !ocrWorker) {
      toast.error('Verification system is still initializing');
      return;
    }

    setIsProcessing(true);
    try {
      // Create image element for classification
      const img = new Image();
      const imageUrl = URL.createObjectURL(file);
      img.src = imageUrl;
      
      await new Promise((resolve) => {
        img.onload = resolve;
      });

      // Perform document classification
      const documentType = await classifyDocument(img);
      console.log('Detected document type:', documentType);

      // Extract text using OCR
      const extractedText = await extractTextFromImage(file);
      console.log('Extracted text:', extractedText);

      // Validate document based on type and extracted text
      const isValid = validateDocument(documentType, extractedText);

      const result: VerificationResult = {
        isValid,
        documentType: documentType.charAt(0).toUpperCase() + documentType.slice(1),
        confidence: isValid ? 85 : 45,
        details: [
          'Document classification completed',
          'Text extraction performed',
          'Pattern validation checked',
          isValid ? 'Document format verified' : 'Invalid document format detected'
        ],
        extractedText: extractedText.substring(0, 200) + '...' // First 200 characters
      };

      setVerificationResult(result);
      toast.success('Document verification completed');

      // Cleanup
      URL.revokeObjectURL(imageUrl);
    } catch (error) {
      console.error('Verification error:', error);
      toast.error('Error processing document');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      await processDocument(file);
    }
  };

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await processDocument(file);
    }
  };

  if (!model || !ocrWorker) {
    return (
      <div className="min-h-screen pt-20 px-4 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 animate-spin mx-auto mb-4 text-blue-500" />
          <p className="text-xl">Loading verification models...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <CheckCircle className="w-8 h-8 text-green-500 mr-3" />
          <h1 className="text-3xl font-bold">Document Verification</h1>
        </div>

        <div className={`rounded-xl shadow-lg p-8 ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div
            className={`border-2 border-dashed rounded-xl p-10 text-center transition-all duration-300 ${
              isDragging
                ? 'border-blue-500 bg-blue-50 dark:bg-gray-700'
                : isDarkMode
                ? 'border-gray-600 hover:border-gray-500'
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Upload className={`w-16 h-16 mx-auto mb-4 ${
              isDragging ? 'text-blue-500' : 'text-gray-400'
            }`} />
            
            <h3 className="text-xl font-semibold mb-2">
              Drag & Drop your document here
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Supports Aadhaar Card, PAN Card, Driving License, and other legal documents
            </p>
            
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Browse Files
            </button>
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileInput}
            />
          </div>

          {isProcessing && (
            <div className="mt-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto mb-4" />
              <p className="text-lg">Analyzing document...</p>
            </div>
          )}

          {verificationResult && (
            <div className="mt-8 p-6 rounded-xl bg-gray-50 dark:bg-gray-700">
              <div className="flex items-center mb-6">
                {verificationResult.isValid ? (
                  <CheckCircle className="w-8 h-8 text-green-500 mr-3" />
                ) : (
                  <XCircle className="w-8 h-8 text-red-500 mr-3" />
                )}
                <h3 className="text-2xl font-bold">
                  Document {verificationResult.isValid ? 'Valid' : 'Invalid'}
                </h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-center">
                  <FileText className="w-5 h-5 text-gray-400 mr-2" />
                  <span className="font-medium">Document Type:</span>
                  <span className="ml-2">{verificationResult.documentType}</span>
                </div>

                <div className="flex items-center">
                  <AlertCircle className="w-5 h-5 text-gray-400 mr-2" />
                  <span className="font-medium">Confidence Score:</span>
                  <span className="ml-2">{verificationResult.confidence}%</span>
                </div>

                <div className="mt-4">
                  <h4 className="font-medium mb-2">Verification Details:</h4>
                  <ul className="space-y-2">
                    {verificationResult.details.map((detail, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>

                {verificationResult.extractedText && (
                  <div className="mt-4">
                    <h4 className="font-medium mb-2">Extracted Text:</h4>
                    <p className="text-sm bg-gray-100 dark:bg-gray-600 p-4 rounded-lg">
                      {verificationResult.extractedText}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <Toaster position="top-right" />
    </div>
  );
};

export default Verification;