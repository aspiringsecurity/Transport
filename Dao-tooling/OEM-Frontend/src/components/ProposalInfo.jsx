import { useEffect, useState } from "react";
import { setGlobalState, useGlobalState } from "../store";
import { useParams } from "react-router-dom";
import { getSingleSolution } from "../utils/solutions";
import { filterComments, getCommentsList } from "../utils/comments";
import Description from "./Description";

const ProposalInfo = () => {
  const [selectedSolution] = useGlobalState("selectedSolution");
  const [comments] = useGlobalState("comments");
  const [successComments, setSuccessComments] = useState([]);
  const [budgetComments, setBudgetComments] = useState([]);
  const [descriptionComments, setDescriptionComments] = useState([]);
  const [timeFrameComments, setTimeFrameComments] = useState([]);
  const [detail, setDetail] = useState({});
  const [userView, setUserView] = useState();
  const { id } = useParams();
  //get a solution
  useEffect(() => {
    if (Object.keys(selectedSolution).length == 0) {
      getSingleSolution(id);
      getCommentsList(id);
    } else {
      setDetail(selectedSolution);
      getCommentsList(id);
    }
  }, [selectedSolution]);

  //filter comments based on type
  useEffect(() => {
    setBudgetComments(filterComments("totalBudget", comments));
    setSuccessComments(filterComments("successMeasure", comments));
    setTimeFrameComments(filterComments("timeFrame", comments));
    setDescriptionComments(filterComments("description", comments));
  }, [comments]);

  useEffect(() => {
    //set comments in comment modal view
    if (userView == "description")
      setGlobalState("focusedComments", descriptionComments);
    if (userView == "successMeasure")
      setGlobalState("focusedComments", successComments);
    if (userView == "timeFrame")
      setGlobalState("focusedComments", timeFrameComments);
    if (userView == "totalBudget") {
      setGlobalState("focusedComments", budgetComments);
    }
  }, [descriptionComments, successComments, timeFrameComments, budgetComments]);

  return (
    <div className=" col-span-2  h-full overflow-y-auto ">
      <div className="  bg-white h-full rounded-md overflow-y-auto pt-2 pb-4  px-4">
        <h3 className="text-2xl font-bold text-rnBlack py-3">{detail.title}</h3>

        <h4 className="text-rnBlack text-sm font-semibold">
          Problems addressed by this proposal
        </h4>
        <div className="w-auto flex items-center space-x-3 my-2 overflow-x-auto py-1">
          {detail.problemsSolved &&
            detail.problemsSolved.map((problem, id) => (
              <button
                type="button"
                key={id}
                className="min-w-fit px-3 py-2  bg-btnGray hover:bg-btnGrayHover hover:text-white text-textGray text-xs rounded-full "
              >
                {problem.title}
              </button>
            ))}
        </div>

        <div className="flex items-center justify-between mb-2">
          <div>
            <h4 className="text-rn Black text-md font-semibold">Description</h4>
          </div>
          {/* <div className="flex space-x-1">
            <button
              type="button"
              onClick={() => {
                setGlobalState("commentModal", "scale-100");
                setGlobalState("focusedComments", descriptionComments);
                setGlobalState("commentType", "description");
                setUserView("description");
              }}
              className=" px-3 py-2  bg-btnGray hover:bg-btnGrayHover hover:text-white text-textGray text-xs rounded-md "
            >
              {descriptionComments.length} comment
              {descriptionComments.length > 1 ? "s" : ""}
            </button>
            <button
              type="button"
              onClick={() => {
                setGlobalState("commentFormModal", "scale-100");
                setGlobalState("commentType", "description");
              }}
              className=" px-3  bg-btnGray hover:bg-btnGrayHover hover:text-white text-textGray text-lg rounded-md "
            >
              +
            </button> 
          </div>*/}
        </div>

        <Description
          detail={detail}
          descriptionComments={descriptionComments}
        />

        <div className="flex items-center justify-between my-2">
          <div>
            <h4 className="text-rn Black text-md font-semibold">
              What does success look like
            </h4>
          </div>
          <div className="flex space-x-1">
            <button
              type="button"
              onClick={() => {
                setGlobalState("commentModal", "scale-100");
                setGlobalState("focusedComments", successComments);
                setGlobalState("commentType", "successMeasure");
                setUserView("successMeasure");
              }}
              className=" px-3 py-2  bg-btnGray hover:bg-btnGrayHover hover:text-white text-textGray text-xs rounded-md "
            >
              {successComments.length} comment
              {successComments.length > 1 ? "s" : ""}
            </button>
            <button
              type="button"
              onClick={() => {
                setGlobalState("commentFormModal", "scale-100");
                setGlobalState("commentType", "successMeasure");
              }}
              className=" px-3  bg-btnGray hover:bg-btnGrayHover hover:text-white text-textGray text-lg rounded-md "
            >
              +
            </button>
          </div>
        </div>

        <p className="text-rnBlack text-sm text-justify py-2">
          {detail.successMeasure}
        </p>
        <div className="flex items-center justify-between mb-4">
          <div className=" flex space-x-10 items-center w-[50%] ">
            <h4 className="text-rnBlack w-[50%]  text-md font-semibold">
              Timeframe
            </h4>
            <h4 className="text-rnBlack w-[50%]  text-md font-semibold">
              {detail.timeFrame}
            </h4>
          </div>
          <div className="flex space-x-1 w-[50%]  justify-end">
            <button
              type="button"
              onClick={() => {
                setGlobalState("commentModal", "scale-100");
                setGlobalState("focusedComments", timeFrameComments);
                setGlobalState("commentType", "timeFrame");
                setUserView("timeFrame");
              }}
              className=" px-3 py-2  bg-btnGray hover:bg-btnGrayHover hover:text-white text-textGray text-xs rounded-md "
            >
              {timeFrameComments.length} comment
              {timeFrameComments.length > 1 ? "s" : ""}
            </button>
            <button
              type="button"
              onClick={() => {
                setGlobalState("commentFormModal", "scale-100");
                setGlobalState("commentType", "timeFrame");
              }}
              className=" px-3  bg-btnGray hover:bg-btnGrayHover hover:text-white text-textGray text-lg rounded-md "
            >
              +
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between mb-4">
          <div className=" flex space-x-10 items-center w-[50%] ">
            <h4 className="text-rnBlack w-[50%]  text-md font-semibold">
              Total budget
            </h4>
            <h4 className="text-rnBlack w-[50%]  text-md font-semibold">
              {detail.totalBudget}
            </h4>
          </div>
          <div className="flex space-x-1 w-[50%]  justify-end">
            <button
              type="button"
              onClick={() => {
                setGlobalState("commentModal", "scale-100");
                setGlobalState("focusedComments", budgetComments);
                setGlobalState("commentType", "totalBudget");
                setUserView("totalBudget");
              }}
              className=" px-3 py-2  bg-btnGray hover:bg-btnGrayHover hover:text-white text-textGray text-xs rounded-md "
            >
              {budgetComments.length} comment
              {budgetComments.length > 1 ? "s" : ""}
            </button>
            <button
              type="button"
              onClick={() => {
                setGlobalState("commentFormModal", "scale-100");
                setGlobalState("commentType", "totalBudget");
              }}
              className=" px-3  bg-btnGray hover:bg-btnGrayHover hover:text-white text-textGray text-lg rounded-md "
            >
              +
            </button>
          </div>
        </div>

        {detail.itemsNeeded
          ? detail.itemsNeeded.map((item, id) => (
              <div key={id} className=" flex w-[50%] items-center pb-2 ">
                <small className="text-rnBlack text-sm w-[50%]">
                  {item.name}
                </small>
                <small className="text-rnBlack text-sm w-[50%] pl-5">
                  {item.price}
                </small>
              </div>
            ))
          : ""}
      </div>
    </div>
  );
};

export default ProposalInfo;
