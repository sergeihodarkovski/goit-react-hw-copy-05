import s from "./MovieList.module.css";
import { useEffect, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { fetchAllMovies, searchMovies } from "../../services/api"; // Импортируем searchMovies
import FilterMovies from "../FilterMovies/FilterMovies";

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  const location = useLocation();
  const [searchparams, setSearchParams] = useSearchParams();
  const query = searchparams.get("query") ?? "";

  useEffect(() => {
    const fetchMovies = async () => {
      const data = query ? await searchMovies(query) : await fetchAllMovies();
      setMovies(data.results || data);
    };
    fetchMovies();
  }, [query]);

  const handleChangeQuery = (newQuery) => {
    if (!newQuery) {
      return setSearchParams({});
    }
    setSearchParams({ query: newQuery });
  };

  return (
    <div>
      <FilterMovies handleChangeQuery={handleChangeQuery} />
      <ul className={s.moviesWrapper}>
        {movies.map((movie) => (
          <li className={s.item} key={movie.id}>
            <Link to={`/movies/${movie.id.toString()}`} state={location}>
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
                width={200}
              />
              <p className={s.movieTitle}>{movie.title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
