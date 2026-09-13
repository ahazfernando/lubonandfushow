"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";

import { AuthProvider } from "@/components/site/AuthProvider";
import { CartProvider } from "@/components/site/CartProvider";
import { LanguageProvider } from "@/components/site/LanguageProvider";

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <AuthProvider>
          <CartProvider>{children}</CartProvider>
        </AuthProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}
