import PostBox from "components/posts/PostBox";
import AuthContext from "context/AuthContext";
import { PostProps } from "pages/home";
import { useContext, useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "firebaseApp";

const SearchPage = () => {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [tagQuery, setTagQuery] = useState<string>("");
  const { user } = useContext(AuthContext);
  const onChange = (e: any) => {
    setTagQuery(e?.target?.value?.trim());
    console.log(tagQuery);
  };

  useEffect(() => {
    if (user) {
      const postQuery = query(
        collection(db, "posts"),
        where("hashTags", "array-contains-any", [tagQuery]),
        orderBy("createAt", "desc")
      );
      onSnapshot(postQuery, (snapShot) => {
        const dataObj = snapShot?.docs?.map((doc) => ({
          ...doc?.data(),
          id: doc?.id,
        }));
        setPosts(dataObj as PostProps[]);
      });
    }
  }, [tagQuery, user]);
  return (
    <div className="home">
      <div className="home__top">
        <div className="home__title">
          <div className="home_title-text">Search</div>
        </div>
        <div className="home__search-div">
          <input
            type="text"
            placeholder="해시태그 검색"
            className="home__search"
            value={tagQuery}
            onChange={onChange}
          />
        </div>
      </div>
      <div className="post">
        {posts?.length > 0 ? (
          posts.map((post) => <PostBox post={post} key={post?.id} />)
        ) : (
          <div className="post__no-posts">게시글이 없습니다.</div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
