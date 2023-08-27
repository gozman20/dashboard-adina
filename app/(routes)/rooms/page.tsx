import Heading from "@/components/ui/Heading";
import React from "react";
import RoomClient from "./components/RoomClient";
import prismadb from "@/lib/prismadb";
import { format } from "date-fns";
const RoomPage = async () => {
  const rooms = await prismadb.room.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedRoom = rooms.map((item) => ({
    id: item.id,
    name: item.name,
    price: parseFloat(String(item.price)),
    createdAt: format(item.createdAt, "MMMM,do,yyyy"),
  }));
  return (
    <div>
      <div className="space-y-4 p-8 pt-6">
        <RoomClient data={formattedRoom} />
      </div>
    </div>
  );
};

export default RoomPage;
