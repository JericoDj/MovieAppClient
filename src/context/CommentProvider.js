import React, { useState, useEffect } from "react";
import { MovieContext } from "./MovieContext";
import CommentController from "../controller/CommentController"; 



export default function CommentProvider({ children }) { 

    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);

    
    const fetchComments = async (movieId) => {
        try {
        const data = await CommentController.getComments(movieId);
        setComments(data);
        } catch (error) {
        console.error("Failed to fetch comments:", error);
        } finally {
        setLoading(false);
        }
    };
    
    useEffect(() => {
        // Example usage: Fetch comments for a specific movie
        const movieId = "12345"; // Replace with actual movie ID
        fetchComments(movieId);
    }, []);
    
    return (
        <MovieContext.Provider value={{ comments, loading, fetchComments }}>
        {children}
        </MovieContext.Provider>
    );
}