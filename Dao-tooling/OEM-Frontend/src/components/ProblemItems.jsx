import { useEffect, useState } from "react";
import { setGlobalState, useGlobalState } from "../store";

const ProblemItems = () => {
  const [focusedProblems] = useGlobalState("focusedProblems");
  const [problems, setProblems] = useState([]);
  useEffect(() => {
    // if (Object.keys(focusedProblem).length > 0)
    if (focusedProblems.length > 0) {
      setProblems(focusedProblems);
    } else {
      setProblems([]);
    }
  }, [focusedProblems]);

  return (
    <div className="col-span-1 overflow-y-auto">
      <h3 className="font-bold text-2xl py-2">
        Problem{problems.length > 1 ? "s" : ""}
      </h3>
      {problems.map((problem, id) => (
        <ProblemsCard key={id} problem={problem} />
      ))}
    </div>
  );
};

export default ProblemItems;

const ProblemsCard = ({ problem }) => (
  <div className=" h-auto max-h-60 w-full rounded-md bg-white p-4 mb-3">
    <h4 className="text-sm font-semibold">{problem.title}</h4>
    <p className="text-sm text-textGray py-2">{problem.description}</p>
  </div>
);
