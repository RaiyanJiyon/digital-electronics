import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import bcrypt from "bcrypt";
import { connectDB } from "@/lib/connectDB";


// Define the structure of a user document in the database
interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  image?: string; // Optional field
}

export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "your-email@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<any> {
        try {
          const db = await connectDB();
          const user = await db.collection<User>("users").findOne({ email: credentials?.email });

          if (!user) {
            throw new Error("User not found.");
          }

          if (!bcrypt.compareSync(credentials?.password || "", user.password)) {
            throw new Error("Invalid password.");
          }

          return { id: user._id.toString(), email: user.email, firstName: user.firstName, lastName: user.lastName };
        } catch (error) {
          console.error("Authentication error:", error.message);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account }) {
      try {
        const db = await connectDB();

        // Check if the user already exists in the database
        const existingUser = await db.collection<User>("users").findOne({ email: user.email });

        if (!existingUser) {
          // Create a new user in the database
          const newUser = {
            name: user.name,
            email: user.email,
            image: user.image,
            provider: account?.provider, // Store the provider (e.g., "google", "github")
            createdAt: new Date(),
          };

          await db.collection("users").insertOne(newUser);
        }

        return true; // Allow sign-in
      } catch (error) {
        console.error("Error during sign-in:", error.message);
        return false; // Prevent sign-in
      }
    },
    async session({ session, token }) {
      session.user.id = token.id; // Add user ID to the session
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // Add user ID to the JWT token
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };