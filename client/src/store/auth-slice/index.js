import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
  token: null,
  // error: null, // Add error state to manage errors
};

// Register user
export const registerUser = createAsyncThunk(
  "auth/register",
  async (formData) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/auth/register`,
      formData,
      {
        withCredentials: true,
      }
    );
    return response.data;
  }
);

// Login user

export const loginUser = createAsyncThunk(
  "auth/login",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        formData,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || "Login failed",
      });
    }
  }
);

// LogOut user
export const logoutUser = createAsyncThunk("auth/logout", async () => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/auth/logout`,
    {},

    {
      withCredentials: true,
    }
  );
  return response.data;
});

// export const checkAuth = createAsyncThunk("auth/checkauth", async () => {
//   const response = await axios.get(
//     `${import.meta.env.VITE_API_URL}/api/auth/checkauth`,
//     {
//       withCredentials: true,
//       headers: {
//         "Cache-Control":
//           "no-store, no-cache, must-revalidate,proxy-relativedate",
//         Expires: "0",
//       },
//     }
//   );
//   return response.data;
// });

// ==========================================================

// export const checkAuth = createAsyncThunk("auth/checkauth", async (token) => {
//   const response = await axios.get(
//     `${import.meta.env.VITE_API_URL}/api/auth/checkauth`,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Cache-Control":
//           "no-store, no-cache, must-revalidate,proxy-relativedate",
//       },
//     }
//   );
//   return response.data;
// });

// ================================================================
// export const checkAuth = createAsyncThunk(
//   "auth/checkauth",
//   async (_, { getState }) => {
//     const token = getState().auth.token || sessionStorage.getItem("token");
//     if (!token) throw new Error("No token found");

//     console.log("Sending token:", token);

//     const response = await axios.get(
//       `${import.meta.env.VITE_API_URL}/api/auth/checkauth`,
//       {
//         headers: { Authorization: `Bearer ${token}` },
//       }
//     );

//     return response.data;
//   }
// );
// =========================
export const checkAuth = createAsyncThunk(
  "auth/checkauth",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token || sessionStorage.getItem("token");
      if (!token) return rejectWithValue("Token not found");

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/auth/checkauth`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Auth failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    resetTokenAndCredentials: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      sessionStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle registerUser
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user; // Assuming the API returns the user data
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload || "Registration failed"; // Handle error
      })

      // Handle loginUser
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = action.payload.success ? true : false;
        state.user = action.payload.user; // Assuming the API returns the user data
        state.token = action.payload.token;
        sessionStorage.setItem("token", action.payload.token);
        sessionStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;

        console.error("Redux Login Error Payload:", action.payload); // Log payload

        // Ensure error is always an object
        state.error =
          typeof action.payload === "string"
            ? { message: action.payload }
            : action.payload || { message: "Login failed" };

        state.token = null;
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user; // Assuming the API returns the user data
        state.isAuthenticated = action.payload.success ? true : false;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload || "Login failed"; // Handle error
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null; // Assuming the API returns the user data
        state.token = null;
        sessionStorage.clear();
      })
      .addCase(logoutUser.rejected, () => {
        sessionStorage.clear();
      });
  },
});

export const { setUser, resetTokenAndCredentials } = authSlice.actions;
export default authSlice.reducer;

// ===========================================================================================
