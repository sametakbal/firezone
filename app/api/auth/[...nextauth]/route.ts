import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

interface Credentials {
    email: string;
    password: string;
}

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Email",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials: Credentials | undefined) {
                try {
                    const userCredential = await signInWithEmailAndPassword(
                        auth,
                        credentials?.email ?? "",
                        credentials?.password ?? ""
                    );
                    const user = userCredential.user;
                    return { id: user.uid, email: user.email };
                } catch (err) {
                    console.error("Firebase login error:", err);
                    return null;
                }
            },
        }),
    ],
    pages: {
        signIn: "/login", // bizim oluşturduğumuz login sayfası
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
