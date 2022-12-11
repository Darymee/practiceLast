import toast from "react-hot-toast";
import { BiMailSend } from "react-icons/bi";
import { useAddCommentMutation } from "../../redux/commentApi";
import styles from "./Form.module.css";

import { Spinner } from "../Spinner/Spinner";

export const Form = () => {
  const [addComment, { isLoading }] = useAddCommentMutation();

  const onHandleSubmit = (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.target));
    const dataValidate = Object.values(data).filter((element) => !!element);

    if (dataValidate.length <= 1) {
      return toast.error("Please write something!");
    }

    try {
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
          <textarea className={styles.input} name="content" rows="5" />
        </label>

        <button className={styles.formBtn}>
          {isLoading ? (
            <Spinner size={"sm"} />
          ) : (
            <>
              <BiMailSend className={styles.icon} />
              Send
            </>
          )}
        </button>
      </form>
    </div>
  );
};
