import type { Metadata } from "next";

import { OrderPage } from "@/components/pages/OrderPage";
import { brand, brandOpenGraphImages } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Order an Article — Commission the Desk",
  description:
    "Commission reported, edited copy from The Liban & Fu Show. Brief the desk, track the spike, file on deadline — newsroom standards, not filler.",
  openGraph: {
    title: "Order an Article — The Liban & Fu Show",
    description: "Assign a reporter. We report it, edit it, and file to your deadline.",
    images: brandOpenGraphImages,
  },
};

export default function Page() {
  return <OrderPage />;
}
