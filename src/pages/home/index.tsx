import PostForm from "components/posts/PostForm";
import PostBox from "components/posts/PostBox";

export interface PostProps {
  id: string;
  email: string;
  content: string;
  createdAt: string;
  uid: string;
  profileUrl?: string;
  likes?: string[];
  likeCount?: number;
  comments?: any;
}

const posts: PostProps[] = [
  {
    id: "1",
    email: "test@test.com",
    content: "내용",
    createdAt: "2025-03-17",
    uid: "123123",
  },
  {
    id: "2",
    email: "test2@test.com",
    content: "내용2",
    createdAt: "2025-03-17",
    uid: "123123",
  },
  {
    id: "3",
    email: "test3@test.com",
    content: "내용3",
    createdAt: "2025-03-17",
    uid: "123123",
  },
];

const HomePage = () => {
  return (
    <div className="home">
      <div className="home__title">Home</div>
      <div className="home__tabs">
        <div className="home__tab home__tab--active">For You</div>
        <div className="home__tab">Following</div>
      </div>
      <PostForm />

      <div className="post">
        {posts.map((post) => (
          <PostBox post={post} key={post?.id} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
