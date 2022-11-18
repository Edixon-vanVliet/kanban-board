import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { APIMock } from "../../utils/APIMock";
import { todos } from "../../data";
import { statuses } from "../../utils/statuses";

const STORE_NAME = "tasks";
const initialState = {
  task: { id: 0, title: "", description: "", tags: [], assignee: "", due: "", status: statuses.todo },
  errors: {},
  entities: [],
  isLoading: false,
};

let currentId = 0;

export const taskSlice = createSlice({
  name: STORE_NAME,
  initialState,
  reducers: {
    saveTask: (state) => {
      if (!state.task.id) {
        state.task.id = ++currentId;
        state.entities.push(state.task);
      } else {
        state.entities = state.entities.map((task) => {
          if (task.id === state.task.id) {
            return state.task;
          }

          return task;
        });
      }

      localStorage.setItem(STORE_NAME, JSON.stringify(state.entities));
      state.task = initialState.task;
    },
    resetTask: (state) => {
      state.task = initialState.task;
    },
    updateTask: (state, { payload: task }) => {
      state.task = task;
    },
    setErrors: (state, { payload: errors }) => {
      state.errors = errors;
    },
    deleteTask: (state, { payload: id }) => {
      state.entities = state.entities.filter((task) => task.id !== id);
      localStorage.setItem(STORE_NAME, JSON.stringify(state.entities));
    },
    moveTask: (state, { payload: { id, status } }) => {
      state.entities = state.entities.map((task) => {
        if (task.id === id) {
          task.status = status;
        }

        return task;
      });

      localStorage.setItem(STORE_NAME, JSON.stringify(state.entities));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTasks.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchTasks.fulfilled, (state, { payload }) => {
      currentId = payload.reduce((previous, current) => (current.id > previous ? current.id : previous), 0);
      state.entities = payload;
      state.isLoading = false;
    });
  },
});

export const fetchTasks = createAsyncThunk("task/getAll", async (_, thunkAPI) => {
  return await APIMock(() => {
    return JSON.parse(localStorage.getItem(STORE_NAME)) || todos;
  });
});

export const { updateTask, deleteTask, moveTask, setErrors, resetTask, saveTask } = taskSlice.actions;

export default taskSlice.reducer;
