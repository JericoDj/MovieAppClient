import React, { useState, useEffect, useContext } from "react";
import { CommentsContext } from "./CommentContext";
import CommentController from "../controller/CommentController";
import { MovieContext } from "./MovieContext";

export default function CommentProvider({ children }) {
  const { movies } = useContext(MovieContext);
  const [commentsByMovie, setCommentsByMovie] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchAllComments = async () => {
    const commentMap = {};
    for (const movie of movies) {
      try {
        const res = await CommentController.getComments(movie._id);
        commentMap[movie._id] = res.comments || [];
      } catch (err) {
        console.error(`Failed to fetch comments for movie ${movie._id}`, err);
      }
    }
    setCommentsByMovie(commentMap);
    setLoading(false);
  };

  useEffect(() => {
    if (movies.length > 0) {
      fetchAllComments();
    }
  }, [movies]);

  return (
    <CommentsContext.Provider value={{ commentsByMovie, setCommentsByMovie, loading }}>
      {children}
    </CommentsContext.Provider>
  );
}
