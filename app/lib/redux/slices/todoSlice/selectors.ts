/* Instruments */
import type { ReduxState } from "@/lib/redux";

export const getTodos = (state: ReduxState) => state.todo.items;
