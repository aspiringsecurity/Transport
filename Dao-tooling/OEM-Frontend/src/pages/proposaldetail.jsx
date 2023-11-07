import { AiOutlineSearch } from "react-icons/ai";
import ProposalDetailContent from "../components/ProposalDetailContent";

const ProposalDetail = () => {
  return (
    <div className="h-screen pt-20 pb-10 px-16">
      <div className=" h-[10%] flex justify-between items-center pl-[0.5] pr-1 mb-4">
        <header className="text-rnBack text-5xl   font-bold">Proposal</header>

        {/* <form className="w-[50%] flex justify-end items-center relative">
          <AiOutlineSearch className="pointer-events-none h-5 w-5  absolute top-4 transform -translate-y-1/2 right-2 text-xs text-lowTextGray" />

          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search"
            className="form-input w-full max-w-sm text-textGray text-xs bg-[#E6E6E6] rounded-full
             py-2 pl-2 pr-8 border border-lowTextGray focus:ring-0  focus:outline-none"
          />
        </form> */}
      </div>
      <ProposalDetailContent />
    </div>
  );
};

export default ProposalDetail;
