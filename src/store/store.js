import { configureStore } from "@reduxjs/toolkit";
import tasks from "./slices/taskSlice";

export const store = configureStore({
  reducer: {
    tasks,
  },
});
