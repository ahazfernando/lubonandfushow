"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ImagePlus, Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { useI18n } from "./LanguageProvider";
import { SectionHeading } from "./SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { fetchCoupons, removeCoupon, saveCoupon } from "@/lib/coupon-api";
import { couponCategories, couponIsExpired, type Coupon } from "@/lib/coupons";

const emptyForm = {
  title: "",
  merchant: "",
  description: "",
  code: "",
  discount: "",
  category: "Dining",
  expiresAt: "",
  terms: "",
  url: "",
  featured: false,
  active: true,
};

export function CouponManager() {
  const { t, formatDate, locale } = useI18n();
  const caseClass = locale === "si" ? "" : "uppercase";
  const queryClient = useQueryClient();
  const { data: coupons = [], isLoading } = useQuery({
    queryKey: ["coupons", "all"],
    queryFn: () => fetchCoupons(true),
  });

  const [editing, setEditing] = useState<Coupon | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    if (!imageFile) return;
    const url = URL.createObjectURL(imageFile);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [imageFile]);

  function resetForm() {
    setEditing(null);
    setForm(emptyForm);
    setImageFile(null);
    setPreview(null);
  }

  function loadCoupon(coupon: Coupon) {
    setEditing(coupon);
    setForm({
      title: coupon.title,
      merchant: coupon.merchant,
      description: coupon.description,
      code: coupon.code,
      discount: coupon.discount,
      category: coupon.category,
      expiresAt: coupon.expiresAt,
      terms: coupon.terms,
      url: coupon.url,
      featured: coupon.featured,
      active: coupon.active,
    });
    setImageFile(null);
    setPreview(coupon.image);
  }

  function takeFiles(files: FileList | null) {
    const file = files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error(t.coupons.invalidImage);
      return;
    }
    setImageFile(file);
  }

  const saveMutation = useMutation({
    mutationFn: async () => {
      const data = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        data.set(key, String(value));
      });
      if (imageFile) data.set("image", imageFile);
      return saveCoupon(data, editing?.id);
    },
    onSuccess: () => {
      toast.success(editing ? t.coupons.updated : t.coupons.created);
      queryClient.invalidateQueries({ queryKey: ["coupons"] });
      resetForm();
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const deleteMutation = useMutation({
    mutationFn: removeCoupon,
    onSuccess: () => {
      toast.success(t.coupons.deleted);
      queryClient.invalidateQueries({ queryKey: ["coupons"] });
      if (editing) resetForm();
    },
    onError: (error: Error) => toast.error(error.message),
  });

  return (
    <div className="mx-auto grid max-w-7xl gap-8 px-4 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="card-press p-6">
        <SectionHeading title={editing ? t.coupons.editCoupon : t.coupons.uploadCoupon} />
        <form
          className="grid gap-4 sm:grid-cols-2"
          onSubmit={(e) => {
            e.preventDefault();
            saveMutation.mutate();
          }}
        >
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="coupon-title">{t.coupons.fieldTitle}</Label>
            <Input
              id="coupon-title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              maxLength={120}
              className="rounded-sm"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="coupon-merchant">{t.coupons.fieldMerchant}</Label>
            <Input
              id="coupon-merchant"
              value={form.merchant}
              onChange={(e) => setForm({ ...form, merchant: e.target.value })}
              maxLength={80}
              className="rounded-sm"
            />
          </div>
          <div className="space-y-2">
            <Label>{t.coupons.fieldCategory}</Label>
            <Select
              value={form.category}
              onValueChange={(category) => setForm({ ...form, category })}
            >
              <SelectTrigger className="rounded-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {couponCategories.map((c) => (
                  <SelectItem key={c} value={c}>
                    {t.couponCategories[c] ?? c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="coupon-code">{t.coupons.fieldCode}</Label>
            <Input
              id="coupon-code"
              value={form.code}
              onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })}
              maxLength={24}
              className="rounded-sm"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="coupon-discount">{t.coupons.fieldDiscount}</Label>
            <Input
              id="coupon-discount"
              value={form.discount}
              onChange={(e) => setForm({ ...form, discount: e.target.value })}
              placeholder={t.coupons.discountPlaceholder}
              maxLength={32}
              className="rounded-sm"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="coupon-expires">{t.coupons.fieldExpires}</Label>
            <Input
              id="coupon-expires"
              type="date"
              value={form.expiresAt}
              onChange={(e) => setForm({ ...form, expiresAt: e.target.value })}
              className="rounded-sm"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="coupon-url">{t.coupons.fieldUrl}</Label>
            <Input
              id="coupon-url"
              type="url"
              value={form.url}
              onChange={(e) => setForm({ ...form, url: e.target.value })}
              placeholder="https://"
              className="rounded-sm"
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="coupon-description">{t.coupons.fieldDescription}</Label>
            <Textarea
              id="coupon-description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
              maxLength={400}
              className="rounded-sm"
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="coupon-terms">{t.coupons.fieldTerms}</Label>
            <Textarea
              id="coupon-terms"
              value={form.terms}
              onChange={(e) => setForm({ ...form, terms: e.target.value })}
              rows={2}
              maxLength={300}
              className="rounded-sm"
            />
          </div>

          <div
            className={`sm:col-span-2 flex flex-col items-center justify-center gap-2 border-2 border-dashed p-6 text-center text-sm transition-colors ${
              dragging ? "border-primary bg-primary/5" : "border-border"
            }`}
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragging(false);
              takeFiles(e.dataTransfer.files);
            }}
          >
            {preview ? (
              <img src={preview} alt="" className="h-32 w-full object-cover" />
            ) : (
              <>
                <ImagePlus className="size-5 text-primary" />
                <p className="font-semibold">{t.coupons.dropImage}</p>
                <p className="text-xs text-muted-foreground">{t.coupons.dropHint}</p>
              </>
            )}
            <label className="cursor-pointer text-xs font-semibold text-primary">
              {t.coupons.browse}
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={(e) => takeFiles(e.target.files)}
              />
            </label>
          </div>

          <div className="flex items-center justify-between border border-border p-3">
            <Label htmlFor="coupon-featured">{t.coupons.featured}</Label>
            <Switch
              id="coupon-featured"
              checked={form.featured}
              onCheckedChange={(featured) => setForm({ ...form, featured })}
            />
          </div>
          <div className="flex items-center justify-between border border-border p-3">
            <Label htmlFor="coupon-active">{t.coupons.publish}</Label>
            <Switch
              id="coupon-active"
              checked={form.active}
              onCheckedChange={(active) => setForm({ ...form, active })}
            />
          </div>

          <div className="flex flex-wrap gap-2 sm:col-span-2">
            <Button
              type="submit"
              className={`rounded-sm font-semibold ${caseClass}`}
              disabled={saveMutation.isPending}
            >
              {editing ? t.coupons.saveChanges : t.coupons.uploadCoupon}
            </Button>
            {editing && (
              <Button type="button" variant="outline" className="rounded-sm" onClick={resetForm}>
                {t.common.cancel}
              </Button>
            )}
          </div>
        </form>
      </div>

      <div className="space-y-4">
        <SectionHeading title={t.coupons.library} />
        {isLoading && <p className="text-sm text-muted-foreground">{t.coupons.loading}</p>}
        {coupons.map((coupon) => {
          const expired = couponIsExpired(coupon);
          return (
            <div key={coupon.id} className="card-press flex gap-3 p-3">
              <img src={coupon.image} alt="" className="h-20 w-24 shrink-0 object-cover" />
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold">{coupon.title}</p>
                <p className="text-xs text-muted-foreground">
                  {coupon.code} · {coupon.discount}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {expired ? t.coupons.expired : formatDate(coupon.expiresAt)}
                  {" · "}
                  {coupon.active ? t.coupons.live : t.coupons.hidden}
                </p>
              </div>
              <div className="flex shrink-0 flex-col gap-1">
                <Button
                  type="button"
                  size="icon"
                  variant="outline"
                  className="size-8 rounded-sm"
                  onClick={() => loadCoupon(coupon)}
                  aria-label={t.coupons.editCoupon}
                >
                  <Pencil className="size-3.5" />
                </Button>
                <Button
                  type="button"
                  size="icon"
                  variant="outline"
                  className="size-8 rounded-sm text-destructive"
                  onClick={() => deleteMutation.mutate(coupon.id)}
                  aria-label={t.common.delete}
                >
                  <Trash2 className="size-3.5" />
                </Button>
              </div>
            </div>
          );
        })}
        {!isLoading && coupons.length === 0 && (
          <p className="font-serif text-sm text-muted-foreground">{t.coupons.empty}</p>
        )}
      </div>
    </div>
  );
}
