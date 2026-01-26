import { createSlice } from "@reduxjs/toolkit";

interface InitialStateType {
  isMenuOpen: boolean;
}

const initialState: InitialStateType = {
  isMenuOpen: false,
};

const sideMenuSlice = createSlice({
  name: "sideMenuSlice",
  initialState,
  reducers: {
    toggleMenu: (state) => {
      state.isMenuOpen = !state.isMenuOpen;
    },
  },
});

export const { toggleMenu } = sideMenuSlice.actions;
export default sideMenuSlice.reducer;
