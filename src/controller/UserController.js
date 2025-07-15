const API_URL = "https://movieappapi-tw00.onrender.com/users";

class UserController {
  // Login user
  static async login(email, password) {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      console.log("Login response data:", data);
      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }
      if (!data.access) {
        throw new Error("Login failed, no token received");
      }
      console.log("Token received:", data.access);
      return data.access;
    } catch (error) {
      throw error.message ? error : { message: "Login failed" };
    }
  }

  // Register user
  static async register(userData) {
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const responseData = await response.json();

      if (!response.ok) {
        // Ensure message is structured
        const errorMessage = responseData.message || "Registration failed";
        throw new Error(errorMessage);
      }

      return responseData;
    } catch (error) {
      // If backend throws a message
      throw new Error(error.message || "Registration failed");
    }
  }

  // Forgot password
  static async forgotPassword(email) {
    try {
      const response = await fetch(`${API_URL}/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw errorData;
      }
      return await response.json();
    } catch (error) {
      throw error.message ? error : { message: "Request failed" };
    }
  }

  static async getUserDetails(token) {
    try {
      const response = await fetch(`${API_URL}/details`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to get user details");
      }

      return data.user;
    } catch (error) {
      throw new Error(error.message || "Unable to fetch user details");
    }
  }
}

export default UserController;
