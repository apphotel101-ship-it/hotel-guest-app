 "use client";
 
 import Link from "next/link";
 import { BottomNav } from "../../components/BottomNav";
 import { GuestScaffold } from "../../components/GuestScaffold";
 import { useGuestTheme } from "../../components/GuestThemeProvider";
 
 function AddButton() {
   return (
     <Link
       href="/cart"
       className="flex h-8 w-8 items-center justify-center rounded-full bg-gold text-white shadow-md shadow-gold/25 transition active:scale-95"
       aria-label="Add to cart (demo)"
       title="Add to cart (demo)"
     >
       +
     </Link>
   );
 }
 
 export default function RoomServicePage() {
   const { dark } = useGuestTheme();
 
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
         <p className={`mt-1 text-sm ${t.muted}`}>Request amenities for Room 412</p>
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
 
       <h2 className={`mb-3 font-sans text-[11px] font-bold uppercase ${t.section}`}>
         Quick request
       </h2>
 
       <div className="grid grid-cols-2 gap-3">
         {[
           { icon: "🏖️", name: "Extra Towels", sub: "Complimentary" },
           { icon: "💧", name: "Mineral Water", sub: "₹120 / bottle" },
           { icon: "🛏️", name: "Extra Pillow", sub: "Complimentary" },
           { icon: "🧴", name: "Toiletry Kit", sub: "Complimentary" },
         ].map((a) => (
           <Link
             key={a.name}
             href="/cart"
             className={`rounded-[18px] p-4 text-center transition hover:scale-[1.01] active:scale-[0.99] ${t.glass}`}
           >
             <div className="text-3xl" aria-hidden>
               {a.icon}
             </div>
             <p className={`mt-2 text-sm font-semibold ${t.title}`}>{a.name}</p>
             <p className={`mt-0.5 text-[11px] ${t.muted}`}>{a.sub}</p>
           </Link>
         ))}
       </div>
 
       <h2 className={`mb-3 mt-6 font-sans text-[11px] font-bold uppercase ${t.section}`}>
         All amenities
       </h2>
 
       <div className={`overflow-hidden rounded-[22px] ${t.glass}`}>
         {[
           { icon: "☕", name: "Coffee / Tea Set", sub: "Complimentary refill" },
           { icon: "🛁", name: "Bathrobe", sub: "Complimentary" },
           { icon: "🧹", name: "Housekeeping", sub: "Schedule a clean" },
           { icon: "🧊", name: "Ice Bucket", sub: "Complimentary" },
           { icon: "👔", name: "Laundry Service", sub: "₹350 per item" },
         ].map((row, idx, arr) => (
           <div
             key={row.name}
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
                 <span className="text-xl">{row.icon}</span>
               </div>
               <div className="min-w-0">
                 <p className={`truncate text-sm font-semibold ${t.title}`}>{row.name}</p>
                 <p className={`mt-0.5 truncate text-[11px] ${t.muted}`}>{row.sub}</p>
               </div>
             </div>
             <AddButton />
           </div>
         ))}
       </div>
 
       <BottomNav />
     </GuestScaffold>
   );
 }
