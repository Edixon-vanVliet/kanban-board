/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { resetTask, saveTask, setErrors, updateTask } from "../../store/slices/taskSlice";
import { tags } from "../../utils/tags";

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  & label {
    display: block;
  }
  & div {
    width: 50%;
  }
`;

const Error = styled.p`
  color: red;
  margin: 0;
  font-size: 0.7em;
`;

export const Modal = ({ title, show, onClose }) => {
  const { task, errors } = useSelector(
    (state) => ({
      task: state.tasks.task,
      errors: state.tasks.errors,
    }),
    shallowEqual
  );
  const dispatch = useDispatch();
  const validate = () => {
    let errors = {};

    Object.keys(task).forEach((key) => {
      if (key !== "status" && key !== "id" && !task[key].length) {
        errors = { ...errors, [key]: `${key} is required` };
      }
    });

    dispatch(setErrors(errors));
    return !Object.keys(errors).length;
  };

  const handleChange = ({ target }) => {
    dispatch(
      updateTask({
        ...task,
        [target.name]:
          target.type === "select-multiple"
            ? Array.from(target.selectedOptions, (option) => option.value)
            : target.value,
      })
    );
  };

  const handleClose = () => {
    dispatch(resetTask());

    onClose();
  };

  return (
    show && (
      <div
        onClick={() => onClose()}
        css={css`
          position: fixed;
          left: 0;
          top: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
        `}
      >
        <div
          onClick={(event) => event.stopPropagation()}
          css={css`
            width: 500px;
            background-color: white;
          `}
        >
          <div
            css={css`
              padding: 10px;
            `}
          >
            <h4
              css={css`
                margin: 0;
              `}
            >
              {title}
            </h4>
          </div>
          <div
            css={css`
              padding: 10px;
              border-top: 1px solid #eee;
              border-bottom: 1px solid #eee;
            `}
          >
            <form
              css={css`
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 10px;
              `}
            >
              <FormGroup>
                <label htmlFor="title">
                  Title
                  <span
                    css={css`
                      color: red;
                    `}
                  >
                    *
                  </span>
                </label>
                <div>
                  <input
                    css={css`
                      width: 100%;
                    `}
                    type="text"
                    name="title"
                    value={task.title}
                    onChange={handleChange}
                  />
                  <Error>{errors["title"]}</Error>
                </div>
              </FormGroup>

              <FormGroup>
                <label htmlFor="description">
                  Description
                  <span
                    css={css`
                      color: red;
                    `}
                  >
                    *
                  </span>
                </label>
                <div>
                  <textarea
                    css={css`
                      width: 100%;
                    `}
                    name="description"
                    value={task.description}
                    onChange={handleChange}
                  />
                  <Error>{errors["description"]}</Error>
                </div>
              </FormGroup>

              <FormGroup>
                <label htmlFor="tags">
                  Tags
                  <span
                    css={css`
                      color: red;
                    `}
                  >
                    *
                  </span>
                </label>
                <div>
                  <select
                    css={css`
                      width: 100%;
                    `}
                    multiple
                    name="tags"
                    value={task.tags}
                    onChange={handleChange}
                  >
                    <option value={tags.seo}>{tags.seo}</option>
                    <option value={tags.longForm}>{tags.longForm}</option>
                    <option value={tags.blogPost}>{tags.blogPost}</option>
                  </select>
                  <Error>{errors["tags"]}</Error>
                </div>
              </FormGroup>

              <FormGroup>
                <label htmlFor="assignee">
                  Assignee
                  <span
                    css={css`
                      color: red;
                    `}
                  >
                    *
                  </span>
                </label>
                <div>
                  <input
                    css={css`
                      width: 100%;
                    `}
                    type="text"
                    name="assignee"
                    value={task.assignee}
                    onChange={handleChange}
                  />
                  <Error>{errors["assignee"]}</Error>
                </div>
              </FormGroup>

              <FormGroup>
                <label htmlFor="due">
                  Due date
                  <span
                    css={css`
                      color: red;
                    `}
                  >
                    *
                  </span>
                </label>
                <div>
                  <input
                    css={css`
                      width: 100%;
                    `}
                    type="date"
                    name="due"
                    value={task.due}
                    onChange={handleChange}
                  />
                  <Error>{errors["due"]}</Error>
                </div>
              </FormGroup>
            </form>
          </div>
          <div
            css={css`
              padding: 10px;
              display: flex;
              justify-content: end;
              gap: 10px;
            `}
          >
            <button
              css={css`
                background-color: rgb(48, 133, 214);
                color: white;
                padding: 10px 15px;
                border-radius: 5px;
                border: none;
                outline: none;
                &:hover {
                  cursor: pointer;
                }
              `}
              onClick={() => {
                if (validate()) {
                  dispatch(saveTask());
                  handleClose();
                }
              }}
            >
              Save
            </button>
            <button
              css={css`
                background-color: rgb(221, 51, 51);
                color: white;
                padding: 10px 15px;
                border-radius: 5px;
                border: none;
                outline: none;
                &:hover {
                  cursor: pointer;
                }
              `}
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )
  );
};

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
