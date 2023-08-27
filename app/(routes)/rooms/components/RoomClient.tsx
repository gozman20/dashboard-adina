"use client";
import Heading from "@/components/ui/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { columns } from "./Columns";
import { Plus } from "lucide-react";
import { RoomColumn } from "./Columns";
import { DataTable } from "@/components/ui/DataTable";
import { useRouter } from "next/navigation";
import { ApiAlert } from "@/components/ui/ApiAlert";
import { useOrigin } from "@/hooks/useOrigin";

interface RoomClientProps {
  data: RoomColumn[];
}

const RoomClient: React.FC<RoomClientProps> = ({ data = [] }) => {
  const router = useRouter();
  const origin = useOrigin();
  return (
    <>
      <div className="flex justify-between items-center">
        {" "}
        <Heading
          title={`Rooms (${data.length})`}
          description="Manage your rooms"
        />
        <Button onClick={() => router.push("/rooms/new")}>
          <Plus className="mr-4 h-4 w-4" /> Add new
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      <Separator />
      <ApiAlert
        title="NEXT_PUBLIC_API_URL"
        description={`${origin}/api/rooms}`}
        variant="public"
      />
    </>
  );
};

export default RoomClient;
