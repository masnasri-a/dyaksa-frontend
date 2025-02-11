"use client";
import React, { useEffect, useState } from 'react'
import axios from 'axios';

const Footer = () => {
    const [logoUrl, setLogoUrl] = useState<string>("");
    useEffect(() => {
        const fetchLogo = async () => {
          try {
            const response = await axios.get(process.env.NEXT_PUBLIC_BASE_API + '/contents?populate=%2A&filters%5Bkey%5D=logo');
            const logoUrl = process.env.NEXT_PUBLIC_BASE_API?.replace("/api", "") + response.data.data[0].Media[0].url;
            setLogoUrl(logoUrl);
          } catch (error) {
            console.error("Error fetching logo:", error);
          }
        };
    
        fetchLogo();
      }, []);
    return (
        <footer className="bg-black text-white py-8">
            <div className="text-center mt-8 font-sans text-xs flex flex-col md:flex-row justify-between items-center mx-10">
            {
                logoUrl && <img src={logoUrl} alt="logo" width={100} height={100} className="mb-4 md:mb-0" />
            }
            <p>@ {new Date().getFullYear()} Dyaksa Photography x Aliendev. All rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer
