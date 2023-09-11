"use client";

import { LoadingButton } from "@/components/ui/loading-button";
import { useState } from "react";

const DashboardPage = () => {
  const [loadin, setLoadin] = useState(false);
  return (
    <div>
      <LoadingButton
        action={() => {
          console.log("pressed");
        }}
        loading={loadin}
        setLoading={setLoadin}
      >
        Press me
      </LoadingButton>
    </div>
  );
};

export default DashboardPage;
