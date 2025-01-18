import { getCollection } from "astro:content";
import type { APIRoute } from "astro";

export async function getStaticPaths() {
  const posts = await getCollection("blog");
  return posts.map(post => ({
    params: { slug: post.slug }
  }));
}

export const GET: APIRoute = async ({ params, request }) => {
  try {
    const posts = await getCollection("blog");
    const post = posts.find((post) => post.slug === params.slug);

    if (!post) {
      return new Response(
        JSON.stringify({ error: "Post not found" }), 
        { 
          status: 404,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    // Build site URL from request
    const url = new URL(request.url);
    const siteUrl = `${url.protocol}//${url.host}`;
    
    // Get post metadata
    const postData = {
      content: post.body,
      title: post.data.title,
      ogImage: `${siteUrl}/posts/${post.slug}.png`,
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
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { 
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
};