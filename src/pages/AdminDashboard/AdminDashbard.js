import React, { useContext, useState } from "react";

// Replace this with your actual MovieContext import
import { MovieContext } from '../../context/MovieContext'; 

export default function AdminDashboard () {
  const { movies, addMovie, updateMovie, deleteMovie, getMovieById } = useContext(MovieContext);

  const [form, setForm] = useState({ title: "", director: "", year: "" });
  const [editingId, setEditingId] = useState(null);
  const [searchId, setSearchId] = useState("");
  const [searchedMovie, setSearchedMovie] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    addMovie(form);
    setForm({ title: "", director: "", year: "" });
  };

  const handleEdit = (movie) => {
    setEditingId(movie.id);
    setForm({ title: movie.title, director: movie.director, year: movie.year });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    updateMovie(editingId, form);
    setEditingId(null);
    setForm({ title: "", director: "", year: "" });
  };

  const handleCancelEdit = (e) => {
    e.preventDefault();
    setEditingId(null);
    setForm({ title: "", director: "", year: "" });
  };

  const handleDelete = (id) => {
    deleteMovie(id);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const movie = getMovieById(searchId);
    setSearchedMovie(movie);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Admin Dashboard</h2>

      <form onSubmit={editingId ? handleUpdate : handleAdd}>
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <input
          name="director"
          placeholder="Director"
          value={form.director}
          onChange={handleChange}
          required
        />
        <input
          name="year"
          placeholder="Year"
          value={form.year}
          onChange={handleChange}
          required
        />
        <button type="submit">{editingId ? "Update" : "Add"} Movie</button>
        {editingId && (
          <button onClick={handleCancelEdit} style={{ marginLeft: "10px" }}>
            Cancel
          </button>
        )}
      </form>

      <hr />

      <form onSubmit={handleSearch}>
        <input
          placeholder="Search by ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        <button type="submit">Get Movie By ID</button>
      </form>

      {searchedMovie && (
        <div style={{ marginTop: "1rem" }}>
          <h4>Found Movie:</h4>
          <div>
            {searchedMovie.title} - {searchedMovie.director} ({searchedMovie.year})
          </div>
        </div>
      )}

      <hr />

      <h3>All Movies</h3>
      <ul>
        {movies > 0 ? (
          movies.map((movie) => (
            <li key={movie.id}>
              {movie.title} - {movie.director} ({movie.year})
              <button onClick={() => handleEdit(movie)} style={{ marginLeft: "10px" }}>
                Edit
              </button>
              <button onClick={() => handleDelete(movie.id)} style={{ marginLeft: "5px" }}>
                Delete
              </button>
            </li>
          ))
        ) : (
          <p>No movies available.</p>
        )}
      </ul>
    </div>
  );
}

