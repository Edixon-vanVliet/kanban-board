/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { KanbanBoardColumn } from "./KanbanBoardColumn";
import { statuses } from "../../utils/statuses";
import { useCallback, useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { fetchTasks, moveTask } from "../../store/slices/taskSlice";
import { Modal } from "../modal/Modal";

export const KanbanBoard = () => {
  const dispatch = useDispatch();
  const { entities: tasksInStore, isLoading } = useSelector((state) => state.tasks, shallowEqual);
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [show, setShowModal] = useState(false);

  const showModal = useCallback(() => {
    setShowModal(true);
  }, []);

  const handleDrop = useCallback(
    (id, status) => {
      dispatch(moveTask({ id, status }));
    },
    [dispatch]
  );

  const filterByStatus = (status) => tasks.filter((task) => task.status === status);

  useEffect(() => {
    setTasks(
      tasksInStore.filter(
        (task) =>
          task.title.toLocaleLowerCase().includes(search) ||
          task.assignee.toLocaleLowerCase().includes(search) ||
          task.tags.some((tag) => tag.toLocaleLowerCase().includes(search))
      )
    );
  }, [tasksInStore, search]);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <div
      css={css`
        height: 100%;
        display: flex;
        flex-direction: column;
        gap: 10px;
      `}
    >
      <div
        css={css`
          display: flex;
          justify-content: space-between;
        `}
      >
        <input
          disabled={isLoading}
          value={search}
          onChange={({ target }) => setSearch(target.value.toLocaleLowerCase())}
          placeholder="Search..."
          css={css`
            width: 200px;
          `}
        />
        <button
          disabled={isLoading}
          onClick={showModal}
          css={css`
            background-color: #16b530;
            color: white;
            outline: none;
            border: none;
            border-radius: 5px;
            padding: 5px 10px;
            align-self: end;
            &:hover:not(:disabled) {
              cursor: pointer;
            }
            &:disabled {
              background-color: #7abf85;
            }
          `}
        >
          <FontAwesomeIcon icon={faPlus} /> Add Card
        </button>
      </div>
      <div
        css={css`
          height: 100%;
          display: grid;
          grid-template-columns: 400px 400px 400px;
        `}
      >
        <KanbanBoardColumn
          title={statuses.todo}
          cards={filterByStatus(statuses.todo)}
          onDrop={handleDrop}
          isLoading={isLoading}
          showModal={showModal}
        />
        <KanbanBoardColumn
          title={statuses.progress}
          cards={filterByStatus(statuses.progress)}
          onDrop={handleDrop}
          isLoading={isLoading}
          showModal={showModal}
        />
        <KanbanBoardColumn
          title={statuses.done}
          cards={filterByStatus(statuses.done)}
          onDrop={handleDrop}
          isLoading={isLoading}
          showModal={showModal}
        />
      </div>
      <Modal title="Create Task" show={show} onClose={() => setShowModal(false)} />
    </div>
  );
};
