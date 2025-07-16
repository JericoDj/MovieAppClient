import React, { useContext, useState } from "react";
import { MovieContext } from "../../context/MovieContext";
import { CommentsContext } from "../../context/CommentContext";
import CommentController from "../../controller/CommentController";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const { movies, addMovie, updateMovie, deleteMovie, getMovieById } = useContext(MovieContext);
  const { commentsByMovie, setCommentsByMovie } = useContext(CommentsContext);

  const [form, setForm] = useState({});
  const [editForm, setEditForm] = useState({});
  const [editingId, setEditingId] = useState("");
  const [searchId, setSearchId] = useState("");
  const [searchedMovie, setSearchedMovie] = useState(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [newComments, setNewComments] = useState({}); // stores input per movie

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    addMovie(form);
    setForm({});
  };

  const handleEdit = (movie) => {
    setEditingId(movie._id);
    setEditForm({
      title: movie.title,
      director: movie.director,
      year: movie.year,
      genre: movie.genre,
      description: movie.description,
    });
    setShowEditDialog(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    updateMovie(editingId, editForm);
    setEditForm({});
    setShowEditDialog(false);
    setEditingId(null);
  };

  const handleCancelEdit = (e) => {
    e.preventDefault();
    setEditingId(null);
    setEditForm({});
    setShowEditDialog(false);
  };

  const handleDelete = (id) => {
    deleteMovie(id);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const movie = await getMovieById(searchId);
      setSearchedMovie(movie ? { ...movie } : null);
    } catch (error) {
      console.error("Failed to fetch movie:", error);
      setSearchedMovie(null);
    }
  };

  const handleCommentInput = (movieId, value) => {
    setNewComments((prev) => ({ ...prev, [movieId]: value }));
  };

  const handleAddComment = async (movieId) => {
    const commentText = newComments[movieId]?.trim();
    if (!commentText) return;

    try {
      const res = await CommentController.createComment(movieId, commentText);

      setCommentsByMovie((prev) => ({
        ...prev,
        [movieId]: [...(prev[movieId] || []), res],
      }));

      setNewComments((prev) => ({ ...prev, [movieId]: "" }));
    } catch (err) {
      alert("Error adding comment: " + err.message);
    }
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>

      {/* Add / Update Movie Form */}
      <form onSubmit={editingId ? handleUpdate : handleAdd} className="movie-form">
        <input name="title" placeholder="Title" value={form.title || ""} onChange={handleChange} required />
        <input name="director" placeholder="Director" value={form.director || ""} onChange={handleChange} required />
        <input name="year" type="number" min="1888" max={new Date().getFullYear()} placeholder="Year" value={form.year || ""} onChange={handleChange} required />
        <input name="genre" placeholder="Genre" value={form.genre || ""} onChange={handleChange} required />
        <input name="description" placeholder="Description" value={form.description || ""} onChange={handleChange} />
        <div className="form-actions">
          <button className="btn primary" type="submit">{editingId ? "Update" : "Add"} Movie</button>
          {editingId && (
            <button className="btn secondary" onClick={handleCancelEdit} type="button">Cancel</button>
          )}
        </div>
      </form>

      {/* Search Movie */}
      <form onSubmit={handleSearch} className="search-form">
        <input placeholder="Search by ID" value={searchId} onChange={(e) => setSearchId(e.target.value)} type="text" maxLength={30} />
        <button className="btn primary" type="submit">Get Movie By ID</button>
      </form>

      {/* Search Result */}
      {searchedMovie && (
        <div>
          <h4>Found Movie:</h4>
          <div>{searchedMovie.title} - {searchedMovie.director} ({searchedMovie.year})</div>
        </div>
      )}

      {/* Movie List */}
      <h3>All Movies</h3>
      <ul className="movie-list">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <li className="movie-item" key={movie._id}>
              <div className="movie-header">
                <strong>{movie.title}</strong> - {movie.director} ({movie.year})
              </div>
              <div className="movie-description">{movie.description}</div>
              <div className="form-actions">
                <button className="btn edit" onClick={() => handleEdit(movie)}>Edit</button>
                <button className="btn delete" onClick={() => handleDelete(movie._id)}>Delete</button>
              </div>

              {/* Comment section */}
              <div className="comment-form">
                <input
                  type="text"
                  placeholder="Add a comment"
                  value={newComments[movie._id] || ""}
                  onChange={(e) => handleCommentInput(movie._id, e.target.value)}
                />
                <button className="btn comment" onClick={() => handleAddComment(movie._id)}>Post</button>
              </div>

              {commentsByMovie[movie._id]?.length > 0 && (
                <ul className="comment-list">
                  {commentsByMovie[movie._id].map((comment, index) => (
                    <li key={index} className="comment-item">{comment.comment}</li>
                  ))}
                </ul>
              )}
            </li>
          ))
        ) : (
          <p>No movies available.</p>
        )}
      </ul>

      {/* Edit Modal */}
      {showEditDialog && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Edit Movie</h3>
            <form onSubmit={handleUpdate}>
              <input name="title" placeholder="Title" value={editForm.title || ""} onChange={handleEditChange} required />
              <input name="director" placeholder="Director" value={editForm.director || ""} onChange={handleEditChange} required />
              <input name="year" type="number" min="1888" max={new Date().getFullYear()} placeholder="Year" value={editForm.year || ""} onChange={handleEditChange} required />
              <input name="genre" placeholder="Genre" value={editForm.genre || ""} onChange={handleEditChange} required />
              <input name="description" placeholder="Description" value={editForm.description || ""} onChange={handleEditChange} />
              <div className="form-actions">
                <button className="btn primary" type="submit">Update</button>
                <button className="btn secondary" type="button" onClick={handleCancelEdit}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
