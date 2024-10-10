import { useEffect, useState } from "react";
import { fetchPopularMovies } from "../../services/api";
import MovieList from "../../components/MovieList/MovieList";

const HomePage = () => {
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    const getPopularMovies = async () => {
      const data = await fetchPopularMovies();
      setPopularMovies(data);
    };
    getPopularMovies();
  }, []);

  return (
    <div>
      <MovieList movies={popularMovies} />
    </div>
  );
};

export default HomePage;
