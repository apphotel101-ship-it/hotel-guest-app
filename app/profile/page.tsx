 "use client";
 
 import Link from "next/link";
 import { BottomNav } from "../../components/BottomNav";
 import { GuestScaffold } from "../../components/GuestScaffold";
 import { useGuestTheme } from "../../components/GuestThemeProvider";
 
 function Row({
   icon,
   label,
 }: {
   icon: React.ReactNode;
   label: string;
 }) {
   return (
     <button
       type="button"
       className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition hover:bg-black/5 dark:hover:bg-white/5"
     >
       <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-[rgba(200,169,106,0.12)] text-gold">
         {icon}
       </span>
       <span className="min-w-0 flex-1 truncate text-sm font-semibold">
         {label}
       </span>
       <span className="text-brown-muted" aria-hidden>
         ›
       </span>
     </button>
   );
 }
 
 export default function ProfilePage() {
   const { dark } = useGuestTheme();
 
   const t = dark
     ? {
         title: "text-white",
         muted: "text-[#d1c4a8]",
         card:
           "border border-[rgba(200,169,106,0.18)] bg-[rgba(22,22,22,0.5)] backdrop-blur-lg",
         divider: "border-[rgba(200,169,106,0.16)]",
       }
     : {
         title: "text-brown",
         muted: "text-brown-muted",
         card:
           "border border-[rgba(74,55,40,0.12)] bg-[rgba(255,255,255,0.58)] backdrop-blur-lg",
         divider: "border-[rgba(74,55,40,0.12)]",
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
       </header>
 
       <section
         className={`mb-5 rounded-[22px] p-5 text-center ${t.card}`}
         aria-label="Profile summary"
       >
         <div className="mx-auto flex h-[72px] w-[72px] items-center justify-center rounded-full bg-gold font-serif text-2xl font-bold text-white">
           AS
         </div>
         <h1 className={`mt-3 font-serif text-[1.6rem] ${t.title}`}>
           Mr. Arjun Sharma
         </h1>
         <p className={`mt-1 text-sm ${t.muted}`}>
           Room 412 · Deluxe Suite · Guest since 2022
         </p>
         <div className="mt-3 inline-flex rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-200">
           Gold Member
         </div>
       </section>
 
       <h2 className={`mb-3 font-sans text-[11px] font-bold uppercase ${t.muted}`}>
         Stay details
       </h2>
       <div className={`overflow-hidden rounded-[22px] ${t.card}`}>
         <Row
           icon={<span aria-hidden>📅</span>}
           label="Check-in: Apr 5 → Apr 8"
         />
         <div className={`border-t ${t.divider}`} />
         <Row
           icon={<span aria-hidden>🏨</span>}
           label="Deluxe Suite · Floor 4"
         />
       </div>
 
       <h2 className={`mb-3 mt-6 font-sans text-[11px] font-bold uppercase ${t.muted}`}>
         Account
       </h2>
       <div className={`overflow-hidden rounded-[22px] ${t.card}`}>
         <Row icon={<span aria-hidden>👤</span>} label="Personal Details" />
         <div className={`border-t ${t.divider}`} />
         <Row icon={<span aria-hidden>💬</span>} label="Special Requests" />
         <div className={`border-t ${t.divider}`} />
         <Row icon={<span aria-hidden>🛡️</span>} label="Privacy & Security" />
       </div>
 
       <BottomNav />
     </GuestScaffold>
   );
 }
