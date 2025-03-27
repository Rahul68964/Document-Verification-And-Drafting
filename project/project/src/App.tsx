import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import About from './pages/About';
import Contact from './pages/Contact';
import Drafting from './pages/Drafting';
import BondPaper from './pages/documents/BondPaper';
// import GreenPaper from './pages/documents/GreenPaper';
// import Affidavit from './pages/documents/Affidavit';
import WillTestament from './pages/documents/WillTestament';
import NDAForm from './pages/documents/NDAForm';
import PowerOfAttorney from './pages/documents/PowerOfAttorney';
import PdfUploader from './PdfUploader';
import Verification from './Verification';
import AgeAbove18 from './AgeAbove18';
import VotingcardVerification from './VotingcardVerification';
import AadharCardVerification from './AadharCardVerification';
import PancardVerification from './PancardVerification';


function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
          <Navbar />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/drafting" element={<Drafting />} />
            
            <Route path="/verification/random" element={<PdfUploader />} />
            <Route path="/verification" element={<Verification />} />
            <Route path="/verify-pan" element={<PancardVerification />} />
            <Route path="/verify-age" element={<AgeAbove18 />} />
            <Route path="/verify-aadhar" element={<AadharCardVerification />} />
            <Route path="/verify-voting" element={<VotingcardVerification />} />

            <Route path="/drafting/bond-paper" element={<BondPaper />} />
            {/* <Route path="/drafting/green-paper" element={<GreenPaper />} /> */}
            {/* <Route path="/drafting/affidavit" element={<Affidavit />} /> */}
            <Route path="/drafting/will-testament" element={<WillTestament />} />
            <Route path="/drafting/nda-form" element={<NDAForm />} />
            <Route path="/drafting/green-paper" element={<PowerOfAttorney />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;