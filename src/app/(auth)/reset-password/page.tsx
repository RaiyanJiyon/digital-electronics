"use client"

import ResetPasswordForm from "./components/reset-password-form"

export default function ResetPasswordPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="mx-auto max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Reset Password</h1>
          <p className="text-muted-foreground">Create a new password for your account</p>
        </div>
        <ResetPasswordForm />
      </div>
    </div>
  )
}
