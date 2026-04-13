 "use client";
 
 import Link from "next/link";
 import { BottomNav } from "../../components/BottomNav";
 import { GuestScaffold } from "../../components/GuestScaffold";
 import { useGuestTheme } from "../../components/GuestThemeProvider";
 
 export default function SearchPage() {
   const { dark } = useGuestTheme();
 
   const t = dark
     ? {
         title: "text-white",
         muted: "text-[#d1c4a8]",
         glass:
           "border border-[rgba(200,169,106,0.18)] bg-[rgba(22,22,22,0.5)] backdrop-blur-lg shadow-[0_0_16px_rgba(200,169,106,0.10)]",
         input:
           "bg-[rgba(16,16,16,0.35)] border-[rgba(200,169,106,0.18)] text-white placeholder:text-[#8f7f63]",
         section: "text-gold tracking-[0.2em]",
       }
     : {
         title: "text-brown",
         muted: "text-brown-muted",
         glass:
           "border border-[rgba(74,55,40,0.12)] bg-[rgba(255,255,255,0.58)] backdrop-blur-lg shadow-[0_10px_30px_rgba(0,0,0,0.05)]",
         input:
           "bg-[rgba(255,255,255,0.62)] border-[rgba(74,55,40,0.18)] text-brown placeholder:text-brown-muted/70",
         section: "text-brown tracking-[0.2em]",
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
           Discover
         </h1>
       </header>
 
       <div className={`mb-5 flex items-center gap-3 rounded-[18px] border px-4 py-3 ${t.glass}`}>
         <span className="text-lg" aria-hidden>
           🔍
         </span>
         <input
           className={`w-full border-0 bg-transparent text-sm outline-none ${t.input}`}
           placeholder="Search services, amenities…"
         />
       </div>
 
       <h2 className={`mb-3 font-sans text-[11px] font-bold uppercase ${t.section}`}>
         Quick access
       </h2>
       <div className="grid grid-cols-2 gap-3">
         {[
           { href: "/food", icon: "🍽️", label: "Food & Dining" },
           { href: "/room-service", icon: "🛎️", label: "Room Service" },
           { href: "/maintenance", icon: "🔧", label: "Maintenance" },
           { href: "/complaints", icon: "📋", label: "Complaints" },
           { href: "/requests", icon: "📦", label: "My Requests" },
           { href: "/notifications", icon: "🔔", label: "Notifications" },
           { href: "/profile", icon: "👤", label: "Profile" },
         ].map((x) => (
           <Link key={x.href} href={x.href} className={`rounded-[18px] p-4 ${t.glass}`}>
             <div className="text-2xl" aria-hidden>
               {x.icon}
             </div>
             <p className={`mt-2 text-sm font-semibold ${t.title}`}>{x.label}</p>
           </Link>
         ))}
       </div>
 
       <h2 className={`mb-3 mt-6 font-sans text-[11px] font-bold uppercase ${t.section}`}>
         Hotel amenities
       </h2>
       <div className={`overflow-hidden rounded-[22px] ${t.glass}`}>
         {[
           { icon: "🏊", name: "Swimming Pool", sub: "6 AM – 10 PM · Rooftop", badge: "Open" },
           { icon: "💆", name: "Spa & Wellness", sub: "9 AM – 9 PM · Level 2", badge: "Open" },
           { icon: "🏋️", name: "Fitness Centre", sub: "24 hours · Level 1", badge: "Open" },
           { icon: "🍸", name: "Meridian Bar", sub: "4 PM – 2 AM · Lobby", badge: "Opens 4 PM" },
         ].map((a, idx, arr) => (
           <div
             key={a.name}
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
                 <span className="text-xl">{a.icon}</span>
               </div>
               <div className="min-w-0">
                 <p className={`truncate text-sm font-semibold ${t.title}`}>{a.name}</p>
                 <p className={`mt-0.5 truncate text-[11px] ${t.muted}`}>{a.sub}</p>
               </div>
             </div>
             <span
               className={`shrink-0 rounded-full border px-3 py-1 text-[11px] font-semibold ${
                 a.badge === "Open"
                   ? "border-emerald-500/30 bg-emerald-500/15 text-emerald-200"
                   : "border-amber-500/30 bg-amber-500/15 text-amber-200"
               }`}
             >
               {a.badge}
             </span>
           </div>
         ))}
       </div>
 
       <BottomNav />
     </GuestScaffold>
   );
 }
