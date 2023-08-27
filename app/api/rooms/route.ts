import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // const { userId } = auth();

    const body = await req.json();
    const { name, price, images, description, availability } = body;
    if (!name) return new NextResponse("Name is required");
    if (!price) return new NextResponse("Price is required");
    if (!images || !images.length) return new NextResponse("Image is required");

    const room = await prismadb.room.create({
      data: {
        name,
        price,
        description,
        availability,
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });

    return NextResponse.json(room);
  } catch (err) {
    console.log(err);
  }
}

export async function GET() {
  try {
    const rooms = await prismadb.room.findMany({
      include: {
        images: true,
      },
    });
    return NextResponse.json(rooms);
  } catch (err) {
    console.log(err);
  }
}
