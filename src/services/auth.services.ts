import axios from "axios";

class AuthService {
  api: any;
  user: any;
  onAuthStateChangedCallback: any;
  constructor(baseURL) {
    this.api = axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json",
      },
    });
    this.user = null;
    this.onAuthStateChangedCallback = null;
  }

  async login({ phone_number, password }) {
    try {
      const response = await axios.post("/api/login", {
        phone_number,
        password,
      });
      const user = response.data?.data;
      this.notifyAuthStateChanged({ user, event: "login" });
      return user;
    } catch (error) {
      console.log(error);

      throw new Error(
        error?.response?.data.message ||
          error.message ||
          "Error occurred while logging in"
      );
    }
  }

  onAuthStateChanged(callback: any) {
    this.onAuthStateChangedCallback = callback;
    return () => {
      this.onAuthStateChangedCallback = null;
    };
  }

  private notifyAuthStateChanged({ user, event }: any) {
    if (user) {
      if (event === "update") {
        const existingUserJson = localStorage.getItem("user");
        const existingUser = JSON.parse(existingUserJson);
        localStorage.setItem(
          "user",
          JSON.stringify({ ...existingUser, ...user })
        ); // Store user in localStorage
      } else {
        localStorage.setItem("user", JSON.stringify(user)); // Store user in localStorage
      }
    } else {
      localStorage.removeItem("user"); // Remove user from localStorage
    }

    if (this.onAuthStateChangedCallback) {
      this.onAuthStateChangedCallback({ user, event });
    }
  }

  async refresh_token() {
    const userItem = localStorage.getItem("user");
    const session = userItem
      ? JSON.parse(localStorage.getItem("user") || "")
      : undefined;
    if (!session?.accessToken)
      throw new Error("No access token found, please login again");

    const refreshToken = session.refreshToken;
    if (!refreshToken)
      throw new Error("No refresh token found, please login again");
    return await this.api
      .post("/users/refresh-token", {})
      .then((e) => {
        const user = e.data;
        this.notifyAuthStateChanged({ user, event: "refresh" });
        return user;
      })
      .catch(async (e) => {
        if (e.response.status === 401) {
          await this.logout();
        }
        return null;
      });
  }

  async getCurrentUser() {
    try {
      return new Promise((resolve, reject) => {
        const userItem = localStorage.getItem("user");
        const session = userItem
          ? JSON.parse(localStorage.getItem("user") || "")
          : undefined;
        setTimeout(() => {
          if (session) {
            resolve(session);
          } else {
            reject(null);
          }
        }, 2000);
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getToken() {
    const localUser = localStorage.getItem("user");
    if (localUser) Error("No user session available");
    const session = JSON.parse(localUser);
    if (!session?.accessToken)
      throw new Error("No access token found, please login again");
    return session.accessToken;
  }

  async getUser() {
    try {
      const localUser = localStorage.getItem("user");
      if (localUser) Error("No user session available");
      const session = JSON.parse(localUser || "");
      const token = session?.accessToken;

      if (!token)
        throw new Error(
          "No access token found, please login again to get a new access token"
        );

      const response = await this.api.get("/users/current-user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const user = response.data;
      return user;
    } catch (error) {
      console.log(error);
      throw new Error(
        error?.response?.data.message ||
          error.message ||
          "Error occurred while getting user"
      );
    }
  }

  async register({ password, email, first_name, last_name }) {
    try {
      const response = await this.api.post("/users/register", {
        password,
        email,
        username: `${first_name} ${last_name}`,
      });
      const user = response.data;

      this.notifyAuthStateChanged({ user, event: "register" });
      return user;
    } catch (error) {
      throw new Error(
        error?.response?.data.message ||
          error.message ||
          "Error occurred while registering"
      );
    }
  }

  async logout() {
    try {
      const localUser = localStorage.getItem("user");
      if (localUser) {
        const session = JSON.parse(localUser || "");
        const token = session?.accessToken;
        if (!token)
          throw new Error(
            "No access token found, please login again to get a new access token"
          );
        await this.api.post(
          "/users/logout",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
              refresh_token: session.refreshToken,
            },
          }
        );
        localStorage.removeItem("user");
        this.notifyAuthStateChanged({ user: null, event: "logout" });
      }
    } catch (error) {
      throw new Error(
        error?.response?.data.message ||
          error.message ||
          "Error occurred while logging out"
      );
    }
  }
}

const authService = new AuthService(import.meta.env.VITE_API_URL);

export default authService;
