"use client";
import React, { useEffect, useState } from 'react'
import Headers from '../common/header'
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import { hiddenNumber } from '@/lib/utils';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const PricePage = () => {
    const [backgroundImageSrc, setBackgroundImageSrc] = useState<string>("");
    const [priceList, setPriceList] = useState<any[]>([]);
    const [name, setName] = useState<string>("");
    const [eventType, setEventType] = useState<string>("");
    const [eventDate, setEventDate] = useState<string>("");
    const [location, setLocation] = useState<string>("");

    const router = useRouter();

    const submitHandler = (paket:string) =>{
        let prepare = "https://api.whatsapp.com/send/?phone=+6282138261223&text=Hallo%2C+terimakasih+sudah+menghubungi+kami.+Silahkan+isi+data+dulu+ya+kak+agar+kami+tau+kebutuhan+kakak😊%0ANama+:+"+name+"+%0AJenis+Acara+:+"+eventType+"%0ATanggal+:+"+eventDate+"+%0ALokasi%2Ftempat+:+"+location+"+%0ATipe+Paket+:+"+paket+"+%0A%0ATerimakasih🙏🏻&type=phone_number&app_absent=0"
        router.push(prepare);
        
        
    }


    

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
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <button className="bg-white text-black px-4 py-2 mt-4 w-full rounded-lg">
                                            Book Now
                                        </button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Please fill the form below to book this package</DialogTitle>
                                        </DialogHeader>
                                        <div className="flex flex-col">
                                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                                <Label htmlFor="name" className='mt-4'>Name</Label>
                                                <Input type="text" id="name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                                            </div>
                                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                                <Label htmlFor="eventType" className='mt-4'>Jenis Acara</Label>
                                                <Input type="text" id="eventType" placeholder="Jenis Acara" value={eventType} onChange={(e) => setEventType(e.target.value)} />
                                            </div>
                                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                                <Label htmlFor="date" className='mt-4'>Tanggal</Label>
                                                <Input type="date" id="date" placeholder="Tanggal" value={eventDate} onChange={(e) => setEventDate(e.target.value)} />
                                            </div>
                                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                                <Label htmlFor="location" className='mt-4'>Lokasi/tempat</Label>
                                                <Input type="text" id="location" placeholder="Lokasi/tempat" value={location} onChange={(e) => setLocation(e.target.value)} />
                                            </div>
                                            <Button className="mt-4 w-full max-w-sm " onClick={()=> submitHandler(item.title)}>Submit</Button>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </Card>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default PricePage