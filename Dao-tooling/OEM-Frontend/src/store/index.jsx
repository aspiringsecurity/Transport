//All global states enter here
import { createGlobalState } from "react-hooks-global-state";

const { setGlobalState, useGlobalState, getGlobalState } = createGlobalState({
  problemSelectorModal: "scale-0",
  commentModal: "scale-0",
  votingModal: "scale-0",
  timeFrameModal: "scale-0",
  budgetModal: "scale-0",
  commentFormModal: "scale-0",
  successModal: "scale-0",
  problems: [],
  problemSearchResult: [],
  autoProblemSearchResult: [],
  selectedProblem: {},
  solutions: [],
  comments: [],
  votes: [],
  highlightedTitle: "",
  solutionSearchResult: [],
  selectedSolution: {},
  focusedProblems: [],
  commentType: "",
  focusedComments: [],
  userId: "",
  connectedAddress: "",
});

const setUserId = (id) => {
  setGlobalState("userId", id);
};
const setProblems = (list) => {
  setGlobalState("problems", list);
};
const setComments = (list) => {
  setGlobalState("comments", list);
};
const setVotes = (list) => {
  setGlobalState("votes", list);
};
const setProblemSearchResult = (list) => {
  setGlobalState("problemSearchResult", list);
};
const setAutoProblemSearchResult = (list) => {
  setGlobalState("autoProblemSearchResult", list);
};
const setSolutionSearchResult = (list) => {
  setGlobalState("solutionSearchResult", list);
};
const setSelectedProblem = (problem) => {
  setGlobalState("selectedProblem", problem);
};
const setSolutions = (list) => {
  setGlobalState("solutions", list);
};

const setSelectedSolution = (solution) => {
  setGlobalState("selectedSolution", solution);
};

const truncate = (text, startChars, endChars, maxLength) => {
  if (text.length > maxLength) {
    var start = text.substring(0, startChars);
    var end = text.substring(text.length - endChars, text.length);
    while (start.length + end.length < maxLength) {
      start = start + ".";
    }
    return start + end;
  }
  return text;
};

export {
  useGlobalState,
  setGlobalState,
  getGlobalState,
  setProblems,
  setSelectedProblem,
  setSolutions,
  setSelectedSolution,
  setProblemSearchResult,
  setSolutionSearchResult,
  setVotes,
  setComments,
  setUserId,
  setAutoProblemSearchResult,
  truncate,
};
