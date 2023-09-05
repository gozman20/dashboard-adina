import Heading from "@/components/ui/Heading";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

export default function Home() {
  return (
    <div className="space-y-4 p-8 pt-6">
      <Heading title="Chart" description="Sales chart" />
      <Separator />
    </div>
  );
}
