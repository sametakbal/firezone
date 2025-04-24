'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import Image from 'next/image';

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            router.push('/login'); // Kayıt başarılıysa login sayfasına yönlendir
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Kayıt başarısız oldu.');
            }
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl">
                <div className="flex justify-center mb-6">
                    <Image
                        src="/full-logo.png"
                        alt="Logo"
                        width={256}
                        height={256}
                    />
                </div>
                <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Şifre</label>
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring focus:border-blue-500"
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <button
                        type="submit"
                        className="w-full py-2 bg-orange-600 text-white font-semibold rounded-xl hover:bg-orange-700 transition"
                    >
                        Kayıt Ol
                    </button>
                </form>
                <p className="mt-4 text-sm text-center text-gray-500">
                    Zaten hesabın var mı?{' '}
                    <a href="/login" className="text-orange-600 hover:underline">
                        Giriş Yap
                    </a>
                </p>
            </div>
        </div>
    );
}
