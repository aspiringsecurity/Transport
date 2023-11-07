import { IoIosArrowUp } from "react-icons/io";
import { AiOutlineCheck, AiOutlineSearch } from "react-icons/ai";
import { useEffect, useState } from "react";
import {
  setGlobalState,
  setProblemSearchResult,
  useGlobalState,
} from "../store";
import { getProblemSearch, getProblemsList } from "../utils/problems";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import instance from "../axiosInstance";
import { toast } from "react-hot-toast";
import { Oval } from "react-loading-icons";

const ProblemsAidList = () => {
  const [problems] = useGlobalState("problems");
  const [problemSearchResult] = useGlobalState("problemSearchResult");

  const [list, setList] = useState(problems);
  const [sortedList, setSortedList] = useState([]);
  const [sortPattern, setSortPattern] = useState("votes");
  const [isLoading, setIsLoading] = useState(true);
  // console.log(problems, list);
  let [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search");

  useEffect(() => {
    setIsLoading(true);
    //sort problems based on votes
    if (sortPattern == "votes") {
      let newList = [...list].sort((a, b) => b.upvotes - a.upvotes);

      setSortedList(newList);
      //sort problems based on date
    } else if (sortPattern == "date") {
      let newList = [...list].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setSortedList(newList);
    }
    setIsLoading(false);
  }, [list, sortPattern]);

  useEffect(() => {
    //set problems in list
    if (search) {
      getProblemSearch(search);
      setIsLoading(true);
    } else {
      getProblemsList();
      setIsLoading(true);
      setProblemSearchResult([]);
    }
  }, [search]);

  useEffect(() => {
    //set problems in list with preference to search result
    if (problemSearchResult && problemSearchResult.length > 0) {
      setList(problemSearchResult);
    } else {
      setList(problems);
    }
  }, [problems, problemSearchResult]);

  return (
    <div className="col-span-2 h-full overflow-auto ">
      <div className=" flex justify-between items-center h-[10%]  pl-[5.5%]">
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
            className="form-input w-full  text-xs bg-searchGray rounded-full
             py-2 pl-2 pr-8 border border-gray-300 focus:ring-0  focus:outline-none"
          />
        </form>
      </div>
      <div className="h-[90%] px-2 overflow-y-auto ">
        {isLoading ? (
          <div className=" w-fit h-full flex items-center m-auto">
            <Oval strokeWidth={4} stroke="#000000" fill="transparent" />
          </div>
        ) : sortedList.length > 0 ? (
          sortedList.map((problem, id) => (
            <Problems problem={problem} key={id} />
          ))
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ProblemsAidList;

const Problems = ({ problem }) => {
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
        url: `problems/${problem._id}/create-upvote`,
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
        url: `problems/${problem._id}/remove-upvote`,
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
    //console.log(votes);
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
        url: `problems/${problem._id}/upvotes`,
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
    if (problem) getUpVotes();
  }, [problem, userId]);
  return (
    <div className="h-auto flex mb-2 ">
      <div className="w-[5%] pt-[22px] h-full max-w-8 ">
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
      <div className="w-[95%] ml-1 bg-white flex hover:shadow-lg shadow-gray-500  rounded-md h-auto px-4">
        <div className="w-[80%] h-auto flex flex-col">
          <div className="h-[41px]    flex items-end font-semibold text-sm text-rnBlack">
            <span>
              {problem.title.charAt(0).toUpperCase() + problem.title.slice(1)}
            </span>
          </div>
          <div className="h-auto min-h-[41px] pb-2 pr-2 text-textGray  flex items-start  text-xs">
            {/* {problem.description.substr(0, 160)}{" "}
            {problem.description.length > 160 ? ". . ." : ""} */}
            {problem.description}
          </div>
        </div>
        <div className="w-[20%] h-full flex items-center justify-center ">
          <Link to="/proposal">
            <button
              type="button"
              onClick={() => setGlobalState("focusedProblems", [problem])}
              className="bg-blueShade text-btnBlue text-xs font-semibold rounded-lg border-blueShadeBorder py-1 cursor-pointer px-2"
            >
              Add a solution
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
