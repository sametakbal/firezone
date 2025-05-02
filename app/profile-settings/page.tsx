'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, db, storage } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import FireButton from '@/components/fire-button';
import { Camera } from 'lucide-react';

export default function ProfileDetailPage() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [profileData, setProfileData] = useState({
        displayName: '',
        firstName: '',
        lastName: '',
        biography: '',
        profilePicture: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                setUser(currentUser);

                try {
                    // Get user profile data from Firestore
                    const userDocRef = doc(db, 'users', currentUser.uid);
                    const userDoc = await getDoc(userDocRef);

                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        setProfileData({
                            displayName: userData.displayName || '',
                            firstName: userData.firstName || '',
                            lastName: userData.lastName || '',
                            biography: userData.biography || '',
                            profilePicture: userData.profilePicture || '',
                        });
                    }
                } catch (err) {
                    console.error('Error fetching user profile:', err);
                    setError('Profil bilgileri yüklenirken bir hata oluştu.');
                }
            } else {
                // User is not logged in, redirect to login
                router.push('/login');
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [router]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);

            // Create a preview URL
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProfileData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSaveProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setError('');
        setSuccess('');

        try {
            if (!user) {
                throw new Error('Kullanıcı oturumu bulunamadı');
            }

            const userDocRef = doc(db, 'users', user.uid);

            // Upload profile picture if selected
            let profilePictureUrl = profileData.profilePicture;

            if (selectedFile) {
                const storageRef = ref(storage, `profile_pictures/${user.uid}`);
                await uploadBytes(storageRef, selectedFile);
                profilePictureUrl = await getDownloadURL(storageRef);
            }

            // Update user profile in Firestore
            await updateDoc(userDocRef, {
                displayName: profileData.displayName,
                firstName: profileData.firstName,
                lastName: profileData.lastName,
                biography: profileData.biography,
                profilePicture: profilePictureUrl,
                updatedAt: new Date(),
            });

            setProfileData(prev => ({
                ...prev,
                profilePicture: profilePictureUrl
            }));

            setSuccess('Profil başarıyla güncellendi');
        } catch (err) {
            console.error('Error updating profile:', err);
            setError('Profil güncellenirken bir hata oluştu');
        } finally {
            setSaving(false);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
                    <p className="mt-4 text-gray-700">Yükleniyor...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8">
                <h1 className="text-2xl font-bold text-center mb-8 text-gray-800">Profil Detayları</h1>

                {error && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="bg-green-50 text-green-600 p-4 rounded-xl mb-6">
                        {success}
                    </div>
                )}

                <form onSubmit={handleSaveProfile} className="space-y-6">
                    {/* Profile Picture Section */}
                    <div className="flex flex-col items-center">
                        <div
                            className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200 cursor-pointer"
                            onClick={triggerFileInput}
                        >
                            {(previewUrl || profileData.profilePicture) ? (
                                <Image
                                    src={previewUrl || profileData.profilePicture}
                                    alt="Profile Picture"
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                                    <Camera size={40} className="text-gray-500" />
                                </div>
                            )}

                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                <div className="text-white text-center text-sm p-2">
                                    <Camera size={20} className="mx-auto mb-1" />
                                    Değiştir
                                </div>
                            </div>
                        </div>

                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="image/*"
                            className="hidden"
                        />

                        <p className="text-sm text-gray-500 mt-2">
                            Profil fotoğrafını değiştirmek için tıkla
                        </p>
                    </div>

                    {/* Display Name */}
                    <div>
                        <label htmlFor="displayName" className="block text-sm font-medium text-gray-700">
                            Kullanıcı Adı
                        </label>
                        <input
                            id="displayName"
                            name="displayName"
                            type="text"
                            required
                            value={profileData.displayName}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border text-black border-gray-300 rounded-xl focus:outline-none focus:ring focus:border-blue-500 mt-1"
                        />
                    </div>

                    {/* Name & Surname */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                                Ad
                            </label>
                            <input
                                id="firstName"
                                name="firstName"
                                type="text"
                                value={profileData.firstName}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border text-black border-gray-300 rounded-xl focus:outline-none focus:ring focus:border-blue-500 mt-1"
                            />
                        </div>
                        <div>
                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                                Soyad
                            </label>
                            <input
                                id="lastName"
                                name="lastName"
                                type="text"
                                value={profileData.lastName}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border text-black border-gray-300 rounded-xl focus:outline-none focus:ring focus:border-blue-500 mt-1"
                            />
                        </div>
                    </div>

                    {/* Biography */}
                    <div>
                        <label htmlFor="biography" className="block text-sm font-medium text-gray-700">
                            Biyografi
                        </label>
                        <textarea
                            id="biography"
                            name="biography"
                            rows={4}
                            value={profileData.biography}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border text-black border-gray-300 rounded-xl focus:outline-none focus:ring focus:border-blue-500 mt-1 resize-none"
                            placeholder="Kendini kısaca tanıt..."
                        />
                    </div>

                    {/* Submit Button */}
                    <FireButton
                        type="submit"
                        isLoading={saving}
                        loadingText="Kaydediliyor..."
                        className="w-full py-2 bg-orange-600 text-white hover:bg-orange-700"
                    >
                        Profili Kaydet
                    </FireButton>
                </form>
            </div>
        </div>
    );
}