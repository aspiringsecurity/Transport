import Navbar from "./components/Navbar";
import Dashboard from "./pages/dashboard";
import Problems from "./pages/problems";
import ProposalDetail from "./pages/proposaldetail";
import Solutions from "./pages/solutions";
import SubmitProposal from "./pages/submitproposal";
import { Routes, Route } from "react-router-dom";
import ProblemSelectorModal from "./components/ProblemSelectorModal";
import CommentModal from "./components/CommentModal";
import VotingModal from "./components/VotingModal";
import { useEffect } from "react";
import CommentFormModal from "./components/CommentFormModal";

import { Toaster } from "react-hot-toast";
import { isWallectConnected } from "./Blockchain.services";
function App() {
  useEffect(() => {
    isWallectConnected();
  }, []);

  return (
    <div className=" min-h-screen bg-bodyBg   ">
      <Toaster position="top-right" reverseOrder={false} />
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/problems" element={<Problems />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/proposal" element={<SubmitProposal />} />
        <Route path="/proposal/:id" element={<ProposalDetail />} />
      </Routes>
      <ProblemSelectorModal />
      <CommentModal />
      <VotingModal />
      <CommentFormModal />
    </div>
  );
}

export default App;
