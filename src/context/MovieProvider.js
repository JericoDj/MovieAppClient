// context/MovieProvider.js
import React, { createContext, useEffect, useState } from "react";
import MovieController from "../controller/MovieController";


export const MovieContext = createContext();

export default function MovieProvider({ children }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all movies on mount
  const fetchMovies = async () => {
    console.log("trying to fetch movie");
    try {
      const data = await MovieController.getMovies();
      console.log("Fetched movies", data);
      setMovies(data);

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
      const updated = await MovieController.updateMovie(id, updatedMovie);
      setMovies((prev) =>
        prev.map((m) => (m._id === id ? { ...m, ...updated } : m))
      );
    } catch (err) {
      console.error("Update movie failed", err);
    }
  };

  const deleteMovie = async (id) => {
    try {
      await MovieController.deleteMovie(id);
      setMovies((prev) => prev.filter((m) => m._id !== id));
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
      }}
    >
      {children}
    </MovieContext.Provider>
  );
}
