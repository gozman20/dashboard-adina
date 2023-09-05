"use client";

import { ColumnDef } from "@tanstack/react-table";

export type ReservationColumn = {
  id: string;
  phone: string;
  name: string;
  isPaid: boolean;
  totalPrice: string;
  roomNumber: string;
  startDate: string;
  endDate: string;
};

export const columns: ColumnDef<ReservationColumn>[] = [
  {
    accessorKey: "roomNumber",
    header: "Room No",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },

  {
    accessorKey: "totalPrice",
    header: "Total price",
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("totalPrice"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price);

      return <div className=" font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "startDate",
    header: "Arrival",
  },
  {
    accessorKey: "endDate",
    header: "Departure",
  },
  {
    accessorKey: "isPaid",
    header: "Paid",
  },
];
