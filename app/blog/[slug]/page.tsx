import { PortableText, PortableTextBlock } from '@portabletext/react';
import { client } from '@/sanity/lib/client';

interface Blog {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage: { asset: { url: string } };
  body: PortableTextBlock[];
  publishedAt: string;
}

const BlogPost = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;

  const query = `*[_type == "post" && slug.current == $slug][0]{
    _id, 
    title, 
    slug, 
    mainImage{
      asset->{
        url
      }
    },
    body,
    publishedAt
  }`;

  const blog: Blog = await client.fetch(query, { slug });

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8">{blog.title}</h1>
      <p className="mb-4">{new Date(blog.publishedAt).toLocaleDateString()}</p>
      <img
        src={blog.mainImage?.asset?.url}
        alt={blog.title}
        className="w-full h-auto"
      />

      <div className="blog-body mt-4">
        <PortableText value={blog.body} />
      </div>
    </div>
  );
};

export default BlogPost;
