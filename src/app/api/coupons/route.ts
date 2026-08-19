import { NextResponse } from "next/server";

import {
  createCoupon,
  errorMessage,
  errorStatus,
  listCoupons,
  parseCouponForm,
} from "@/lib/coupon-store";
import { isPublicCoupon } from "@/lib/coupons";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const all = searchParams.get("all") === "1";
  const items = await listCoupons();
  return NextResponse.json(all ? items : items.filter(isPublicCoupon));
}

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const input = parseCouponForm(form);
    const file = form.get("image");
    const coupon = await createCoupon(input, file instanceof File ? file : null);
    return NextResponse.json(coupon, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: errorMessage(error) }, { status: errorStatus(error) });
  }
}
