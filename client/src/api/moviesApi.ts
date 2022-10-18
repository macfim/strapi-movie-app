import axios from "axios";

axios.defaults.baseURL = "http://localhost:1337";

export const fetchMovies = async () => {
  const PARAMS = "?populate=image";

  const response = await axios.get(`/api/movies${PARAMS}`);
  return response;
};
