// src/pages/Movies.jsx
import React, { useState, useEffect, useContext } from "react";
import { MovieContext } from "../../context/MovieContext";
import CommentController from "../../controller/CommentController";
import "./Movies.css";

export default function Movies() {
  const { movies } = useContext(MovieContext);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [commentInputs, setCommentInputs] = useState({});
  const [allComments, setAllComments] = useState({});
  const [loading, setLoading] = useState(false);

  const loadComments = async (movieId) => {
    setLoading(true);
    try {
      const res = await CommentController.getComments(movieId);
      setAllComments((prev) => ({ ...prev, [movieId]: res.comments }));
    } catch (err) {
      console.error("Failed to load comments", err);
    } finally {
      setLoading(false);
    }
  };

  const preloadAllComments = async () => {
    const results = await Promise.all(
      movies.map(async (movie) => {
        try {
          const res = await CommentController.getComments(movie._id);
          return { movieId: movie._id, comments: res.comments };
        } catch {
          return { movieId: movie._id, comments: [] };
        }
      })
    );
    const map = {};
    results.forEach(({ movieId, comments }) => {
      map[movieId] = comments;
    });
    setAllComments(map);
  };

  useEffect(() => {
    if (movies.length > 0) {
      preloadAllComments();
    }
  }, [movies]);

  const handleAddComment = async (movieId) => {
    const text = commentInputs[movieId];
    if (!text) return;

    const userId = JSON.parse(localStorage.getItem("userData"))._id;
    try {
      await CommentController.createComment(movieId, { comment: text });
      setCommentInputs((prev) => ({ ...prev, [movieId]: "" }));
      await loadComments(movieId);
    } catch (err) {
      console.error("Failed to add comment", err);
    }
  };

  const handleOpenModal = async (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
    await loadComments(movie._id);
  };

  return (
    <div className="movies-page">
      <h2>All Movies</h2>
      <ul className="movie-list">
        {movies.map((movie) => (
          <li key={movie._id} className="movie-item">
            <div className="movie-header">
              <strong>{movie.title}</strong>
              <span> - {movie.director} ({movie.year})</span>
            </div>
            <div className="movie-description">{movie.description}</div>
            <div className="form-actions">
              <button className="btn primary" onClick={() => console.log("Edit logic")}>Edit</button>
              <button className="btn delete" onClick={() => console.log("Delete logic")}>Delete</button>
            </div>

            <div className="comments-section">
              <ul className="comment-list">
                {(allComments[movie._id] || []).slice(0, 3).map((comment, idx) => (
                  <li key={idx} className="comment-item">{comment.comment}</li>
                ))}
              </ul>
              <div className="add-comment">
                <input
                  type="text"
                  placeholder="Add a comment"
                  value={commentInputs[movie._id] || ""}
                  onChange={(e) =>
                    setCommentInputs((prev) => ({
                      ...prev,
                      [movie._id]: e.target.value,
                    }))
                  }
                />
                <button className="btn secondary" onClick={() => handleAddComment(movie._id)}>Post</button>
              </div>
              {(allComments[movie._id]?.length || 0) > 3 && (
                <button className="btn link" onClick={() => handleOpenModal(movie)}>
                  View all comments
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>

      {showModal && selectedMovie && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>All Comments - {selectedMovie.title}</h3>
            {loading ? (
              <p className="loading">Loading...</p>
            ) : (
              <ul className="comment-list">
                {(allComments[selectedMovie._id] || []).map((c, idx) => (
                  <li key={idx} className="comment-item">{c.comment}</li>
                ))}
              </ul>
            )}
            <div className="add-comment">
              <input
                type="text"
                placeholder="Add a comment"
                value={commentInputs[selectedMovie._id] || ""}
                onChange={(e) =>
                  setCommentInputs((prev) => ({
                    ...prev,
                    [selectedMovie._id]: e.target.value,
                  }))
                }
              />
              <button className="btn primary" onClick={() => handleAddComment(selectedMovie._id)}>
                Add Comment
              </button>
            </div>
            <button className="btn secondary" onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
