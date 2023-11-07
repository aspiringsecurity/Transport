import { Link } from "react-router-dom";
import SolutionsContent from "../components/SolutionsContent";

const Solutions = () => {
  return (
    <div className="h-screen pt-20 pb-10 px-16">
      <div className=" h-[10%] flex justify-between pr-1 items-center ">
        <header className="text-rnBack text-5xl font-bold  pl-[3.5%]">
          Solutions
        </header>

        <Link to="/proposal">
          <button
            type="button"
            className="bg-btnBlue w-fit text-white text-center text-sm font-semibold py-2 px-3 rounded-md"
          >
            Propose solution
          </button>
        </Link>
      </div>
      <SolutionsContent />
    </div>
  );
};

export default Solutions;
