// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

// const initialState = {
//   isAuthenticated: false,
//   isloading: false,
//   User: null,
// };

// // Register user
// export const registerUser = createAsyncThunk(
//   "/auth/register",

//   async (formData) => {
//     const response = await axios.post(
//       `${import.meta.env.VITE_API_URL}/api/auth/register`,
//       formData,
//       {
//         withCredentials: true,
//       }
//     );
//     return response.data;
//   }
// );

// // Login user
// export const loginUser = createAsyncThunk(
//   "/auth/login",

//   async (formData) => {
//     const response = await axios.post(
//       `${import.meta.env.VITE_API_URL}/api/auth/login`,
//       formData,
//       {
//         withCredentials: true,
//       }
//     );
//     return response.data;
//   }
// );

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     setUser: (state, action) => {},
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(registerUser.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(registerUser.fulfilled, (state, action) => {
//         state.isLoading = false;
//         // state.User = null;\\commented
//         state.User = action.payload.user; //added
//         state.isAuthenticated = false;
//       })
//       .addCase(registerUser.rejected, (state, action) => {
//         state.isLoading = false;
//         state.User = null;
//         state.isAuthenticated = false;
//       })
//       .addCase(loginUser.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isAuthenticated = action.payload.success;
//         state.User = action.payload.success ? action.payload.user : null;
//         console.log(action);
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.isLoading = false;
//         state.User = null;
//         state.isAuthenticated = false;
//         // console.error(action.error.message);
//       });
//   },
// });

// export const { setUser } = authSlice.actions;
// export default authSlice.reducer;

// =============================================================================================================

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
export const loginUser = createAsyncThunk("auth/login", async (formData) => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/auth/login`,
    formData,
    {
      withCredentials: true,
    }
  );
  return response.data;
});

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

export const checkAuth = createAsyncThunk("auth/checkauth", async (token) => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/auth/checkauth`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Cache-Control":
          "no-store, no-cache, must-revalidate,proxy-relativedate",
        Expires: "0",
      },
    }
  );
  return response.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Logout user by resetting the state
    // logoutUser: (state) => {
    //   state.isAuthenticated = false;
    //   state.user = null;
    //   state.error = null;
    // },
    setUser: (state, action) => {},
    resetTokenAndCredentials: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
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
        sessionStorage.setItem("token", JSON.stringify(action.payload.token));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload || "Login failed"; // Handle error
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
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null; // Assuming the API returns the user data
      });
  },
});

export const { setUser, resetTokenAndCredentials } = authSlice.actions;
export default authSlice.reducer;
