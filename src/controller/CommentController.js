const API_URL = "https://movieappapi-tw00.onrender.com/movies";

class CommentController {
  static getAuthHeaders() {
    return {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    };
  }

  static async getComments(id) {
    const response = await fetch(`${API_URL}/getComments/${id}`, {
      method: "GET",
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch comments");
    }
    return await response.json();
  }
  static async createComment(id, comment) {
    const userData = JSON.parse(localStorage.getItem("userData"));

    if (!userData || !userData._id) {
      throw new Error("User not authenticated");
    }

    // Send comment as raw string instead of object
    const response = await fetch(`${API_URL}/addComment/${id}`, {
      method: "PATCH",
      headers: this.getAuthHeaders(),
      body: JSON.stringify(comment), // Directly stringify the comment string
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || "Failed to create comment");
    }

    return await response.json();
  }
}
export default CommentController;
