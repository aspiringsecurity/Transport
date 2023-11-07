import { useState, useEffect } from "react";
import { IoIosArrowUp } from "react-icons/io";
import { AiOutlineCheck } from "react-icons/ai";
import { Link } from "react-router-dom";
// import { setGlobalState, useGlobalState } from "../store";
// import { getSolutionsList } from "../utils/solutions";
//import instance from "../axiosInstance";
import { toast } from "react-hot-toast";
import { Oval } from "react-loading-icons";

export const SolutionList = () => {
  //   const [solutions] = useGlobalState("solutions");
  //   const [isLoading, setIsLoading] = useState(true);
  //   const [sortedList, setSortedList] = useState([]);

  //   useEffect(() => {
  //     //get solutions
  //     getSolutionsList();
  //     setIsLoading(true);
  //   }, []);

  //   //sort list based on votes
  //   const sortList = (list) => {
  //     setIsLoading(true);

  //     let newList = [...list].sort((a, b) => b.upvotes - a.upvotes);

  //     setSortedList(newList);

  //     setIsLoading(false);
  //   };

  //   useEffect(() => {
  //     //set set solutions in list
  //     sortList(solutions);
  //   }, [solutions]);
  return (
    <div className="col-span-1 h-full overflow-auto ">
      <div className=" flex justify-between items-center h-[10%]  pl-12">
        <span className="font-bold text-rnBlack">Solutions</span>
        <Link to="/proposal">
          <button
            type="button"
            className="bg-btnBlue  text-white text-xs py-1 px-2 cursor-pointer rounded-md font-semibold"
          >
            Propose solutions
          </button>
        </Link>
      </div>
      <div className="h-[80%] px-2 overflow-y-auto ">
        {/* {isLoading ? (
          <div className=" w-fit h-full flex items-center m-auto">
            <Oval strokeWidth={4} stroke="#000000" fill="transparent" />
          </div>
        ) : sortedList.length > 0 ? (
          sortedList.map((solution, id) => (
            <Solutions solution={solution} key={id} />
          ))
        ) : (
          ""
        )} */}
      </div>
      <Link
        to="/solutions"
        className="h-[10%] flex justify-center items-center text-xs text-btnBlue"
      >
        see all solutions
      </Link>
    </div>
  );
};

// const Solutions = ({ solution }) => {
//   const [voted, setVote] = useState(false);
//   const [upVotes, setUpVotes] = useState([]);
//   const [connectedAddress] = useGlobalState("connectedAddress");
//   const [userId] = useGlobalState("userId");

//   const upvote = () => {
//     setVote(true);
//   };

//   const handleUpVote = async (e) => {
//     e.preventDefault();
//     if (!connectedAddress) {
//       toast.error("Please connect a wallet.");
//       return;
//     }
//     if (!userId) return;
//     try {
//       await instance({
//         // url of the api endpoint (can be changed)
//         url: `solutions/${solution._id}/create-upvote`,
//         method: "POST",
//       }).then((res) => {
//         // handle success
//         getUpVotes();
//         setVote(true);
//       });
//     } catch (e) {
//       // handle error

//       toast.error("oops! an error occured , try again later.");
//       console.error(e);
//     }
//   };

//   const removeUpVote = async (e) => {
//     e.preventDefault();
//     if (!userId) return;
//     try {
//       await instance({
//         // url of the api endpoint (can be changed)
//         url: `solutions/${solution._id}/remove-upvote`,
//         method: "DELETE",
//       }).then((res) => {
//         // handle success
//         getUpVotes();
//         setVote(false);
//       });
//     } catch (e) {
//       // handle error
//       console.error(e);
//     }
//   };

//   const checkUserVote = (votes) => {
//     if (!userId) return setVote(false);
//     let match = votes.filter((vote) => {
//       return vote.upvotedBy._id == userId;
//     });

//     match.length > 0 ? setVote(true) : setVote(false);
//   };

//   const getUpVotes = async () => {
//     try {
//       await instance({
//         // url of the api endpoint (can be changed)
//         url: `solutions/${solution._id}/upvotes`,
//         method: "GET",
//       }).then((res) => {
//         // handle success
//         //console.log(res.data.data.upvotes);
//         setUpVotes(res.data.data.upvotes);
//         checkUserVote(res.data.data.upvotes);
//       });
//     } catch (e) {
//       // handle error
//       console.error(e);
//     }
//   };

//   useEffect(() => {
//     if (solution) getUpVotes();
//   }, [solution, userId]);

//   return (
//     <Link
//       to={`proposal/${solution._id}`}
//       onClick={() => {
//         setGlobalState("selectedSolution", solution);
//         setGlobalState("comments", []);
//       }}
//       className="h-auto flex mb-2 "
//     >
//       <div className="w-[10%] h-full pt-[21px] max-w-8 ">
//         {voted && (
//           <div
//             className={` h-[50%]  flex items-end justify-end font-semibold text-sm text-rnBlack mb-0.5  `}
//           >
//             <button
//               type="button"
//               onClick={removeUpVote}
//               className="bg-green-400 text-white  rounded-sm h-fit w-6 px-1"
//             >
//               <AiOutlineCheck />
//             </button>
//           </div>
//         )}
//         {!voted && (
//           <div
//             className={`h-[50%]    flex items-end justify-end font-semibold text-sm text-rnBlack mb-0.5  `}
//           >
//             <button
//               type="button"
//               onClick={handleUpVote}
//               className="bg-white rounded-sm h-fit w-6 px-1"
//             >
//               <IoIosArrowUp />
//             </button>
//           </div>
//         )}

//         <div className="h-[50%] text-textGray  flex justify-end items-start  text-xs">
//           <span className="rounded-sm h-fit w-6 px-1 bg-white text-xs text-center">
//             {upVotes.length}
//           </span>
//         </div>
//       </div>
//       <div className="w-[90%] h-auto ml-1 bg-white hover:shadow-lg shadow-gray-500 flex flex-col  rounded-md  px-4">
//         <div className="h-[41px]   flex items-end font-semibold text-sm text-rnBlack">
//           <span>
//             {solution.title.charAt(0).toUpperCase() + solution.title.slice(1)}
//           </span>
//         </div>
//         <div className="h-auto min-h-[41px] pb-2 text-textGray  flex items-start  text-xs">
//           <span>
//             {solution.description.substr(0, 100)}{" "}
//             {solution.description.length > 100 ? ". . ." : ""}
//           </span>
//         </div>
//       </div>
//     </Link>
//   );
// };
