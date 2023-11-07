import instance from "../axiosInstance";
import {
  setAutoProblemSearchResult,
  setProblems,
  setProblemSearchResult,
  setSelectedProblem,
} from "../store";

//get all problems
const getProblemsList = async () => {
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
//get problems based on search parameter
const getProblemSearch = async (query) => {
  try {
    await instance({
      // url of the api endpoint (can be changed)
      url: `problems?search=${query}`,
      method: "GET",
    }).then((res) => {
      // handle success
      // console.log(res.data.data.problem);
      setProblemSearchResult(res.data.data.problems);
    });
  } catch (e) {
    // handle error
    console.error(e);
  }
};
//get problems based on search parameter
const getAutoProblemSearch = async (text) => {
  try {
    await instance({
      // url of the api endpoint (can be changed)
      url: `problems?search=${text}`,
      method: "GET",
    }).then((res) => {
      // handle success
      // console.log(res.data.data.problem);
      setAutoProblemSearchResult(res.data.data.problems);
    });
  } catch (e) {
    // handle error
    console.error(e);
  }
};

export {
  getProblemsList,
  getSingleProblem,
  getProblemSearch,
  getAutoProblemSearch,
};
