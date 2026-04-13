 "use client";
 
 import Link from "next/link";
 import { useState } from "react";
 import { BottomNav } from "../../components/BottomNav";
 import { GuestScaffold } from "../../components/GuestScaffold";
 import { useGuestTheme } from "../../components/GuestThemeProvider";
 
 function Chip({
   active,
   children,
   onClick,
 }: {
   active: boolean;
   children: React.ReactNode;
   onClick: () => void;
 }) {
   return (
     <button
       type="button"
       onClick={onClick}
       className={`shrink-0 rounded-full border px-4 py-1.5 text-xs font-medium transition ${
         active
           ? "border-gold bg-gold text-white"
           : "border-[rgba(200,169,106,0.28)] bg-[rgba(255,255,255,0.5)] text-brown-muted hover:border-gold/60"
       }`}
     >
       {children}
     </button>
   );
 }
 
 const MENU = [
   {
     cat: "mains",
     name: "Pasta Carbonara",
     desc: "Creamy egg sauce, pancetta, pecorino romano",
     price: "₹850",
     icon: "🍝",
     tags: ["Chef's pick", "30 min"],
   },
   {
     cat: "mains",
     name: "Grilled Tenderloin",
     desc: "8oz beef tenderloin, truffle butter, asparagus",
     price: "₹2,200",
     icon: "🥩",
     tags: ["Premium", "45 min"],
   },
   {
     cat: "starters",
     name: "Caesar Salad",
     desc: "Romaine, croutons, parmesan, classic dressing",
     price: "₹650",
     icon: "🥗",
     tags: ["Veg", "15 min"],
   },
   {
     cat: "desserts",
     name: "Crème Brûlée",
     desc: "Classic French custard, caramelised sugar crust",
     price: "₹480",
     icon: "🍮",
     tags: ["Dessert", "20 min"],
   },
   {
     cat: "drinks",
     name: "Fresh Lemonade",
     desc: "Freshly squeezed, mint, sparkling water",
     price: "₹280",
     icon: "🍋",
     tags: ["Drink", "5 min"],
   },
   {
     cat: "breakfast",
     name: "Continental Breakfast",
     desc: "Pancakes, eggs, toast, fruit, OJ",
     price: "₹950",
     icon: "🥞",
     tags: ["Breakfast", "20 min"],
   },
 ] as const;
 
 export default function FoodPage() {
   const { dark } = useGuestTheme();
   const [cat, setCat] = useState<string>("all");
 
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
 
   const filtered = cat === "all" ? MENU : MENU.filter((m) => m.cat === cat);
 
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
           <p className={`mt-1 text-sm ${t.sub}`}>Today’s specials and classics</p>
         </div>
 
         <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
           {[
             ["all", "All"],
             ["starters", "Starters"],
             ["mains", "Mains"],
             ["desserts", "Desserts"],
             ["drinks", "Drinks"],
             ["breakfast", "Breakfast"],
           ].map(([id, label]) => (
             <Chip key={id} active={cat === id} onClick={() => setCat(id)}>
               {label}
             </Chip>
           ))}
         </div>
       </div>
 
       <h2 className={`mb-3 font-sans text-[11px] font-bold uppercase ${t.section}`}>
         Today’s specials
       </h2>
 
       <div className="space-y-3">
         {filtered.map((item) => (
           <div key={item.name} className={`rounded-[18px] p-3 ${t.row}`}>
             <div className="flex gap-3">
               <div
                 className={`flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-2xl ${
                   dark
                     ? "bg-[rgba(200,169,106,0.1)]"
                     : "bg-[rgba(200,169,106,0.12)]"
                 }`}
                 aria-hidden
               >
                 <span className="text-3xl">{item.icon}</span>
               </div>
               <div className="min-w-0 flex-1">
                 <p className={`text-sm font-semibold ${t.rowText}`}>{item.name}</p>
                 <div className="mt-1 flex flex-wrap gap-1.5">
                   {item.tags.map((tag) => (
                     <span key={tag} className={`rounded-md px-2 py-0.5 text-[10px] ${t.pill}`}>
                       {tag}
                     </span>
                   ))}
                 </div>
                 <p className={`mt-1 text-[11px] leading-snug ${t.rowMuted}`}>
                   {item.desc}
                 </p>
                 <p className={`mt-2 text-sm font-bold ${t.price}`}>{item.price}</p>
               </div>
               <Link
                 href="/cart"
                 className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold text-white shadow-md shadow-gold/25 transition active:scale-95`}
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
