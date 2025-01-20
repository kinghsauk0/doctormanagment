"use client";
import React from 'react'
import "./header.scss";
import Link from 'next/link';
import { Image } from 'primereact/image';
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import { useState, useEffect } from 'react';

export default function Header() {
    
    const [isScrolled, setIsScrolled] = useState(false);

  // Effect to add/remove class on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true); // Add class if scrolled more than 50px
      } else {
        setIsScrolled(false); // Remove class if scrolled back up
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
    const items = [
        {
            label: 'Home'
        },
        {
            label: 'Services',
            items: [
                {
                    label: 'Components'
                },
                {
                    label: 'Blocks'
                },
                {
                    label: 'UI Kit'
                }
            ]
        },
        {
            label: 'Doctor',
            items: [
                {
                    label: 'Components'
                },
                {
                    label: 'Blocks'
                },
                {
                    label: 'UI Kit'
                }
            ]
        },
        {
            label: 'Location',
            items: [
                {
                    label: 'Components'
                },
                {
                    label: 'Blocks'
                },
                {
                    label: 'UI Kit'
                }
            ]
        },
        {
            label: 'Pricing'
        }
    ];
    const end = <Button label="Sign In" rounded className="p-button-success ms-2 font-normal" />;

return (
    <header
      className={`header fixed w-full left-0 top-0 py-3 z-10 transition-all duration-300 ${
        isScrolled ? 'scrolledheader' : ''
      }`}
    >
        <div className="container mx-auto px-4">
          <div className='flex items-center justify-between'>
            <Link href="/" className='hdrlogo'>
                <Image src="/images/logo.webp" alt="Image" width="250" height='50' />
            </Link>
            <Menubar model={items} end={end} />
          </div>
        </div>
    </header>
  )
}
