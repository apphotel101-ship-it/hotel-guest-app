 "use client";
 
 import Link from "next/link";
import { useEffect, useState } from "react";
 import { BottomNav } from "../../components/BottomNav";
 import { GuestScaffold } from "../../components/GuestScaffold";
 import { useGuestTheme } from "../../components/GuestThemeProvider";
import {
  GUEST_CART_UPDATED_EVENT,
  getCartItems,
  updateCartItemQuantity,
} from "../../lib/cart";
 
 export default function RoomServicePage() {
   const { dark } = useGuestTheme();
  const [items, setItems] = useState<
    {
      item_id: number;
      item_name: string;
      item_price: number;
      image_url?: string | null;
      is_available: boolean;
    }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cartMessage, setCartMessage] = useState("");
  const [cartQuantities, setCartQuantities] = useState<Record<number, number>>({});

  useEffect(() => {
    const fetchRoomServiceItems = async () => {
      try {
        setLoading(true);
        setError("");
        const token = localStorage.getItem("guest_access_token");
        const response = await fetch("http://localhost:3000/api/v1/services/3/items", {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        const data = (await response.json()) as {
          items?: typeof items;
          message?: string;
        };

        if (!response.ok) {
          throw new Error(data.message || "Failed to load room-service items.");
        }

        setItems(data.items ?? []);
      } catch (fetchError) {
        setError(fetchError instanceof Error ? fetchError.message : "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchRoomServiceItems();
  }, []);

  useEffect(() => {
    const syncCart = () => {
      const qtyMap = getCartItems().reduce<Record<number, number>>((acc, item) => {
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
         title: "text-white",
         muted: "text-[#d1c4a8]",
         section: "text-gold tracking-[0.2em]",
         glass:
           "border border-[rgba(200,169,106,0.18)] bg-[rgba(22,22,22,0.5)] backdrop-blur-lg shadow-[0_0_16px_rgba(200,169,106,0.10)]",
         banner:
           "border border-[rgba(200,169,106,0.16)] bg-[rgba(18,18,18,0.55)] shadow-[0_0_24px_rgba(200,169,106,0.12)]",
       }
     : {
         title: "text-brown",
         muted: "text-brown-muted",
         section: "text-brown tracking-[0.2em]",
         glass:
           "border border-[rgba(74,55,40,0.12)] bg-[rgba(255,255,255,0.58)] backdrop-blur-lg shadow-[0_10px_30px_rgba(0,0,0,0.05)]",
         banner:
           "border border-[rgba(200,169,106,0.28)] bg-[rgba(255,255,255,0.52)] shadow-[0_10px_32px_rgba(0,0,0,0.07)]",
       };

  const handleUpdateCart = (item: (typeof items)[number], delta: 1 | -1) => {
    updateCartItemQuantity(
      {
      item_id: item.item_id,
      item_name: item.item_name,
      item_price: item.item_price,
      service_id: 3,
      service_name: "Room Service",
      },
      delta,
    );
    setCartMessage(delta > 0 ? `${item.item_name} added to cart` : `${item.item_name} updated`);
    window.setTimeout(() => setCartMessage(""), 1500);
  };
 
   return (
     <GuestScaffold>
       <header className="mb-4">
         <Link
           href="/"
           className="inline-flex items-center gap-2 text-sm font-semibold text-gold hover:underline"
         >
           <span aria-hidden>‹</span> Home
         </Link>
         <h1 className={`mt-3 font-serif text-[2rem] leading-tight ${t.title}`}>
           Room Service
         </h1>
        <p className={`mt-1 text-sm ${t.muted}`}>Request amenities from live service items</p>
       </header>
 
       <section className={`relative mb-5 overflow-hidden rounded-[22px] p-4 ${t.banner}`}>
         <div className="relative z-10">
           <h2 className={`font-serif text-[1.65rem] leading-tight ${t.title}`}>
             Your comfort,
             <br />
             delivered.
           </h2>
           <p className={`mt-1 text-sm ${t.muted}`}>Available 24/7</p>
         </div>
         <div
           className="pointer-events-none absolute -right-1 bottom-0 select-none text-[64px] opacity-60"
           aria-hidden
         >
           🛎️
         </div>
       </section>
 
       <h2 className={`mb-3 mt-6 font-sans text-[11px] font-bold uppercase ${t.section}`}>
        All amenities
       </h2>
 
       <div className={`overflow-hidden rounded-[22px] ${t.glass}`}>
        {cartMessage ? <p className="px-4 py-3 text-sm text-emerald-500">{cartMessage}</p> : null}
        {loading ? <p className={`px-4 py-4 text-sm ${t.muted}`}>Loading items...</p> : null}
        {error ? <p className="px-4 py-4 text-sm text-red-500">{error}</p> : null}
        {!loading && !error && items.length === 0 ? (
          <p className={`px-4 py-4 text-sm ${t.muted}`}>No amenities available right now.</p>
        ) : null}
        {items.map((row, idx, arr) => (
           <div
            key={row.item_id}
             className={`flex items-center justify-between gap-3 px-4 py-3.5 ${
               idx < arr.length - 1
                 ? dark
                   ? "border-b border-[rgba(200,169,106,0.16)]"
                   : "border-b border-[rgba(74,55,40,0.12)]"
                 : ""
             }`}
           >
             <div className="flex min-w-0 items-center gap-3">
               <div
                 className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${
                   dark ? "bg-[rgba(200,169,106,0.1)]" : "bg-[rgba(200,169,106,0.12)]"
                 }`}
                 aria-hidden
               >
                {row.image_url ? (
                  <img
                    src={row.image_url}
                    alt={row.item_name}
                    className="h-11 w-11 rounded-2xl object-cover"
                  />
                ) : (
                  <span className="text-xl">🛎️</span>
                )}
               </div>
               <div className="min-w-0">
                <p className={`truncate text-sm font-semibold ${t.title}`}>{row.item_name}</p>
                <p className={`mt-0.5 truncate text-[11px] ${t.muted}`}>
                  ₹{Number(row.item_price).toFixed(2)} ·{" "}
                  {row.is_available ? "Available" : "Unavailable"}
                </p>
               </div>
             </div>
            {row.is_available ? (
              (cartQuantities[row.item_id] ?? 0) === 0 ? (
                <button
                  type="button"
                  onClick={() => handleUpdateCart(row, 1)}
                  className="flex h-8 min-w-[56px] shrink-0 items-center justify-center rounded-full bg-gold px-3 text-xs font-semibold text-white shadow-md shadow-gold/25 transition active:scale-95"
                  aria-label={`Add ${row.item_name}`}
                >
                  Add
                </button>
              ) : (
                <div className="flex shrink-0 items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleUpdateCart(row, -1)}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-gold/60 text-base font-bold text-gold transition"
                    aria-label={`Decrease ${row.item_name}`}
                  >
                    -
                  </button>
                  <span className={`min-w-5 text-center text-sm font-bold ${t.title}`}>
                    {cartQuantities[row.item_id] ?? 0}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleUpdateCart(row, 1)}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-gold text-base font-bold text-white shadow-md shadow-gold/25 transition active:scale-95"
                    aria-label={`Increase ${row.item_name}`}
                  >
                    +
                  </button>
                </div>
              )
            ) : (
              <span className={`text-xs ${t.muted}`}>N/A</span>
            )}
           </div>
         ))}
       </div>
 
       <BottomNav />
     </GuestScaffold>
   );
 }
