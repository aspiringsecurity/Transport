import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { GrAdd } from "react-icons/gr";
import instance from "../axiosInstance";
import { setGlobalState, useGlobalState } from "../store";
import { getSolutionsList } from "../utils/solutions";
const ProposalForm = () => {
  const [focusedProblems] = useGlobalState("focusedProblems");
  const [connectedAddress] = useGlobalState("connectedAddress");
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [budget, setBudget] = useState("");
  const [items, setItems] = useState([{}]);
  const [success, setSuccess] = useState("");
  const [description, setDescription] = useState("");
  const [titleCount, setTitleCount] = useState(0);
  const [descriptionCount, setDescriptionCount] = useState(0);
  const [problems, setProblems] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  //verify length of title
  const handleTitle = (e) => {
    if (e.target.value.length > 100) return;
    setTitle(e.target.value);
    setTitleCount(e.target.value.length);
  };

  //verify length of description
  const handleDescription = (e) => {
    if (e.target.value.length > 2500) return;
    setDescription(e.target.value);
    setDescriptionCount(e.target.value.length);
  };

  //update name in matching items list
  const updateItemName = (e, id) => {
    //  passing function to setItems method
    setItems((prevState) => {
      const newState = prevState.map((obj, index) => {
        // if id equals current index, update name property
        if (id === index) {
          return { ...obj, name: e.target.value };
        }

        //  otherwise return the object as is
        return obj;
      });

      return newState;
    });
  };

  //update price in matching items list
  const updateItemPrice = (e, id) => {
    //  passing function to setItems method
    setItems((prevState) => {
      const newState = prevState.map((obj, index) => {
        //  if id equals current index, update price property
        if (id === index) {
          return { ...obj, price: e.target.value };
        }

        //  otherwise return the object as is
        return obj;
      });

      return newState;
    });
  };


  //reset form
  const resetForm = () => {
    setTitle("");
    setTime("");
    setBudget("");
    setItems([{}]);
    setSuccess("");
    setDescription("");
    setTitleCount(0);
    setDescriptionCount(0);
  };

  //check if any parameter is empty in items list
  const itemEmpty = () => {
    let match = items.filter(
      (item) =>
        !"name" in item ||
        !"price" in item ||
        !item.name ||
        !item.price ||
        item.price < 1
    );
    return match.length > 0 ? true : false;
  };

  //submit proposal
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submited...");

    //check if wallet is connected
    if (!connectedAddress) {
      toast.error("Please connect a wallet.");
      return;
    }

    //verify all inputs
    if (
      !title.trim() ||
      !description.trim() ||
      !success.trim() ||
      !budget.trim() ||
      !time.trim() ||
      itemEmpty()
    )
      return;

    setIsSubmitting(true);

    let data = {
      title: title,
      description: description,
      successMeasure: success,
      totalBudget: budget,
      timeFrame: time,
      itemsNeeded: items,
      problemsSolved: problems,
    };


    try {
      await instance({
        
        url: "solutions/",
        method: "POST",
        data: data,
      }).then((res) => {
        // handle success
        toast.success("Proposal recorded.");
        resetForm();
        //get list
        getSolutionsList();
        setIsSubmitting(false);
        //empty focused problems array
        setGlobalState("focusedProblems", []);
        setProblems([]);
      });
    } catch (e) {
      // handle error
      toast.error("oops! an error occured , try again later.");
      console.error(e);
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    // if (Object.keys(focusedProblem).length > 0)
    if (focusedProblems.length > 0) setProblems(focusedProblems);
  }, [focusedProblems]);

  return (
    <form
      onSubmit={handleSubmit}
      className=" col-span-2 flex flex-col h-full overflow-auto "
    >
      <div className=" border bg-white h-[90%] rounded-md overflow-y-auto py-4 px-2">
        <div className="mt-3">
          <div className="relative mb-2">
            <span className="pointer-events-none w-8 h-8 absolute top-6 transform -translate-y-1/2 right-2 text-xs text-lowTextGray">
              {titleCount}/100
            </span>

            <input
              type="text"
              name="name"
              id="name"
              onChange={handleTitle}
              value={title}
              placeholder="Proposal name"
              className="form-input w-full  text-xs bg-grayShade rounded-md py-2 pl-2 pr-12 border border-grayShadeBorder focus:ring-0  focus:outline-none"
            />
          </div>
          <div className="w-full flex items-center space-x-3 mb-2 overflow-x-auto py-1">
            {problems.map((problem, id) => (
              <button
                key={id}
                type="button"
                className=" min-w-fit bg-bodyBg px-3 py-2 text-gray-500 font-semibold text-xs rounded-full "
              >
                {problem.title}
              </button>
            ))}

            <button
              type="button"
              onClick={() =>
                setGlobalState("problemSelectorModal", "scale-100")
              }
              className="min-w-fit px-3 py-2 flex item-center space-x-1 bg-white text-textGray border border-gray-300 text-xs rounded-full "
            >
              <GrAdd className="mt-0.5" />
              <span>Add problem</span>
            </button>
          </div>

          <div className="relative mb-2">
            <span className="pointer-events-none w-8 h-8 absolute -bottom-4 transform -translate-y-1/2 right-6 text-xs text-lowTextGray tracking-widest">
              {descriptionCount}/2500
            </span>

            <textarea
              name="description"
              id="description"
              rows="10"
              placeholder="Description"
              onChange={handleDescription}
              value={description}
              className="form-input w-full  text-xs bg-grayShade rounded-md 
              py-2 pl-2 pr-2 border border-grayShadeBorder focus:ring-0  focus:outline-none resize-none"
            ></textarea>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div className="col-span-1">
              <div className=" mb-2">
                <label htmlFor="success" className="text-xs text-rn">
                  What does success look like
                </label>

                <input
                  type="text"
                  name="success"
                  id="success"
                  value={success}
                  onChange={(e) => setSuccess(e.target.value)}
                  placeholder="Success"
                  className="form-input w-full  text-sm bg-grayShade rounded-md py-2 pl-2 pr-2 border border-grayShadeBorder focus:ring-0  focus:outline-none"
                />
              </div>
              <div className=" mb-2">
                <label htmlFor="time" className="text-xs text-rn">
                  Time frame
                </label>

                <input
                  type="text"
                  name="time"
                  id="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  placeholder="How log will it take?"
                  className="form-input w-full  text-sm bg-grayShade rounded-md py-2 pl-2 pr-2 border border-grayShadeBorder focus:ring-0  focus:outline-none"
                />
              </div>
            </div>
            <div className="col-span-1">
              <div className=" mb-2">
                <label htmlFor="budget" className="text-xs text-rn">
                  Total budget
                </label>

                <input
                  type="text"
                  name="budget"
                  id="budget"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder="Budget"
                  className="form-input w-full  text-sm bg-grayShade rounded-md py-2 pl-2 pr-2 border border-grayShadeBorder focus:ring-0  focus:outline-none"
                />
              </div>

              <div className="text-xs text-rn mt-4">Add specific item</div>
              {items.map((item, id) => (
                <div className="flex gap-1 " key={id}>
                  <div className=" mb-2">
                    <input
                      type="text"
                      value={item.name || ""}
                      onChange={(e) => updateItemName(e, id)}
                      placeholder="Item name"
                      className="form-input w-full  text-sm bg-grayShade rounded-md py-2 pl-2 pr-2 border border-grayShadeBorder focus:ring-0  focus:outline-none"
                    />
                  </div>
                  <div className=" mb-2 ">
                    <input
                      type="text"
                      value={item.price || ""}
                      onChange={(e) => updateItemPrice(e, id)}
                      placeholder="Cost"
                      className="form-input w-full  text-sm bg-grayShade rounded-md py-2 pl-2 pr-2 border border-grayShadeBorder focus:ring-0  focus:outline-none"
                    />
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() => setItems([...items, {}])}
                className=" px-3 h-10 flex items-center space-x-1 bg-bodyBg hover:bg-rnBlack hover:ring-0 hover:border-none hover:outline-none hover:text-white text-textGray border border-gray-300 text-xs rounded-full "
              >
                <span className="flex  h-full text-lg items-center pb-1 ">
                  +
                </span>
                <span>Add another item</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className=" h-[10%] flex justify-center items-end ">
        {!isSubmitting && (
          <button
            type="submit"
            className="bg-btnBlue  text-white text-center text-sm font-semibold py-2 px-3 rounded-md"
          >
            Submit solution
          </button>
        )}

        {isSubmitting && (
          <button
            disabled=""
            type="button"
            className="text-white  flex justify-center bg-btnBlue hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm px-5 py-2.5 text-center mr-2   items-center"
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
      </div>
    </form>
  );
};

export default ProposalForm;
