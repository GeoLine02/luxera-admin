import { createSlice } from "@reduxjs/toolkit"

type initialType = {
  isEditModalOpen: boolean;
  isDeleteModalOpen: boolean;
  isCreateModalOpen: boolean;
  showPassword: boolean;
};

const initialState: initialType = {
  isEditModalOpen: false,
  isDeleteModalOpen: false,
  isCreateModalOpen: false,
  showPassword: false,
};
 
const IsOpenSlice = createSlice({
  name: "IsOpen",
  initialState,
  reducers: {
    OpenEditModal: (state) => {
      state.isEditModalOpen = !state.isEditModalOpen;
    },
    OpenDeleteModal: (state) => {
      state.isDeleteModalOpen = !state.isDeleteModalOpen;
    },
    OpenCreateModal: (state) => {
      state.isCreateModalOpen = !state.isCreateModalOpen;
    },
    ShowPassword: (state) => {
      state.showPassword = !state.showPassword;
    },
  },
});

export const {OpenCreateModal, OpenDeleteModal, OpenEditModal, ShowPassword} = IsOpenSlice.actions
export const IsOpenModals = IsOpenSlice.reducer
