"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { GUEST_CART_UPDATED_EVENT, getCartCount } from "../lib/cart";

export function FloatingCartButton() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const syncCount = () => setCartCount(getCartCount());
    syncCount();

    const onStorage = (event: StorageEvent) => {
      if (!event.key || event.key === "guest_cart_items") {
        syncCount();
      }
    };

    window.addEventListener("storage", onStorage);
    window.addEventListener(GUEST_CART_UPDATED_EVENT, syncCount);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(GUEST_CART_UPDATED_EVENT, syncCount);
    };
  }, []);

  if (cartCount <= 0) return null;

  return (
    <div className="pointer-events-none fixed bottom-28 left-1/2 z-50 w-full max-w-[420px] -translate-x-1/2 px-4 sm:max-w-[480px] sm:px-5">
      <div className="flex justify-end">
        <Link
          href="/checkout"
          className="pointer-events-auto relative flex h-14 w-14 items-center justify-center rounded-full bg-gold text-white shadow-xl shadow-gold/30 transition hover:brightness-95 active:scale-95"
          aria-label="Go to checkout"
          title="Go to checkout"
        >
          <svg
            className="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.5 13h10.8a2 2 0 0 0 2-1.6L22 6H6" />
          </svg>
          <span className="absolute -right-1 -top-1 flex h-6 min-w-[24px] items-center justify-center rounded-full bg-red-600 px-1 text-[11px] font-bold leading-none text-white">
            {cartCount}
          </span>
        </Link>
      </div>
    </div>
  );
}
