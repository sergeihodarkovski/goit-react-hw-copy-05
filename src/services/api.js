import axios from "axios";

const API_KEY = "cb5824f518bce8b1e765df93d5f65bb8";
const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYjU4MjRmNTE4YmNlOGIxZTc2NWRmOTNkNWY2NWJiOCIsIm5iZiI6MTcyODIyMDI4NS42MzgxOCwic3ViIjoiNjcwMjg3ZTZjOWExMGQ0NmVhN2Q0ODhmIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.0qPVPvu7r9JmH0CvPmSq9AmVgPzufw1G-4oXRYoSp9M";

const BASE_URL = "https://api.themoviedb.org/3";

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
});

export const fetchAllMovies = async () => {
  const { data } = await instance.get("/discover/movie");
  return data.results;
};

export const fetchMoviesById = async (movieId) => {
  const { data } = await instance.get(`/movie/${movieId}`);
  return data;
};

export const fetchMovieCast = async (movieId) => {
  const { data } = await instance.get(`/movie/${movieId}/credits`);
  return data.cast;
};

export const fetchMovieReviews = async (movieId) => {
  const { data } = await instance.get(`/movie/${movieId}/reviews`);
  return data.results;
};
