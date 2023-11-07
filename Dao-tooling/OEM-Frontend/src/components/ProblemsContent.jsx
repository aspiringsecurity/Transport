import React from "react";
import ProblemForm from "./ProblemForm";
import ProblemsAidList from "./ProblemsAidList";

const ProblemsContent = () => {
  return (
    <main className="mt-10 h-[90%] grid grid-cols-3 gap-10 overflow-y-auto">
      <ProblemsAidList />
      <ProblemForm />
    </main>
  );
};

export default ProblemsContent;
