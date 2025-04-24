// File: components/MobileMenu.tsx
"use client";

import { Menu, X } from 'lucide-react';
import { useTheme } from '@/contexts/theme-provider';

interface MobileMenuProps {
    readonly isOpen: boolean;
    readonly onClose: () => void;
    readonly toggleMenu: () => void;
}

export default function MobileMenu({ isOpen, onClose, toggleMenu }: MobileMenuProps) {
    const { darkMode } = useTheme();

    return (
        <>
            {/* Mobile menu overlay */}
            {isOpen && (
                <button
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
                    onClick={onClose}
                    aria-label="Close mobile menu"
                />
            )}

            {/* Mobile menu button - only visible on small screens */}
            <div className="fixed top-4 left-4 z-40 md:hidden">
                <button
                    onClick={toggleMenu}
                    className={`p-2 rounded-full ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'}`}
                    aria-label={isOpen ? "Close menu" : "Open menu"}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>
        </>
    );
}