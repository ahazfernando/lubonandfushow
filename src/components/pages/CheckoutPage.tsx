"use client";

import Link from "next/link";
import { useMemo, useState, type ReactNode } from "react";
import { CreditCard, Lock } from "lucide-react";
import { toast } from "sonner";

import { useCart } from "@/components/site/CartProvider";
import { useI18n } from "@/components/site/LanguageProvider";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SHIPPING_PRICE, formatPrice } from "@/lib/products";

type Payment = "card" | "afterpay" | "zip" | "cash";

const fieldClass =
  "h-11 rounded-lg border-border bg-background shadow-none focus-visible:ring-foreground/20";

export function CheckoutPage() {
  const { t, msg } = useI18n();
  const { items, count, subtotal, ready, clear } = useCart();
  const [email, setEmail] = useState("");
  const [offers, setOffers] = useState(false);
  const [country, setCountry] = useState("AU");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [apartment, setApartment] = useState("");
  const [city, setCity] = useState("");
  const [postal, setPostal] = useState("");
  const [phone, setPhone] = useState("");
  const [saveInfo, setSaveInfo] = useState(false);
  const [smsOffers, setSmsOffers] = useState(false);
  const [payment, setPayment] = useState<Payment>("card");
  const [sameBilling, setSameBilling] = useState(true);
  const [discount, setDiscount] = useState("");
  const [applied, setApplied] = useState<"SAVE10" | "WELCOME" | null>(null);
  const [placed, setPlaced] = useState(false);

  const discountAmount = useMemo(() => {
    if (applied === "SAVE10") return subtotal * 0.1;
    if (applied === "WELCOME") return subtotal * 0.2;
    return 0;
  }, [applied, subtotal]);
  const shipping = items.length ? SHIPPING_PRICE : 0;
  const total = Math.max(0, subtotal - discountAmount) + shipping;

  function applyDiscount() {
    const code = discount.trim().toUpperCase();
    if (code === "SAVE10" || code === "WELCOME") {
      setApplied(code);
      toast.success(t.checkout.discountApplied);
      return;
    }
    toast.error(t.checkout.discountInvalid);
  }

  function pay() {
    if (!items.length) return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      toast.error(t.checkout.invalidEmail);
      return;
    }
    if (!firstName.trim() || !lastName.trim() || !address.trim() || !city.trim() || !postal.trim() || !phone.trim()) {
      toast.error(t.checkout.required);
      return;
    }
    clear();
    setPlaced(true);
  }

  if (!ready) {
    return (
      <SiteLayout>
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="h-64 animate-pulse rounded-2xl bg-muted" />
        </div>
      </SiteLayout>
    );
  }

  if (placed) {
    return (
      <SiteLayout>
        <div className="mx-auto max-w-xl px-4 py-24 text-center">
          <h1 className="text-4xl">{t.checkout.paidTitle}</h1>
          <p className="mt-3 text-muted-foreground">{t.checkout.paidBody}</p>
          <Link href="/shop" className="mt-8 inline-flex">
            <Button className="rounded-full bg-foreground px-6 text-background hover:bg-foreground/90">
              {t.cart.continueShopping}
            </Button>
          </Link>
        </div>
      </SiteLayout>
    );
  }

  if (!items.length) {
    return (
      <SiteLayout>
        <div className="mx-auto max-w-xl px-4 py-24 text-center">
          <h1 className="text-4xl">{t.checkout.title}</h1>
          <p className="mt-3 text-muted-foreground">{t.checkout.emptyCart}</p>
          <Link href="/shop" className="mt-8 inline-flex">
            <Button className="rounded-full bg-foreground px-6 text-background hover:bg-foreground/90">
              {t.cart.browseShop}
            </Button>
          </Link>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)] lg:py-14">
        <div>
          <h1 className="text-4xl">{t.checkout.title}</h1>

          <section className="mt-8">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">{t.checkout.contact}</h2>
              <Link href="/login" className="text-sm text-muted-foreground underline">
                {t.nav.signIn}
              </Link>
            </div>
            <Input
              className={`mt-3 ${fieldClass}`}
              type="email"
              placeholder={t.checkout.email}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
              <Checkbox checked={offers} onCheckedChange={(v) => setOffers(v === true)} />
              {t.checkout.emailOffers}
            </label>
          </section>

          <section className="mt-8">
            <h2 className="text-lg font-semibold">{t.checkout.delivery}</h2>
            <div className="mt-3 space-y-3">
              <Select value={country} onValueChange={setCountry}>
                <SelectTrigger className={fieldClass}>
                  <SelectValue placeholder={t.checkout.country} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AU">Australia</SelectItem>
                  <SelectItem value="NZ">New Zealand</SelectItem>
                  <SelectItem value="LK">Sri Lanka</SelectItem>
                  <SelectItem value="GB">United Kingdom</SelectItem>
                  <SelectItem value="US">United States</SelectItem>
                </SelectContent>
              </Select>
              <div className="grid gap-3 sm:grid-cols-2">
                <Input
                  className={fieldClass}
                  placeholder={t.checkout.firstName}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <Input
                  className={fieldClass}
                  placeholder={t.checkout.lastName}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <Input
                className={fieldClass}
                placeholder={t.checkout.address}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <Input
                className={fieldClass}
                placeholder={t.checkout.apartment}
                value={apartment}
                onChange={(e) => setApartment(e.target.value)}
              />
              <div className="grid gap-3 sm:grid-cols-2">
                <Input
                  className={fieldClass}
                  placeholder={t.checkout.city}
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
                <Input
                  className={fieldClass}
                  placeholder={t.checkout.postal}
                  value={postal}
                  onChange={(e) => setPostal(e.target.value)}
                />
              </div>
              <Input
                className={fieldClass}
                placeholder={t.checkout.phone}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <label className="flex items-center gap-2 text-sm text-muted-foreground">
                <Checkbox checked={saveInfo} onCheckedChange={(v) => setSaveInfo(v === true)} />
                {t.checkout.saveInfo}
              </label>
              <label className="flex items-center gap-2 text-sm text-muted-foreground">
                <Checkbox checked={smsOffers} onCheckedChange={(v) => setSmsOffers(v === true)} />
                {t.checkout.smsOffers}
              </label>
            </div>
          </section>

          <section className="mt-8">
            <h2 className="text-lg font-semibold">{t.checkout.shippingMethod}</h2>
            <div className="mt-3 flex items-center justify-between rounded-lg border border-border px-4 py-3">
              <div>
                <p className="text-sm font-medium">{t.checkout.standard}</p>
                <p className="text-xs text-muted-foreground">{t.checkout.standardEta}</p>
              </div>
              <p className="text-sm">{formatPrice(SHIPPING_PRICE)}</p>
            </div>
          </section>

          <section className="mt-8">
            <h2 className="text-lg font-semibold">{t.checkout.payment}</h2>
            <RadioGroup
              value={payment}
              onValueChange={(value) => setPayment(value as Payment)}
              className="mt-3 gap-0 overflow-hidden rounded-lg border border-border"
            >
              <PaymentRow
                value="card"
                checked={payment === "card"}
                label={t.checkout.card}
                extra={
                  <span className="flex items-center gap-1 text-[10px] font-bold tracking-wide">
                    <span className="rounded bg-[#1a1f71] px-1.5 py-0.5 text-white">VISA</span>
                    <span className="rounded bg-[#eb001b] px-1.5 py-0.5 text-white">MC</span>
                  </span>
                }
              />
              {payment === "card" ? (
                <div className="space-y-3 border-t border-border bg-muted/30 p-4">
                  <div className="relative">
                    <Input className={fieldClass} placeholder={t.checkout.cardNumber} autoComplete="off" />
                    <Lock className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground" />
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Input className={fieldClass} placeholder={t.checkout.expiry} autoComplete="off" />
                    <Input className={fieldClass} placeholder={t.checkout.security} autoComplete="off" />
                  </div>
                  <Input className={fieldClass} placeholder={t.checkout.nameOnCard} autoComplete="off" />
                  <label className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Checkbox checked={sameBilling} onCheckedChange={(v) => setSameBilling(v === true)} />
                    {t.checkout.billingSame}
                  </label>
                </div>
              ) : null}
              <PaymentRow value="afterpay" checked={payment === "afterpay"} label={t.checkout.afterpay} />
              <PaymentRow value="zip" checked={payment === "zip"} label={t.checkout.zipPay} />
              <PaymentRow value="cash" checked={payment === "cash"} label={t.checkout.cashOnDelivery} />
            </RadioGroup>
          </section>

          <p className="mt-6 flex flex-wrap gap-4 text-xs text-muted-foreground">
            <span>{t.checkout.refundPolicy}</span>
            <span>{t.checkout.shippingPolicy}</span>
            <span>{t.checkout.terms}</span>
            <span>{t.checkout.contactLink}</span>
          </p>
        </div>

        <aside className="h-fit lg:sticky lg:top-28">
          <ul className="space-y-4">
            {items.map((item) => {
              const color = item.product.colors.find((c) => c.id === item.color)?.name;
              const variant = [color, item.size].filter(Boolean).join(" / ");
              return (
                <li key={item.key} className="flex items-center gap-3">
                  <div className="relative size-16 shrink-0 overflow-hidden rounded-lg border border-border bg-muted/40">
                    <img
                      src={item.product.image}
                      alt=""
                      className="size-full object-contain p-1"
                    />
                    <span className="absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full bg-muted-foreground text-[10px] font-semibold text-background">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{item.product.name}</p>
                    {variant ? <p className="text-xs text-muted-foreground">{variant}</p> : null}
                  </div>
                  <p className="text-sm">{formatPrice(item.product.price * item.quantity)}</p>
                </li>
              );
            })}
          </ul>

          <div className="mt-5 flex gap-2">
            <Input
              className={fieldClass}
              placeholder={t.checkout.discount}
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
            />
            <Button variant="outline" className="h-11 rounded-lg px-5" onClick={applyDiscount}>
              {t.checkout.apply}
            </Button>
          </div>

          <dl className="mt-6 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">
                {t.cart.subtotal} · {msg(count === 1 ? t.cart.item : t.cart.items, { n: count })}
              </dt>
              <dd>{formatPrice(subtotal)}</dd>
            </div>
            {discountAmount > 0 ? (
              <div className="flex justify-between text-emerald-700">
                <dt>{t.checkout.discount}</dt>
                <dd>-{formatPrice(discountAmount)}</dd>
              </div>
            ) : null}
            <div className="flex justify-between">
              <dt className="text-muted-foreground">{t.cart.shipping}</dt>
              <dd>{formatPrice(shipping)}</dd>
            </div>
            <div className="flex justify-between border-t border-border pt-3 text-base font-semibold">
              <dt>{t.cart.total}</dt>
              <dd>{formatPrice(total)}</dd>
            </div>
          </dl>

          <Button
            className="mt-5 h-12 w-full rounded-full bg-foreground text-background hover:bg-foreground/90"
            onClick={pay}
          >
            {t.checkout.payNow}
          </Button>
        </aside>
      </div>
    </SiteLayout>
  );
}

function PaymentRow({
  value,
  checked,
  label,
  extra,
}: {
  value: Payment;
  checked: boolean;
  label: string;
  extra?: ReactNode;
}) {
  return (
    <label
      className={`flex cursor-pointer items-center justify-between gap-3 border-b border-border px-4 py-3 last:border-b-0 ${
        checked ? "bg-muted/40" : ""
      }`}
    >
      <span className="flex items-center gap-3 text-sm">
        <RadioGroupItem value={value} />
        {value === "card" ? <CreditCard className="size-4 text-muted-foreground" /> : null}
        {label}
      </span>
      {extra}
    </label>
  );
}
