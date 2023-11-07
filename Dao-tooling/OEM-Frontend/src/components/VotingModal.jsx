import { setGlobalState, useGlobalState } from "../store";

const VotingModal = () => {
  const [votingModal] = useGlobalState("votingModal");
  return (
    <div
      className={` fixed z-50 p-10 top-0 left-0 w-screen h-screen bg-black bg-opacity-90 transform transition-transform duration-300 ${votingModal}`}
    >
      <div className="flex items-center justify-end">
        <button
          type="button"
          onClick={() => setGlobalState("votingModal", "scale-0")}
          className="text-white text-sm"
        >
          Close
        </button>
      </div>

      <h3 className="text-center text-white text-4xl font-semibold mb-3 mt-9">
        Thankyou for your voting
      </h3>
      <p className="text-2xl text-center font-light text-gray-900 dark:text-white">
        Help us surface important problems. What is more important
      </p>

      <div className="flex justify-evenly mt-12">
        {Array(3)
          .fill()
          .map((item, id) => (
            <div key={id} className="flex items-center mt-2 flex-col mx-4">
              <div
                className=" h-auto max-h-60 w-full rounded-md bg-white p-4 mb-3 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:cursor-pointer"
                htmlFor="default-radio-1"
              >
                <h4 className="text-sm font-semibold">
                  Lack of affordable housing.
                </h4>
                <p className="text-sm text-textGray py-2">
                  Climate change is an urgent threat to the future of our
                  planet, caused by human activities such as burning fossil
                  fuels and deforestation. It is resulting in rising global
                  temperatures, melting polar ice caps, more frequent and severe
                  weather events.
                </p>
              </div>
              <input
                id="default-radio-1"
                type="radio"
                value=""
                name="default-radio"
                className="w-4 h-4 mt-2 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default VotingModal;
