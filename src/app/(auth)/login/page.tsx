import type { Metadata } from "next"
import LoginForm from "./components/login-form"

export const metadata: Metadata = {
  title: "Login | Digital E-Commerce",
  description: "Sign in to your account to continue shopping",
}

export default function LoginPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="mx-auto max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Sign In</h1>
          <p className="text-muted-foreground">Welcome back! Sign in to access your account</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
