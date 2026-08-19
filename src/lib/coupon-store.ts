import { randomUUID } from "crypto";
import { mkdir, readFile, unlink, writeFile } from "fs/promises";
import path from "path";

import { seedCoupons, type Coupon, type CouponInput } from "./coupons";

const DATA_PATH = path.join(process.cwd(), "data", "coupons.json");
const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads", "coupons");

type CouponCache = { items: Coupon[] | null };

const cache = globalThis as typeof globalThis & { __pressroomCoupons?: CouponCache };

function memory(): CouponCache {
  cache.__pressroomCoupons ??= { items: null };
  return cache.__pressroomCoupons;
}

async function readDisk(): Promise<Coupon[] | null> {
  try {
    const raw = await readFile(DATA_PATH, "utf8");
    const parsed = JSON.parse(raw) as Coupon[];
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

async function writeDisk(items: Coupon[]) {
  try {
    await mkdir(path.dirname(DATA_PATH), { recursive: true });
    await writeFile(DATA_PATH, `${JSON.stringify(items, null, 2)}\n`, "utf8");
  } catch {
    // Serverless hosts are often read-only; in-memory store still works for the process.
  }
}

export async function listCoupons(): Promise<Coupon[]> {
  const mem = memory();
  if (mem.items) return mem.items;
  const fromDisk = await readDisk();
  mem.items = fromDisk ?? seedCoupons.map((c) => ({ ...c }));
  return mem.items;
}

async function commit(items: Coupon[]) {
  memory().items = items;
  await writeDisk(items);
  return items;
}

export async function getCoupon(id: string) {
  return (await listCoupons()).find((c) => c.id === id) ?? null;
}

const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

export async function saveCouponImage(id: string, file: File) {
  const ext = ALLOWED_TYPES[file.type];
  if (!ext) {
    throw new Error("INVALID_IMAGE");
  }
  if (file.size > 4 * 1024 * 1024) {
    throw new Error("IMAGE_TOO_LARGE");
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  await mkdir(UPLOAD_DIR, { recursive: true });
  const filename = `${id}.${ext}`;
  await writeFile(path.join(UPLOAD_DIR, filename), bytes);
  return `/uploads/coupons/${filename}?v=${Date.now()}`;
}

async function removeUpload(image: string) {
  const match = image.match(/^\/uploads\/coupons\/([^/?]+)/);
  if (!match?.[1]) return;
  try {
    await unlink(path.join(UPLOAD_DIR, match[1]));
  } catch {
    /* already gone */
  }
}

function clean(input: CouponInput): CouponInput {
  return {
    title: input.title.trim(),
    merchant: input.merchant.trim(),
    description: input.description.trim(),
    code: input.code.trim().toUpperCase(),
    discount: input.discount.trim(),
    category: input.category.trim() || "Shopping",
    expiresAt: input.expiresAt.trim(),
    terms: input.terms.trim(),
    url: input.url.trim(),
    featured: Boolean(input.featured),
    active: Boolean(input.active),
    image: input.image,
  };
}

export function parseCouponForm(form: FormData): CouponInput {
  return {
    title: String(form.get("title") ?? ""),
    merchant: String(form.get("merchant") ?? ""),
    description: String(form.get("description") ?? ""),
    code: String(form.get("code") ?? ""),
    discount: String(form.get("discount") ?? ""),
    category: String(form.get("category") ?? "Shopping"),
    expiresAt: String(form.get("expiresAt") ?? ""),
    terms: String(form.get("terms") ?? ""),
    url: String(form.get("url") ?? ""),
    featured: form.get("featured") === "true" || form.get("featured") === "on",
    active: form.get("active") !== "false",
  };
}

export function validateCouponInput(input: CouponInput, requireImage: boolean) {
  if (!input.title || !input.code || !input.discount) {
    throw new Error("REQUIRED");
  }
  if (requireImage && !input.image) {
    throw new Error("IMAGE_REQUIRED");
  }
}

export async function createCoupon(input: CouponInput, file: File | null) {
  const body = clean(input);
  const id = `cp-${randomUUID().slice(0, 8)}`;
  let image = body.image ?? "";
  if (file && file.size > 0) {
    image = await saveCouponImage(id, file);
  }
  validateCouponInput({ ...body, image }, true);

  const coupon: Coupon = {
    id,
    ...body,
    image,
    createdAt: new Date().toISOString(),
  };
  const items = await listCoupons();
  await commit([coupon, ...items]);
  return coupon;
}

export async function updateCoupon(id: string, input: CouponInput, file: File | null) {
  const items = await listCoupons();
  const index = items.findIndex((c) => c.id === id);
  if (index === -1) return null;

  const current = items[index]!;
  const body = clean(input);
  let image = body.image || current.image;
  if (file && file.size > 0) {
    const nextImage = await saveCouponImage(id, file);
    if (current.image !== nextImage) await removeUpload(current.image);
    image = nextImage;
  }
  validateCouponInput({ ...body, image }, true);

  const next: Coupon = { ...current, ...body, image };
  const updated = [...items];
  updated[index] = next;
  await commit(updated);
  return next;
}

export async function deleteCoupon(id: string) {
  const items = await listCoupons();
  const found = items.find((c) => c.id === id);
  if (!found) return false;
  await removeUpload(found.image);
  await commit(items.filter((c) => c.id !== id));
  return true;
}

export function errorStatus(error: unknown) {
  const code = error instanceof Error ? error.message : "";
  if (code === "REQUIRED" || code === "IMAGE_REQUIRED" || code === "INVALID_IMAGE") return 400;
  if (code === "IMAGE_TOO_LARGE") return 413;
  return 500;
}

export function errorMessage(error: unknown) {
  const code = error instanceof Error ? error.message : "UNKNOWN";
  switch (code) {
    case "REQUIRED":
      return "Title, code and discount are required.";
    case "IMAGE_REQUIRED":
      return "Upload a coupon image.";
    case "INVALID_IMAGE":
      return "Only JPG, PNG or WebP images can be uploaded.";
    case "IMAGE_TOO_LARGE":
      return "Images must be 4MB or smaller.";
    default:
      return "Could not save the coupon.";
  }
}
