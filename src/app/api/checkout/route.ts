import { NextResponse } from "next/server";
import Stripe from "stripe";

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
//   apiVersion: "2023-10-16",
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, lineItems, success_url, cancel_url } = body;

    if (!lineItems || lineItems.length === 0) {
      return NextResponse.json(
        { error: "No items provided for checkout" },
        { status: 400 }
      );
    }

    // Create a checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url,
      cancel_url,
      metadata: {
        userId,
      },
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: "Error creating checkout session" },
      { status: 500 }
    );
  }
}
