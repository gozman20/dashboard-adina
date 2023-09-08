import { getTotalRevenue } from "@/actions/getTotalRevenue";
import Heading from "@/components/ui/Heading";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getTotalRoomsBooked } from "@/actions/getTotalRoomsBooked";
import OverView from "./components/OverView";
import { getGraphRevenue } from "@/actions/getGraphRevenue";

export default async function Home() {
  const totalRevenue = await getTotalRevenue();
  const BookedRooms = await getTotalRoomsBooked();
  const graphRevenue = await getGraphRevenue();
  return (
    <div className="space-y-4 p-8 pt-6">
      <Heading title="Chart" description="Sales chart" />
      <Separator />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-semibold text-medium">${totalRevenue}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Rooms Booked</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-semibold text-medium">+{BookedRooms}</p>
          </CardContent>
        </Card>
      </div>
      <div>
        <OverView data={graphRevenue} />
      </div>
    </div>
  );
}
