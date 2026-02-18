"use client";

import dynamic from "next/dynamic";

export const FireParticles = dynamic(
  () => import("@/components/FireParticles"),
  { ssr: false },
);

export const SofiaChat = dynamic(() => import("@/components/SofiaChat"), {
  ssr: false,
});
