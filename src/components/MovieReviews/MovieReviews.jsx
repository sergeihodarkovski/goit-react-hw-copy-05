import s from "./MovieReviews.module.css";
import { useEffect, useState } from "react";
import { fetchMovieReviews } from "../../services/api";
import { useParams } from "react-router-dom";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getReviews = async () => {
      const data = await fetchMovieReviews(movieId);
      setReviews(data);
    };
    getReviews();
  }, [movieId]);

  return (
    <div>
      <ul className={s.revieWrapper}>
        {reviews.map((review) => (
          <li key={review.id}>
            <p>
              <strong>Author:</strong> {review.author}
            </p>
            <p>{review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieReviews;
