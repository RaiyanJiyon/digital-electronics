import type { Metadata } from "next";
import OrderTracker from "./components/order-tracker";

export const metadata: Metadata = {
  title: "Track Your Order | Digital E-Commerce",
  description: "Track the status and delivery of your order",
};

export default function TrackOrderPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Track Your Order</h1>
          <p className="text-muted-foreground">
            Enter your order number to check the current status of your purchase
          </p>
        </div>
        <OrderTracker />
      </div>
    </div>
  );
}
