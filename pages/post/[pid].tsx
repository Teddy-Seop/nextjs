import { NextPage } from "next";
import { useRouter } from "next/router";

interface IPostProps {
  posts: IPost[];
}

interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const Post: NextPage<IPostProps> = ({ posts }) => {
  const router = useRouter();
  const { pid } = router.query;
  const postItems = constructPostItems(posts);
  return <div>{postItems}</div>;
};

// Post.getInitialProps = async () => {
//   const posts = await fetch("https://jsonplaceholder.typicode.com/posts").then(
//     (response) => response.json()
//   );

//   return {
//     posts,
//   };
// };

export async function getServerSideProps() {
  const posts = await fetch("https://jsonplaceholder.typicode.com/posts").then(
    (response) => response.json()
  );

  return { props: { posts } };
}

const constructPostItems = (posts: IPost[]) => {
  return posts.map((post) => {
    return (
      <div key={post.id}>
        <div>Post: {post.id}</div>
        <div>title: {post.title}</div>
        <div>body: {post.body}</div>
      </div>
    );
  });
};

export default Post;
