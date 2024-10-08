import s from "./MovieDetailsPage.module.css";
import { Suspense, useEffect, useRef, useState } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import { fetchMoviesById } from "../../services/api";
import clsx from "clsx";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const location = useLocation();
  const goBackRef = useRef(location.state);

  useEffect(() => {
    const getMovieDetails = async () => {
      const data = await fetchMoviesById(movieId);
      setMovieDetails(data);
    };
    getMovieDetails();
  }, [movieId]);

  const buildLinkClass = ({ isActive }) => {
    return clsx(s.link, isActive && s.activeLink);
  };

  if (!movieDetails) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className={s.goBack}>
        <Link to={goBackRef.current ?? "/movies"}>Go back</Link>
      </div>

      <div className={s.posterWrapper}>
        <div>
          <img
            src={`https://image.tmdb.org/t/p/w300/${movieDetails.poster_path}`}
            alt={movieDetails.title}
          />
        </div>
        <div>
          <h2>{movieDetails.title}</h2>
          <p> Рейтинг фильма: {movieDetails.vote_average}</p>
          <p> Описание фильма: {movieDetails.overview}</p>
        </div>
      </div>
      <hr />
      <div className={s.linkWrapper}>
        <NavLink className={buildLinkClass} to="Reviews">
          Reviews
        </NavLink>
        <NavLink className={buildLinkClass} to="Cast">
          Cast
        </NavLink>
      </div>
      <hr />
      <Suspense fallback={<h2>Loading...</h2>}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default MovieDetailsPage;
