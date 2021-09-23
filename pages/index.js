/* eslint-disable @next/next/link-passhref */
import { PrismaClient } from "@prisma/client";
import Link from "next/link";

export default function Home({ posts }) {
  return (
    <div className="app-container">
      <h1>Welcome to our blog</h1>
      <Link href="/about">Click test</Link>
      <div className="posts-container">
        {posts.map((post) => (
          <Link href={`/posts/${post.id}`} key={post.id}>
            <div className="posts-item">
              <h2>{post.title}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const prisma = new PrismaClient();
  const posts = await prisma.posts.findMany();
  prisma.$disconnect();

  return {
    props: { posts },
  };
}
