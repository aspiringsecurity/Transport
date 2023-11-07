import { useState, useEffect } from "react";
import { IoIosArrowUp } from "react-icons/io";
import { AiOutlineCheck, AiOutlineSearch } from "react-icons/ai";
import {
  setGlobalState,
  setSolutionSearchResult,
  useGlobalState,
} from "../store";
import { getSolutionSearch, getSolutionsList } from "../utils/solutions";
import { Link, useSearchParams } from "react-router-dom";
import instance from "../axiosInstance";
import { toast } from "react-hot-toast";
import { Oval } from "react-loading-icons";

const SolutionsAidList = () => {
  const [solutions] = useGlobalState("solutions");
  const [solutionSearchResult] = useGlobalState("solutionSearchResult");
  const [connectedAddress] = useGlobalState("connectedAddress");
  const [list, setList] = useState(solutions);
  const [sortedList, setSortedList] = useState([]);
  const [sortPattern, setSortPattern] = useState("votes");
  const [isLoading, setIsLoading] = useState(true);

  let [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search");

  //sort list
  useEffect(() => {
    setIsLoading(true);
    //sort based on votes
    if (sortPattern == "votes") {
      let newList = [...list].sort((a, b) => b.upvotes - a.upvotes);

      setSortedList(newList);
      //sort based on date
    } else if (sortPattern == "date") {
      let newList = [...list].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setSortedList(newList);
    }
    setIsLoading(false);
  }, [list, sortPattern]);

  useEffect(() => {
    //get solutions with preference to search query
    if (search) {
      getSolutionSearch(search);
      setIsLoading(true);
    } else {
      getSolutionsList();
      setIsLoading(true);
      setSolutionSearchResult([]);
    }
  }, [search]);

  useEffect(() => {
    //set solutions in list with preference to search result
    if (solutionSearchResult && solutionSearchResult.length > 0) {
      setList(solutionSearchResult);
    } else {
      setList(solutions);
    }
  }, [solutions, solutionSearchResult]);

  return (
    <div className=" h-full overflow-auto ">
      <div className=" flex justify-between items-center h-[10%]  pl-[3.5%]">
        <div className="w-[50%] flex items-center space-x-3">
          <button
            type="button"
            onClick={() => setSortPattern("votes")}
            className={`${
              sortPattern == "votes"
                ? "bg-rnBlack text-white"
                : " bg-white text-textGray"
            } px-3 py-2  text-xs rounded-full hover:bg-rnBlack hover:text-white `}
          >
            Most voted
          </button>
          <button
            type="button"
            onClick={() => setSortPattern("date")}
            className={`${
              sortPattern == "date"
                ? "bg-rnBlack text-white"
                : " bg-white text-textGray"
            } px-3 py-2  border border-gray-300 text-xs rounded-full hover:bg-rnBlack hover:text-white`}
          >
            Newest
          </button>
        </div>
        <form className="w-[50%] flex justify-end items-center relative">
          <AiOutlineSearch className="pointer-events-none h-5 w-5  absolute top-4 transform -translate-y-1/2 right-2 text-xs text-lowTextGray" />

          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search"
            className="form-input w-full max-w-sm  text-xs bg-searchGray rounded-full
             py-2 pl-2 pr-8 border border-gray-300 focus:ring-0  focus:outline-none"
          />
        </form>
      </div>
      <div className="h-[90%] px-2 overflow-y-auto ">
        {/* {sortPattern == "votes" &&
          [...list]
            .sort((a, b) => b.upvotes - a.upvotes)
            .map((solution, id) => <Solutions solution={solution} key={id} />)}
        {sortPattern == "date" &&
          [...list]
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((solution, id) => <Solutions solution={solution} key={id} />)} */}
        {isLoading ? (
          <div className=" w-fit h-full flex items-center m-auto">
            <Oval strokeWidth={4} stroke="#000000" fill="transparent" />
          </div>
        ) : sortedList.length > 0 ? (
          sortedList.map((solution, id) => (
            <Solutions solution={solution} key={id} />
          ))
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default SolutionsAidList;

const Solutions = ({ solution }) => {
  const [voted, setVote] = useState(false);
  const [upVotes, setUpVotes] = useState([]);
  const [connectedAddress] = useGlobalState("connectedAddress");
  const [userId] = useGlobalState("userId");

  const upvote = () => {
    setVote(true);
  };

  const handleUpVote = async (e) => {
    e.preventDefault();
    if (!connectedAddress) {
      toast.error("Please connect a wallet.");
      return;
    }
    if (!userId) return;
    try {
      await instance({
        // url of the api endpoint (can be changed)
        url: `solutions/${solution._id}/create-upvote`,
        method: "POST",
      }).then((res) => {
        // handle success
        getUpVotes();
        setVote(true);
      });
    } catch (e) {
      // handle error

      toast.error("oops! an error occured , try again later.");
      console.error(e);
    }
  };

  const removeUpVote = async (e) => {
    e.preventDefault();
    if (!userId) return;
    try {
      await instance({
        // url of the api endpoint (can be changed)
        url: `solutions/${solution._id}/remove-upvote`,
        method: "DELETE",
      }).then((res) => {
        // handle success
        getUpVotes();
        setVote(false);
      });
    } catch (e) {
      // handle error
      console.error(e);
    }
  };

  const checkUserVote = (votes) => {
    if (!userId) return setVote(false);
    let match = votes.filter((vote) => {
      return vote.upvotedBy._id == userId;
    });

    match.length > 0 ? setVote(true) : setVote(false);
  };

  const getUpVotes = async () => {
    try {
      await instance({
        // url of the api endpoint (can be changed)
        url: `solutions/${solution._id}/upvotes`,
        method: "GET",
      }).then((res) => {
        // handle success

        setUpVotes(res.data.data.upvotes);
        checkUserVote(res.data.data.upvotes);
      });
    } catch (e) {
      // handle error
      console.error(e);
    }
  };

  useEffect(() => {
    if (solution) getUpVotes();
  }, [solution, userId]);

  return (
    <Link
      to={`/proposal/${solution._id}`}
      onClick={() => {
        setGlobalState("selectedSolution", solution);
        setGlobalState("comments", []);
      }}
      className="h-auto  flex mb-2 "
    >
      <div className="w-[3%] pt-[22px] h-full max-w-8 ">
        {voted && (
          <div className="h-[50%]   flex items-end justify-end font-semibold text-sm text-rnBlack mb-0.5">
            <button
              type="button"
              onClick={removeUpVote}
              className="bg-green-400 text-white  rounded-sm h-fit w-6 px-1"
            >
              <AiOutlineCheck />
            </button>
          </div>
        )}

        {!voted && (
          <div
            className={`h-[50%]    flex items-end justify-end font-semibold text-sm text-rnBlack mb-0.5  `}
          >
            <button
              type="button"
              onClick={handleUpVote}
              className="bg-white rounded-sm h-fit w-6 px-1"
            >
              <IoIosArrowUp />
            </button>
          </div>
        )}
        <div className="h-[50%] text-textGray  flex justify-end items-start  text-xs">
          <span className="rounded-sm h-fit w-6 px-1 bg-white text-xs text-center">
            {upVotes.length}
          </span>
        </div>
      </div>
      <div className="w-[97%] ml-1 bg-white hover:shadow-lg shadow-gray-500 flex  rounded-md h-full px-4">
        <div className="w-[80%] h-full flex flex-col">
          <div className="h-[41px] normal   flex items-end font-semibold text-sm text-rnBlack">
            <span>
              {solution.title.charAt(0).toUpperCase() + solution.title.slice(1)}
            </span>
          </div>
          <div className="h-auto min-h-[41px] pb-2 pr-2 text-textGray  flex items-start  text-xs">
            {solution.description.substr(0, 300)}{" "}
            {solution.description.length > 300 ? ". . ." : ""}
            {}
          </div>
        </div>
        <div className="w-[20%] h-[100px] flex  items-center justify-center ">
          {solution.problemsSolved &&
            solution.problemsSolved.map((problem, id) => (
              <button
                type="button"
                key={id}
                className="bg-grayShadeBorder text-textGray text-xs font-semibold rounded-full border-blueShadeBorder py-1 cursor-pointer px-2"
              >
                {problem.title}
              </button>
            ))}
        </div>
      </div>
    </Link>
  );
};
