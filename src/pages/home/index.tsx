import { useContext, useEffect, useState, useCallback } from "react";
import {
  collection,
  query,
  onSnapshot,
  doc,
  where,
  orderBy,
} from "firebase/firestore";
import PostForm from "components/posts/PostForm";
import PostBox from "components/posts/PostBox";
import AuthContext from "context/AuthContext";
import { db } from "firebaseApp";

export interface PostProps {
  id: string;
  email: string;
  content: string;
  createAt: string;
  uid: string;
  profileUrl?: string;
  likes?: string[];
  likeCount?: number;
  comments?: string;
  hashTags?: string[];
}
// interface UserProps {
//   id: string;
// }

type tabType = "all" | "following";

const HomePage = () => {
  const [activeTab, setActiveTab] = useState<tabType>("all");
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [followingPosts, setFollowingPosts] = useState<PostProps[]>([]);
  const [followingIds, setFollowingIds] = useState<string[]>([]);
  const { user } = useContext(AuthContext);
  const getFollowingIds = useCallback(async () => {
    if (user?.uid) {
      console.log("🟢 getFollowingIds 실행됨!");
      const ref = doc(db, "following", user?.uid);
      onSnapshot(ref, (doc) => {
        const newFollowingIds: string[] = [];
        doc?.data()?.users?.forEach((user: PostProps) => {
          newFollowingIds.push(user.id);
        });
        console.log("🟡 가져온 followingIds:", newFollowingIds);
        setFollowingIds(newFollowingIds);
      });
    }
  }, [user?.uid]);

  useEffect(() => {
    if (user?.uid) {
      getFollowingIds();
    }
  }, [getFollowingIds, user?.uid]);

  useEffect(() => {
    if (user) {
      const postQuery = query(collection(db, "posts"));
      onSnapshot(postQuery, (querySnapshot) => {
        const dataObj = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc?.id,
        }));
        setPosts(dataObj as PostProps[]);
        console.log(dataObj);
      });

      if (followingIds && followingIds.length > 0) {
        const followingQuery = query(
          collection(db, "posts"),
          where("uid", "in", followingIds),
          orderBy("createAt", "desc")
        );
        onSnapshot(followingQuery, (querySnapshot) => {
          const dataObj = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc?.id,
          }));
          setFollowingPosts(dataObj as PostProps[]);
          console.log(dataObj);
        });
      } else {
        setFollowingPosts([]);
      }
    }
  }, [user, followingIds]);

  useEffect(() => {
    console.log("🔥 followingIds 업데이트됨:", followingIds);
  }, [followingIds]);

  return (
    <div className="home">
      <div className="home__top">
        <div className="home__title">Home</div>
        <div className="home__tabs">
          <div
            className={`home__tab ${
              activeTab === "all" && "home__tab--active"
            }`}
            onClick={() => setActiveTab("all")}
          >
            All
          </div>
          <div
            className={`home__tab ${
              activeTab === "following" && "home__tab--active"
            }`}
            onClick={() => setActiveTab("following")}
          >
            Following
          </div>
        </div>
      </div>
      <PostForm />
      {activeTab === "all" && (
        <div className="post">
          {posts?.length > 0 ? (
            posts.map((post) => <PostBox post={post} key={post?.id} />)
          ) : (
            <div className="post__no-posts">게시글이 없습니다.</div>
          )}
        </div>
      )}
      {activeTab === "following" && (
        <div className="post">
          {followingPosts?.length > 0 ? (
            followingPosts.map((post) => <PostBox post={post} key={post?.id} />)
          ) : (
            <div className="post__no-posts">게시글이 없습니다.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default HomePage;
