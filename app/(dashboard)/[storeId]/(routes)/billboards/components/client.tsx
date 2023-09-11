import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import React from "react";

const BillboardClient = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title="Billboard (0)" description="Manage billboards here" />
        <Button className="gap-x-2">
          <Plus className="w-4 h-4" />
          Add New
        </Button>
      </div>
      <Separator />
    </>
  );
};

export default BillboardClient;
