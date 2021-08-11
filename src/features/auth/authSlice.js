import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth } from "../../firebase/firebaseUtils";

export const signInUser = createAsyncThunk(
  "auth/signInUser",
  async ({ email, password }, thunkAPI) => {
    return await auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log("signed in user");
        // ...
        return user;
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.error(errorMessage);
      });
  }
);
export const signOutUser = createAsyncThunk(
  "auth/signOutUser",
  async (_, thunkAPI) => {
    return await auth
      .signOut()
      .then(() => {
        // Sign-out successful.
        console.log("signed out");
      })
      .catch((error) => {
        // An error happened.
        console.error(error);
      });
  }
);
export const updateUserDisplayName = createAsyncThunk(
  "auth/updateUserDisplayName",
  async (newDisplayName, thunkAPI) => {
    return auth.currentUser
      .updateProfile({
        displayName: newDisplayName,
      })
      .then(() => {
        // Update successful
        // ...
        console.log("update to  " + newDisplayName + "success");
        return newDisplayName;
      })
      .catch((error) => {
        // An error occurred
        console.error(error);
        // ...
      });
  }
);
export const updateUserPhotoUrl = createAsyncThunk(
  "auth/updateUserPhotoUrl",
  async (newPhotoUrl, thunkAPI) => {
    return auth.currentUser
      .updateProfile({
        photoUrl: newPhotoUrl,
      })
      .then(() => {
        // Update successful
        // ...
        console.log("update to " + newPhotoUrl + "success");
        return newPhotoUrl;
      })
      .catch((error) => {
        // An error occurred
        // ...
        console.error(error);
      });
  }
);
export const updateUserEmail = createAsyncThunk(
  "auth/updateUserEmail",
  async (newEmail, thunkAPI) => {
    return auth.currentUser
      .updateEmail(newEmail)
      .then(() => {
        // Update successful
        // ...
        console.log("update to " + newEmail + " success");
        return newEmail;
      })
      .catch((error) => {
        // An error occurred
        // ...
        console.error(error);
      });
  }
);
export const changeUserPassword = createAsyncThunk(
  "auth/changeUserPassword",
  async (newPassword, thunkAPI) => {
    const user = auth.currentUser;
    user
      .updatePassword(newPassword)
      .then(() => {
        console.log("password changed");
        // Update successful.
      })
      .catch((error) => {
        // An error ocurred
        // ...
        console.error(error);
      });
  }
);
const initialState = {
  authInfo: {
    uid: "",
    permissions: "client",
    email: "",
    isAuthenticated: false,
    displayName: "",
    photoURL: "",
  },
  currentUserId: "",
  errorMessage: "",
  successMessage: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSignInState: (state, action) => {
      console.log(action.payload);
      state.authInfo.uid = action.payload.uid;
      state.authInfo.displayName = action.payload.displayName;
      state.authInfo.permissions = "client";
      state.authInfo.email = action.payload.email;
      state.authInfo.photoUrl = action.payload.photoURL;
      state.authInfo.isAuthenticated = true;
      state.currentUserId = action.payload.uid;
    },
    clearSignInState: (state, action) => {
      state.authInfo.uid = "";
      state.authInfo.displayName = "";
      state.authInfo.permissions = "client";
      state.authInfo.email = "";
      state.authInfo.photoUrl = "";
      state.authInfo.isAuthenticated = false;
      state.currentUserId = "";
    },
  },
  extraReducers: (builder) => {
    ///////////////////////////////////////////////////////////////////// SIGN OUT USER
    builder.addCase(signInUser.pending, (state, action) => {
      console.log("pending");
    });
    builder.addCase(signInUser.fulfilled, (state, action) => {
      console.log("fulfilled");
      state.authInfo.uid = action.payload.uid;
      state.authInfo.displayName = action.payload.displayName;
      state.authInfo.permissions = "client";
      state.authInfo.email = action.payload.email;
      state.authInfo.photoUrl = action.payload.photoURL;
      state.authInfo.isAuthenticated = true;
      state.currentUserId = action.payload.uid;
    });
    builder.addCase(signInUser.rejected, (state, action) => {
      console.error(action.payload.error);
    });
    ///////////////////////////////////////////////////////////////////// update user display name
    builder.addCase(updateUserDisplayName.pending, (state, action) => {
      console.log("pending");
    });
    builder.addCase(updateUserDisplayName.fulfilled, (state, action) => {
      console.log("fulfilled");
      console.log(action.payload);
      state.authInfo.displayName = action.payload;
    });
    builder.addCase(updateUserDisplayName.rejected, (state, action) => {
      console.error(action.payload.error);
    });
    ///////////////////////////////////////////////////////////////////// update user photoUrl
    builder.addCase(updateUserPhotoUrl.pending, (state, action) => {
      console.log("pending");
    });
    builder.addCase(updateUserPhotoUrl.fulfilled, (state, action) => {
      console.log("fulfilled");
      state.authInfo.photoUrl = action.payload;
    });
    builder.addCase(updateUserPhotoUrl.rejected, (state, action) => {
      console.error(action.payload.error);
    });
    ///////////////////////////////////////////////////////////////////// update user email
    builder.addCase(updateUserEmail.pending, (state, action) => {
      console.log("pending");
    });
    builder.addCase(updateUserEmail.fulfilled, (state, action) => {
      console.log("fulfilled");
      state.authInfo.email = action.payload;
    });
    builder.addCase(updateUserEmail.rejected, (state, action) => {
      console.error(action.payload.error);
    });
    ///////////////////////////////////////////////////////////////////// change user password
    builder.addCase(changeUserPassword.pending, (state, action) => {
      console.log("pending");
    });
    builder.addCase(changeUserPassword.fulfilled, (state, action) => {
      console.log("fulfilled");
    });
    builder.addCase(changeUserPassword.rejected, (state, action) => {
      console.error(action.payload.error);
    });
  },
});

export const { setSignInState, clearSignInState } = authSlice.actions;
export default authSlice.reducer;
