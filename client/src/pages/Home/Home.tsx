import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { fetchMovies } from "../../api/moviesApi";

import "./Home.css";

const BASE_URL = "http://localhost:1337";

type image = {
  data: {
    id: number;
    attributes: {
      name: string;
      width: number;
      height: number;
      url: "string";
      formats: {
        thumbnail: {
          url: "string";
          width: number;
          height: number;
        };
      };
    };
  };
};

type movie = {
  id: number;
  attributes: {
    title: string;
    description: string;
    image: image;
    movieInfo: {
      id: number;
      duration: string;
      releasedYear: string;
    };
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
};

type movies = {
  data: movie[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};

function Home() {
  const [movies, setMovies] = useState<movies | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading((prev) => !prev);
    fetchMovies()
      .then((response) => {
        setMovies(response.data);
      })
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading((prev) => !prev));
  }, []);

  if (isLoading) return <div>loading...</div>;
  else if (error) return <div>{error}</div>;
  else
    return (
      <div>
        <div>
          <ul className="movies-container">
            {movies?.data.map(({ id, attributes: movie }, i) => (
              <li key={i} className="movie">
                <h2>{movie.title}</h2>
                <img
                  src={`${BASE_URL}${movie.image.data.attributes.formats.thumbnail.url}`}
                  alt={movie.title}
                />
                <button onClick={() => navigate(`/${id}`)}>show more</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
}

export default Home;
