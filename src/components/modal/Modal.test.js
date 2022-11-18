import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { statuses } from "../../utils/statuses";
import { tags } from "../../utils/tags";
import { Modal } from "./Modal";

const mockStore = configureStore([]);
const dispatch = jest.fn();
const store = mockStore({
  tasks: {
    task: {
      id: 0,
      title: "title",
      description: "description",
      tags: [tags.seo],
      assignee: "Test",
      due: "2022-01-01",
      status: statuses.todo,
    },
    errors: {},
    entities: [],
    isLoading: false,
  },
});
store.dispatch = dispatch;

describe("Modal tests", () => {
  test("should render correctly", async () => {
    render(
      <Provider store={store}>
        <Modal onClose={() => {}} show={true} title="Task" />
      </Provider>
    );

    // title
    expect(screen.getByText("Task")).toBeInTheDocument();

    //labels
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getByText("Tags")).toBeInTheDocument();
    expect(screen.getByText("Assignee")).toBeInTheDocument();
    expect(screen.getByText("Due date")).toBeInTheDocument();

    // inputs
    const inputs = screen.getAllByRole("textbox");
    expect(inputs.length).toBe(3);
    expect(inputs[0].getAttribute("name")).toBe("title");
    expect(inputs[1].getAttribute("name")).toBe("description");
    expect(inputs[2].getAttribute("name")).toBe("assignee");

    // select
    expect(screen.getByText(tags.blogPost)).toBeInTheDocument();
    expect(screen.getByText(tags.longForm)).toBeInTheDocument();
    expect(screen.getByText(tags.seo)).toBeInTheDocument();

    // buttons
    expect(screen.getByText("Save")).toBeInTheDocument();
    expect(screen.getByText("Close")).toBeInTheDocument();
  });

  test("should call onClose", () => {
    const handleClose = jest.fn();
    render(
      <Provider store={store}>
        <Modal onClose={handleClose} show={true} title="Task" />
      </Provider>
    );

    screen.getByText("Close").click();
    expect(handleClose).toBeCalled();
  });

  test("should call dispatch", () => {
    render(
      <Provider store={store}>
        <Modal onClose={() => {}} show={true} title="Task" />
      </Provider>
    );

    screen.getByText("Save").click();
    expect(dispatch).toBeCalled();
  });
});
