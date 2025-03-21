import AuthContext from "context/AuthContext";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "firebaseApp";
import { PostProps } from "pages/home";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";

export interface CommentFormProps {
  post: PostProps | null;
}
const CommentForm = ({ post }: CommentFormProps) => {
  const [comment, setComment] = useState<string>("");
  const { user } = useContext(AuthContext);
  const onSubmit = async (e: any) => {
    e.preventDefault();

    if (post && user) {
      try {
        const postRef = doc(db, "posts", post?.id);
        const commentObj = {
          comment: comment,
          uid: user?.uid,
          email: user?.email,
          createAt: new Date()?.toLocaleDateString("ko", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }),
        };
        await updateDoc(postRef, {
          comments: arrayUnion(commentObj),
        });
        toast.success("댓글을 생성했습니다.");
        setComment("");
      } catch (e: any) {
        console.log(e);
      }
    }
  };
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {
      target: { name, value },
    } = e;

    if (name === "comment") {
      setComment(value);
    }
  };
  return (
    <form className="post-form" onSubmit={onSubmit}>
      <textarea
        name="comment"
        id=""
        className="post-form__textarea"
        required
        placeholder="whit is happening"
        onChange={onChange}
        value={comment}
      />
      <div className="post-form__submitarea justify-end">
        <input
          type="submit"
          value={"comment"}
          className="post-form__submit-btn"
          disabled={!comment}
        />
      </div>
    </form>
  );
};

export default CommentForm;
