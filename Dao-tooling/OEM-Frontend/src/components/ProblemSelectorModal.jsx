import { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { IoIosArrowUp } from "react-icons/io";
import {
  setAutoProblemSearchResult,
  setGlobalState,
  useGlobalState,
} from "../store";
import { getAutoProblemSearch, getProblemsList } from "../utils/problems";

const ProblemSelectorModal = () => {
  const [problemSelectorModal] = useGlobalState("problemSelectorModal");
  const [autoProblemSearchResult] = useGlobalState("autoProblemSearchResult");
  const [searchValue, setSearchValue] = useState("");
  const [list, setList] = useState([]);
  const [problems] = useGlobalState("problems");

  const handleSearch = async (e) => {
    setSearchValue(e.target.value);
    await getAutoProblemSearch(e.target.value.trim());
  };

  useEffect(() => {
    if (autoProblemSearchResult.length > 0) {
      setList(autoProblemSearchResult);
    } else {
      getProblemsList();
    }
  }, [autoProblemSearchResult]);

  useEffect(() => {
    if (problems && autoProblemSearchResult.length == 0) {
      setList(problems);
    }
  }, [problems]);

  return (
    <div
      className={` fixed z-50 p-10 top-0 left-0 w-screen h-screen bg-black bg-opacity-90 transform transition-transform duration-300 ${problemSelectorModal}`}
    >
      <div className="flex items-center justify-end">
        <button
          type="button"
          onClick={() => setGlobalState("problemSelectorModal", "scale-0")}
          className="text-white text-sm"
        >
          Close
        </button>
      </div>

      <h3 className="text-center text-white text-4xl font-semibold mb-3 mt-6">
        Add another problem
      </h3>

      <div className=" w-full max-w-[500px] h-full max-h-[450px] rounded-lg bg-popGray p-4 m-auto">
        <form className="w-full h-full">
          <div className="relative h-[10%]">
            <AiOutlineSearch className="pointer-events-none h-5 w-5  absolute top-4 transform -translate-y-1/2 right-2 text-xs text-lowTextGray" />

            <input
              type="text"
              name="search"
              value={searchValue}
              onChange={handleSearch}
              id="search"
              placeholder="Search"
              className="form-input w-full text-xs bg-searchGray rounded-full
             py-2 pl-2 pr-8 border border-gray-300 focus:ring-0  focus:outline-none"
            />
          </div>
          <div className="h-[90%] px-2 overflow-y-auto ">
            {list.map((problem, id) => (
              <Problems
                problem={problem}
                key={id}
                setSearchValue={setSearchValue}
              />
            ))}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProblemSelectorModal;

const Problems = ({ problem, setSearchValue }) => {
  const [focusedProblems] = useGlobalState("focusedProblems");
  const inList = (problem) => {
    let found = false;
    for (var i = 0; i < focusedProblems.length; i++) {
      if (focusedProblems[i]._id == problem._id) {
        found = true;
        break;
      }
    }
    return found;
  };
  const setProblems = () => {
    if (!inList(problem)) {
      let newList = [...focusedProblems, problem];
      setGlobalState("focusedProblems", newList);
    }
    setSearchValue("");
    setAutoProblemSearchResult([]);
    setGlobalState("problemSelectorModal", "scale-0");
  };

  return (
    <div className="h-auto flex mb-2 " onClick={setProblems}>
      {/* <div className="w-[5%] max-w-8 ">
        <div className="h-[50%]   flex items-end justify-end font-semibold text-sm text-rnBlack mb-0.5">
          <span className="bg-white rounded-sm h-fit w-6 px-1">
            <IoIosArrowUp />
          </span>
        </div>
        <div className="h-[50%] text-textGray  flex justify-end items-start  text-xs">
          <span className="rounded-sm h-fit w-6 px-1 bg-white text-xs">24</span>
        </div>
      </div> */}
      <div className="w-full ml-1 bg-white hover:shadow-lg shadow-gray-500  cursor-pointer flex flex-col  rounded-md h-auto px-4">
        <div className="h-[41px]   flex items-end font-semibold text-sm text-rnBlack">
          <span>{problem.title}</span>
        </div>
        <div className="h-auto min-h-[41px] pb-2 text-textGray  flex items-start  text-xs">
          <span>
            {/* {problem.description.substr(0, 140)}{" "}
            {problem.description.length > 140 ? ". . ." : ""} */}
            {problem.description}
          </span>
        </div>
      </div>
    </div>
  );
};
