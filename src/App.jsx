import { Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
// import MoviesPage from "./pages/MoviesPage/MoviesPage";
// import HomePage from "./pages/HomePage/HomePage";
// import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
// import MovieDetailsPage from "./pages/MovieDetailsPage/MovieDetailsPage";
// import MovieCast from "./components/MovieCast/MovieCast";
import { Suspense, lazy } from "react";
// import MovieReviews from "./components/MovieReviews/MovieReviews";

const MoviesPage = lazy(() => import("./pages/MoviesPage/MoviesPage"));
const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));
const MovieDetailsPage = lazy(() =>
  import("./pages/MovieDetailsPage/MovieDetailsPage")
);
const MovieCast = lazy(() => import("./components/MovieCast/MovieCast"));
const MovieReviews = lazy(() =>
  import("./components/MovieReviews/MovieReviews")
);

const App = () => {
  return (
    <>
      <Navigation />
      <Suspense fallback={<h2>Loading...</h2>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="Reviews" element={<MovieReviews />} />
            <Route path="Cast" element={<MovieCast />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
