// File: components/PostComposer.tsx
"use client";

import { useState } from 'react';
import { useTheme } from '@/contexts/theme-provider';

interface PostComposerProps {
    readonly onSubmit: (content: string) => void;
}

export default function PostComposer({ onSubmit }: PostComposerProps) {
    const { darkMode } = useTheme();
    const [newPostContent, setNewPostContent] = useState('');

    const handlePostSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!newPostContent.trim()) return;

        onSubmit(newPostContent);
        setNewPostContent('');
    };

    return (
        <div className={`px-4 py-3 border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
            <form onSubmit={handlePostSubmit}>
                <div className="flex">
                    <img src="https://steela.ir/en/wp-content/uploads/2022/11/User-Avatar-in-Suit-PNG.png" alt="Your avatar" className="w-12 h-12 rounded-full mr-3" />
                    <div className="flex-grow">
                        <textarea
                            className={`w-full bg-transparent outline-none text-xl mb-3 resize-none 
                        ${darkMode ? 'placeholder-gray-500' : 'placeholder-gray-400'}`}
                            placeholder="What's happening?"
                            value={newPostContent}
                            onChange={(e) => setNewPostContent(e.target.value)}
                            rows={3}
                        ></textarea>
                        <div className="flex justify-between items-center">
                            <div className="flex text-blue-500 space-x-2">
                                {/* Post attachments icons would go here */}
                            </div>
                            <button
                                type="submit"
                                className={`bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 py-2 rounded-full 
                          ${!newPostContent.trim() ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={!newPostContent.trim()}
                            >
                                Post
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}