 "use client";
 
 import Image from "next/image";
 import Link from "next/link";
 import { usePathname } from "next/navigation";
 import type { ReactNode } from "react";
import { useGuestTheme } from "./GuestThemeProvider";
 
 const ASSETS = {
   bell: "/images/bell.png",
 } as const;
 
 function IconHome({ className }: { className?: string }) {
   return (
     <svg
       className={className}
       width="26"
       height="26"
       viewBox="0 0 24 24"
       fill="none"
       stroke="currentColor"
       strokeWidth="1.6"
       strokeLinecap="round"
       strokeLinejoin="round"
       aria-hidden
     >
       <path d="M3 10.5 12 3l9 7.5" />
       <path d="M5 10v10h14V10" />
     </svg>
   );
 }
 
 function IconUtensils({ className }: { className?: string }) {
   return (
     <svg
       className={className}
       width="26"
       height="26"
       viewBox="0 0 24 24"
       fill="none"
       stroke="currentColor"
       strokeWidth="1.6"
       strokeLinecap="round"
       strokeLinejoin="round"
       aria-hidden
     >
       <path d="M6 3v18" />
       <path d="M10 3v8c0 2 2 3 2 3s2-1 2-3V3" />
       <path d="M18 8v13" />
       <path d="M18 8a3 3 0 1 0 0-6" />
     </svg>
   );
 }
 
 function IconWrench({ className }: { className?: string }) {
   return (
     <svg
       className={className}
       width="26"
       height="26"
       viewBox="0 0 24 24"
       fill="none"
       stroke="currentColor"
       strokeWidth="1.6"
       strokeLinecap="round"
       strokeLinejoin="round"
       aria-hidden
     >
       <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
     </svg>
   );
 }
 
 function IconBellNav({ className }: { className?: string }) {
   return (
     <svg
       className={className}
       width="26"
       height="26"
       viewBox="0 0 24 24"
       fill="none"
       stroke="currentColor"
       strokeWidth="1.6"
       strokeLinecap="round"
       strokeLinejoin="round"
       aria-hidden
     >
       <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
       <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
     </svg>
   );
 }
 
 function NavLink({
   href,
   label,
   active,
   children,
   badge,
 }: {
   href: string;
   label: string;
   active: boolean;
   children: ReactNode;
   badge?: string;
 }) {
   return (
     <Link
       href={href}
       className={`relative flex min-w-0 flex-1 flex-col items-center gap-1 rounded-xl py-1 transition-transform duration-300 hover:scale-[1.03] active:scale-[0.97] ${
         active ? "text-gold" : "text-brown-muted"
       }`}
     >
       <span className="h-0.5 w-6" aria-hidden />
       <span className="relative">
         {children}
         {badge ? (
           <span className="absolute -right-2 -top-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-red-600 px-1 text-[9px] font-bold leading-none text-white">
             {badge}
           </span>
         ) : null}
       </span>
       <span className="font-sans text-[9px] font-semibold uppercase tracking-wider">
         {label}
       </span>
     </Link>
   );
 }
 
 export function BottomNav() {
   const pathname = usePathname();
   const { dark, toggleTheme } = useGuestTheme();
 
   const activePath = (href: string) =>
     href === "/" ? pathname === "/" : pathname?.startsWith(href);
 
   return (
     <nav
       className="fixed bottom-0 left-1/2 z-50 w-full max-w-[420px] -translate-x-1/2 px-3 pb-[max(1rem,env(safe-area-inset-bottom))] pt-2 transition-all duration-300 ease-in-out md:max-w-[480px]"
       aria-label="Primary"
     >
       <div
         className={`flex items-end justify-between gap-1 rounded-[28px] px-2 pb-2 pt-3 backdrop-blur-xl transition-all duration-300 ease-in-out ${
           dark
             ? "border-[rgba(200,169,106,0.2)] bg-[rgba(16,16,16,0.72)] shadow-[0_0_24px_rgba(200,169,106,0.15)]"
             : "border border-[rgba(74,55,40,0.12)] bg-[rgba(255,255,255,0.62)] shadow-[0_12px_40px_rgba(0,0,0,0.08)]"
         }`}
       >
         <NavLink href="/" label="Home" active={activePath("/")}>
           <IconHome className="h-[26px] w-[26px] shrink-0" />
         </NavLink>
         <NavLink href="/food" label="Food" active={activePath("/food")}>
           <IconUtensils className="h-[26px] w-[26px] shrink-0" />
         </NavLink>
 
         <div className="relative -mt-9 flex flex-col items-center px-1">
           <button
             type="button"
             onClick={toggleTheme}
             aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
             aria-pressed={dark}
             className={`relative flex h-16 w-16 items-center justify-center rounded-full transition-transform duration-300 ease-in-out hover:scale-[1.04] active:scale-[0.96] sm:h-[68px] sm:w-[68px] ${
               dark
                 ? "bg-[radial-gradient(circle_at_50%_40%,rgba(200,169,106,0.35),rgba(20,20,20,0.9))] shadow-[0_0_28px_rgba(200,169,106,0.45),0_0_60px_rgba(200,169,106,0.15)] ring-2 ring-[rgba(200,169,106,0.45)]"
                 : "bg-[radial-gradient(circle_at_50%_40%,rgba(200,169,106,0.5),rgba(255,252,245,0.95))] shadow-[0_0_24px_rgba(200,169,106,0.35),0_8px_24px_rgba(74,55,40,0.12)] ring-2 ring-[rgba(200,169,106,0.35)]"
             }`}
           >
             <Image
               src={ASSETS.bell}
               alt=""
               width={52}
               height={52}
               className="pointer-events-none h-[46px] w-[46px] object-contain animate-bell-glow sm:h-[52px] sm:w-[52px]"
             />
           </button>
         </div>
 
         <NavLink href="/maintenance" label="Fix" active={activePath("/maintenance")}>
           <IconWrench className="h-[26px] w-[26px] shrink-0" />
         </NavLink>
          <NavLink href="/search" label="Search" active={activePath("/search")}>
            <svg
              className="h-[26px] w-[26px] shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </NavLink>
         <NavLink
           href="/notifications"
           label="Alerts"
           active={activePath("/notifications")}
           badge="2"
         >
           <IconBellNav className="h-[26px] w-[26px] shrink-0" />
         </NavLink>
       </div>
     </nav>
   );
 }
