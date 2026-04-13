 "use client";
 
 import Link from "next/link";
import { useEffect, useState } from "react";
 import { BottomNav } from "../../components/BottomNav";
 import { GuestScaffold } from "../../components/GuestScaffold";
 import { useGuestTheme } from "../../components/GuestThemeProvider";
 
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

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        setLoading(true);
        setError("");
        const token = localStorage.getItem("guest_access_token");
        const response = await fetch("http://localhost:3000/api/v1/services/1/items", {
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
               <Link
                 href="/cart"
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold text-white shadow-md shadow-gold/25 transition active:scale-95 ${
                  !item.is_available ? "pointer-events-none opacity-50" : ""
                }`}
                 aria-label="Add to cart (demo)"
                 title="Add to cart (demo)"
               >
                 +
               </Link>
             </div>
           </div>
         ))}
       </div>
 
       <BottomNav />
     </GuestScaffold>
   );
 }
