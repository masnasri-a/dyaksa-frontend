"use client";
import { useState, useEffect } from "react";

export default function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const [mainMedia, setMainMedia] = useState<string[]>([]);
  const [resolvedParams, setResolvedParams] = useState<{ slug: string } | null>(null);
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    params.then(setResolvedParams);
  }, [params]);

  useEffect(() => {
    if (!resolvedParams) return;

    async function fetchImages() {
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_BASE_API + `/blogs?populate=%2A&filters%5Bslug%5D=${resolvedParams?.slug}`);
        const data = await response.json();
        const content = data.data[0]
        setTitle(content.Title);
        let contents = []
        for (let i = 0; i < content.Photo.length; i++) {
          contents.push(process.env.NEXT_PUBLIC_BASE_API?.replace("/api", "") + content.Photo[i].url);
        }
        setMainMedia(contents);


      } catch (error) {
        console.error("Error fetching images:", error);
      }
    }

    fetchImages();
  }, [resolvedParams]);

  if (!resolvedParams) {
    return <div>Loading...</div>;
  }


  return (
    <div className="w-full bg-black min-h-dvh text-white flex justify-center items-center">
      <div className="fixed top-0 left-0 w-full h-screen text-white flex justify-start items-center z-10">
        <div className="bg-neutral-900 bg-opacity-70 w-full pt-2 text-center backdrop-blur-sm">
        <span className="font-yellowtail">Gallery of</span>
        <p className="text-2xl font-bold mb-4">{title}</p>
        </div>
      </div>
      {/* My Post: {resolvedParams.slug} */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="grid gap-4">
          <div>
            {
              mainMedia[0] && <img
                className="h-auto max-w-full rounded-lg object-cover object-center"
                src={mainMedia[0]}
                alt="gallery-photo"
              />
            }
          </div>
          <div>
            {
              mainMedia[1] && <img
                className="h-auto max-w-full rounded-lg object-cover object-center"
                src={mainMedia[1]}
                alt="gallery-photo"
              />
            }
          </div>
          <div>
            {
              mainMedia[2] && <img
                className="h-auto max-w-full rounded-lg object-cover object-center"
                src={mainMedia[2]}
                alt="gallery-photo"
              />
            }
          </div>
        </div>
        <div className="grid gap-4">
          <div>
            {
              mainMedia[3] && <img
                className="h-auto max-w-full rounded-lg object-cover object-center"
                src={mainMedia[3]}
                alt="gallery-photo"
              />
            }
          </div>
          <div>
            {
              mainMedia[4] && <img
                className="h-auto max-w-full rounded-lg object-cover object-center"
                src={mainMedia[4]}
                alt="gallery-photo"
              />
            }
          </div>
          <div>
            {
              mainMedia[5] && <img
                className="h-auto max-w-full rounded-lg object-cover object-center"
                src={mainMedia[5]}
                alt="gallery-photo"
              />
            }
          </div>
        </div>
        <div className="grid gap-4">
          <div>
            {
              mainMedia[6] && <img
                className="h-auto max-w-full rounded-lg object-cover object-center"
                src={mainMedia[6]}
                alt="gallery-photo"
              />
            }
          </div>
          <div>
            {
              mainMedia[7] && <img
                className="h-auto max-w-full rounded-lg object-cover object-center"
                src={mainMedia[7]}
                alt="gallery-photo"
              />
            }
          </div>
          <div>
            {
              mainMedia[8] && <img
                className="h-auto max-w-full rounded-lg object-cover object-center"
                src={mainMedia[8]}
                alt="gallery-photo"
              />
            }
          </div>
        </div>
        <div className="grid gap-4">
          <div>
            {
              mainMedia[9] && <img
                className="h-auto max-w-full rounded-lg object-cover object-center"
                src={mainMedia[9]}
                alt="gallery-photo"
              />
            }
          </div>
          <div>
            {
              mainMedia[10] && <img
                className="h-auto max-w-full rounded-lg object-cover object-center"
                src={mainMedia[10]}
                alt="gallery-photo"
              />
            }
          </div>
        </div>
      </div>
    </div>
  );
}