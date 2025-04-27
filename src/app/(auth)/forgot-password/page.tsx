import type { Metadata } from "next";
import ForgotPasswordForm from "./components/forgot-password-form";

export const metadata: Metadata = {
  title: "Forgot Password | Digital E-Commerce",
  description: "Reset your password to regain access to your account",
};

export default function ForgotPasswordPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="mx-auto max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Forgot Password</h1>
          <p className="text-muted-foreground">
            Enter your email address and we&apos;ll send you a link to reset
            your password
          </p>
        </div>
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
