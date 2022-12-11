import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import {
  useUpdateCommentCountMutation,
  useDeleteCommentMutation,
} from "../../redux/commentApi";

import styles from "./Button.module.css";

export const Button = ({ children, counter, role = "thumbsUp", id }) => {
  const [updateCommentCount, { isLoading }] = useUpdateCommentCountMutation();
  const [deleteComment] = useDeleteCommentMutation();

  const variants = {
    [styles.thumbsUp]: role === "thumbsUp",
    [styles.thumbsDown]: role === "thumbsDown",
    [styles.delete]: role === "delete",
  };

  const handleThumb = async () => {
    try {
      if (role === "delete") {
        return await deleteComment({ id });
      }
      await updateCommentCount({
        id,
        [role]: counter + 1,
      });
    } catch (error) {}
  };

  return (
    <button
      className={classNames(styles.button, variants)}
      type="button"
      counter={counter}
      onClick={handleThumb}
      id={id}
    >
      {children}

      {!!counter && (
        <span className={styles.counter}>
          <span
            className={classNames({
              [styles.ping]: isLoading,
            })}
          />
          {counter}
        </span>
      )}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  counter: PropTypes.number,
  role: PropTypes.string,
  id: PropTypes.string.isRequired,
};
