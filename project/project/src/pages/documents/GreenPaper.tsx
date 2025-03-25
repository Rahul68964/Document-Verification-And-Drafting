import React from 'react';
import { Scroll } from 'lucide-react';

const GreenPaper: React.FC = () => {
  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <Scroll className="w-8 h-8 text-green-500 mr-3" />
          <h1 className="text-3xl font-bold">Green Paper</h1>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <p className="text-gray-600 dark:text-gray-300">Green Paper drafting interface coming soon...</p>
        </div>
      </div>
    </div>
  );
};

export default GreenPaper;