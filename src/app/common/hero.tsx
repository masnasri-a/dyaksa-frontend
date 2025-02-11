import Image from 'next/image';
import React from 'react'


const Hero = () => {
    const [media, setMedia] = React.useState<string[]>([]);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(process.env.NEXT_PUBLIC_BASE_API + '/contents?populate=%2A&filters%5Bkey%5D=hero');
                const data = await response.json();
                const listMedia = data.data[0].Media;
                const medias: string[] = [];
                for (let i = 0; i < listMedia.length; i++) {
                    medias.push(process.env.NEXT_PUBLIC_BASE_API?.replace("/api", "") + listMedia[i].url);
                }
                setMedia(medias);
            } catch (error) {
                console.error('Error fetching media:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="w-full h-dvh relative flex justify-center items-center bg-black">
            {
                media.length > 0 && (
                    <Image src={media[0]} alt="Picture of the author" fill className="!relative object-cover z-0 opacity-80 " />
                )
            }
            <div className="absolute top-0 left-0 z-10 flex flex-col justify-center items-center w-full h-full text-white gap-5 px-4">
                <div className="flex items-center justify-center gap-3">
                    <div className="h-[1px] w-16 md:w-28 bg-white"></div>
                    <span className='text-sm md:text-xl mb-2'>Dyaksa Photography</span>
                    <div className="h-[1px] w-16 md:w-28 bg-white"></div>
                </div>
                <span className='text-lg md:text-4xl w-full md:w-7/12 mx-auto text-center'>Capturing Moments, Creating Stories</span>
            </div>
        </div>
    );
}

export default Hero