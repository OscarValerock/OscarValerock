import { getCollection } from "astro:content";
import type { APIRoute } from "astro";

export async function getStaticPaths() {
  const posts = await getCollection("blog");
  return posts.map(post => ({
    params: { slug: post.slug },
    props: { post }
  }));
}

export const GET: APIRoute = async ({ props }) => {
  const { post } = props;
  
  const postData = {
    content: post.body,
    title: post.data.title,
    ogImage: `/posts/${post.slug}.png`,
    metadata: {
      description: post.data.description,
      pubDate: post.data.pubDatetime,
      author: post.data.author,
      ...post.data
    }
  };

  return new Response(
    JSON.stringify(postData),
    {
      status: 200,
      headers: { 
        "Content-Type": "application/json",
        "Cache-Control": "max-age=3600"
      }
    }
  );
};