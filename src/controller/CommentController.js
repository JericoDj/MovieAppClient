const API_URL = "https://movieappapi-tw00.onrender.com/comments";

class CommentController{

    static getAuthHeaders() {
        return {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        };
    }

    static async getComments() {
        const response = await fetch(`${API_URL}/comments`, {
            method: 'GET',
            headers: this.getAuthHeaders()
        });

        if (!response.ok) {
            throw new Error('Failed to fetch comments');
        }
        return await response.json();
    }
    static async createComment(comment) {
        const response = await fetch(`${API_URL}/comments`, {
            method: 'POST',
            headers: this.getAuthHeaders(),
            body: JSON.stringify(comment)
        });
        if (!response.ok) {
            throw new Error('Failed to create comment');
        }
        return await response.json();
    }

}

export default CommentController;