"use client"

import Link from "next/link"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

const forgotPasswordSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
})

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>

export default function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
  const [submittedEmail, setSubmittedEmail] = useState<string>("")

  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  })

  async function onSubmit(data: ForgotPasswordValues) {
    setIsLoading(true)

    try {
      // Here you would typically call your password reset API
      console.log("Reset password for:", data.email)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Store the email to display in the success message
      setSubmittedEmail(data.email)

      // Show success message
      setIsSubmitted(true)
    } catch (error) {
      console.error("Password reset request failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <Card>
        <CardContent className="pt-6 text-center">
          <div className="mb-4 flex justify-center">
            <CheckCircle className="h-12 w-12 text-green-500" />
          </div>
          <h2 className="mb-2 text-xl font-semibold">Check your email</h2>
          <p className="mb-4 text-muted-foreground">We&apos;ve sent a password reset link to:</p>
          <p className="mb-6 font-medium">{submittedEmail}</p>
          <p className="mb-6 text-sm text-muted-foreground">
            If you don&apos;t see the email in your inbox, please check your spam folder. The link will expire in 24 hours.
          </p>
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                setIsSubmitted(false)
                form.reset()
              }}
            >
              Try another email
            </Button>
            <Link href="/login">
              <Button className="w-full bg-red-600 hover:bg-red-700">Return to login</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="john.doe@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full bg-red-600 hover:bg-red-700" disabled={isLoading}>
              {isLoading ? "Sending Reset Link..." : "Send Reset Link"}
            </Button>
          </form>
        </Form>

        <div className="mt-4 text-center text-sm">
          Remember your password?{" "}
          <Link href="/login" className="text-red-600 hover:underline">
            Back to login
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
