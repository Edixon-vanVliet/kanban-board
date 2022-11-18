import { css } from "@emotion/css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { useDrag } from "react-dnd";
import PropTypes from "prop-types";
import { tagIcons } from "../../utils/tags";
import { memo, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTask, updateTask } from "../../store/slices/taskSlice";
import Swal from "sweetalert2";

export const KanbanBoardCard = memo(({ id, title, description, assignee, due, status, tags, showModal }) => {
  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useDispatch();

  const menuRef = useRef();
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "Card",
    item: { id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const handleEdit = () => {
    dispatch(updateTask({ id, title, description, tags, assignee, due, status }));
    showModal();
  };

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteTask(id));
        Swal.fire("Deleted!", "Your task has been deleted.", "success");
      }
    });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        event.target !== menuRef.current &&
        event.target.parentElement.parentElement !== menuRef.current &&
        event.target.parentElement.parentElement.parentElement !== menuRef.current
      ) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={drag}
      className={css`
        border: 1px solid #999;
        border-radius: 5px;
        width: 300px;
        margin: 10px;
        padding: 0px 16px;
        position: relative;
        opacity: ${isDragging ? 0.5 : 1};
      `}
    >
      <div
        className={css`
          position: absolute;
          width: calc(100% - 16px - 10px);
          top: 5px;
          display: flex;
          justify-content: space-between;
          gap: 5px;
        `}
      >
        <div
          className={css`
            display: flex;
            align-items: center;
            gap: 5px;
          `}
        >
          {tags.map((tag) => tagIcons[tag])}
        </div>
        <button
          onClick={() => setShowMenu(!showMenu)}
          className={css`
            font-size: 16px;
            background-color: transparent;
            outline: none;
            border: none;
            padding: 0px 10px;
            &:hover {
              cursor: pointer;
            }
          `}
        >
          <FontAwesomeIcon icon={faEllipsisVertical} />
          <div
            ref={menuRef}
            className={css`
              display: ${showMenu ? "block" : "none"};
              z-index: 1;
              position: absolute;
              background-color: white;
              border: 1px solid black;
              border-radius: 5px;
              width: 105px;
            `}
          >
            <ul
              className={css`
                list-style: none;
                text-align: left;
                padding: 0px;
                & li {
                  padding: 10px 20px;
                }
                & li:hover {
                  background-color: #ededed;
                }
              `}
            >
              <li onClick={handleEdit}>
                <FontAwesomeIcon icon={faEdit} color="#1e65ff" /> Edit
              </li>
              <li onClick={handleDelete}>
                <FontAwesomeIcon icon={faTrash} color="#e52f2f" /> Delete
              </li>
            </ul>
          </div>
        </button>
      </div>
      <h4
        className={css`
          text-align: center;
          margin-top: 25px;
        `}
      >
        {title}
      </h4>
      <p>{description}</p>
      <div
        className={css`
          display: flex;
          justify-content: space-between;
          font-size: 0.7em;
        `}
      >
        <p>
          <strong>Assignee: </strong>
          {assignee}
        </p>
        <p>{due}</p>
      </div>
    </div>
  );
});

KanbanBoardCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  assignee: PropTypes.string.isRequired,
  due: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  showModal: PropTypes.func.isRequired,
};
