import { Skeleton } from "@/components/ui/skeleton";

function HeaderSkeleton() {
  return (
    <div className="border-b border-border bg-background">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-3 px-3 py-3 sm:px-4">
        <Skeleton className="h-8 w-32 sm:h-9 sm:w-40" />
        <div className="hidden gap-4 lg:flex">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-16" />
          ))}
        </div>
        <div className="flex gap-2">
          <Skeleton className="size-8 rounded-sm sm:size-9" />
          <Skeleton className="size-8 rounded-sm sm:size-9" />
        </div>
      </div>
      <div className="border-t border-border px-3 py-3 sm:px-4">
        <div className="mx-auto flex max-w-[1400px] gap-5 overflow-hidden">
          {Array.from({ length: 10 }).map((_, i) => (
            <Skeleton key={i} className="h-3 w-16 shrink-0" />
          ))}
        </div>
      </div>
    </div>
  );
}

export function ArticleCardSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="aspect-[16/10] w-full rounded-sm" />
      <Skeleton className="h-3 w-20" />
      <Skeleton className="h-5 w-[90%]" />
      <Skeleton className="h-5 w-[70%]" />
      <Skeleton className="h-3 w-28" />
    </div>
  );
}

export function CouponCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-[1.1rem] border border-border bg-card">
      <Skeleton className="aspect-[4/3] w-full rounded-none" />
      <div className="space-y-3 p-4">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-5 w-[85%]" />
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-10 w-full rounded-full" />
      </div>
    </div>
  );
}

export function AuthPageSkeleton() {
  return (
    <div className="min-h-screen bg-black p-2 text-white sm:p-2.5 lg:p-3" aria-busy="true">
      <div className="grid min-h-[calc(100vh-1rem)] w-full lg:min-h-[calc(100vh-1.5rem)] lg:grid-cols-[minmax(420px,58%)_1fr] lg:gap-4">
        <aside className="relative hidden overflow-hidden rounded-[1.75rem] bg-[#3a1212] p-8 md:flex md:flex-col lg:p-10">
          <Skeleton className="h-9 w-36 bg-white/15" />
          <div className="mt-auto space-y-3 pb-4 pt-16">
            <Skeleton className="h-10 w-64 bg-white/20 sm:h-12" />
            <Skeleton className="h-10 w-48 bg-white/15" />
            <Skeleton className="h-4 w-72 max-w-full bg-white/10" />
            <Skeleton className="h-4 w-56 max-w-full bg-white/10" />
          </div>
        </aside>
        <div className="flex flex-col justify-center px-4 py-10 sm:px-8 lg:px-16">
          <div className="mx-auto w-full max-w-[440px] space-y-6">
            <div className="space-y-2">
              <Skeleton className="h-9 w-56 bg-white/15" />
              <Skeleton className="h-4 w-72 max-w-full bg-white/10" />
            </div>
            <Skeleton className="h-12 w-full rounded-xl bg-white/10" />
            <div className="flex items-center gap-4">
              <Skeleton className="h-px flex-1 bg-white/10" />
              <Skeleton className="h-3 w-8 bg-white/10" />
              <Skeleton className="h-px flex-1 bg-white/10" />
            </div>
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-3">
                <Skeleton className="h-12 rounded-xl bg-white/10" />
                <Skeleton className="h-12 rounded-xl bg-white/10" />
              </div>
              <Skeleton className="h-12 w-full rounded-xl bg-white/10" />
              <Skeleton className="h-12 w-full rounded-xl bg-white/10" />
              <Skeleton className="h-12 w-full rounded-xl bg-white/20" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PageSkeleton({
  variant = "default",
}: {
  variant?: "default" | "home" | "article" | "coupons" | "auth" | "admin";
}) {
  if (variant === "auth") return <AuthPageSkeleton />;

  return (
    <div className="flex min-h-screen flex-col bg-background" aria-busy="true">
      <HeaderSkeleton />
      <main className="flex-1">
        {variant === "home" ? <HomeSkeleton /> : null}
        {variant === "article" ? <ArticleSkeleton /> : null}
        {variant === "coupons" ? <CouponsSkeleton /> : null}
        {variant === "admin" ? <AdminSkeleton /> : null}
        {variant === "default" ? <DefaultSkeleton /> : null}
      </main>
    </div>
  );
}

function HomeSkeleton() {
  return (
    <>
      <div className="grid lg:grid-cols-[minmax(0,1fr)_300px] xl:grid-cols-[minmax(0,1fr)_340px]">
        <Skeleton className="min-h-[420px] w-full rounded-none md:min-h-[500px] lg:min-h-[560px]" />
        <Skeleton className="min-h-[320px] w-full rounded-none" />
      </div>
      <div className="mx-auto flex max-w-[1400px] justify-between gap-4 overflow-hidden px-4 py-10">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <Skeleton className="size-16 rounded-full" />
            <Skeleton className="h-3 w-12" />
          </div>
        ))}
      </div>
      <div className="mx-auto max-w-[1400px] px-4 pb-4">
        <Skeleton className="mb-6 h-8 w-48" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <ArticleCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </>
  );
}

function ArticleSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-10 w-[90%]" />
          <Skeleton className="h-10 w-[70%]" />
          <Skeleton className="h-4 w-48" />
          <Skeleton className="aspect-[16/9] w-full rounded-sm" />
          <div className="space-y-3 pt-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-full" />
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <Skeleton className="h-[360px] w-full rounded-[1.75rem]" />
          <Skeleton className="h-24 w-full rounded-sm" />
        </div>
      </div>
    </div>
  );
}

function CouponsSkeleton() {
  return (
    <>
      <div className="border-b border-border bg-ink py-14">
        <div className="mx-auto max-w-7xl space-y-3 px-4">
          <Skeleton className="h-3 w-16 bg-white/20" />
          <Skeleton className="h-10 w-64 bg-white/25" />
          <Skeleton className="h-4 w-full max-w-xl bg-white/15" />
        </div>
      </div>
      <section className="mx-auto max-w-7xl px-4 py-14">
        <Skeleton className="mb-6 h-8 w-40" />
        <div className="grid items-start gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <CouponCardSkeleton key={i} />
          ))}
        </div>
      </section>
    </>
  );
}

function AdminSkeleton() {
  return (
    <>
      <div className="border-b border-border bg-ink py-10">
        <div className="mx-auto max-w-7xl space-y-3 px-4">
          <Skeleton className="h-3 w-16 bg-white/20" />
          <Skeleton className="h-9 w-72 bg-white/25" />
        </div>
      </div>
      <div className="mx-auto max-w-7xl space-y-8 px-4 py-10">
        <div className="grid gap-4 sm:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-24 w-full rounded-sm" />
          ))}
        </div>
        <Skeleton className="h-10 w-full rounded-sm" />
        <Skeleton className="h-80 w-full rounded-sm" />
      </div>
    </>
  );
}

function DefaultSkeleton() {
  return (
    <>
      <div className="border-b border-border bg-ink py-14">
        <div className="mx-auto max-w-7xl space-y-3 px-4">
          <Skeleton className="h-3 w-20 bg-white/20" />
          <Skeleton className="h-10 w-72 max-w-full bg-white/25" />
          <Skeleton className="h-4 w-full max-w-xl bg-white/15" />
        </div>
      </div>
      <div className="mx-auto max-w-7xl space-y-6 px-4 py-14">
        <Skeleton className="h-8 w-48" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <ArticleCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </>
  );
}
