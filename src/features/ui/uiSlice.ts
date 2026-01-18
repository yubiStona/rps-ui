import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UiState {
  title: string;
  subtitle: string;
}

const initialState: UiState = {
  title: "",
  subtitle: "",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setPageTitle: (
      state,
      action: PayloadAction<{ title: string; subtitle?: string }>
    ) => {
      state.title = action.payload.title;
      state.subtitle = action.payload.subtitle || "";
    },
    clearPageTitle: (state) => {
      state.title = "";
      state.subtitle = "";
    },
  },
});

export const { setPageTitle, clearPageTitle } = uiSlice.actions;
export default uiSlice.reducer;
