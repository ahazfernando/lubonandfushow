import type { Coupon } from "./coupons";

export async function fetchCoupons(all = false): Promise<Coupon[]> {
  const res = await fetch(all ? "/api/coupons?all=1" : "/api/coupons", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load coupons");
  return res.json();
}

export async function saveCoupon(form: FormData, id?: string): Promise<Coupon> {
  const res = await fetch(id ? `/api/coupons/${id}` : "/api/coupons", {
    method: id ? "PATCH" : "POST",
    body: form,
  });
  const payload = await res.json();
  if (!res.ok) throw new Error(payload.error || "Failed to save coupon");
  return payload;
}

export async function removeCoupon(id: string) {
  const res = await fetch(`/api/coupons/${id}`, { method: "DELETE" });
  const payload = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(payload.error || "Failed to delete coupon");
}
