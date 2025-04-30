import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function CheckoutSuccessPage() {
  return (
    <div className="container mx-auto py-16 px-4">
      <Card className="max-w-md mx-auto">
        <CardContent className="pt-6 text-center">
          <div className="mb-4 flex justify-center">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Payment Successful!</h1>
          <p className="text-muted-foreground mb-6">
            Thank you for your purchase. Your order has been processed
            successfully.
          </p>

          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              A confirmation email has been sent to your email address with your
              order details.
            </p>

            <div className="bg-gray-50 p-4 rounded-md text-left">
              <h3 className="font-medium mb-2">What happens next?</h3>
              <ul className="text-sm space-y-2">
                <li>• Your order will be processed within 24 hours</li>
                <li>
                  • You&apos;ll receive shipping confirmation with tracking
                  details
                </li>
                <li>• Your items will be delivered to your shipping address</li>
              </ul>
            </div>

            <div className="flex flex-col gap-3 mt-6">
              <Link href="/orders">
                <Button variant="outline" className="w-full">
                  View My Orders
                </Button>
              </Link>
              <Link href="/shop">
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
