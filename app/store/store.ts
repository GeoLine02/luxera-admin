import { configureStore } from "@reduxjs/toolkit";
import { DataSliceReducer } from "./features/CategoryDataState";

export function makeStore() {
  return configureStore({
    reducer: {
      categoryData: DataSliceReducer,  
    },
  });
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export const store = makeStore();