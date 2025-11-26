import { UserType } from "@/types/user";
import { createSlice } from "@reduxjs/toolkit";

interface InitialStateType {
  selectedUserId: number | null;
  isUserEditModalOpen: boolean;
  selectedUserData: UserType | null;
  usersData: UserType[];
}

const initialState: InitialStateType = {
  selectedUserId: null,
  isUserEditModalOpen: false,
  selectedUserData: null,
  usersData: [],
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    saveUsersData: (state, action) => {
      const users = action.payload;
      state.usersData = users;
    },

    selectUserId: (state, action) => {
      const userId = action.payload;
      state.selectedUserId = userId;
    },
    toggleUserEditModal: (state) => {
      state.isUserEditModalOpen = !state.isUserEditModalOpen;
    },

    saveSelectedUser: (state, action) => {
      const selectedUser = action.payload;
      state.selectedUserData = selectedUser;
    },
  },
});

export const {
  saveUsersData,
  selectUserId,
  toggleUserEditModal,
  saveSelectedUser,
} = userSlice.actions;
export default userSlice.reducer;
