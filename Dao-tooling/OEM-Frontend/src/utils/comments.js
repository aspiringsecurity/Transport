import instance from "../axiosInstance";
import { setComments } from "../store";

//get all problems
const getCommentsList = async (selectedSolution) => {
  try {
    await instance({
      // url of the api endpoint (can be changed)
      url: `solutions/${selectedSolution}/comments`,
      method: "GET",
    }).then((res) => {
      // handle success
      // console.log(res.data.data.problems);
      setComments(res.data.data.comments);
      // console.log(res.data.data.comments);
    });
  } catch (e) {
    // handle error
    console.error(e);
  }
};

//filter comments for each section
const filterComments = (type, comments) => {
  return comments.filter(
    (comment) => comment.type.toUpperCase() == type.toUpperCase()
  );
};
//filter comments for each title
const getCommentsByTitle = (title, comments) => {
  return comments.filter(
    (comment) =>
      comment.title.toUpperCase() == title.toUpperCase() &&
      comment.type == "description"
  );
};

//group description comments based on title
const groupComments = (comments) => {
  return comments.reduce(
    (group, arr) => {
      const { title } = arr;

      group[title] = group[title] ?? [];

      group[title].push(arr);

      return group;
    },

    {}
  );
};

export { getCommentsList, filterComments, getCommentsByTitle, groupComments };
