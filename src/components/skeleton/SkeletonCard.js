import { css } from "@emotion/css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

import styles from "./SkeletonCardStyles";

export const SkeletonCard = () => {
  return (
    <div
      className={css`
        border: 1px solid #999;
        border-radius: 5px;
        width: 300px;
        margin: 10px;
        padding: 0px 16px;
        position: relative;
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
          <styles.Tag />
          <styles.Tag />
          <styles.Tag />
        </div>
        <button
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
        </button>
      </div>
      <styles.Title />
      <styles.Description>
        <styles.DescriptionText />
        <styles.DescriptionText />
        <styles.DescriptionText />
        <styles.DescriptionText />
        <styles.DescriptionText />
      </styles.Description>
      <div
        className={css`
          display: flex;
          justify-content: space-between;
          font-size: 0.7em;
        `}
      >
        <styles.Text />
        <styles.Text />
      </div>
      <styles.Shimmer>
        <div></div>
      </styles.Shimmer>
    </div>
  );
};
