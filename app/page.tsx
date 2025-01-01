import Link from 'next/link';
import { client } from '@/sanity/lib/client';

interface Blog {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage: { asset: { url: string } };
}

const HomePage = async () => {
  const query = `*[_type == "post"]{
    _id,
    title,
    slug,
    mainImage{
      asset->{
        url
      }
    }
  }`;

  const blogs: Blog[] = await client.fetch(query);

  return (
    <div className='container mx-auto space-y-52'>
      <div className='flex justify-between items-center space-x-5 max-w-full my-5'>
        <div>
          <h1 className='text-white font-bold text-2xl'>My Blogs</h1>
        </div>
        <div className='flex items-center space-x-4'>
          <h1 className='text-2xl font-bold'>About Me</h1>
          <h1 className='text-2xl font-bold'>Follow for More</h1>
        </div>
        <div className='flex space-x-4 '>
          <button className='flex items-center bg-red-500 py-3   px-8 rounded shadow text-white font-bold'>follow Me</button>
          <button className='flex items-center bg-green-500 py-3 px-8 rounded shadow text-white font-bold'>More..</button>
        </div>

      </div>

      <div className='flex flex-col justify-center items-center space-y-5'>
        <h1 className='text-5xl font-bold '>Welcome To My Blog Website</h1>
        <p className=' text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit quam sed ea beatae aut, <br /> obcaecati commodi eaque laboriosam at nesciunt ipsum voluptatibus cumque, <br /> possimus ducimus iure, hic sint vitae fugiat sequi? Beatae?</p>
      </div><div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Blog Posts</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 ">
        {blogs.map((blog) => (
          <Link key={blog._id} href={`/blog/${blog.slug.current}`} passHref>
            <div className="card bg-white shadow-md rounded-lg overflow-hidden">
              <img
                src={blog.mainImage?.asset?.url}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-2xl text-gray-500 font-semibold">{blog.title}</h2>
                <p className="text-sm text-gray-500 mt-2">Click to read more</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>

      

    </div>
  );
};

export default HomePage;
