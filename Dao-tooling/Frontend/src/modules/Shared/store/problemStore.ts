import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IProblem } from "@modules/Shared/interfaces/problemInterface";

interface Problem {
  problems: IProblem[];
  problemSearchResult: IProblem[];
  autoProblemSearchResult: IProblem[];
  focusedProblems: IProblem[];
  selectedProblem: IProblem | {};

  setProblems: (list: IProblem[]) => void;
  setProblemSearchResult: (list: IProblem[]) => void;
  setAutoProblemSearchResult: (list: IProblem[]) => void;
  setFocusedProblems: (list: IProblem[]) => void;
  setSelectedProblem: (problem: IProblem) => void;
  removeProblems: () => void;
  removeFocusedProblems: () => void;
  removeSelectedProblem: () => void;
  removeProblemSearchResult: () => void;
  removeAutoProblemSearchResult: () => void;
}

export const useProblemStore = create<Problem>()(
  persist(
    (set) => ({
      problems: [],
      problemSearchResult: [],
      autoProblemSearchResult: [],
      focusedProblems: [],
      selectedProblem: {},
      //set problems array
      setProblems(list: IProblem[]) {
        set(() => ({
          problems: list,
        }));
      },
      //set problems search result array
      setProblemSearchResult(list: IProblem[]) {
        set(() => ({
          problemSearchResult: list,
        }));
      },

      //set auto problems search result array
      setAutoProblemSearchResult(list: IProblem[]) {
        set(() => ({
          autoProblemSearchResult: list,
        }));
      },
      //set auto problems search result array
      setFocusedProblems(list: IProblem[]) {
        set(() => ({
          focusedProblems: list,
        }));
      },
      //set auto problems search result array
      setSelectedProblem(problem: IProblem) {
        set(() => ({
          selectedProblem: problem,
        }));
      },

      //delete states

      //clear problems array
      removeProblems() {
        set(() => ({
          problems: [],
        }));
      },
      //clear problems array
      removeProblemSearchResult() {
        set(() => ({
          problemSearchResult: [],
        }));
      },
      //clear auto problems array
      removeAutoProblemSearchResult() {
        set(() => ({
          autoProblemSearchResult: [],
        }));
      },
      //clear focused problems array
      removeFocusedProblems() {
        set(() => ({
          focusedProblems: [],
        }));
      },
      //clear selected problem array
      removeSelectedProblem() {
        set(() => ({
          selectedProblem: {},
        }));
      },
    }),
    {
      name: "problemData",
    }
  )
);
