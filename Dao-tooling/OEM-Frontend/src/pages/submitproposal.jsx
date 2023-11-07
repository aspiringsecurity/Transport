import SubmitProposalContent from "../components/SubmitProposalContent";

const SubmitProposal = () => {
  return (
    <div className="h-screen pt-20 pb-10 px-16">
      <header className="text-rnBack text-5xl h-[10%]   font-bold">
        Submit a proposal
      </header>
      <SubmitProposalContent />
    </div>
  );
};

export default SubmitProposal;
