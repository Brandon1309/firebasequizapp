import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const getQuestionSet = createAsyncThunk(
  "data/getQuestionSet",
  async (_, thunkAPI) => {
    return await axios
      .get("https://opentdb.com/api.php?amount=10&category=18")
      .then(function (response) {
        // handle success
        console.log(response.data.results);
        return response.data.results;
      })
      .catch(function (error) {
        // handle error
        console.error(error);
      });
    //   .then(function () {
    //     // always executed
    //   });
  }
);

const initialState = {
  allQuestions: [],
};

const quizDataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    ///////////////////////////////////////////////////////////////////// SIGN OUT USER
    builder.addCase(getQuestionSet.pending, (state, action) => {
      console.log("pending");
    });
    builder.addCase(getQuestionSet.fulfilled, (state, action) => {
      console.log("fulfilled");
      state.allQuestions = action.payload;
    });
    builder.addCase(getQuestionSet.rejected, (state, action) => {
      console.error(action.payload.error);
    });
  },
});

export const {} = quizDataSlice.actions;
export default quizDataSlice.reducer;
