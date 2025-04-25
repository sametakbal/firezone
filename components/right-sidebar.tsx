// File: components/RightSidebar.tsx
"use client";

import { Search } from 'lucide-react';
import { useTheme } from '@/contexts/theme-provider';

export default function RightSidebar() {
    const { darkMode } = useTheme();

    return (
        <div className={`w-96 px-4 py-2 hidden xl:block sticky top-0 h-screen ${darkMode ? 'bg-black' : 'bg-white'}`}>
            <div className="h-full flex flex-col overflow-hidden">
                {/* Search */}
                <div className="flex-shrink-0 my-2">
                    <div className={`${darkMode ? 'bg-gray-800' : 'bg-gray-100'} rounded-full flex items-center px-4 py-2`}>
                        <Search size={20} className="text-gray-500 mr-2" />
                        <input
                            type="text"
                            placeholder="Search"
                            className={`bg-transparent border-none focus:outline-none ${darkMode ? 'text-white' : 'text-black'} w-full`}
                        />
                    </div>
                </div>

                {/* Scrollable content */}
                <div className="flex-grow overflow-y-auto pb-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
                    {/* Trends */}
                    <div className={`${darkMode ? 'bg-gray-900' : 'bg-gray-100'} rounded-2xl mb-4`}>
                        <div className={`px-4 py-3 border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
                            <h2 className="font-bold text-xl">Trends for you</h2>
                        </div>
                        {Array.from({ length: 5 }).map((_, i) => (
                            <div key={i + 1} className={`px-4 py-3 ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'} cursor-pointer`}>
                                <p className="text-gray-500 text-xs">Trending in Technology</p>
                                <p className="font-bold">#Next.js{i + 1}</p>
                                <p className="text-gray-500 text-xs">{(i + 1) * 10}K posts</p>
                            </div>
                        ))}
                        <div className={`px-4 py-3 text-orange-500 ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'} cursor-pointer rounded-b-2xl`}>
                            Show more
                        </div>
                    </div>

                    {/* Who to follow */}
                    <div className={`${darkMode ? 'bg-gray-900' : 'bg-gray-100'} rounded-2xl mb-4`}>
                        <div className={`px-4 py-3 border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
                            <h2 className="font-bold text-xl">Who to follow</h2>
                        </div>
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div key={i + 1} className={`px-4 py-3 ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'} flex items-center`}>
                                <img src="https://steela.ir/en/wp-content/uploads/2022/11/User-Avatar-in-Suit-PNG.png" alt="Profile" className="w-10 h-10 rounded-full mr-3" />
                                <div className="flex-grow min-w-0">
                                    <p className="font-bold truncate">User Name {i + 1}</p>
                                    <p className="text-gray-500 truncate">@username{i + 1}</p>
                                </div>
                                <button className={`flex-shrink-0 ml-2 ${darkMode ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'} font-bold px-4 py-1 rounded-full`}>
                                    Follow
                                </button>
                            </div>
                        ))}
                        <div className={`px-4 py-3 text-orange-500 ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'} cursor-pointer rounded-b-2xl`}>
                            Show more
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="px-4 text-xs text-gray-500">
                        <p>Terms of Service · Privacy Policy · Cookie Policy</p>
                        <p className="mt-1">© 2025 Firezone</p>
                    </div>
                </div>
            </div>
        </div>
    );
}