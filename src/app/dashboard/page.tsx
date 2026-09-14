import type { Metadata } from "next";

import { StaffDashboardPage } from "@/components/pages/StaffDashboardPage";
import { brand, brandOpenGraphImages } from "@/lib/brand";

export const metadata: Metadata = {
  title: `Staff dashboard - ${brand.name}`,
  description: `Choose the admin newsroom or author workspace for ${brand.name}.`,
  openGraph: {
    title: `Staff dashboard - ${brand.name}`,
    description: "Access admin and author tools from one place.",
    images: brandOpenGraphImages,
  },
};

export default function Page() {
  return <StaffDashboardPage />;
}
