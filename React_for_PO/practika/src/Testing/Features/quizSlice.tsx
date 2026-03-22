import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ListsState {
  lists: any[]; // 👈 делаем универсальным
}

const initialState: ListsState = {
  lists: [],
};

const listsSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {
    addList: (
      state,
      action: PayloadAction<{ index: number; items: any[] }>
    ) => {
      const { index, items } = action.payload;
      state.lists[index] = items;
    },

    setDraggedItems: (
      state,
      action: PayloadAction<{ index: number; items: any[] }>
    ) => {
      const { index, items } = action.payload;
      state.lists[index] = items;
    },

    // 🔥 ВОТ ЭТО ТЕБЕ НУЖНО
    setAnswer: (
      state,
      action: PayloadAction<{ index: number; value: any }>
    ) => {
      const { index, value } = action.payload;
      state.lists[index] = value;
    },
  },
});

export const { addList, setDraggedItems, setAnswer } = listsSlice.actions;
export default listsSlice.reducer;