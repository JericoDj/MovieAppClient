const API_URL = "https://movieappapi-tw00.onrender.com/movies";

class MovieController {

    static getAuthHeaders() {
        return {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        };
    }

    static async getMovies() {
        const response = await fetch(`${API_URL}/getMovies`, {
            method: 'GET',
            headers: this.getAuthHeaders()
        });
        
        const data = await response.json();
        console.log(data, "datas");
        const movies = data.movies;
        return movies;
    }

    static async getMovieById(id) {
        const response = await fetch(`${API_URL}/getMovie/${id}`, {
            method: 'GET',
            headers: this.getAuthHeaders()
        });
        const data = await response.json();
        console.log("data waited", data);
    
   
        return data;
    }

    static async addMovie(movie) {
        console.log("adding movie");
        const response = await fetch(`${API_URL}/addMovie`, {
            method: 'POST',
            headers: this.getAuthHeaders(),
            body: JSON.stringify(movie)
        });
        const data = await response.json();
        console.log("data waited", data);
        
        return data;
    }

    static async deleteMovie(id) {
        const response = await fetch(`${API_URL}/deleteMovie/${id}`, {
            method: 'DELETE',
            headers: this.getAuthHeaders()
        });
        const data = await response.json();
        return data;
    }

    static async updateMovie(id, movie) {
        console.log("updating movie");
        console.log("movie", movie);
        console.log("id", id);
        console.log (localStorage.getItem('token'));
        

        const response = await fetch(`${API_URL}/updateMovie/${id}`, {
          method: "PATCH",
          headers: this.getAuthHeaders(),
          body: JSON.stringify(movie),
        });
        const data = await response.json();
        return data;
    }

}


export default MovieController;
