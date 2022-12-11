import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filter: "",
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    filterAction: (state, { payload }) => {
      state.filter = payload;
    },
  },
});

export const { filterAction } = filterSlice.actions;

export default filterSlice.reducer;

//Selectors

export const filterSelect = (state) => state.filter.filter;
