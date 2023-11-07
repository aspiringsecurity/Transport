import ProposalInfo from "./ProposalInfo";
import ProposalInfoItems from "./ProposalInfoItems";
const ProposalDetailContent = () => {
  return (
    <main className="pt-5 h-[90%] grid grid-cols-3 gap-10 ">
      <ProposalInfo />
      <ProposalInfoItems />
    </main>
  );
};

export default ProposalDetailContent;
