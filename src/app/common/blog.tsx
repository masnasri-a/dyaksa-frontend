import Image from 'next/image'
import React from 'react'
import Assets1 from '@/../public/assets-1.png'

const BlogLanding = () => {
    interface Blog {
        url: string;
        slug: string;
    }

    const [blogs, setBlogs] = React.useState<Blog[]>([]);

    React.useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch(process.env.NEXT_PUBLIC_BASE_API + '/blogs?pagination%5Blimit%5D=3&populate=%2A');
                const data = await response.json();
                const content = data.data;
                for (let i = 0; i < content.length; i++) {
                    const contents = {
                        "url": process.env.NEXT_PUBLIC_BASE_API?.replace("/api", "") + content[i].Main.url,
                        "slug": content[i].slug
                    }
                    setBlogs(prevBlogs => [...prevBlogs, contents]);
                }

            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };

        fetchBlogs();
    }, []);
    return (
        <div className='w-full flex flex-col items-center space-y-5 mt-10 mb-10'>
            <Image src={Assets1} alt='blog' className='h-8 object-cover w-8' />
            <span className='text-2xl font-bold'>Portofolio</span>
            <div className="flex flex-wrap gap-4 justify-center md:justify-center">
            {blogs && blogs.map((blog, index) => (
                <div key={index} className='w-full md:w-3/12 h-80 relative'>
                <a href={`/blog/${blog.slug}`} className='w-full h-full'>
                    <Image src={blog.url} alt='blog' className='h-80 object-cover w-full' width={500} height={320} />
                </a>
                </div>))}
            </div>
            <button className='border px-4 py-1 flex items-center justify-center text-neutral-700 border-neutral-500 rounded-2xl font-light text-sm hover:blu hover:text-black hover:transition'><span>View All Portofolio</span></button>
        </div>
    )
}

export default BlogLanding