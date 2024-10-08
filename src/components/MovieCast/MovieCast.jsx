import s from "./MovieCast.module.css";
import { useEffect, useState } from "react";
import { fetchMovieCast } from "../../services/api";
import { useParams } from "react-router-dom";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const getCast = async () => {
      const data = await fetchMovieCast(movieId);
      setCast(data);
    };
    getCast();
  }, [movieId]);

  return (
    <div>
      <ul className={s.actorWrapper}>
        {cast.map((actor) => (
          <li className={s.item} key={actor.id}>
            {actor.profile_path && (
              <img
                src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
                alt={actor.name}
                width={200}
              />
            )}
            <h3>{actor.name}</h3>
            <h3>Character</h3>
            <p> {actor.character}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
