import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { firestore as db } from "../../firebase/firebaseUtils";
import firebase from "../../firebase/firebaseUtils";

export const saveUserToDb = createAsyncThunk(
  "userData/saveUserToDb",
  async ({ displayName, email, photoUrl, uid }, thunkAPI) => {
    return await db
      .collection("users")
      .doc(uid)
      .set({
        displayName: displayName,
        email: email,
        photoUrl: photoUrl,
        uid: uid,
        createdAt: new Date().toString(),
        scores: [{ quizId: 0, score: 0 }],
        numberOfQuizzes: 0,
        highestScore: 0,
      })
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  }
);
export const addScoreToUserInDb = createAsyncThunk(
  "userData/addScoreToUserInDb",
  async ({ uid, score, quizId }, thunkAPI) => {
    return await db
      .collection("users")
      .doc(uid)
      .update({
        scores: firebase.firestore.FieldValue.arrayUnion({
          score: score,
          quizId: quizId,
        }),
      })
      .then(() => {
        console.log("successfully updated");
      })
      .catch((error) => {
        console.error(error);
      });
  }
);
export const incrementNumOfQuizzes = createAsyncThunk(
  "userData/incrementNumOfQuizzes",
  async (uid, thunkAPI) => {
    db.collection("users")
      .doc(uid)
      .update({
        numberOfQuizzes: firebase.firestore.FieldValue.increment(1),
      })
      .then(() => {
        console.log("success incrementing");
      })
      .catch((error) => {
        console.error(error);
      });
  }
);
export const getUserFromDb = createAsyncThunk(
  "userData/getUserFromDb",
  async (uid, thunkAPI) => {
    return await db
      .collection("users")
      .doc(uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          return doc.data();
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }
);
export const getAllUsersFromDb = createAsyncThunk(
  "userData/getAllUsersFromDb",
  async (_, thunkAPI) => {
    let array = [];
    return await db
      .collection("users")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          array.push(doc.data());
        });
        return array;
      })
      .catch((error) => {
        console.error(error);
      });
  }
);
export const setHighestScore = createAsyncThunk(
  "userData/setHighestScore",
  async ({ uid, highestScore }, thunkAPI) => {
    return await db
      .collection("users")
      .doc(uid)
      .update({
        highestScore: highestScore,
      })
      .then(() => {
        console.log("Document successfully updated!");
      })
      .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
  }
);
export const changeEmailInDb = createAsyncThunk(
  "userData/changeEmailInDb",
  async ({ uid, newEmail }, thunkAPI) => {
    var userRef = db.collection("users").doc(uid);
    return userRef
      .update({
        email: newEmail,
      })
      .then(() => {
        console.log("Document successfully updated!");
      })
      .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
  }
);
export const changeDisplayNameInDb = createAsyncThunk(
  "userData/changeDisplayNameInDb",
  async ({ uid, newDisplayName }, thunkAPI) => {
    var userRef = db.collection("users").doc(uid);
    return userRef
      .update({
        displayName: newDisplayName,
      })
      .then(() => {
        console.log("Document successfully updated!");
      })
      .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
  }
);
export const changePhotoUrlInDb = createAsyncThunk(
  "userData/changePhotoUrlInDb",
  async ({ uid, newPhotoUrl }, thunkAPI) => {
    var userRef = db.collection("users").doc(uid);
    return userRef
      .update({
        photoUrl: newPhotoUrl,
      })
      .then(() => {
        console.log("Document successfully updated!");
      })
      .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
  }
);
const initialState = {
  userInfo: {
    numQuizzes: 0,
    scores: [],
    allUsers: null,
  },
};

const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    ///////////////////////////////////////////////////////////////////// SAVE USER TO DB
    builder.addCase(saveUserToDb.pending, (state, action) => {
      console.log("pending");
    });
    builder.addCase(saveUserToDb.fulfilled, (state, action) => {
      console.log("fulfilled");
      //   console.log(action.payload);
    });
    builder.addCase(saveUserToDb.rejected, (state, action) => {
      console.error(action.payload);
      console.error("rejected");
    });
    ///////////////////////////////////////////////////////////////////// Add score to DB
    builder.addCase(addScoreToUserInDb.pending, (state, action) => {
      console.log("pending");
    });
    builder.addCase(addScoreToUserInDb.fulfilled, (state, action) => {
      console.log("fulfilled");
      //   console.log(action.payload);
    });
    builder.addCase(addScoreToUserInDb.rejected, (state, action) => {
      // console.error(action.payload);
      console.error("rejected");
    });
    ///////////////////////////////////////////////////////////////////// Increment Num of quizzes
    builder.addCase(incrementNumOfQuizzes.pending, (state, action) => {
      console.log("pending");
    });
    builder.addCase(incrementNumOfQuizzes.fulfilled, (state, action) => {
      console.log("fulfilled");

      //   console.log(action.payload);
    });
    builder.addCase(incrementNumOfQuizzes.rejected, (state, action) => {
      // console.error(action.payload);
      console.error("rejected");
    });

    ///////////////////////////////////////////////////////////////////// get user from db
    builder.addCase(getUserFromDb.pending, (state, action) => {
      console.log("pending");
    });
    builder.addCase(getUserFromDb.fulfilled, (state, action) => {
      console.log("fulfilled");
      console.log(action.payload);
      state.numQuizzes = action.payload.numberOfQuizzes;
      state.scores = action.payload.scores;
    });
    builder.addCase(getUserFromDb.rejected, (state, action) => {
      // console.error(action.payload);
      console.error("rejected");
    });
    ///////////////////////////////////////////////////////////////////// get all users from db
    builder.addCase(getAllUsersFromDb.pending, (state, action) => {
      console.log("pending");
    });
    builder.addCase(getAllUsersFromDb.fulfilled, (state, action) => {
      console.log("fulfilled");
      console.log(action.payload);
      state.allUsers = action.payload;
    });
    builder.addCase(getAllUsersFromDb.rejected, (state, action) => {
      // console.error(action.payload);
      console.error("rejected");
    });
    ///////////////////////////////////////////////////////////////////// get all users from db
    builder.addCase(changeEmailInDb.pending, (state, action) => {
      console.log("pending");
    });
    builder.addCase(changeEmailInDb.fulfilled, (state, action) => {
      console.log("fulfilled");
      console.log(action.payload);
    });
    builder.addCase(changeEmailInDb.rejected, (state, action) => {
      // console.error(action.payload);
      console.error("rejected");
    });
    ///////////////////////////////////////////////////////////////////// get all users from db
    builder.addCase(changeDisplayNameInDb.pending, (state, action) => {
      console.log("pending");
    });
    builder.addCase(changeDisplayNameInDb.fulfilled, (state, action) => {
      console.log("fulfilled");
      console.log(action.payload);
    });
    builder.addCase(changeDisplayNameInDb.rejected, (state, action) => {
      // console.error(action.payload);
      console.error("rejected");
    });
    ///////////////////////////////////////////////////////////////////// get all users from db
    builder.addCase(changePhotoUrlInDb.pending, (state, action) => {
      console.log("pending");
    });
    builder.addCase(changePhotoUrlInDb.fulfilled, (state, action) => {
      console.log("fulfilled");
      console.log(action.payload);
    });
    builder.addCase(changePhotoUrlInDb.rejected, (state, action) => {
      // console.error(action.payload);
      console.error("rejected");
    });
  },
});

export const {} = userDataSlice.actions;
export default userDataSlice.reducer;
