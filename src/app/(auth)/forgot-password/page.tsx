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
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

// Validation schema for the form
const formSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
});

type FormValues = z.infer<typeof formSchema>;

const ForgotPasswordPage = () => {
  // Initialize the form with react-hook-form and Zod validation
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  // Handle form submission
  async function onSubmit(values: FormValues) {
    console.log("Forgot Password Form Submitted:", values);

    // Simulate sending a reset password link (replace with API call)
    // Show a success toast message
    toast(`A password reset link has been sent to ${values.email}`, {
      position: "top-center",
      style: {
        background: "#34cd52", // Background color (e.g., red)
        color: "#FAFAFA", // Text color (e.g., white)
        border: "1px solid #", // Optional border
      },
    });
  }

  return (
    <div className="bg-[#F5F5F5] max-w-5xl mx-auto my-16 p-10 rounded-md">
      {/* Forgot Password Section */}
      <div>
        <h2 className="text-xl font-bold mb-4 uppercase text-center">
          Forgot Password?
        </h2>
        <div className="border-t border-gray-300 my-4"></div>
        <p className="text-sm text-center text-gray-600">
          Enter your email address to receive a password reset link.
        </p>
      </div>

      {/* Forgot Password Form */}
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

          {/* Submit Button */}
          <Button type="submit">
            Send Reset Link
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ForgotPasswordPage;
