import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";

interface IPostProps {
  post: IPost;
}

interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const Post: NextPage<IPostProps> = ({ post }) => {
  const router = useRouter();
  const { id } = router.query;
  const postItems = constructPost(post);
  return <div>{postItems}</div>;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts: IPost[] = await fetch(
    "https://jsonplaceholder.typicode.com/posts"
  ).then((response) => response.json());

  const paths = posts.map(({ id }) => ({
    params: { id: id.toString() },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post: IPost = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.id}`
  ).then((response) => response.json());

  return {
    props: {
      post,
    },
  };
};

const constructPost = (post: IPost) => {
  return (
    <div key={post.id}>
      <div>Post: {post.id}</div>
      <div>title: {post.title}</div>
      <div>body: {post.body}</div>
    </div>
  );
};

export default Post;
