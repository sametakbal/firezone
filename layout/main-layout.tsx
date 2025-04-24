// File: app/(main)/layout.tsx
"use client";

import { useState } from 'react';
import { ThemeProvider, useTheme } from '@/contexts/theme-provider';
import Sidebar from '@/components/sidebar';
import RightSidebar from '@/components/right-sidebar';
import MobileMenu from '@/components/mobile-menu';

function MainLayoutContent({ children }: { readonly children: React.ReactNode }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { darkMode } = useTheme();

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    return (
        <div className={`min-h-screen ${darkMode ? 'bg-black text-white' : 'bg-white text-black'} transition-colors duration-300`}>
            {/* Mobile menu component */}
            <MobileMenu
                isOpen={mobileMenuOpen}
                onClose={closeMobileMenu}
                toggleMenu={toggleMobileMenu}
            />

            {/* Main container with proper Twitter-like layout */}
            <div className="flex justify-center">
                {/* Fixed width container to match Twitter's layout */}
                <div className="flex w-full max-w-[1265px]">
                    {/* Left sidebar */}
                    <Sidebar mobileMenuOpen={mobileMenuOpen} closeMobileMenu={closeMobileMenu} />

                    {/* Main content - center column with fixed width */}
                    <div className="w-full max-w-[600px] min-w-[600px] border-r border-l border-gray-800">
                        {children}
                    </div>

                    {/* Right sidebar */}
                    <RightSidebar />
                </div>
            </div>
        </div>
    );
}

export default function MainLayout({ children }: { readonly children: React.ReactNode }) {
    return (
        <ThemeProvider>
            <MainLayoutContent>
                {children}
            </MainLayoutContent>
        </ThemeProvider>
    );
}