import React from "react";
import ProblemsList from "./ProblemsList";
import ResultsList from "./ResultsList";
import SolutionsList from "./SolutionsList";

const Content = () => {
  return (
    <main className="mt-10 h-[90%] grid grid-cols-3 gap-10 overflow-y-auto">
      <ProblemsList />
      <SolutionsList />
      <ResultsList />
    </main>
  );
};

export default Content;
