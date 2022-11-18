import { css } from "@emotion/css";
import PropTypes from "prop-types";
import { useDrop } from "react-dnd";
import { SkeletonCard } from "../skeleton/SkeletonCard";
import { KanbanBoardCard } from "./KanbanBoardCard";

export const KanbanBoardColumn = ({ title, onDrop, showModal, isLoading = false, cards = [] }) => {
  const [, drop] = useDrop(
    () => ({
      accept: "Card",
      drop: ({ id }) => onDrop(id, title),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    []
  );

  return (
    <div
      ref={drop}
      className={css`
        border: 1px solid black;
      `}
    >
      <h2
        className={css`
          text-align: center;
        `}
      >
        {title}
      </h2>
      <hr />
      <div
        className={css`
          display: flex;
          flex-direction: column;
          align-items: center;
        `}
      >
        {isLoading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : (
          cards.map((card) => <KanbanBoardCard key={card.id} showModal={showModal} {...card} />)
        )}
      </div>
    </div>
  );
};

KanbanBoardColumn.propTypes = {
  title: PropTypes.string.isRequired,
  onDrop: PropTypes.func.isRequired,
  showModal: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      tags: PropTypes.arrayOf(PropTypes.string),
      assignee: PropTypes.string.isRequired,
      due: PropTypes.string.isRequired,
    })
  ),
};
