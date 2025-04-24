// File: components/Feed.tsx
"use client";

import { useState } from 'react';
import { useTheme } from '@/contexts/theme-provider';
import { MessageSquare, Repeat2, Heart, Share } from 'lucide-react';
import PostComposer from './post-composer';

// Define post type
interface PostStats {
    replies: number;
    reposts: number;
    likes: number;
}

interface PostUser {
    name: string;
    handle: string;
    avatar: string;
}

interface Post {
    id: number;
    user: PostUser;
    content: string;
    timestamp: string;
    stats: PostStats;
}

export default function Feed() {
    const { darkMode } = useTheme();
    const [posts, setPosts] = useState<Post[]>([
        {
            id: 1,
            user: {
                name: 'John Doe',
                handle: '@johndoe',
                avatar: 'https://steela.ir/en/wp-content/uploads/2022/11/User-Avatar-in-Suit-PNG.png',
            },
            content: 'Just launched my new website! Check it out and let me know what you think! #webdev #nextjs',
            timestamp: '2h',
            stats: {
                replies: 12,
                reposts: 24,
                likes: 89,
            }
        },
        {
            id: 2,
            user: {
                name: 'Jane Smith',
                handle: '@janesmith',
                avatar: 'https://steela.ir/en/wp-content/uploads/2022/11/User-Avatar-in-Suit-PNG.png',
            },
            content: 'Beautiful day for hiking! Nature always helps me clear my mind and find new inspiration. 🌲 #outdoors #mindfulness',
            timestamp: '4h',
            stats: {
                replies: 5,
                reposts: 8,
                likes: 46,
            }
        },
        {
            id: 3,
            user: {
                name: 'Tech Updates',
                handle: '@techupdates',
                avatar: 'https://steela.ir/en/wp-content/uploads/2022/11/User-Avatar-in-Suit-PNG.png',
            },
            content: 'Breaking: Next.js 14 has been released with significant performance improvements and new features for server components! #nextjs #webdev',
            timestamp: '6h',
            stats: {
                replies: 32,
                reposts: 124,
                likes: 367,
            }
        }
    ]);

    const addNewPost = (content: string) => {
        const newPost: Post = {
            id: posts.length + 1,
            user: {
                name: 'Current User',
                handle: '@currentuser',
                avatar: 'https://steela.ir/en/wp-content/uploads/2022/11/User-Avatar-in-Suit-PNG.png',
            },
            content,
            timestamp: 'now',
            stats: {
                replies: 0,
                reposts: 0,
                likes: 0,
            }
        };

        setPosts([newPost, ...posts]);
    };

    return (
        <>
            {/* Header */}
            <div className={`px-4 py-3 ${darkMode ? 'border-gray-800 bg-black' : 'border-gray-200 bg-white'} 
                     border-b sticky top-0 z-10 backdrop-blur bg-opacity-90 flex items-center`}>
                <h1 className="text-xl font-bold ml-8 md:ml-0 flex-grow">Home</h1>

                {/* Theme toggle for small sidebar is in the Sidebar component */}
            </div>

            {/* Post composer */}
            <PostComposer onSubmit={addNewPost} />

            {/* Feed */}
            <div>
                {posts.map(post => (
                    <div key={post.id} className={`px-4 py-3 border-b 
                                      ${darkMode ? 'border-gray-800 hover:bg-gray-900/50' : 'border-gray-200 hover:bg-gray-100'}`}>
                        <div className="flex">
                            <img src={post.user.avatar} alt={post.user.name} className="w-12 h-12 rounded-full mr-3" />
                            <div className="flex-grow">
                                <div className="flex items-center flex-wrap">
                                    <span className="font-bold mr-1">{post.user.name}</span>
                                    <span className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} mr-1`}>{post.user.handle}</span>
                                    <span className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>· {post.timestamp}</span>
                                </div>
                                <p className="mt-1 mb-2">{post.content}</p>
                                <div className="flex justify-between max-w-md text-gray-500">
                                    <button className="flex items-center group">
                                        <div className={`p-2 rounded-full group-hover:bg-blue-900/20 group-hover:text-blue-500`}>
                                            <MessageSquare size={18} />
                                        </div>
                                        <span className="ml-1 text-sm group-hover:text-blue-500">{post.stats.replies}</span>
                                    </button>
                                    <button className="flex items-center group">
                                        <div className="p-2 rounded-full group-hover:bg-green-900/20 group-hover:text-green-500">
                                            <Repeat2 size={18} />
                                        </div>
                                        <span className="ml-1 text-sm group-hover:text-green-500">{post.stats.reposts}</span>
                                    </button>
                                    <button className="flex items-center group">
                                        <div className="p-2 rounded-full group-hover:bg-red-900/20 group-hover:text-red-500">
                                            <Heart size={18} />
                                        </div>
                                        <span className="ml-1 text-sm group-hover:text-red-500">{post.stats.likes}</span>
                                    </button>
                                    <button className="flex items-center group">
                                        <div className="p-2 rounded-full group-hover:bg-blue-900/20 group-hover:text-blue-500">
                                            <Share size={18} />
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}