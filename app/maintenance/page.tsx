 "use client";
 
 import Link from "next/link";
import { useEffect, useState } from "react";
 import { BottomNav } from "../../components/BottomNav";
 import { GuestScaffold } from "../../components/GuestScaffold";
 import { useGuestTheme } from "../../components/GuestThemeProvider";
 
 export default function MaintenancePage() {
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
 
   const t = dark
     ? {
         title: "text-white",
         muted: "text-[#d1c4a8]",
         section: "text-gold tracking-[0.2em]",
         glass:
           "border border-[rgba(200,169,106,0.18)] bg-[rgba(22,22,22,0.5)] backdrop-blur-lg shadow-[0_0_16px_rgba(200,169,106,0.10)]",
         input:
           "bg-[rgba(16,16,16,0.4)] border-[rgba(200,169,106,0.18)] text-white placeholder:text-[#8f7f63]",
       }
     : {
         title: "text-brown",
         muted: "text-brown-muted",
         section: "text-brown tracking-[0.2em]",
         glass:
           "border border-[rgba(74,55,40,0.12)] bg-[rgba(255,255,255,0.58)] backdrop-blur-lg shadow-[0_10px_30px_rgba(0,0,0,0.05)]",
         input:
           "bg-[rgba(255,255,255,0.62)] border-[rgba(74,55,40,0.18)] text-brown placeholder:text-brown-muted/70",
       };
 
  useEffect(() => {
    const fetchMaintenanceItems = async () => {
      try {
        setLoading(true);
        setError("");
        const token = localStorage.getItem("guest_access_token");
        const response = await fetch("http://localhost:3000/api/v1/services/2/items", {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        const data = (await response.json()) as {
          items?: typeof items;
          message?: string;
        };

        if (!response.ok) {
          throw new Error(data.message || "Failed to load maintenance items.");
        }

        setItems(data.items ?? []);
      } catch (fetchError) {
        setError(fetchError instanceof Error ? fetchError.message : "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchMaintenanceItems();
  }, []);
 
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
           Maintenance
         </h1>
        <p className={`mt-1 text-sm ${t.muted}`}>Raise maintenance requests from live items</p>
       </header>
 
       <h2 className={`mb-3 font-sans text-[11px] font-bold uppercase ${t.section}`}>
        Available maintenance services
       </h2>
 
       <div className="grid grid-cols-3 gap-3">
        {loading ? <p className={`col-span-3 text-sm ${t.muted}`}>Loading services...</p> : null}
        {error ? <p className="col-span-3 text-sm text-red-500">{error}</p> : null}
        {!loading && !error && items.length === 0 ? (
          <p className={`col-span-3 text-sm ${t.muted}`}>No maintenance items available.</p>
        ) : null}
        {items.map((item) => (
          <button key={item.item_id} type="button" className={`rounded-[18px] p-3 text-center ${t.glass}`}>
            <div className="text-2xl" aria-hidden>
              🛠️
            </div>
            <p className={`mt-2 text-[11px] font-semibold leading-snug ${t.title}`}>
              {item.item_name}
            </p>
            <p className={`mt-1 text-[10px] ${t.muted}`}>
              ₹{Number(item.item_price).toFixed(2)} · {item.is_available ? "Available" : "Unavailable"}
            </p>
          </button>
        ))}
       </div>
 
       <BottomNav />
     </GuestScaffold>
   );
 }
