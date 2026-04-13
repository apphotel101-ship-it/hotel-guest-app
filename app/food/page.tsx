 "use client";
 
 import Link from "next/link";
import { useEffect, useState } from "react";
 import { BottomNav } from "../../components/BottomNav";
 import { GuestScaffold } from "../../components/GuestScaffold";
 import { useGuestTheme } from "../../components/GuestThemeProvider";
import { getApiUrl } from "../../lib/api";
import {
  GUEST_CART_UPDATED_EVENT,
  getCartItems,
  updateCartItemQuantity,
} from "../../lib/cart";
 
type ServiceItem = {
  item_id: number;
  item_name: string;
  item_price: number;
  image_url?: string | null;
  is_available: boolean;
};
 
 export default function FoodPage() {
   const { dark } = useGuestTheme();
  const [items, setItems] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cartQuantities, setCartQuantities] = useState<Record<number, number>>({});

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        setLoading(true);
        setError("");
        const token = localStorage.getItem("guest_access_token");
        const response = await fetch(getApiUrl("/api/v1/services/1/items"), {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        const data = (await response.json()) as {
          items?: ServiceItem[];
          message?: string;
        };

        if (!response.ok) {
          throw new Error(data.message || "Failed to load food items.");
        }

        setItems(data.items ?? []);
      } catch (fetchError) {
        setError(fetchError instanceof Error ? fetchError.message : "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchFoodItems();
  }, []);

  useEffect(() => {
    const syncCart = () => {
      const items = getCartItems();
      const qtyMap = items.reduce<Record<number, number>>((acc, item) => {
        acc[item.item_id] = item.quantity;
        return acc;
      }, {});
      setCartQuantities(qtyMap);
    };

    syncCart();
    window.addEventListener(GUEST_CART_UPDATED_EVENT, syncCart);
    return () => window.removeEventListener(GUEST_CART_UPDATED_EVENT, syncCart);
  }, []);
 
   const t = dark
     ? {
         hero:
           "border border-[rgba(200,169,106,0.18)] bg-[rgba(18,18,18,0.55)] shadow-[0_0_24px_rgba(200,169,106,0.12)]",
         title: "text-white",
         sub: "text-[#d1c4a8]",
         section: "text-gold tracking-[0.2em]",
         row:
           "border border-[rgba(200,169,106,0.16)] bg-[rgba(22,22,22,0.5)] backdrop-blur-lg",
         rowText: "text-white",
         rowMuted: "text-[#d1c4a8]",
         price: "text-gold",
         pill: "bg-[rgba(200,169,106,0.12)] text-gold border border-gold/25",
       }
     : {
         hero:
           "border border-[rgba(200,169,106,0.28)] bg-[rgba(255,255,255,0.52)] shadow-[0_10px_32px_rgba(0,0,0,0.07)]",
         title: "text-brown",
         sub: "text-brown-muted",
         section: "text-brown tracking-[0.2em]",
         row:
           "border border-[rgba(74,55,40,0.12)] bg-[rgba(255,255,255,0.58)] backdrop-blur-lg",
         rowText: "text-brown",
         rowMuted: "text-brown-muted",
         price: "text-[#9a7b4f]",
         pill: "bg-[rgba(74,55,40,0.06)] text-brown-muted border border-brown/15",
       };

  const handleUpdateCart = (item: ServiceItem, delta: 1 | -1) => {
    updateCartItemQuantity(
      {
      item_id: item.item_id,
      item_name: item.item_name,
      item_price: item.item_price,
      service_id: 1,
      service_name: "Food & Dining",
      },
      delta,
    );
  };
 
   return (
     <GuestScaffold>
       <div className="mb-4">
         <div className={`rounded-[22px] p-4 ${t.hero}`}>
           <Link
             href="/"
             className="inline-flex items-center gap-2 text-sm font-semibold text-gold hover:underline"
           >
             <span aria-hidden>‹</span> Home
           </Link>
           <p className={`mt-3 text-[11px] font-bold uppercase ${t.section}`}>
             Room 412
           </p>
           <h1 className={`mt-1 font-serif text-[2rem] leading-tight ${t.title}`}>
             Food & Dining
           </h1>
          <p className={`mt-1 text-sm ${t.sub}`}>Live menu from your service API</p>
         </div>
       </div>
 
       <h2 className={`mb-3 font-sans text-[11px] font-bold uppercase ${t.section}`}>
        Food items
       </h2>
 
       <div className="space-y-3">
        {loading ? <p className={`text-sm ${t.rowMuted}`}>Loading food items...</p> : null}
        {error ? <p className="text-sm text-red-500">{error}</p> : null}
        {!loading && !error && items.length === 0 ? (
          <p className={`text-sm ${t.rowMuted}`}>No food items available right now.</p>
        ) : null}
        {items.map((item) => (
          <div key={item.item_id} className={`rounded-[18px] p-3 ${t.row}`}>
             <div className="flex gap-3">
               <div
                 className={`flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-2xl ${
                   dark
                     ? "bg-[rgba(200,169,106,0.1)]"
                     : "bg-[rgba(200,169,106,0.12)]"
                 }`}
                 aria-hidden
               >
                {item.image_url ? (
                  <img
                    src={item.image_url}
                    alt={item.item_name}
                    className="h-[72px] w-[72px] rounded-2xl object-cover"
                  />
                ) : (
                  <span className="text-3xl">🍽️</span>
                )}
               </div>
               <div className="min-w-0 flex-1">
                <p className={`text-sm font-semibold ${t.rowText}`}>{item.item_name}</p>
                 <div className="mt-1 flex flex-wrap gap-1.5">
                  <span className={`rounded-md px-2 py-0.5 text-[10px] ${t.pill}`}>
                    {item.is_available ? "Available" : "Unavailable"}
                  </span>
                 </div>
                 <p className={`mt-1 text-[11px] leading-snug ${t.rowMuted}`}>
                  Freshly prepared and served to your room.
                 </p>
                <p className={`mt-2 text-sm font-bold ${t.price}`}>
                  ₹{Number(item.item_price).toFixed(2)}
                </p>
               </div>
              {item.is_available ? (
                (cartQuantities[item.item_id] ?? 0) === 0 ? (
                  <button
                    type="button"
                    onClick={() => handleUpdateCart(item, 1)}
                    className="ml-1 flex h-8 min-w-[56px] shrink-0 items-center justify-center rounded-full bg-gold px-3 text-xs font-semibold text-white shadow-md shadow-gold/25 transition active:scale-95"
                    aria-label={`Add ${item.item_name}`}
                  >
                    Add
                  </button>
                ) : (
                  <div className="ml-1 flex shrink-0 items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleUpdateCart(item, -1)}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-gold/60 text-base font-bold text-gold transition"
                      aria-label={`Decrease ${item.item_name}`}
                    >
                      -
                    </button>
                    <span className={`min-w-5 text-center text-sm font-bold ${t.rowText}`}>
                      {cartQuantities[item.item_id] ?? 0}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleUpdateCart(item, 1)}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-gold text-base font-bold text-white shadow-md shadow-gold/25 transition active:scale-95"
                      aria-label={`Increase ${item.item_name}`}
                    >
                      +
                    </button>
                  </div>
                )
              ) : (
                <span className={`text-xs ${t.rowMuted}`}>N/A</span>
              )}
             </div>
           </div>
         ))}
       </div>
 
       <BottomNav />
     </GuestScaffold>
   );
 }
