import axiosInstance from "@modules/Shared/lib/axiosInstance";

export const getProblemsList = async () => {
  const res = await axiosInstance({
    // url of the api endpoint (can be changed)
    url: "problems/",
    method: "GET",
  });

  return res;
};
