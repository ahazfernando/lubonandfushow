"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { productById, type Product } from "@/lib/products";

const STORAGE_KEY = "upsideboat-cart";

export type CartLine = {
  productId: string;
  quantity: number;
  color?: string;
  size?: string;
};

export type CartItem = CartLine & {
  key: string;
  product: Product;
};

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  ready: boolean;
  addItem: (productId: string, quantity?: number, variant?: { color?: string; size?: string }) => void;
  setQuantity: (key: string, quantity: number) => void;
  removeItem: (key: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function cartLineKey(line: { productId: string; color?: string; size?: string }) {
  return [line.productId, line.color ?? "", line.size ?? ""].join("::");
}

function parseLines(raw: string | null): CartLine[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as CartLine[];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (line) =>
        typeof line?.productId === "string" &&
        typeof line?.quantity === "number" &&
        line.quantity > 0,
    );
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setLines(parseLines(localStorage.getItem(STORAGE_KEY)));
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines, ready]);

  const addItem = useCallback(
    (productId: string, quantity = 1, variant?: { color?: string; size?: string }) => {
      const incoming = { productId, color: variant?.color, size: variant?.size };
      const key = cartLineKey(incoming);
      setLines((current) => {
        const existing = current.find((line) => cartLineKey(line) === key);
        if (!existing) return [...current, { ...incoming, quantity }];
        return current.map((line) =>
          cartLineKey(line) === key ? { ...line, quantity: line.quantity + quantity } : line,
        );
      });
    },
    [],
  );

  const setQuantity = useCallback((key: string, quantity: number) => {
    setLines((current) => {
      if (quantity <= 0) return current.filter((line) => cartLineKey(line) !== key);
      return current.map((line) => (cartLineKey(line) === key ? { ...line, quantity } : line));
    });
  }, []);

  const removeItem = useCallback((key: string) => {
    setLines((current) => current.filter((line) => cartLineKey(line) !== key));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const value = useMemo<CartContextValue>(() => {
    const items = lines.flatMap((line) => {
      const product = productById(line.productId);
      return product ? [{ ...line, product, key: cartLineKey(line) }] : [];
    });
    return {
      items,
      count: items.reduce((sum, item) => sum + item.quantity, 0),
      subtotal: items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
      ready,
      addItem,
      setQuantity,
      removeItem,
      clear,
    };
  }, [addItem, clear, lines, ready, removeItem, setQuantity]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
