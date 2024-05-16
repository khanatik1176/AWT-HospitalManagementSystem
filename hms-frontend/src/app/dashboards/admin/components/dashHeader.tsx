"use client";

import React from 'react'
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import useScroll from '@/hooks/use-scroll';
import { cn } from '@/_lib/utils';
import Image from 'next/image';
import headLogo from '../../../../../public/Assets/SassLogo.jpg'

const DashHeader = () => {
    const scrolled = useScroll(5);
    const selectedLayoutSegment = useSelectedLayoutSegment();

    return (
        <div
            className={cn(
                `sticky inset-x-0 top-0 z-30 w-full transition-all border-b border-black`,
                {
                    'border-b border-black-200 bg-black backdrop-blur-sm': !scrolled,
                    'border-b border-indigo-400 bg-gray-600': selectedLayoutSegment,
                },
            )}
        >
            <div className="flex h-[47px] items-center justify-between px-4">
                <div className="flex items-center space-x-4">
                    <Link
                        href="/"
                        className="flex flex-row space-x-3 items-center justify-center md:hidden"
                    >
                        <span className="h-7 w-7 bg-black rounded-lg" />
                        <span className="font-bold text-xl flex ">Logo</span>
                    </Link>
                </div>
                
                <div className="hidden md:block">
                    <div className="h-8 w-8 rounded-full bg-zinc-300 flex items-center justify-center text-center">
                        <span className="font-semibold text-sm"><Image src={headLogo} alt='logo'></Image></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashHeader;