import s from "./MovieList.module.css";
import { useEffect, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { fetchAllMovies } from "../../services/api";
import FilterMovies from "../FilterMovies/FilterMovies";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const location = useLocation();

  const [searchparams, setSeanchParams] = useSearchParams();
  const query = searchparams.get("query") ?? "";

  useEffect(() => {
    const getAllMovies = async () => {
      const data = await fetchAllMovies();
      setMovies(data);
    };
    getAllMovies();
  }, []);

  const handleChangeQuery = (newQuery) => {
    if (!newQuery) {
      return setSeanchParams({});
    }
    searchparams.set("query", newQuery);
    setSeanchParams(searchparams);
  };

  const filteredData = movies.filter((movie) =>
    movie.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <FilterMovies handleChangeQuery={handleChangeQuery} />
      <ul className={s.moviesWrapper}>
        {filteredData.map((movie) => (
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
