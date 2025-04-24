"use client";

import { useTheme } from '@/contexts/theme-provider';
import {
    Home, Bell, Mail, Bookmark, User, Search,
    MoreHorizontal, Sun, Moon
} from 'lucide-react';

interface SidebarProps {
    readonly mobileMenuOpen: boolean;
    readonly closeMobileMenu: () => void;
}

interface SidebarItem {
    readonly icon: React.ReactNode;
    readonly label: string;
    readonly onClick: () => void;
}

export default function Sidebar({ mobileMenuOpen, closeMobileMenu }: SidebarProps) {
    const { darkMode, toggleDarkMode } = useTheme();

    const sidebarItems: SidebarItem[] = [
        { icon: <Home />, label: 'Anasayfa', onClick: () => { } },
        { icon: <Search />, label: 'Keşfet', onClick: () => { } },
        { icon: <Bell />, label: 'Bildirimler', onClick: () => { } },
        { icon: <Mail />, label: 'Mesajlar', onClick: () => { } },
        { icon: <Bookmark />, label: 'Bookmarks', onClick: () => { } },
        { icon: <User />, label: 'Profil', onClick: () => { } },
        {
            icon: darkMode ? <Sun /> : <Moon />,
            label: darkMode ? 'Açık Mod' : 'Koyu Mod',
            onClick: toggleDarkMode,
        },
    ];

    return (
        <div
            className={`fixed md:sticky top-0 h-full md:h-screen w-72 md:w-20 lg:w-72 pt-4 px-2 lg:px-4 flex flex-col 
                 ${darkMode ? 'bg-gray border-gray-800' : 'bg-white border-gray-200'} 
                 border-r z-40 transition-all duration-300 transform 
                 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
        >
            {/* Logo */}
            <div className="mb-6 pl-2">
                <img
                    src={'/logo.png'}
                    alt="Logo"
                    className={`w-10 h-10 rounded-full bg-gray-${darkMode ? '800' : '200'} p-2`}
                />
            </div>

            {/* Navigation */}
            <nav className="mb-8">
                <ul className="space-y-1 md:space-y-4">
                    {sidebarItems.map((item, index) => (
                        <li key={index + 1} className="group">
                            <button
                                onClick={item.onClick}
                                className={`flex items-center px-4 py-2 text-xl rounded-full w-full text-left
                              ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'}`}
                            >
                                {item.icon}
                                <span className="md:hidden lg:inline ml-2"> {item.label}</span>
                            </button>
                        </li>
                    ))}

                </ul>
            </nav>

            {/* Post button */}
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-full w-full mb-3">
                <span className="md:hidden lg:inline">Post</span>
                <span className="hidden md:inline lg:hidden">+</span>
            </button>

            {/* Close mobile menu button - only visible on mobile */}
            <button
                onClick={closeMobileMenu}
                className="mt-4 py-2 rounded-full border border-gray-500 md:hidden"
            >
                Close
            </button>

            {/* User profile */}
            <div className="mt-auto mb-4">
                <div className={`flex items-center p-3 rounded-full ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'} cursor-pointer`}>
                    <img src="https://steela.ir/en/wp-content/uploads/2022/11/User-Avatar-in-Suit-PNG.png" alt="Profile" className="w-10 h-10 rounded-full mr-3" />
                    <div className="flex-grow md:hidden lg:block">
                        <p className="font-bold">Current User</p>
                        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>@currentuser</p>
                    </div>
                    <MoreHorizontal size={20} className="md:hidden lg:block" />
                </div>
            </div>
        </div >
    );
}