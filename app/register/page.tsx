'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import Image from 'next/image';
import Loading from '@/components/loading';
import FireButton from '@/components/fire-button';

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Check if passwords match
        if (password !== confirmPassword) {
            setError('Şifreler eşleşmiyor.');
            return;
        }

        setIsLoading(true);

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            router.push('/login'); // Kayıt başarılıysa login sayfasına yönlendir
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Kayıt başarısız oldu.');
            }
            setIsLoading(false);
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
                            className="w-full px-4 py-2 border text-black border-gray-300 rounded-xl focus:outline-none focus:ring focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Şifre</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 border text-black border-gray-300 rounded-xl focus:outline-none focus:ring focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Şifreyi Onayla</label>
                        <input
                            id="confirmPassword"
                            type="password"
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 border text-black border-gray-300 rounded-xl focus:outline-none focus:ring focus:border-blue-500"
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <FireButton
                        type="submit"
                        isLoading={isLoading}
                        className="w-full py-2 bg-orange-600 text-white hover:bg-orange-700"
                    >
                        Kayıt Ol
                    </FireButton>
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