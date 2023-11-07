import instance from "../axiosInstance";
import { setVotes } from "../store";

//get all problems
const getVoteList = async () => {
  try {
    await instance({
      // url of the api endpoint (can be changed)
      url: "problems/",
      method: "GET",
    }).then((res) => {
      // handle success
      // console.log(res.data.data.problems);
      setProblems(res.data.data.problems);
    });
  } catch (e) {
    // handle error
    console.error(e);
  }
};

//get a single problem
const getSingleProblem = async (id) => {
  try {
    await instance({
      // url of the api endpoint (can be changed)
      url: `problems/${id}`,
      method: "GET",
    }).then((res) => {
      // handle success
      // console.log(res.data.data.problem);
      setSelectedProblem(res.data.data.problem);
    });
  } catch (e) {
    // handle error
    console.error(e);
  }
};

export { getVoteList };
