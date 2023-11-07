import { useEffect, useState, useRef } from "react";
import { setGlobalState, truncate, useGlobalState } from "../store";
import { getCommentsByTitle, getCommentsList } from "../utils/comments";
import instance from "../axiosInstance";
import { toast } from "react-hot-toast";

import ReactTimeAgo from "react-time-ago";
import { Oval } from "react-loading-icons";

const CommentModal = () => {
  const [commentModal] = useGlobalState("commentModal");
  const [comments] = useGlobalState("comments");
  const [focusedComments] = useGlobalState("focusedComments");
  const [commentType] = useGlobalState("commentType");
  const [selectedSolution] = useGlobalState("selectedSolution");
  const [connectedAddress] = useGlobalState("connectedAddress");
  const [commentTitle, setCommentTitle] = useState("");
  const [commentData, setCommentData] = useState("");
  const [viewComments, setViewComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const bottomRef = useRef(null);

  useEffect(() => {
    // focused comment for description type of comment is object while others is an array
    if (commentType != "description") {
      setViewComments(focusedComments);
    }
    setIsLoading(false);
  }, [focusedComments]);

  useEffect(() => {
    //get comments where title is selected comment title
    if (
      comments.length > 0 &&
      Object.keys(focusedComments).length > 0 &&
      commentType == "description"
    ) {
      //focused comment is an object
      setCommentTitle(focusedComments.title);

      //group comments with same title
      setViewComments(getCommentsByTitle(focusedComments.title, comments));
      //set loading false
      setIsLoading(false);
    }
  }, [comments, focusedComments]);

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [viewComments]);

  useEffect(() => {
    //set comment title based on type with exception to description comments
    if (commentType == "successMeasure") {
      setCommentTitle("What does success look like");
    }
    if (commentType == "totalBudget") {
      setCommentTitle("Budget");
    }
    if (commentType == "timeFrame") {
      setCommentTitle("Timeframe");
    }
  }, [commentType]);

  //reset form
  const resetForm = () => {
    setCommentData("");
  };

  //submit comment
  const postComment = async (e) => {
    e.preventDefault();
    //check if wallet is connected
    if (!connectedAddress) {
      toast.error("Please connect a wallet.");
      return;
    }
    //verify inputs
    if (!commentData || !commentTitle) return;
    setIsSubmitting(true);

    let data = {
      comment: commentData,
      type: commentType,
      title: commentTitle,
    };

    try {
      await instance({
        url: `solutions/${selectedSolution._id}/comments`,
        method: "POST",
        data: data,
      }).then((res) => {
        // handle success
        getCommentsList(selectedSolution._id);
        resetForm();
        setIsSubmitting(false);
      });
    } catch (e) {
      // handle error
      toast.error("oops! an error occured , try again later.");
      setIsSubmitting(false);
      console.error(e);
    }
  };
  return (
    <div
      className={` fixed z-50 p-10 top-0 left-0 w-screen h-screen bg-black bg-opacity-90 transform transition-transform duration-300 ${commentModal}`}
    >
      <div className="flex items-center justify-end">
        <button
          type="button"
          onClick={() => setGlobalState("commentModal", "scale-0")}
          className="text-white text-sm"
        >
          Close
        </button>
      </div>

      <h3 className="text-center text-white text-4xl font-semibold mb-3 mt-6">
        Add Comment
      </h3>

      <div className=" w-full max-w-[500px] h-full max-h-[450px] rounded-lg bg-popGray p-4 m-auto">
        <div className="h-full rounded-lg bg-white py-3 pl-2 ">
          <h4 className=" h-[10%]text-sm font-semibold bg-highlight w-fit leading-6  rounded-sm ">
            {commentTitle}
          </h4>

          <div className="h-[68%] overflow-y-auto mt-[2%] pr-2">
            {isLoading ? (
              <div className=" w-fit h-full flex items-center m-auto">
                <Oval strokeWidth={4} stroke="#bbbbbb" fill="transparent" />
              </div>
            ) : (
              viewComments.map((comment, id) => (
                <Comments key={id} comment={comment} />
              ))
            )}

            <div ref={bottomRef} />
          </div>

          <div className="h-[20%] pr-2 pt-2">
            <form onSubmit={postComment} className=" h-full">
              <textarea
                name="comment"
                onChange={(e) => setCommentData(e.target.value)}
                value={commentData}
                rows={1}
                placeholder="Add a comment"
                className="form-input w-full  text-xs bg-grayShade rounded-md 
              py-2 pl-2 pr-12 border border-grayShadeBorder focus:ring-0  focus:outline-none resize-none"
              ></textarea>
              {!isSubmitting && (
                <button
                  type="submit"
                  className="bg-btnBlue w-full text-white text-center text-sm font-semibold py-2 px-3 rounded-md"
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
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentModal;

const Comments = ({ comment }) => {
  // console.log(comment);
  return (
    <div>
      <div className="pt-4 pb-2">
        <div className="flex justify-between items-center ">
          <h4 className="text-sm font-bold text-rnB">
            {truncate(comment.user, 4, 4, 11)}
          </h4>
          {comment.createdAt && (
            <small className="text-xs text-rn">
              <ReactTimeAgo date={comment.createdAt} locale="en-US" />
            </small>
          )}
        </div>
        <p className="text-sm text-textGray py-2">{comment.comment}</p>
      </div>
      <hr />
    </div>
  );
};
