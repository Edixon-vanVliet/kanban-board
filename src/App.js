/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { KanbanBoard } from "./components/kanban/KanbanBoard";

function App() {
  return (
    <div
      css={css`
        height: 100vh;
      `}
    >
      <header
        css={css`
          background-color: #1e65ff;
          padding: 10px;
        `}
      >
        <h1
          css={css`
            color: white;
            max-width: 1200px;
            margin: 0 auto;
          `}
        >
          Kanban Board
        </h1>
      </header>
      <div
        css={css`
          height: calc(100vh - 130px);
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        `}
      >
        <KanbanBoard />
      </div>
    </div>
  );
}

export default App;
