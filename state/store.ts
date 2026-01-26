import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import userReducer from "./features/userSlice";
import sideMenuReducer from "./features/sideMenuSlice";

export const store = configureStore({
  reducer: {
    userReducer: userReducer,
    sideMenuReducer: sideMenuReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
