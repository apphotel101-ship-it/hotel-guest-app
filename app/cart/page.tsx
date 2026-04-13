 "use client";
 
 import Link from "next/link";
 import { BottomNav } from "../../components/BottomNav";
 import { GuestScaffold } from "../../components/GuestScaffold";
 import { useGuestTheme } from "../../components/GuestThemeProvider";
 
 export default function CartPage() {
   const { dark } = useGuestTheme();
 
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
 
   // Demo cart (UI integration only). If you want, next step is to add a shared Cart context like in the HTML.
   const items = [
     { icon: "🍝", name: "Pasta Carbonara", price: "₹850", qty: 1 },
     { icon: "💧", name: "Mineral Water", price: "₹120", qty: 2 },
   ] as const;
 
   return (
     <GuestScaffold>
       <header className="mb-4">
         <Link
           href="/food"
           className="inline-flex items-center gap-2 text-sm font-semibold text-gold hover:underline"
         >
           <span aria-hidden>‹</span> Back
         </Link>
         <h1 className={`mt-3 font-serif text-[2rem] leading-tight ${t.title}`}>
           Your Cart
         </h1>
         <p className={`mt-1 text-sm ${t.muted}`}>Room 412 · {items.length} items</p>
       </header>
 
       <div className={`overflow-hidden rounded-[22px] ${t.glass}`}>
         {items.map((it, idx) => (
           <div
             key={it.name}
             className={`flex items-center gap-3 px-4 py-3.5 ${
               idx > 0 ? `border-t ${t.divider}` : ""
             }`}
           >
             <div
               className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
                 dark ? "bg-[rgba(200,169,106,0.1)]" : "bg-[rgba(200,169,106,0.12)]"
               }`}
               aria-hidden
             >
               <span className="text-xl">{it.icon}</span>
             </div>
             <div className="min-w-0 flex-1">
               <p className={`truncate text-sm font-semibold ${t.title}`}>{it.name}</p>
               <p className="mt-0.5 text-sm font-bold text-gold">{it.price}</p>
             </div>
             <div className="flex items-center gap-2">
               <button
                 type="button"
                 className="flex h-7 w-7 items-center justify-center rounded-full border border-gold/60 text-sm font-semibold text-gold"
                 aria-label="Decrease quantity (demo)"
               >
                 −
               </button>
               <span className={`min-w-5 text-center text-sm font-bold ${t.title}`}>
                 {it.qty}
               </span>
               <button
                 type="button"
                 className="flex h-7 w-7 items-center justify-center rounded-full border border-gold/60 text-sm font-semibold text-gold"
                 aria-label="Increase quantity (demo)"
               >
                 +
               </button>
             </div>
           </div>
         ))}
       </div>
 
       <div className={`mt-5 rounded-[22px] p-4 ${t.glass}`}>
         <p className={`text-[11px] font-bold uppercase tracking-[0.2em] ${t.muted}`}>
           Bill summary
         </p>
         {[
           ["Subtotal", "₹1,090"],
           ["Room service charge (10%)", "₹109"],
           ["GST (18%)", "₹196"],
         ].map(([k, v]) => (
           <div key={k} className="mt-3 flex items-center justify-between text-sm">
             <span className={t.muted}>{k}</span>
             <span className={t.title}>{v}</span>
           </div>
         ))}
         <div className={`mt-4 flex items-center justify-between border-t pt-4 ${t.divider}`}>
           <span className={`text-base font-semibold ${t.title}`}>Total</span>
           <span className="text-base font-extrabold text-gold">₹1,395</span>
         </div>
         <p className={`mt-2 text-center text-[10px] ${t.muted}`}>
           Amount will be charged to your room and settled at checkout
         </p>
       </div>
 
       <button
         type="button"
         className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-gold px-4 py-3 text-sm font-semibold text-white shadow-md shadow-gold/25 transition active:opacity-90"
       >
         Confirm Order
       </button>
 
       <BottomNav />
     </GuestScaffold>
   );
 }
