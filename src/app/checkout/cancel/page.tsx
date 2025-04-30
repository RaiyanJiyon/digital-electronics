import Link from "next/link";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function CheckoutCancelPage() {
  return (
    <div className="container mx-auto py-16 px-4">
      <Card className="max-w-md mx-auto">
        <CardContent className="pt-6 text-center">
          <div className="mb-4 flex justify-center">
            <AlertCircle className="h-16 w-16 text-amber-500" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Payment Cancelled</h1>
          <p className="text-muted-foreground mb-6">
            Your payment was cancelled and you have not been charged.
          </p>

          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Your items are still in your cart if you&apos;d like to try again.
            </p>

            <div className="flex flex-col gap-3 mt-6">
              <Link href="/cart">
                <Button variant="outline" className="w-full">
                  Return to Cart
                </Button>
              </Link>
              <Link href="/products">
                <Button className="w-full bg-red-600 hover:bg-red-700">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
