export const ResultList = () => {
  return (
    <div className="col-span-1 h-full overflow-auto ">
      <div className=" flex items-center h-[10%]  pl-8">
        <span className="font-bold text-rnBlack">Results</span>
      </div>
      <div className="h-[80%] px-2 overflow-y-auto pl-8">
        {Array(4)
          .fill([])
          .map((items, id) => (
            <Results key={id} />
          ))}
      </div>
      <div className="h-[10%] flex justify-center items-center text-xs text-btnBlue"></div>
    </div>
  );
};

const Results = () => (
  <div className="h-[82px] flex mb-2 ">
    <div className=" bg-gray-300 flex flex-col  rounded-md h-full w-full px-4"></div>
  </div>
);
