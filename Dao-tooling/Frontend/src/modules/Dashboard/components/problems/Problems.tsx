import { useState, useEffect } from "react";

//icons
import { toast } from "react-hot-toast";
import { AiOutlineCheck } from "react-icons/ai";
import { IoIosArrowUp } from "react-icons/io";

//interfaces
import { IProblem, IProblemVote } from "@modules/Shared/interfaces";
import { Link } from "react-router-dom";

//store
import { useAuthStore, useProblemStore } from "@modules/Shared/store";
import axiosInstance from "@modules/Shared/lib/axiosInstance";

interface IProp {
  problem: IProblem;
}

export const Problems = ({ problem }: IProp) => {
  const [voted, setVote] = useState(false);
  const [upVotes, setUpVotes] = useState([]);
  const store = useProblemStore();
  const authStore = useAuthStore();

  const handleUpVote = async () => {
    //@ts-ignore
    if (!authStore.user.walletAddress) {
      toast.error("Please connect a wallet.");
      return;
    }

    try {
      await axiosInstance({
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

  const removeUpVote = async () => {
    //@ts-ignore
    if (!authStore.user.id) return;
    try {
      await axiosInstance({
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

  const checkUserVote = (votes: IProblemVote[]) => {
    //@ts-ignore
    if (!authStore.user.id) return setVote(false);
    let match = votes.filter((vote: IProblemVote) => {
      //@ts-ignore
      return vote.upvotedBy._id == authStore.user.id;
    });

    match.length > 0 ? setVote(true) : setVote(false);
  };

  const getUpVotes = async () => {
    try {
      await axiosInstance({
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
  }, [problem]);

  return (
    <div className="h-auto flex mb-2 ">
      <div className="w-[10%] h-full pt-[21px] max-w-8 ">
        {voted && (
          <div
            className={` h-[50%]  flex items-end justify-end font-semibold text-sm text-rnBlack mb-0.5  `}
          >
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
      <Link
        to="/proposal"
        onClick={() => store.setFocusedProblems([problem])}
        className="w-[90%] ml-1 bg-white flex flex-col  rounded-md h-auto px-4 hover:shadow-lg shadow-gray-500 "
      >
        <div className="h-[41px]   flex items-end font-semibold text-sm text-rnBlack">
          <span>
            {problem.title.charAt(0).toUpperCase() + problem.title.slice(1)}
          </span>
        </div>
        <div className="h-auto min-h-[41px] pb-2 text-textGray  flex items-start  text-xs">
          {problem.description.substr(0, 100)}{" "}
          {problem.description.length > 100 ? ". . ." : ""}
          {}
        </div>
      </Link>
    </div>
  );
};
