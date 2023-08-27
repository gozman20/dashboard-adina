"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./CellAction";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type RoomColumn = {
  id: string;
  name: string;
  price: number;
  createdAt: string;
};

export const columns: ColumnDef<RoomColumn>[] = [
  {
    accessorKey: "id",
    header: "Room id",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "price",
    header: () => <div className="text-right">Price</div>,
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
