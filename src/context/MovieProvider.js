// context/MovieProvider.js
import React, {useEffect, useState } from "react";
import MovieController from "../controller/MovieController";
import CommentController from "../controller/CommentController";
import { MovieContext } from "./MovieContext";

export default function MovieProvider({ children }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentsByMovie, setCommentsByMovie] = useState({});

  // Fetch all movies and their comments on mount
  const fetchMovies = async () => {
    console.log("trying to fetch movie");
    try {
      const movies = await MovieController.getMovies();
      console.log("Fetched movies", movies);
      setMovies(movies);
      console.log(movies, "movies setted");

      const commentMap = {};
      for (const movie of movies) {
        try {
          console.log(movie._id);
          const res = await CommentController.getComments(movie._id);
          console.log(res);
          commentMap[movie._id] = res.comments || [];
        } catch (err) {
          console.error(`Failed to fetch comments for movie ${movie._id}`, err);
        }
      }
      setCommentsByMovie(commentMap);

    } catch (error) {
      console.error("Failed to fetch movies:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const addMovie = async (movie) => {
    try {
      const newMovie = await MovieController.addMovie(movie);
      setMovies((prev) => [...prev, newMovie]);
    } catch (err) {
      console.error("Add movie failed", err);
    }
  };

  const updateMovie = async (id, updatedMovie) => {
    try {
      await MovieController.updateMovie(id, updatedMovie);
      setMovies((prev) =>
        prev.map((m) => (m._id === id ? { ...m, ...updatedMovie } : m))
      );
    } catch (err) {
      console.error("Update movie failed", err);
    }
  };

  const deleteMovie = async (id) => {
    console.log("deleting movie", id);
    try {
      await MovieController.deleteMovie(id);
      setMovies((prev) => prev.filter((m) => m._id !== id));
      setCommentsByMovie((prev) => {
        const newMap = { ...prev };
        delete newMap[id];
        return newMap;
      });
    } catch (err) {
      console.error("Delete movie failed", err);
    }
  };

  const getMovieById = async (id) => {
    try {
      return await MovieController.getMovieById(id);
    } catch (err) {
      console.error("Get movie by ID failed", err);
      return null;
    }
  };

  return (
    <MovieContext.Provider
      value={{
        movies,
        loading,
        fetchMovies,
        addMovie,
        updateMovie,
        deleteMovie,
        getMovieById,
        commentsByMovie,
        setCommentsByMovie,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
}
