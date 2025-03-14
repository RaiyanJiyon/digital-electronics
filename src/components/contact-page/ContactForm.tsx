"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { toast } from "sonner"


// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

type FormValues = z.infer<typeof formSchema>

const ContactForm = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  })

  async function onSubmit(values: FormValues) {
    // Handle form submission here
    console.log(values);
    toast("Message has been send", {
      position: "top-center",
      style: {
        background: "#FF5722", // Background color (e.g., orange)
        color: "#FFFFFF", // Text color (e.g., white)
        border: "1px solid #D32F2F", // Optional border
      },
    })
  }

  return (
    <div className="w-11/12 max-w-[1920px] mx-auto p-6 bg-[#f5f5f5]">
      <div className="w-3/4 2xl:max-w-7xl mx-auto text-center mt-10 mb-8 space-y-2">
        <h2 className="text-xl font-semibold">We&apos;re here to help!</h2>
        <p className="text-sm text-gray-600">
          The Help assistance chat team is available Monday - Friday from 9am - 5pm UTC +7. Saturday & Sunday we&apos;re
          typically on the bike but we&apos;ll answer all requests as soon as we are back in the office on the next business
          day.
        </p>
        <p className="text-sm text-gray-600">
          We will do our best to respond as soon as possible, typical response time is within 24 hours.
        </p>
        <p className="text-sm text-gray-600">
          Please check out our FAQ for quick insights on setup, features and troubleshooting.
        </p>
        <p className="text-sm text-gray-600">
          Need an exchange/refund?{" "}
          <a href="#" className="text-black font-semibold underline">
            Submit your request here
          </a>
        </p>
        <p className="text-sm text-gray-600">Thank you and we look forward to connecting with you soon!</p>
      </div>

      <div className="w-3/4 2xl:max-w-7xl mx-auto pb-16">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name *</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email *</FormLabel>
                <FormControl>
                  <Input placeholder="Your email" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="Your phone number" type="tel" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What&apos;s on your mind? *</FormLabel>
                <FormControl>
                  <Textarea placeholder="Type your message here" className="min-h-[100px]" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full uppercase">
            Send Messenger
          </Button>
        </form>
      </Form>
      </div>
    </div>
  )
}

export default ContactForm