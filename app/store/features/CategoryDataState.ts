import { CategoryWithSubcategories, SubCategoryType } from "@/types/categories";
import { createSlice } from "@reduxjs/toolkit";

const initialState: CategoryWithSubcategories[] = [];

const DataSlice = createSlice({
    name: "datastate",
    initialState,
    reducers: {
        GetCategories: (state, actions) => {
            state = [...state, actions.payload];
        }
    }
})

export const { GetCategories } = DataSlice.actions;
export const DataSliceReducer = DataSlice.reducer;

