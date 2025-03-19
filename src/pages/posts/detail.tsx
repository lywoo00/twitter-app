import Loader from "components/loader/Loader";
import PostBox from "components/posts/PostBox";
import { PostProps } from "pages/home";
import { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "firebaseApp";
import { IoIosArrowBack } from "react-icons/io";

const PostDetail = () => {
  const params = useParams();
  const [post, setPost] = useState<PostProps | null>(null);
  const navigate = useNavigate();
  const getPost = useCallback(async () => {
    if (params.id) {
      const docRef = doc(db, "posts", params.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setPost({ ...(docSnap?.data() as PostProps), id: docSnap?.id });
      } else {
        console.log("No such document!");
      }
    }
  }, []);

  useEffect(() => {
    if (params.id) getPost();
  }, [getPost, params.id]);
  return (
    <div className="post">
      <div className="post__header">
        <button type="button" onClick={() => navigate(-1)}>
          <IoIosArrowBack />
        </button>
      </div>
      {post ? <PostBox post={post} /> : <Loader />}
    </div>
  );
};

export default PostDetail;
