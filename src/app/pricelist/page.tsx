"use client";
import React, { useEffect, useState } from 'react'
import Headers from '../common/header'
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import { hiddenNumber } from '@/lib/utils';

const PricePage = () => {
    const [backgroundImageSrc, setBackgroundImageSrc] = useState<string>("");
    const [priceList, setPriceList] = useState<any[]>([]);

    const fetchBackgroundImage = async () => {
        try {
            const response = await fetch(process.env.NEXT_PUBLIC_BASE_API + '/contents?populate=%2A&filters%5Bkey%5D=PricelistBackground');
            const data = await response.json();
            const content = data.data[0].Media[0].url;
            setBackgroundImageSrc(process.env.NEXT_PUBLIC_BASE_API?.replace("/api", "") + content);
        } catch (error) {
            console.error('Error fetching background image:', error);
        }
    };


    const fetchPriceList = async () => {
        try {
            const response = await fetch(process.env.NEXT_PUBLIC_BASE_API + '/pricelists?populate=%2A');
            const data = await response.json();
            let priceList = [];
            for (let i = 0; i < data.data.length; i++) {
                priceList.push({
                    title: data.data[i].Title,
                    description: data.data[i].Description,
                    originalPrice: data.data[i].OriginalPrice,
                    isDiscount: data.data[i].IsDiscount,
                    discountPercentage: data.data[i].DiscountPercentage,
                    discountPrice: data.data[i].DiscountPrice,
                    logoUrl: process.env.NEXT_PUBLIC_BASE_API?.replace("/api", "") + data.data[i].Logo.url,
                    features: data.data[i].Feature
                });
            }
            setPriceList(priceList);
        } catch (error) {
            console.error('Error fetching price list:', error);
        }
    };

    useEffect(() => {
        fetchBackgroundImage();
        fetchPriceList();

    }, []);
    return (
        <div className='text-white'>
            <Headers />
            <div className="w-full h-screen bg-black text-white flex justify-center items-center">
                <div className="fixed top-0 left-0 w-full h-screen bg-black text-white flex justify-center items-center">
                    {
                        backgroundImageSrc && <img src={backgroundImageSrc} alt="background" className="w-full h-full object-cover opacity-70" />
                    }
                </div>
            </div>
            <div className="absolute top-0 left-0 w-full flex flex-col space-y-10 justify-center items-center p-4 mt-20 md:p-10">
                <div className="w-full md:w-7/12 text-start">
                    <h1 className="text-2xl md:text-4xl font-bold mb-4">Our Pricelist</h1>
                    <p className="text-sm md:text-base">Discover our competitive pricing for top-notch photography services.</p>
                    <p> We offer a range of packages to suit your needs and budget.</p>
                </div>
                <div className="flex flex-col md:flex-row gap-3 w-full md:w-7/12">
                    {
                        priceList.map((item, index) => (
                            <Card key={index} className='p-5 w-full md:w-4/12 bg-white bg-opacity-10 backdrop-blur-lg text-white rounded-lg shadow-lg'>
                                <div className="flex items-center gap-3 mb-4">
                                    <Image src={item.logoUrl} alt="logo" width={40} height={40} className="rounded-full" />
                                    <span className="text-xl md:text-2xl font-semibold">{item.title}</span>
                                </div>
                                <div className="desc mb-4">
                                    <p className="text-sm">{item.description}</p>
                                </div>
                                <div className="price mb-4">
                                    {
                                        item.isDiscount ? (
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-lg md:text-xl font-bold">Rp. {hiddenNumber(item.discountPrice)}</span>
                                                <span className="text-sm text-green-500">{item.discountPercentage}% off</span>
                                            </div>
                                        ) : (
                                            <span className="text-lg md:text-xl font-bold">Rp. {hiddenNumber(item.originalPrice)}</span>
                                        )
                                    }
                                </div>
                                <div className="feature font-sans text-sm">
                                    <ul className="list-disc list-inside font-oswald">
                                        {
                                            item.features.split("\n").map((feature: string, idx: number) => (
                                                <li key={idx}>{feature}</li>
                                            ))
                                        }
                                    </ul>
                                </div>
                                <button className="bg-white text-black px-4 py-2 mt-4 w-full rounded-lg"><a href={`https://wa.me/6282228893284?text=Halo%20Dyaksa%2C%20saya%20ingin%20memesan%20paket%20--${item.title}--%20untuk%20sesi%20foto.%20Bisa%20tolong%20informasikan%20detail%20jadwal%20yang%20tersedia%20dan%20apa%20saja%20yang%20termasuk%20dalam%20paket%20ini%3F%20Terima%20kasih`}>
                                    Book Now</a></button>
                            </Card>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default PricePage