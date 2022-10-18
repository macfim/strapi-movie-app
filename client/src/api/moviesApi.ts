import axios from "axios";

axios.defaults.baseURL = "http://localhost:1337";

export const fetchMovies = async () => {
  const PARAMS = "?populate=image,movieInfo";

  const response = await axios.get(`/api/movies${PARAMS}`);
  return response;
};

export const fetchMovieById = async (id: string) => {
  const PARAMS = "?populate=image,movieInfo";

  const response = await axios.get(`/api/movies/${id}${PARAMS}`);
  return response;
};
