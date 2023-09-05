import Stripe from "stripe";
import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import prismadb from "@/lib/prismadb";
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req: Request) {
  const { roomId, totalPrice, startDate, endDate } = await req.json();

  if (!roomId) {
    console.log("No room id");
    return new NextResponse("roomId ids are required", { status: 400 });
  }
  console.log("Gooxxy");
  const bookedRoom = await prismadb.room.findUnique({
    where: {
      id: roomId,
    },
  });
  if (!bookedRoom) return new NextResponse("No id match");
  const item = {
    quantity: 1,
    price_data: {
      currency: "USD",
      product_data: { name: bookedRoom.name },
      unit_amount_decimal: String(+totalPrice * 100),
    },
  };
  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [item];

  const reservation = await prismadb.reservation.create({
    data: {
      isPaid: false,
      startDate: startDate,
      endDate: endDate,
      totalPrice: String(totalPrice),
      bookedRoom: {
        create: {
          room: {
            connect: {
              id: roomId,
            },
          },
        },
      },
    },
  });

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    billing_address_collection: "required",
    phone_number_collection: {
      enabled: true,
    },
    success_url: `${process.env.FRONTEND_URL}/?success=1`,
    cancel_url: `${process.env.FRONTEND_URL}/?canceled=1`,
    metadata: {
      reservationId: reservation.id,
    },
  });
  return NextResponse.json(
    { url: session.url },
    {
      headers: corsHeaders,
    }
  );
}
