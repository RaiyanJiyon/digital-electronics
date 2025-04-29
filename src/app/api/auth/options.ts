import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import AppleProvider from "next-auth/providers/apple";
import { connectToDB } from "@/lib/connectDB";
import { User } from "@/models/user.model";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    AppleProvider({
      clientId: process.env.APPLE_CLIENT_ID as string,
      clientSecret: process.env.APPLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          scope: "email,public_profile",
          version: "v17.0",
        },
      },
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          await connectToDB();

          if (!credentials?.email || !credentials.password) {
            throw new Error("Invalid credentials");
          }

          const user = await User.findOne({ email: credentials.email }).select(
            "+password"
          );

          if (!user || !user.password) {
            throw new Error("Invalid credentials");
          }

          const isValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isValid) {
            throw new Error("Invalid credentials");
          }

          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
          };
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    signOut: "/logout",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user && account) {
        try {
          // Social logins (Google/Facebook)
          if (account.provider !== "credentials") {
            await connectToDB();
            const existingUser = await User.findOne({ email: user.email });

            if (!existingUser) {
              const newUser = await User.create({
                name: user.name || "Unnamed User",
                email: user.email,
                role: "user", // Default role for social logins
                provider: account.provider,
              });
              token.role = newUser.role;
            } else {
              token.role = existingUser.role;
            }
          } else {
            // Credentials login (role already set in authorize())
            token.role = user.role;
          }

          token.id = user.id;
          token.name = user.name;
          token.email = user.email;
        } catch (error) {
          console.error("JWT callback error:", error);
          token.error = "AUTH_ERROR";
        }
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.role = token.role;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};