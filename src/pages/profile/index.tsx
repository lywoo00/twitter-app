import PostBox from "components/posts/PostBox";
import AuthContext from "context/AuthContext";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "firebaseApp";
import { PostProps } from "pages/home";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const PROFILE_DEFAULT_URL = "/logo192.png";

  useEffect(() => {
    if (user) {
      const q = query(collection(db, "posts"), where("uid", "==", user.uid));
      onSnapshot(q, (querySnapshot) => {
        const dataObj = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc?.id,
        }));
        setPosts(dataObj as PostProps[]);
      });
    }
  }, []);
  return (
    <div className="home">
      <div className="home__top">
        <div className="home__title">Profile</div>
        <div className="profile">
          <img
            src={PROFILE_DEFAULT_URL}
            alt="profile"
            className="profile__image"
          />
          <button
            type="button"
            className="profile__btn"
            onClick={() => navigate("/profile/edit")}
          >
            프로필 수정
          </button>
        </div>
        <div className="profile__Text">
          <div className="profile__name">{user?.displayName || "사용자"}님</div>
          <div className="profile__email">{user?.email || ""}</div>
        </div>
        <div className="home__tabs">
          <div className="home__tab home__tab--active">For You</div>
          <div className="home__tab">Likes</div>
        </div>
      </div>
      <div className="post">
        {posts?.length > 0 ? (
          posts?.map((post) => <PostBox post={post} key={post.id} />)
        ) : (
          <div className="post__no-posts">게시글이 없습니다.</div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
