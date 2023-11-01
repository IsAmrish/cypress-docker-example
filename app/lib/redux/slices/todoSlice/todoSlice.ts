/* Core */
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: TodoSliceState = {
  items: [],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addItem: (state, action: PayloadAction<string>) => {
      state.items.push({
        id: Date.now().toString(),
        title: action.payload,
        completed: false,
      });
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    toggleItem: (state, action: PayloadAction<string>) => {
      const item = state.items.find((item) => item.id === action.payload);

      if (item) {
        item.completed = !item.completed;
      }
    },
  },
});

/* Types */
export interface TodoSliceState {
  items: TodoItem[];
}

export interface TodoItem {
  id: string;
  title: string;
  completed: boolean;
}
