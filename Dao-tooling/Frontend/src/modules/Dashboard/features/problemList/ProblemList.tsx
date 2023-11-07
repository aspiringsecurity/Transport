import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Problems } from "@modules/Dashboard/components/problems";
import { useQuery } from "react-query";
//icon
import { Oval } from "react-loading-icons";

//store
import { useProblemStore } from "@modules/Shared/store";

//interfaces
import { IProblem } from "@modules/Shared/interfaces/problemInterface";

//services
import { getProblemsList } from "@modules/Shared/services/api";

export const ProblemList = () => {
  const store = useProblemStore();
  const { data } = useQuery("problems", getProblemsList, {
    staleTime: 2000,
    onSuccess: (data) => {
      //set problem store
      store.setProblems(data.data.data.problems);
    },
  });

  // const [connectedAddress] = useGlobalState("connectedAddress");
  const [sortedList, setSortedList] = useState<IProblem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  //console.log(data?.data.data.problems, error);
  // useEffect(() => {
  //   //set problems in list
  //   getProblemsList();
  //   setIsLoading(true);
  // }, []);

  //sort problems based on votes
  const sortList = (list: IProblem[]) => {
    setIsLoading(true);

    let newList = [...list].sort((a, b) => b.upvotes - a.upvotes);

    setSortedList(newList);

    setIsLoading(false);
  };

  useEffect(() => {
    //set problems in list
    sortList(store.problems);
  }, [store.problems]);

  return (
    <div className="col-span-1 h-full overflow-auto ">
      <div className=" flex justify-between items-center h-[10%]  pl-[10.5%]">
        <span className="font-bold text-rnBlack">Problems</span>
        <Link to="/problems">
          <button
            type="button"
            className="bg-btnBlue  text-white text-xs py-1 px-2 cursor-pointer rounded-md font-semibold"
          >
            Add a problem
          </button>
        </Link>
      </div>
      <div className="h-[80%] px-2 overflow-y-auto ">
        {isLoading ? (
          <div className=" w-fit h-full flex items-center m-auto">
            <Oval strokeWidth={4} stroke="#000000" fill="transparent" />
          </div>
        ) : sortedList.length > 0 ? (
          sortedList.map((problem, id) => (
            <Problems problem={problem} key={id} />
          ))
        ) : (
          ""
        )}
      </div>
      <Link
        to="/problems"
        className="h-[10%] flex justify-center items-center text-xs
        text-btnBlue"
      >
        see all problems
      </Link>
    </div>
  );
};
