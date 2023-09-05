import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { roomId: string } }
) {
  try {
    const body = await req.json();
    const { name, price, images, description, availability } = body;
    if (!name) return new NextResponse("Name is required");
    if (!price) return new NextResponse("Price is required");
    if (!images || !images.length) return new NextResponse("Image is required");
    if (!params.roomId) return new NextResponse("Room id is required");
    await prismadb.room.update({
      where: {
        id: params.roomId,
      },
      data: {
        name,
        price,
        description,
        availability,
        images: {
          deleteMany: {},
        },
      },
    });

    const room = await prismadb.room.update({
      where: {
        id: params.roomId,
      },
      data: {
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

export async function DELETE(
  req: Request,
  { params }: { params: { roomId: string } }
) {
  console.log(params);
  try {
    if (!params.roomId) return new NextResponse("Id is required");
    const room = await prismadb.room.delete({
      where: {
        id: params.roomId,
      },
    });
    if (!room) return new NextResponse("No id match found");
    return NextResponse.json(room);
  } catch (err) {
    console.log(err);
  }
}

export async function GET(
  req: Request,
  { params }: { params: { roomId: string } }
) {
  try {
    console.log("api room id");
    if (!params.roomId) return new NextResponse("No id found");

    const room = await prismadb.room.findUnique({
      where: {
        id: params.roomId,
      },
      include: {
        images: true,
      },
    });
    return NextResponse.json(room);
  } catch (err) {
    console.log(err);
  }
}
