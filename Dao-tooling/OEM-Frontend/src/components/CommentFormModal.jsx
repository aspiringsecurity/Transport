import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineSearch } from "react-icons/ai";
import { IoIosArrowUp } from "react-icons/io";
import instance from "../axiosInstance";
import { setGlobalState, useGlobalState } from "../store";
import { getCommentsList } from "../utils/comments";

const CommentFormModal = () => {
  const [commentFormModal] = useGlobalState("commentFormModal");
  const [highlightedTitle] = useGlobalState("highlightedTitle");
  const [commentType] = useGlobalState("commentType");
  const [selectedSolution] = useGlobalState("selectedSolution");
  const [connectedAddress] = useGlobalState("connectedAddress");
  const [commentTitle, setCommentTitle] = useState("");
  const [commentData, setCommentData] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (highlightedTitle.length > 0) {
      //set title based on highlighted section
      setCommentTitle(highlightedTitle);
    }
  }, [highlightedTitle]);

  useEffect(() => {
    //set comment titles based on type but with exception to description comment
    if (commentType == "description") {
      setCommentTitle(highlightedTitle);
    } else if (commentType == "successMeasure") {
      setCommentTitle("What does success look like");
    }
    if (commentType == "totalBudget") {
      setCommentTitle("Budget");
    }
    if (commentType == "timeFrame") {
      setCommentTitle("Timeframe");
    }
  }, [commentType]);

  const resetForm = () => {
    //empty form
    setCommentTitle("");
    setCommentData("");
    setGlobalState("commentFormModal", "scale-0");
  };

  const postComment = async (e) => {
    //post comment submitted
    e.preventDefault();
    //check if wallet is connected
    if (!connectedAddress) {
      toast.error("Please connect a wallet.");
      return;
    }

    //check form inputs
    if (!commentData || !commentTitle) return;

    //set loading
    setIsSubmitting(true);

    let data = {
      type: commentType,
      title: commentTitle,
      comment: commentData,
    };

    try {
      await instance({
        url: `solutions/${selectedSolution._id}/comments`,
        method: "POST",
        data: data,
      }).then((res) => {
        // handle success
        getCommentsList(selectedSolution._id);
        //empty form
        resetForm();
        //off loading
        setIsSubmitting(false);
      });
    } catch (e) {
      // handle error
      console.error(e);
      toast.error("oops! an error occured , try again later.");
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={` fixed z-50 p-10 top-0 left-0 w-screen h-screen bg-black bg-opacity-90 transform transition-transform duration-300 ${commentFormModal}`}
    >
      <div className="flex items-center justify-end">
        <button
          type="button"
          onClick={() => setGlobalState("commentFormModal", "scale-0")}
          className="text-white text-sm"
        >
          Close
        </button>
      </div>

      <form
        onSubmit={postComment}
        className="h-full max-h-[250px] mt-28 inset-0 bg-green-red"
      >
        <h3 className="text-center text-white text-4xl font-semibold mb-3 ">
          Comment
        </h3>

        <div className=" w-full max-w-[500px]  rounded-lg bg-white p-4 m-auto">
          <h4 className="text-sm font-semibold bg-highlight w-fit leading-6 px-2 mb-2 rounded-sm">
            {commentTitle}
          </h4>
          <div className=" mb-2">
            <textarea
              name="comment"
              onChange={(e) => setCommentData(e.target.value)}
              value={commentData}
              rows={6}
              placeholder="Add a comment"
              className="form-input w-full  text-xs bg-grayShade rounded-md 
              py-2 pl-2 pr-12 border border-grayShadeBorder focus:ring-0  focus:outline-none resize-none"
            ></textarea>
          </div>
          {!isSubmitting && (
            <button
              type="submit"
              className="bg-btnBlue text-white text-center text-xs font-semibold w-full py-3 rounded-md"
            >
              Send
            </button>
          )}
          {isSubmitting && (
            <button
              disabled=""
              type="button"
              className="text-white w-full  justify-center bg-btnBlue hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm px-5 py-2.5 text-center mr-2  inline-flex items-center"
            >
              <svg
                aria-hidden="true"
                role="status"
                className="inline mr-3 w-4 h-4 text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                ></path>
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                ></path>
              </svg>
              Loading...
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CommentFormModal;
