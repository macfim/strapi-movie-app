import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { fetchMovieById } from "../../api/moviesApi";

import "./Movie.css";

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
  data: {
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
    meta: {
      pagination: {
        page: number;
        pageSize: number;
        pageCount: number;
        total: number;
      };
    };
  };
};

function Movie() {
  const [movie, setMovie] = useState<movie | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const id = useParams().id;
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading((prev) => !prev);
    fetchMovieById(id!)
      .then((response) => {
        setMovie(response.data);
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
          <button onClick={() => navigate(-1)}>goback</button>
        </div>
        <h1>{movie?.data.attributes.title}</h1>
        <p>{movie?.data.attributes.description}</p>
        <div>
          <ul>
            <li>duration: {movie?.data.attributes.movieInfo.duration}</li>
            <li>
              year released: {movie?.data.attributes.movieInfo.releasedYear}
            </li>
          </ul>
        </div>
        <img
          src={`${BASE_URL}${movie?.data.attributes.image.data.attributes.formats.thumbnail.url}`}
          alt={movie?.data.attributes.title}
        />
      </div>
    );
}

export default Movie;
