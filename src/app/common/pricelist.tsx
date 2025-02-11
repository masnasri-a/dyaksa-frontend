import { BadgeCheck } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const Pricelist = () => {
    const [bgPrice, setBgPrice] = useState("");

    useEffect(() => {
        fetch(process.env.NEXT_PUBLIC_BASE_API + '/contents?fields=key&populate=%2A&filters%5Bkey%5D=bg-pricelist')
            .then(response => response.json())
            .then(data =>
                setBgPrice(process.env.NEXT_PUBLIC_BASE_API?.replace("/api", "") + data.data[0].Media[0].url)
            )
            .catch(error => console.error('Error fetching prices:', error));
    }, []);

    return (
        <div>
            {
                bgPrice && (
                    <div className='w-full h-96 relative flex justify-center items-center'>
                        <Image src={bgPrice} alt="price" className="object-cover w-full" fill loading='lazy' />
                        <div className="absolute z-10 text-white flex flex-col justify-center items-center w-full h-full gap-5">
                            <span className='flex gap-2 font-semibold text-3xl'>Lets Contact </span>
                            <button className='border px-4 py-1 flex gap-2 items-center justify-center text-white border-neutral-200 rounded-2xl font-normal text-sm hover:blu hover:text-white hover:transition'><BadgeCheck /><span>Access Pricelist</span></button>
                        </div>
                    </div>
                )
            }
        </div>

    );
};

export default Pricelist;