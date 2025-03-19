import React, { useCallback, useEffect, useState } from "react";
import { FiImage } from "react-icons/fi";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "firebaseApp";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { PostProps } from "pages/home";

const PostEditForm = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<PostProps | null>(null);
  const [content, setContent] = useState<string>("");
  const handleFileUpload = () => {};

  const getPost = useCallback(async () => {
    if (params.id) {
      const docRef = doc(db, "posts", params.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setPost({ ...(docSnap?.data() as PostProps), id: docSnap.id });
        setContent(docSnap?.data()?.content);
      } else {
        console.log("No such document!");
      }
    }
  }, [params.id]);

  useEffect(() => {
    if (params.id) {
      getPost();
    }
  }, [getPost, params.id]);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (post) {
        const postRef = doc(db, "posts", post?.id);
        await updateDoc(postRef, {
          content: content,
        });
      }
      navigate(`post/${post?.id}`);
      toast.success("게시글을 수정했습니다.");
    } catch (error: any) {
      console.log(error);
    }
  };
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {
      target: { name, value },
    } = e;

    if (name === "content") {
      setContent(value);
    }
  };
  return (
    <form className="post-form" onSubmit={onSubmit}>
      <textarea
        className="post-form__textarea"
        name="content"
        id="content"
        value={content}
        placeholder="What is happening?"
        onChange={onChange}
        required
      />
      <div className="post-form__submitarea">
        <label htmlFor="file-input" className="post-form__file">
          <FiImage className="post-form__file-icon" />
          <input
            type="file"
            name="file-input"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>

        <input type="submit" value="수정" className="post-form__submit-btn" />
      </div>
    </form>
  );
};

export default PostEditForm;
