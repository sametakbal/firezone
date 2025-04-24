'use client';

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from 'next/image';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await signIn('credentials', {
            email,
            password,
            redirect: false,
        });

        if (result?.error) {
            setError("Giriş başarısız. Bilgileri kontrol edin.");
        } else {
            router.push('/'); // giriş başarılıysa anasayfaya yönlendir
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
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 text-black rounded-xl focus:outline-none focus:ring focus:border-orange-500"
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
                            className="w-full px-4 py-2 border border-gray-300 text-black rounded-xl focus:outline-none focus:ring focus:border-orange-500"
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <button
                        type="submit"
                        className="w-full py-2 bg-orange-600 text-white font-semibold rounded-xl hover:bg-orange-700 transition"
                    >
                        Giriş Yap
                    </button>
                </form>
                <p className="mt-4 text-sm text-center text-gray-500">
                    Hesabın yok mu?{' '}
                    <a href="/register" className="text-orange-600 hover:underline">
                        Kayıt Ol
                    </a>
                </p>

                <p className="mt-4 text-sm text-center text-gray-500">
                    <button
                        type="button"
                        onClick={() => alert('Şifre sıfırlama işlemi başlatılacak.')}
                        className="text-orange-600 hover:underline bg-transparent border-none cursor-pointer p-0"
                    >
                        Şifremi unuttum
                    </button>
                </p>
            </div>
        </div>
    );
}
