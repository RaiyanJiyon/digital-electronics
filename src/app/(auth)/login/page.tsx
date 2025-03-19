"use client"
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
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

// Form validation schema
const formSchema = z.object({
  email: z.string({
    required_error: "Email is required.",
  }).email("Please enter a valid email address."),
  password: z.string({
    required_error: "Password is required.",
  }).min(6, "Password must be at least 6 characters long."),
});

type FormValues = z.infer<typeof formSchema>;

const LoginPage = () => {
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
    toast("Signing in...", {
      position: "top-center",
      style: {
        background: "#f3283c", // Background color (e.g., red)
        color: "#FFFFFF", // Text color (e.g., white)
        border: "1px solid #D32F2F", // Optional border
      },
    });

    // TODO: Add actual API call logic here
  }

  return (
    <div className="bg-[#F5F5F5] max-w-5xl mx-auto my-16 p-10 rounded-md">
      <h2 className="text-xl font-bold mb-8 uppercase text-center">
        Registered Customers
      </h2>
      <div className="border border-b"></div>
      <p className="text-sm text-center text-gray-600 mt-5">
        If you have an account, sign in with your email address.
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-10">
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
                  <Input type="password" placeholder="Your password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button type="submit" className="">
            Sign In
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default LoginPage;