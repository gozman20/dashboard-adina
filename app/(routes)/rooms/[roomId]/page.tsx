import React from "react";
import { ProductForm } from "./components/ProductForm";
import { useParams } from "next/navigation";
import prismadb from "@/lib/prismadb";

const Product = async ({ params }: { params: { roomId: string } }) => {
  const room = await prismadb.room.findUnique({
    where: {
      id: params.roomId,
    },
    include: {
      images: true,
    },
  });

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <ProductForm initialData={room} />
    </div>
  );
};

export default Product;
