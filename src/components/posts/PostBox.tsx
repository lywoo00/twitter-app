import { FaUserCircle, FaRegComment } from "react-icons/fa";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { PostProps } from "pages/home";
import { useContext } from "react";
import AuthContext from "context/AuthContext";
import {
  doc,
  deleteDoc,
  updateDoc,
  arrayRemove,
  arrayUnion,
} from "firebase/firestore";
import { db } from "firebaseApp";
import FollowingBox from "components/following/FollowingBox";
interface PostBoxProps {
  post: PostProps;
}

const PostBox = ({ post }: PostBoxProps) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleDelete = async () => {
    const confirm = window.confirm("삭제 하시겠습니까?");
    if (confirm) {
      await deleteDoc(doc(db, "posts", post?.id));
      navigate("/");
    }
  };

  const toggleLikes = async () => {
    const postRef = doc(db, "posts", post.id);
    if (user?.uid && post?.likes?.includes(user?.uid)) {
      await updateDoc(postRef, {
        likes: arrayRemove(user?.uid),
        likeCount: post?.likeCount ? post?.likeCount - 1 : 0,
      });
    } else {
      await updateDoc(postRef, {
        likes: arrayUnion(user?.uid),
        likeCount: post?.likeCount ? post?.likeCount + 1 : 1,
      });
    }
  };
  return (
    <div className="post__box" key={post?.id}>
      <div className="post__box-profile">
        <div className="post__flex justify-between">
          <div className="post__flex">
            {post?.profileUrl ? (
              <img
                src={post?.profileUrl}
                alt="post__box-profile-img"
                className="profile-"
              />
            ) : (
              <FaUserCircle className="post__box-profile-icon" />
            )}
            <div className="post__email">{post?.email}</div>
            <div className="post__createdAt">{post?.createAt}</div>
          </div>
          <FollowingBox post={post} />
        </div>
        <Link to={`/posts/${post?.id}`}>
          <div className="post__box-content">{post?.content}</div>
          <div className="post-form__hashtags">
            <span className="post-form__hashtags-outputs">
              {post?.hashTags?.map((tag, idx) => (
                <button className="post-form__hashtags-tag" key={idx}>
                  # {tag}
                </button>
              ))}
            </span>
          </div>
        </Link>
      </div>
      <div className="post__box-footer">
        <Link to={`/posts/${post?.id}`} className="post__comments">
          <FaRegComment />
          {post.comments?.length || 0}
        </Link>
        {/* 좋아요 */}
        <button type="button" className="post__likes" onClick={toggleLikes}>
          {user && post?.likes?.includes(user.uid) ? (
            <AiFillHeart />
          ) : (
            <AiOutlineHeart />
          )}
          {post?.likeCount}
        </button>
        {user?.uid === post?.uid && (
          <>
            <button type="button" className="post__edit">
              <Link to={`/posts/edit/${post?.id}`}>Edit</Link>
            </button>
            <button
              type="button"
              className="post__delete"
              onClick={handleDelete}
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PostBox;
