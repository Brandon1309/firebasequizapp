import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentScore: 0,
  isDisabled: false,
  answerResult: "none",
};

const scoreSlice = createSlice({
  name: "score",
  initialState,
  reducers: {
    addToScore: (state, action) => {
      console.log(action.payload);
      state.currentScore = state.currentScore + 10;
      console.log(state.currentScore);
    },
    deductFromScore: (state, action) => {
      console.log(action.payload);
      state.currentScore = state.currentScore - 20;
      console.log(state.currentScore);
    },
    resetScore: (state, action) => {
      state.currentScore = 0;
    },
    activateDisabledBtns: (state, action) => {
      state.isDisabled = true;
    },
    deactivateDisabledBtns: (state, action) => {
      state.isDisabled = false;
    },
    // setAnswerWrong: (state, action) => {
    //   state.answerResult = "Wrong";
    // },

    // setAnswerCorrect: (state, action) => {
    //   state.answerResult = "Correct";
    // },
  },
});

export const {
  addToScore,
  deductFromScore,
  activateDisabledBtns,
  deactivateDisabledBtns,
  resetScore,
  // setAnswerCorrect,
  // setAnswerWrong,
} = scoreSlice.actions;
export default scoreSlice.reducer;
