import AuthContext from "context/AuthContext";
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "firebaseApp";
import { PostProps } from "pages/home";
import { useCallback, useContext, useEffect, useState } from "react";

interface FollowingProps {
  post: PostProps;
}
interface UserProps {
  id: string;
}
const FollowingBox = ({ post }: FollowingProps) => {
  const { user } = useContext(AuthContext);
  const [postFollowers, setPostFollowers] = useState<any>([]);

  const onClickFollow = async () => {
    try {
      if (user?.uid) {
        const followingRef = doc(db, "following", user?.uid);
        await setDoc(
          followingRef,
          {
            users: arrayUnion({ id: post?.uid }),
          },
          { merge: true }
        );

        const followerRef = doc(db, "follower", post?.uid);
        await setDoc(
          followerRef,
          { users: arrayUnion({ id: user?.uid }) },
          { merge: true }
        );

        await addDoc(collection(db, "notifications"), {
          createAt: new Date()?.toLocaleDateString("ko", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }),
          uid: post?.uid,
          isRead: false,
          content: `"${
            user?.email || user?.displayName
          }"님이 팔로우를 했습니다.`,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onClickDeleteFollow = async () => {
    try {
      if (user?.uid) {
        const followingRef = doc(db, "following", user?.uid);
        await updateDoc(followingRef, {
          users: arrayRemove({ id: post?.uid }),
        });

        const followerRef = doc(db, "follower", post?.uid);
        await updateDoc(followerRef, {
          users: arrayRemove({ id: user?.uid }),
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getFollowers = useCallback(async () => {
    if (post?.uid) {
      const ref = doc(db, "follower", post?.uid);
      onSnapshot(ref, (doc) => {
        const newPostFollowers: string[] = [];
        doc
          ?.data()
          ?.users?.forEach((user: UserProps) => newPostFollowers.push(user.id));
        setPostFollowers(newPostFollowers);
      });
    }
  }, [post.uid]);
  useEffect(() => {
    if (post?.uid) getFollowers();
  }, [getFollowers]);
  return (
    <>
      {user?.uid !== post?.uid &&
        (postFollowers?.includes(user?.uid) ? (
          <button className="post__following-btn" onClick={onClickDeleteFollow}>
            Following
          </button>
        ) : (
          <button className="post__follow-btn" onClick={onClickFollow}>
            Follow
          </button>
        ))}
    </>
  );
};

export default FollowingBox;
