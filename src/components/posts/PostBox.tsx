import { FaUserCircle, FaRegComment } from "react-icons/fa";
import { AiFillHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { PostProps } from "pages/home";

interface PostBoxProps {
  post: PostProps;
}

const PostBox = ({ post }: PostBoxProps) => {
  const handleDelete = () => {};
  return (
    <div className="post__box" key={post?.id}>
      <Link to={`/posts/${post?.id}`}>
        <div className="post__box-profile">
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
            <div className="post__createdAt">{post?.createdAt}</div>
          </div>
          <div className="post__box-content">{post?.content}</div>
        </div>
      </Link>
      <div className="post__box-footer">
        <button type="button" className="post__comments" onClick={handleDelete}>
          <FaRegComment />
          {post.comments?.length || 0}
        </button>
        <button type="button" className="post__likes">
          <AiFillHeart />
          {post?.likeCount || 0}
        </button>
        <button type="button" className="post__edit">
          <Link to={`/post/edit/${post?.id}`}>Edit</Link>
        </button>
        <button type="button" className="post__delete" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default PostBox;
