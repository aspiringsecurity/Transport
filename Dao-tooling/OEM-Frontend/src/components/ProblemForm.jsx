import { useState } from "react";
import { toast } from "react-hot-toast";
import instance from "../axiosInstance";
import { useGlobalState } from "../store";
import { getProblemsList } from "../utils/problems";

const ProblemForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [titleCount, setTitleCount] = useState(0);
  const [descriptionCount, setDescriptionCount] = useState(0);
  const [connectedAddress] = useGlobalState("connectedAddress");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleTitle = (e) => {
    //check length of title string
    if (e.target.value.length > 40) return;
    setTitle(e.target.value);
    setTitleCount(e.target.value.length);
  };
  const handleDescription = (e) => {
    //check length of description string
    if (e.target.value.length > 300) return;
    setDescription(e.target.value);
    setDescriptionCount(e.target.value.length);
  };

  //ereset form
  const resetForm = () => {
    setDescription("");
    setTitle("");
    setTitleCount(0);
    setDescriptionCount(0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //ensure user is logged in
    if (!connectedAddress) {
      toast.error("Please connect a wallet.");
      return;
    }

    if (title.length == 0 || description.length == 0) return;
    setIsSubmitting(true);

    let data = {
      title,
      description,
    };

    try {
      await instance({
        url: "problems/",
        method: "POST",
        data: data,
      }).then((res) => {
        // handle success

        toast.success("Problem recorded.");
        resetForm();
        getProblemsList();
        setIsSubmitting(false);
      });
    } catch (e) {
      // handle error
      console.error(e);
      setIsSubmitting(false);
      toast.error("oops! an error occured , try again later.");
    }
  };

  return (
    <div className="col-span-1 h-full overflow-auto   ">
      <div className="h-[10%]"></div>
      <div className=" bg-white rounded-md h-auto  py-4 px-3">
        <h3 className="text-md text-rnBlack font-bold">Add a problem</h3>
        <form onSubmit={handleSubmit} className=" mt-4">
          <div className="relative mb-4">
            <span className="pointer-events-none w-8 h-8 absolute top-6 transform -translate-y-1/2 right-2 text-xs text-lowTextGray">
              {titleCount}/40
            </span>

            <input
              type="text"
              name="title"
              id="title"
              value={title}
              onChange={handleTitle}
              required
              placeholder="Add a title"
              className="form-input w-full  text-xs bg-grayShade rounded-md py-2 pl-2 pr-12 border border-grayShadeBorder focus:ring-0  focus:outline-none"
            />
          </div>
          <div className="relative mb-2">
            <span className="pointer-events-none w-8 h-8 absolute -bottom-4 transform -translate-y-1/2 right-8 text-xs text-lowTextGray tracking-widest">
              {descriptionCount}/300
            </span>

            <textarea
              name="description"
              id="description"
              rows="11"
              value={description}
              onChange={handleDescription}
              required
              placeholder="Description"
              className="form-input w-full  text-xs bg-grayShade rounded-md 
              py-2 pl-2 pr-2 border border-grayShadeBorder focus:ring-0  focus:outline-none resize-none"
            ></textarea>
          </div>
          {!isSubmitting && (
            <button
              type="submit"
              className="bg-btnBlue text-white text-center text-sm font-semibold w-full py-3 rounded-md"
            >
              Publish problem
            </button>
          )}
          {isSubmitting && (
            <button
              disabled=""
              type="button"
              className="text-white w-full justify-center bg-btnBlue hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm px-5 py-2.5 text-center mr-2  inline-flex items-center"
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
        </form>
      </div>
    </div>
  );
};

export default ProblemForm;
