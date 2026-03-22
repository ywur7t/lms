import { configureStore } from "@reduxjs/toolkit";
import testReducer from "./Testing/Features/quizSlice";

export const store = configureStore({
  reducer: {
    lists: testReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;