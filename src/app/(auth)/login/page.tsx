"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

// Form validation schema
const formSchema = z.object({
  email: z
    .string({
      required_error: "Email is required.",
    })
    .email("Please enter a valid email address."),
  password: z
    .string({
      required_error: "Password is required.",
    })
    .min(6, "Password must be at least 6 characters long."),
});

type FormValues = z.infer<typeof formSchema>;

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: FormValues) {
    // Simulate form submission (e.g., API call)
    console.log("Form Submitted:", values);

    // Show a success toast message
    toast("Account created successfully!", {
      position: "top-center",
      style: {
        background: "#4CAF50",
        color: "#FFFFFF",
        borderRadius: "8px",
        padding: "12px 20px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      },
    });

    // TODO: Add actual API call logic here
  }

  return (
    <div className="bg-[#F5F5F5] max-w-5xl mx-auto my-16 p-10 rounded-md">
      {/* Registered Customers Section */}
      <div>
        <h2 className="text-xl font-bold mb-4 uppercase text-center">
          Registered Customers
        </h2>
        <div className="border-t border-gray-300 my-4"></div>
        <p className="text-sm text-center text-gray-600">
          If you have an account, sign in with your email address.
        </p>
      </div>

      {/* Login Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-6">
          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email *</FormLabel>
                <FormControl>
                  <Input placeholder="Your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password Field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password *</FormLabel>
                <FormControl>
                  <Input
                    type={showPassword ? "text" : "password"} // Toggle password visibility
                    placeholder="Your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Show Password Checkbox */}
          <div className="flex items-center space-x-2 py-2">
            <Checkbox
              id="show-password"
              checked={showPassword}
              onCheckedChange={(checked) => setShowPassword(Boolean(checked))}
            />
            <label
              htmlFor="show-password"
              className="text-sm font-medium leading-none text-gray-700 cursor-pointer"
            >
              Show password
            </label>
          </div>

          {/* Forgot Password Link and Submit Button */}
          <div className="flex items-center gap-6 md:gap-10 pt-4">
            <Button type="submit">Sign In</Button>
            <Link
              href="/forgot-password"
              className="text-sm font-medium hover:underline"
            >
              Forgot Your Password?
            </Link>
          </div>
        </form>
      </Form>

      {/* New Customers Section */}
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4 uppercase text-center">
          New Customers
        </h2>
        <div className="border-t border-gray-300 my-4"></div>
        <p className="text-sm text-center text-gray-600">
          Creating an account has many benefits: check out faster, keep more
          than one address, track orders, and more.
        </p>
        <div className="flex justify-center mt-6">
          <Link href="/register">
            <Button>Create an Account</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
