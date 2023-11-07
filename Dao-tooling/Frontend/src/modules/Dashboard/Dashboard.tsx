//import DashboardContent from "../components/DashboardContent";

import { Header } from "./components/header";
import { ProblemList } from "./features/problemList";
import { ResultList } from "./features/resultList";
import { SolutionList } from "./features/solutionList";

export function Dashboard() {
  return (
    <div className="h-full pt-20 pb-10 px-16">
      <Header />
      <main className="mt-10 h-[90%] grid grid-cols-3 gap-10 overflow-y-auto">
        <ProblemList />
        <SolutionList />
        <ResultList />
      </main>
    </div>
  );
}
