"use client";
import { Card } from '@/components/ui/card';
import React, { useEffect, useState } from 'react';

interface BlogData {
  Title: string;
  Url: string;
  Photo: string;
}
const BlogPage = () => {
  const [firstContent, setFirstContent] = useState<BlogData>();
  const [blogData, setBlogData] = useState<BlogData[]>([]);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_BASE_API + '/blogs?populate=%2A');
        const data = await response.json();
        const content = data.data;
        let temps: BlogData[] = [];
        for (let i = 0; i < content.length; i++) {
          if (i === 0) {

            let tempData: BlogData = {
              Title: content[i].Title,
              Url: "/blog/" + content[i].slug,
              Photo: "http://localhost:1337" + content[i].Main.url
            }
            setFirstContent(tempData);

          } else {
            let tempData: BlogData = {
              Title: content[i].Title,
              Url: "/blog/" + content[i].slug,
              Photo: "http://localhost:1337" + content[i].Main.url
            }
            temps.push(tempData);
            
          }
        }
        setBlogData(temps);

      } catch (error) {
        console.error('Error fetching blog data:', error);
      }
    };

    fetchBlogData();
  }, []);

  if (!firstContent) {
    return <div>Loading...</div>;
  }



  return (
    <div className="mt-10">
      <div className=" p-10">
        <Card className='w-full'>
          {firstContent.Photo &&
            <a href={firstContent.Url} className='w-full relative h-[calc(60dvh)]'>
              <img src={firstContent.Photo} alt="blog" className='w-full h-[calc(60dvh)] object-cover object-center rounded-lg' />
              <div className='text-2xl font-bold z-10 absolute w-max rounded-xl top-3 left-3 p-3 text-white backdrop-blur-lg'><span>{firstContent.Title}</span></div>
            </a>
          }
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-10">
        {blogData.map((data, index) => (
          <Card key={index}>
            <a href={data.Url}>
              <div className='relative h-[calc(30dvh)]'>
                <img src={data.Photo} alt="blog" className='w-full h-[calc(30dvh)] object-cover object-center rounded-lg' />
                <div className='text-2xl font-bold z-10 absolute w-max rounded-xl top-3 left-3 p-3 text-white backdrop-blur-lg'><span>{data.Title}</span></div>
              </div>
            </a>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;