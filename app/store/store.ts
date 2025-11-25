import { configureStore } from "@reduxjs/toolkit";
import { DataSliceReducer } from "./features/CategoryDataState";
import { IsOpenModals } from "./features/IsOpenBoolean";

export function makeStore() {
  return configureStore({
    reducer: {
      categoryData: DataSliceReducer,
      IsOpenModals: IsOpenModals,
    },
  });
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export const store = makeStore();