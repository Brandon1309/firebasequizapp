import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import authReducer from "../features/auth/authSlice";
import userDataReducer from "../features/users/userDataSlice";
import quizDataReducer from "../features/quizData/quizDataSlice";
import scoreReducer from "../features/score/scoreSlice";
const reducers = combineReducers({
  // persisted reducers here
  auth: authReducer,
  userData: userDataReducer,
  score: scoreReducer,
  // quizData: quizDataReducer,
});

// use nested persists here to blacklist state
const persistConfig = {
  key: "root",
  storage,
  blacklist: ["data"],
};
const quizDataPersistConfig = {
  key: "data",
  storage,
  blacklist: ["allQuestions"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: {
    persistedReducer,
    quizData: persistReducer(quizDataPersistConfig, quizDataReducer),
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export default store;
