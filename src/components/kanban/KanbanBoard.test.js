import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { todos } from "../../data";
import { KanbanBoard } from "./KanbanBoard";
import { DndProvider } from "react-dnd";
import { TestBackend } from "react-dnd-test-backend";
import { statuses } from "../../utils/statuses";

const task = todos[0];
const mockStore = configureStore([]);
const dispatch = jest.fn();
const store = mockStore({
  tasks: {
    errors: {},
    entities: [task],
    isLoading: false,
  },
});
store.dispatch = dispatch;

describe("KanbanBoard tests", () => {
  test("should render correctly", async () => {
    render(
      <Provider store={store}>
        <DndProvider backend={TestBackend}>
          <KanbanBoard />
        </DndProvider>
      </Provider>
    );

    // search
    expect(screen.getByRole("textbox")).toBeInTheDocument();

    // button
    expect(screen.getByText("Add Task")).toBeInTheDocument();

    // columns
    expect(screen.getByText(statuses.todo)).toBeInTheDocument();
    expect(screen.getByText(statuses.progress)).toBeInTheDocument();
    expect(screen.getByText(statuses.done)).toBeInTheDocument();

    // cards
    expect(screen.getByText(task.title)).toBeInTheDocument();
    expect(screen.getByText(task.description)).toBeInTheDocument();
    expect(screen.getByText(task.assignee)).toBeInTheDocument();
    expect(screen.getByText(task.due)).toBeInTheDocument();
    expect(screen.getByRole("img", { name: task.tags[0] })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: task.tags[1] })).toBeInTheDocument();
  });
});
