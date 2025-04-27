import type { Metadata } from "next"
import RegisterForm from "./components/register-form"

export const metadata: Metadata = {
  title: "Register | Digital E-Commerce",
  description: "Create a new account to start shopping with us",
}

export default function RegisterPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="mx-auto max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Create an Account</h1>
          <p className="text-muted-foreground">
            Sign up to get access to exclusive deals and personalized recommendations
          </p>
        </div>
        <RegisterForm />
      </div>
    </div>
  )
}
