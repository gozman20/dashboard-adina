"use client";

import { DataTable } from "@/components/ui/DataTable";
import Heading from "@/components/ui/Heading";
import { Separator } from "@/components/ui/separator";

import { columns, ReservationColumn } from "./Column";

interface ReservationClientProps {
  data: ReservationColumn[];
}

export const ReservationClient: React.FC<ReservationClientProps> = ({
  data,
}) => {
  return (
    <>
      <Heading
        title={`Reservations (${data.length})`}
        description="Manage orders for your Reservations"
      />
      <Separator />
      <DataTable searchKey="room" columns={columns} data={data} />
    </>
  );
};
