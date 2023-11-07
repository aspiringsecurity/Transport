import ProblemItems from "./ProblemItems";
import ProposalForm from "./ProposalForm";
const SubmitProposal = () => {
  return (
    <main className="mt-5 h-[90%] grid grid-cols-3 gap-10 ">
      <ProposalForm />
      <ProblemItems />
    </main>
  );
};

export default SubmitProposal;
