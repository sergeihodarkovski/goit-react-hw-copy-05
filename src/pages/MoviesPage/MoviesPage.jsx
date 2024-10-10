import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchAllMovies, fetchMoviesByQuery } from "../../services/api";
import MovieList from "../../components/MovieList/MovieList";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  useEffect(() => {
    const getMovies = async () => {
      const data = query
        ? await fetchMoviesByQuery(query)
        : await fetchAllMovies();
      console.log(data);
      setMovies(data);
    };
    getMovies();
  }, [query]);

  return (
    <div>
      <MovieList movies={movies} />
    </div>
  );
};

export default MoviesPage;
