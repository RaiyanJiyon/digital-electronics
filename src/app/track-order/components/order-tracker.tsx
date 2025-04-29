"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Package,
  Truck,
  CheckCircle2,
  Clock,
  ShoppingBag,
  MapPin,
  Calendar,
  ArrowRight,
  Search,
} from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Order, OrderItem, TimelineStep } from "@/app/types/types";

// Mock data for demonstration
const mockOrders = {
  "ORD-12345": {
    id: "ORD-12345",
    date: "April 25, 2025",
    status: "in_transit",
    statusText: "In Transit",
    estimatedDelivery: "April 30, 2025",
    trackingNumber: "TRK-9876543210",
    carrier: "Express Delivery",
    shippingAddress: {
      name: "John Doe",
      street: "123 Main Street",
      city: "Anytown",
      state: "CA",
      zip: "12345",
      country: "United States",
    },
    items: [
      {
        id: 1,
        name: "Samsung Galaxy S23 Ultra",
        price: "$1,199.00",
        quantity: 1,
        image: "/placeholder.svg",
      },
      {
        id: 2,
        name: "Wireless Earbuds Pro",
        price: "$149.00",
        quantity: 1,
        image: "/placeholder.svg",
      },
    ],
    timeline: [
      {
        status: "Order Placed",
        date: "April 25, 2025",
        time: "10:30 AM",
        completed: true,
      },
      {
        status: "Processing",
        date: "April 26, 2025",
        time: "09:15 AM",
        completed: true,
      },
      {
        status: "Shipped",
        date: "April 27, 2025",
        time: "02:45 PM",
        completed: true,
      },
      {
        status: "In Transit",
        date: "April 28, 2025",
        time: "11:20 AM",
        completed: true,
        current: true,
      },
      {
        status: "Out for Delivery",
        date: "Estimated April 30, 2025",
        completed: false,
      },
      {
        status: "Delivered",
        date: "Estimated April 30, 2025",
        completed: false,
      },
    ],
    subtotal: "$1,348.00",
    shipping: "$0.00",
    tax: "$121.32",
    total: "$1,469.32",
  },
  "ORD-67890": {
    id: "ORD-67890",
    date: "April 20, 2025",
    status: "delivered",
    statusText: "Delivered",
    estimatedDelivery: "April 25, 2025",
    deliveredDate: "April 24, 2025",
    trackingNumber: "TRK-1234567890",
    carrier: "Premium Logistics",
    shippingAddress: {
      name: "Jane Smith",
      street: "456 Oak Avenue",
      city: "Somewhere",
      state: "NY",
      zip: "54321",
      country: "United States",
    },
    items: [
      {
        id: 3,
        name: 'Apple MacBook Pro 16"',
        price: "$2,499.00",
        quantity: 1,
        image: "/placeholder.svg",
      },
    ],
    timeline: [
      {
        status: "Order Placed",
        date: "April 20, 2025",
        time: "03:45 PM",
        completed: true,
      },
      {
        status: "Processing",
        date: "April 21, 2025",
        time: "10:30 AM",
        completed: true,
      },
      {
        status: "Shipped",
        date: "April 22, 2025",
        time: "01:15 PM",
        completed: true,
      },
      {
        status: "In Transit",
        date: "April 23, 2025",
        time: "09:20 AM",
        completed: true,
      },
      {
        status: "Out for Delivery",
        date: "April 24, 2025",
        time: "08:30 AM",
        completed: true,
      },
      {
        status: "Delivered",
        date: "April 24, 2025",
        time: "02:15 PM",
        completed: true,
        current: true,
      },
    ],
    subtotal: "$2,499.00",
    shipping: "$0.00",
    tax: "$224.91",
    total: "$2,723.91",
  },
  "ORD-54321": {
    id: "ORD-54321",
    date: "April 27, 2025",
    status: "processing",
    statusText: "Processing",
    estimatedDelivery: "May 3, 2025",
    trackingNumber: "Not available yet",
    carrier: "Standard Shipping",
    shippingAddress: {
      name: "Robert Johnson",
      street: "789 Pine Street",
      city: "Elsewhere",
      state: "TX",
      zip: "67890",
      country: "United States",
    },
    items: [
      {
        id: 4,
        name: '4K Smart TV 55"',
        price: "$699.00",
        quantity: 1,
        image: "/placeholder.svg",
      },
      {
        id: 5,
        name: "Soundbar System",
        price: "$249.00",
        quantity: 1,
        image: "/placeholder.svg",
      },
      {
        id: 6,
        name: "HDMI Cable 2.1",
        price: "$29.99",
        quantity: 2,
        image: "/placeholder.svg",
      },
    ],
    timeline: [
      {
        status: "Order Placed",
        date: "April 27, 2025",
        time: "05:20 PM",
        completed: true,
      },
      {
        status: "Processing",
        date: "April 28, 2025",
        time: "11:45 AM",
        completed: true,
        current: true,
      },
      {
        status: "Shipped",
        date: "Estimated April 30, 2025",
        completed: false,
      },
      {
        status: "In Transit",
        date: "Estimated May 1, 2025",
        completed: false,
      },
      {
        status: "Out for Delivery",
        date: "Estimated May 3, 2025",
        completed: false,
      },
      {
        status: "Delivered",
        date: "Estimated May 3, 2025",
        completed: false,
      },
    ],
    subtotal: "$1,007.98",
    shipping: "$25.00",
    tax: "$90.72",
    total: "$1,123.70",
  },
};

const trackOrderSchema = z.object({
  orderNumber: z.string().min(1, {
    message: "Please enter an order number.",
  }),
});

type TrackOrderValues = z.infer<typeof trackOrderSchema>;

export default function OrderTracker() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<TrackOrderValues>({
    resolver: zodResolver(trackOrderSchema),
    defaultValues: {
      orderNumber: "",
    },
  });

  async function onSubmit(data: TrackOrderValues) {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Check if order exists in mock data
      const foundOrder =
        mockOrders[data.orderNumber as keyof typeof mockOrders];

      if (foundOrder) {
        setOrder(foundOrder);
      } else {
        setError(
          "Order not found. Please check your order number and try again."
        );
        setOrder(null);
      }
    } catch (error) {
      console.error("Error tracking order:", error);
      setError(
        "An error occurred while tracking your order. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  }

  // Helper function to get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Order Placed":
        return <ShoppingBag className="h-6 w-6" />;
      case "Processing":
        return <Clock className="h-6 w-6" />;
      case "Shipped":
        return <Package className="h-6 w-6" />;
      case "In Transit":
        return <Truck className="h-6 w-6" />;
      case "Out for Delivery":
        return <MapPin className="h-6 w-6" />;
      case "Delivered":
        return <CheckCircle2 className="h-6 w-6" />;
      default:
        return <Clock className="h-6 w-6" />;
    }
  };

  // Helper function to get status badge color
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "processing":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      case "shipped":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      case "in_transit":
        return "bg-purple-100 text-purple-800 hover:bg-purple-100";
      case "out_for_delivery":
        return "bg-indigo-100 text-indigo-800 hover:bg-indigo-100";
      case "delivered":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex space-x-2"
            >
              <FormField
                control={form.control}
                name="orderNumber"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        placeholder="Enter your order number (e.g., ORD-12345)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="bg-red-600 hover:bg-red-700"
                disabled={isLoading}
              >
                {isLoading ? (
                  "Tracking..."
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    Track
                  </>
                )}
              </Button>
            </form>
          </Form>

          {error && (
            <div className="mt-4 rounded-md bg-red-50 p-4 text-sm text-red-500">
              {error}
            </div>
          )}

          <div className="mt-4 text-sm text-muted-foreground">
            <p>For demonstration, try these order numbers:</p>
            <ul className="mt-1 list-disc pl-5">
              <li>ORD-12345 (In Transit)</li>
              <li>ORD-67890 (Delivered)</li>
              <li>ORD-54321 (Processing)</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {order && (
        <div className="space-y-6">
          {/* Order Status Overview */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Order Status</CardTitle>
                <Badge className={getStatusBadgeColor(order.status)}>
                  {order.statusText}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">
                    Order Number
                  </div>
                  <div className="font-medium">{order.id}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">
                    Order Date
                  </div>
                  <div className="font-medium">{order.date}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">
                    Estimated Delivery
                  </div>
                  <div className="font-medium">{order.estimatedDelivery}</div>
                </div>
                {order.status === "delivered" && (
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">
                      Delivered On
                    </div>
                    <div className="font-medium">{order.deliveredDate}</div>
                  </div>
                )}
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">
                    Tracking Number
                  </div>
                  <div className="font-medium">{order.trackingNumber}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Carrier</div>
                  <div className="font-medium">{order.carrier}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Tracking Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {order.timeline.map((step: TimelineStep, index: number) => (
                  <div key={index} className="flex">
                    <div className="mr-4 flex flex-col items-center">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                          step.completed
                            ? step.current
                              ? "border-red-600 bg-red-50 text-red-600"
                              : "border-green-500 bg-green-50 text-green-500"
                            : "border-gray-300 bg-gray-50 text-gray-400"
                        }`}
                      >
                        {getStatusIcon(step.status)}
                      </div>
                      {index < order.timeline.length - 1 && (
                        <div
                          className={`h-full w-0.5 ${
                            step.completed ? "bg-green-500" : "bg-gray-200"
                          }`}
                        />
                      )}
                    </div>
                    <div className="pb-8">
                      <div className="flex items-center">
                        <p
                          className={`text-lg font-semibold ${
                            step.current
                              ? "text-red-600"
                              : step.completed
                              ? "text-green-700"
                              : "text-gray-500"
                          }`}
                        >
                          {step.status}
                        </p>
                        {step.current && (
                          <Badge className="ml-2 bg-red-100 text-red-800 hover:bg-red-100">
                            Current
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {step.date}
                      </p>
                      {step.time && (
                        <p className="text-sm text-muted-foreground">
                          {step.time}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Order Details */}
          <div className="grid gap-6 md:grid-cols-3">
            {/* Order Items */}
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Order Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {order.items.map((item: OrderItem) => (
                      <div
                        key={item.id}
                        className="flex items-center space-x-4"
                      >
                        <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            width={80}
                            height={80}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{item.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator className="my-6" />

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <p className="text-sm text-muted-foreground">Subtotal</p>
                      <p className="text-sm">{order.subtotal}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-sm text-muted-foreground">Shipping</p>
                      <p className="text-sm">{order.shipping}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-sm text-muted-foreground">Tax</p>
                      <p className="text-sm">{order.tax}</p>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between font-medium">
                      <p>Total</p>
                      <p>{order.total}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Shipping Information */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Shipping Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    <p className="font-medium">{order.shippingAddress.name}</p>
                    <p>{order.shippingAddress.street}</p>
                    <p>
                      {order.shippingAddress.city},{" "}
                      {order.shippingAddress.state} {order.shippingAddress.zip}
                    </p>
                    <p>{order.shippingAddress.country}</p>
                  </div>

                  <div className="mt-6 space-y-2">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm">
                        {order.status === "delivered"
                          ? `Delivered on ${order.deliveredDate}`
                          : `Estimated delivery: ${order.estimatedDelivery}`}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Truck className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm">{order.carrier}</p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <Button variant="outline" className="w-full">
                      <MapPin className="mr-2 h-4 w-4" />
                      View Delivery Map
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <div className="mt-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <h4 className="font-medium">Need Help?</h4>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                      >
                        Contact Support
                        <ArrowRight className="ml-auto h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                      >
                        Return or Exchange
                        <ArrowRight className="ml-auto h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                      >
                        Cancel Order
                        <ArrowRight className="ml-auto h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
