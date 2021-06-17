import { useRouter } from "next/router";

const Post = () => {
  const router = useRouter();
  const { pid, foo } = router.query;

  return (
    <div>
      <div>Post: {pid}</div>
      <div>foo: {foo}</div>
    </div>
  );
};

export default Post;
