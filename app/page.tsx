'use client';

import { useSession, signOut } from 'next-auth/react';

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">FireZone</h1>
        <div className="flex items-center space-x-4">
          {session?.user && (
            <>
              <span className="text-sm text-gray-700">{session.user.email}</span>
              <button
                onClick={() => signOut({ callbackUrl: '/login' })}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
              >
                Çıkış
              </button>
            </>
          )}
        </div>
      </header>

      {/* Post paylaşma alanı */}
      <div className="max-w-xl mx-auto mt-8 bg-white p-6 rounded-xl shadow">
        <textarea
          placeholder="Ne düşünüyorsun?"
          className="w-full p-3 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring"
          rows={3}
        ></textarea>
        <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition">
          Paylaş
        </button>
      </div>

      {/* Gönderiler */}
      <div className="max-w-xl mx-auto mt-6 space-y-4">
        {[1, 2, 3].map((id) => (
          <div key={id} className="bg-white p-4 rounded-xl shadow">
            <div className="flex items-center space-x-3 mb-2">
              <div className="h-10 w-10 bg-gray-300 rounded-full" />
              <div>
                <p className="font-semibold text-sm">Kullanıcı Adı</p>
                <p className="text-xs text-gray-500">5 dk önce</p>
              </div>
            </div>
            <p className="text-gray-800 text-sm">
              Bu benim ilk gönderim! Sosyal medya platformumu yapıyorum 🚀
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

