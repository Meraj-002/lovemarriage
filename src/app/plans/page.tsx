import { Suspense } from "react";
import PlansClient from "./PlansClient";

export default function PlansPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-white text-lg font-semibold text-[#4b5563]">
          Loading plans...
        </div>
      }
    >
      <PlansClient />
    </Suspense>
  );
}