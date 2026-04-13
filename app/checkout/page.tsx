"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { BottomNav } from "../../components/BottomNav";
import { GuestScaffold } from "../../components/GuestScaffold";
import { useGuestTheme } from "../../components/GuestThemeProvider";
import {
  GUEST_CART_UPDATED_EVENT,
  CartItem,
  getCartItems,
  updateCartItemQuantity,
} from "../../lib/cart";

export default function CheckoutPage() {
  const { dark } = useGuestTheme();
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const syncCart = () => setItems(getCartItems());
    syncCart();
    window.addEventListener(GUEST_CART_UPDATED_EVENT, syncCart);
    return () => window.removeEventListener(GUEST_CART_UPDATED_EVENT, syncCart);
  }, []);

  const totals = useMemo(() => {
    const subtotal = items.reduce((sum, item) => sum + item.item_price * item.quantity, 0);
    const serviceCharge = subtotal * 0.1;
    const gst = (subtotal + serviceCharge) * 0.18;
    const total = subtotal + serviceCharge + gst;
    return { subtotal, serviceCharge, gst, total };
  }, [items]);

  const t = dark
    ? {
        title: "text-white",
        muted: "text-[#d1c4a8]",
        glass:
          "border border-[rgba(200,169,106,0.18)] bg-[rgba(22,22,22,0.5)] backdrop-blur-lg shadow-[0_0_16px_rgba(200,169,106,0.10)]",
        divider: "border-[rgba(200,169,106,0.16)]",
      }
    : {
        title: "text-brown",
        muted: "text-brown-muted",
        glass:
          "border border-[rgba(74,55,40,0.12)] bg-[rgba(255,255,255,0.58)] backdrop-blur-lg shadow-[0_10px_30px_rgba(0,0,0,0.05)]",
        divider: "border-[rgba(74,55,40,0.12)]",
      };

  const updateQuantity = (item: CartItem, delta: 1 | -1) => {
    updateCartItemQuantity(
      {
        item_id: item.item_id,
        item_name: item.item_name,
        item_price: item.item_price,
        service_id: item.service_id,
        service_name: item.service_name,
      },
      delta,
    );
  };

  return (
    <GuestScaffold>
      <header className="mb-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-gold hover:underline"
        >
          <span aria-hidden>‹</span> Back
        </Link>
        <h1 className={`mt-3 font-serif text-[2rem] leading-tight ${t.title}`}>Checkout</h1>
        <p className={`mt-1 text-sm ${t.muted}`}>Review your order before confirmation</p>
      </header>

      {items.length === 0 ? (
        <div className={`rounded-[22px] p-5 text-sm ${t.glass}`}>
          <p className={t.muted}>Your cart is empty.</p>
        </div>
      ) : (
        <>
          <div className={`overflow-hidden rounded-[22px] ${t.glass}`}>
            {items.map((item, idx) => (
              <div
                key={item.item_id}
                className={`flex items-center justify-between gap-3 px-4 py-3.5 ${
                  idx > 0 ? `border-t ${t.divider}` : ""
                }`}
              >
                <div className="min-w-0">
                  <p className={`truncate text-sm font-semibold ${t.title}`}>{item.item_name}</p>
                  <p className={`mt-0.5 text-[11px] ${t.muted}`}>
                    {item.service_name} x {item.quantity}
                  </p>
                </div>
                <p className="shrink-0 text-sm font-bold text-gold">
                  Rs. {(item.item_price * item.quantity).toFixed(2)}
                </p>
                <div className="ml-2 flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => updateQuantity(item, -1)}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-gold/60 text-base font-bold text-gold transition active:scale-95"
                    aria-label={`Decrease ${item.item_name}`}
                  >
                    -
                  </button>
                  <span className={`min-w-5 text-center text-sm font-bold ${t.title}`}>
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(item, 1)}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-gold text-base font-bold text-white shadow-md shadow-gold/25 transition active:scale-95"
                    aria-label={`Increase ${item.item_name}`}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className={`mt-5 rounded-[22px] p-4 ${t.glass}`}>
            <div className="flex items-center justify-between text-sm">
              <span className={t.muted}>Subtotal</span>
              <span className={t.title}>Rs. {totals.subtotal.toFixed(2)}</span>
            </div>
            <div className="mt-3 flex items-center justify-between text-sm">
              <span className={t.muted}>Service charge (10%)</span>
              <span className={t.title}>Rs. {totals.serviceCharge.toFixed(2)}</span>
            </div>
            <div className="mt-3 flex items-center justify-between text-sm">
              <span className={t.muted}>GST (18%)</span>
              <span className={t.title}>Rs. {totals.gst.toFixed(2)}</span>
            </div>
            <div className={`mt-4 flex items-center justify-between border-t pt-4 ${t.divider}`}>
              <span className={`text-base font-semibold ${t.title}`}>Total</span>
              <span className="text-base font-extrabold text-gold">Rs. {totals.total.toFixed(2)}</span>
            </div>
          </div>
        </>
      )}

      <BottomNav />
    </GuestScaffold>
  );
}
