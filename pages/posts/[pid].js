import { PrismaClient } from "@prisma/client";

export default function Post({ post }) {
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <h5>{post.likes}</h5>
    </div>
  );
}

export async function getStaticPaths() {
  const prisma = new PrismaClient();
  const posts = await prisma.posts.findMany();
  const paths = posts.map((post) => {
    return {
      params: { pid: String(post.id) },
    };
  });
  prisma.$disconnect();

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const prisma = new PrismaClient();
  const post = await prisma.posts.findFirst({
    where: {
      id: Number(context.params.pid),
    },
  });
  prisma.$disconnect();

  return {
    props: { post },
    revalidate: 60, // Re-generate every 1 min
  };
}
