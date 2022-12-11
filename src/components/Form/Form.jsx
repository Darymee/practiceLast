import React, { useState } from "react";
import toast from "react-hot-toast";
import { BiMailSend } from "react-icons/bi";
import { useAddCommentMutation } from "../../redux/commentApi";
import styles from "./Form.module.css";

export const Form = () => {
  const [addComment, { isLoading }] = useAddCommentMutation();

  const onHandleSubmit = (e) => {
    e.preventDefault();
    Object.fromEntries(new FormData(e.target));

    try {
      const data = Object.fromEntries(new FormData(e.target));
      addComment(data);
      toast.success("Your comment added");
      e.target.reset();
    } catch (error) {
      toast.error("Your comment invalid");
    }
  };

  return (
    <div className={styles.formWrapper}>
      <form className={styles.form} onSubmit={onHandleSubmit}>
        <label className={styles.label}>
          <span className={styles.labelName}>Full name</span>
          <input type="text" name="author" className={styles.input} required />
        </label>

        <label className={styles.label}>
          <span className={styles.labelName}>Your comment</span>
          <textarea className={styles.input} name="content" rows="5" required />
        </label>

        <button className={styles.formBtn}>
          <BiMailSend className={styles.icon} />
          Send
        </button>
      </form>
    </div>
  );
};
