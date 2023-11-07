import instance from "../axiosInstance";
import {
  setSelectedSolution,
  setSolutions,
  setSolutionSearchResult,
} from "../store";

//get all problems
const getSolutionsList = async () => {
  try {
    await instance({
      // url of the api endpoint (can be changed)
      url: "solutions/",
      method: "GET",
    }).then((res) => {
      // handle success
      //console.log(res.data.data.solutions);
      setSolutions(res.data.data.solutions);
    });
  } catch (e) {
    // handle error
    console.error(e);
  }
};

//get a single problem
const getSingleSolution = async (id) => {
  try {
    await instance({
      // url of the api endpoint (can be changed)
      url: `solutions/${id}`,
      method: "GET",
    }).then((res) => {
      // handle success
      // console.log(res.data.data.solution);
      setSelectedSolution(res.data.data.solution);
    });
  } catch (e) {
    // handle error
    console.error(e);
  }
};

//get problems based on search parameter
const getSolutionSearch = async (query) => {
  try {
    await instance({
      // url of the api endpoint (can be changed)
      url: `solutions?search=${query}`,
      method: "GET",
    }).then((res) => {
      // handle success
      // console.log(res.data.data.problem);
      setSolutionSearchResult(res.data.data.solutions);
    });
  } catch (e) {
    // handle error
    console.error(e);
  }
};

export { getSolutionsList, getSingleSolution, getSolutionSearch };
