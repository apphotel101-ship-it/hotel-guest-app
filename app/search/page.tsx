 "use client";
 
 import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
 import { BottomNav } from "../../components/BottomNav";
 import { GuestScaffold } from "../../components/GuestScaffold";
 import { useGuestTheme } from "../../components/GuestThemeProvider";
import {
  GUEST_CART_UPDATED_EVENT,
  getCartItems,
  updateCartItemQuantity,
} from "../../lib/cart";
 
type SearchItem = {
  item_id: number;
  item_name: string;
  item_price: number;
  service_id: number;
  service_name: string;
  image_url?: string | null;
  is_available: boolean;
};

 export default function SearchPage() {
   const { dark } = useGuestTheme();
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [searchPool, setSearchPool] = useState<SearchItem[]>([]);
  const [searchResults, setSearchResults] = useState<SearchItem[]>([]);
  const [suggestions, setSuggestions] = useState<SearchItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [resultsVisible, setResultsVisible] = useState(false);
  const [activeSearchLabel, setActiveSearchLabel] = useState("");
  const [cartMessage, setCartMessage] = useState("");
  const [cartQuantities, setCartQuantities] = useState<Record<number, number>>({});

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedQuery(query.trim());
    }, 500);

    return () => window.clearTimeout(timeoutId);
  }, [query]);

  const fetchItems = async (term: string) => {
    const token = localStorage.getItem("guest_access_token");
    const encodedQuery = encodeURIComponent(term);
    const response = await fetch(`http://localhost:3000/api/v1/items/search?q=${encodedQuery}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });

    const data = (await response.json()) as {
      items?: SearchItem[];
      message?: string;
    };

    if (!response.ok) {
      throw new Error(data.message || "Unable to search right now.");
    }

    return data.items ?? [];
  };

  useEffect(() => {
    const loadSuggestions = async () => {
      if (!debouncedQuery) {
        setSearchPool([]);
        setSearchResults([]);
        setSuggestions([]);
        setError("");
        setLoading(false);
        setResultsVisible(false);
        setActiveSearchLabel("");
        return;
      }

      try {
        setLoading(true);
        setError("");
        const items = await fetchItems(debouncedQuery);
        setSearchPool(items);
        setSuggestions(items.slice(0, 6));
      } catch (searchError) {
        setSearchPool([]);
        setSuggestions([]);
        setError(searchError instanceof Error ? searchError.message : "Search failed.");
      } finally {
        setLoading(false);
      }
    };

    void loadSuggestions();
  }, [debouncedQuery]);

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

  const handleUpdateCart = (item: SearchItem, delta: 1 | -1) => {
    updateCartItemQuantity(
      {
        item_id: item.item_id,
        item_name: item.item_name,
        item_price: item.item_price,
        service_id: item.service_id,
        service_name: item.service_name,
      },
      delta,
    );
    setCartMessage(delta > 0 ? `${item.item_name} added to cart` : `${item.item_name} updated`);
    window.setTimeout(() => setCartMessage(""), 1500);
  };

  const runSearch = async () => {
    const trimmed = query.trim();
    if (!trimmed) {
      setResultsVisible(false);
      setSearchResults([]);
      setActiveSearchLabel("");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const items = debouncedQuery === trimmed ? searchPool : await fetchItems(trimmed);
      setSearchPool(items);
      setSuggestions(items.slice(0, 6));
      setSearchResults(items);
      setResultsVisible(true);
      setActiveSearchLabel(trimmed);
      setShowSuggestions(false);
    } catch (searchError) {
      setSearchResults([]);
      setResultsVisible(true);
      setError(searchError instanceof Error ? searchError.message : "Search failed.");
    } finally {
      setLoading(false);
    }
  };

  const hasTypedQuery = useMemo(() => query.trim().length > 0, [query]);
 
   const t = dark
     ? {
         title: "text-white",
         muted: "text-[#d1c4a8]",
         glass:
           "border border-[rgba(200,169,106,0.18)] bg-[rgba(22,22,22,0.5)] backdrop-blur-lg shadow-[0_0_16px_rgba(200,169,106,0.10)]",
         input:
           "bg-[rgba(16,16,16,0.35)] border-[rgba(200,169,106,0.18)] text-white placeholder:text-[#8f7f63]",
         section: "text-gold tracking-[0.2em]",
        resultRow:
          "border border-[rgba(200,169,106,0.18)] bg-[rgba(22,22,22,0.5)] text-white",
        resultMuted: "text-[#d1c4a8]",
       }
     : {
         title: "text-brown",
         muted: "text-brown-muted",
         glass:
           "border border-[rgba(74,55,40,0.12)] bg-[rgba(255,255,255,0.58)] backdrop-blur-lg shadow-[0_10px_30px_rgba(0,0,0,0.05)]",
         input:
           "bg-[rgba(255,255,255,0.62)] border-[rgba(74,55,40,0.18)] text-brown placeholder:text-brown-muted/70",
         section: "text-brown tracking-[0.2em]",
        resultRow:
          "border border-[rgba(74,55,40,0.12)] bg-[rgba(255,255,255,0.58)] text-brown",
        resultMuted: "text-brown-muted",
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
 
      <div className="relative mb-5">
        <div className={`flex items-center gap-3 rounded-[18px] border px-4 py-3 ${t.glass}`}>
          <span className="text-lg" aria-hidden>
            🔍
          </span>
          <input
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => {
              window.setTimeout(() => {
                setShowSuggestions(false);
              }, 120);
            }}
            className={`w-full border-0 bg-transparent text-sm outline-none ${t.input}`}
            placeholder="Search menu and amenities..."
          />
          {hasTypedQuery ? (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setDebouncedQuery("");
                setSearchPool([]);
                setSearchResults([]);
                setSuggestions([]);
                setResultsVisible(false);
                setShowSuggestions(false);
                setError("");
                setActiveSearchLabel("");
              }}
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm ${dark ? "text-[#d1c4a8] hover:bg-white/10" : "text-brown-muted hover:bg-black/5"}`}
              aria-label="Clear search"
              title="Clear search"
            >
              ✕
            </button>
          ) : null}
          <button
            type="button"
            onClick={() => void runSearch()}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold text-white shadow-md shadow-gold/20 transition active:scale-95"
            aria-label="Search"
            title="Search"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
        </div>
        {showSuggestions && hasTypedQuery ? (
          <div className={`absolute z-20 mt-2 max-h-72 w-full overflow-y-auto rounded-[14px] p-2 ${t.glass}`}>
            {loading ? (
              <p className={`px-2 py-2 text-sm ${t.muted}`}>Searching...</p>
            ) : null}
            {!loading && suggestions.length === 0 && !error ? (
              <p className={`px-2 py-2 text-sm ${t.muted}`}>No suggestions found.</p>
            ) : null}
            {suggestions.map((item) => (
              <div
                key={item.item_id}
                className={`mb-1 flex items-center justify-between gap-2 rounded-xl px-3 py-2 last:mb-0 ${dark ? "hover:bg-white/5" : "hover:bg-black/5"}`}
              >
                <button
                  type="button"
                  onMouseDown={() => {
                    setQuery(item.item_name);
                    setDebouncedQuery(item.item_name);
                    setShowSuggestions(true);
                  }}
                  className="min-w-0 flex-1 text-left"
                >
                  <span className={`block truncate text-sm font-semibold ${t.title}`}>
                    {item.item_name}
                  </span>
                  <span className={`block truncate text-[11px] ${t.muted}`}>
                    {item.service_name}
                  </span>
                </button>
                <span className={`ml-2 shrink-0 text-xs font-semibold ${t.section}`}>
                  ₹{Number(item.item_price).toFixed(2)}
                </span>
                {item.is_available ? (
                  (cartQuantities[item.item_id] ?? 0) === 0 ? (
                    <button
                      type="button"
                      onMouseDown={() => handleUpdateCart(item, 1)}
                      className="ml-1 flex h-7 min-w-[48px] shrink-0 items-center justify-center rounded-full bg-gold px-2 text-[11px] font-semibold text-white shadow-md shadow-gold/25"
                      aria-label={`Add ${item.item_name}`}
                    >
                      Add
                    </button>
                  ) : (
                    <div className="ml-1 flex shrink-0 items-center gap-1">
                      <button
                        type="button"
                        onMouseDown={() => handleUpdateCart(item, -1)}
                        className="flex h-7 w-7 items-center justify-center rounded-full border border-gold/60 text-sm font-bold text-gold"
                        aria-label={`Decrease ${item.item_name}`}
                      >
                        -
                      </button>
                      <span className={`min-w-4 text-center text-xs font-semibold ${t.title}`}>
                        {cartQuantities[item.item_id] ?? 0}
                      </span>
                      <button
                        type="button"
                        onMouseDown={() => handleUpdateCart(item, 1)}
                        className="flex h-7 w-7 items-center justify-center rounded-full bg-gold text-sm font-bold text-white shadow-md shadow-gold/25 active:scale-95"
                        aria-label={`Increase ${item.item_name}`}
                      >
                        +
                      </button>
                    </div>
                  )
                ) : null}
              </div>
            ))}
          </div>
        ) : null}
       </div>

      {error ? <p className="mb-4 text-sm text-red-500">{error}</p> : null}
      {cartMessage ? <p className="mb-4 text-sm text-emerald-500">{cartMessage}</p> : null}

      {resultsVisible ? (
        <>
          <h2 className={`mb-3 font-sans text-[11px] font-bold uppercase ${t.section}`}>
            Search results
          </h2>
          <div className="mb-6 space-y-3">
            {loading ? <p className={`text-sm ${t.muted}`}>Searching...</p> : null}
            {!loading && !error && searchResults.length === 0 ? (
              <p className={`text-sm ${t.muted}`}>No matching items found for "{activeSearchLabel}".</p>
            ) : null}
            {searchResults.map((item) => (
              <div key={item.item_id} className={`rounded-[16px] p-3 ${t.resultRow}`}>
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">{item.item_name}</p>
                    <p className={`mt-1 truncate text-[11px] ${t.resultMuted}`}>
                      {item.service_name} · {item.is_available ? "Available" : "Unavailable"}
                    </p>
                  </div>
                  <p className={`shrink-0 text-sm font-bold ${t.section}`}>
                    ₹{Number(item.item_price).toFixed(2)}
                  </p>
                </div>
                {item.is_available ? (
                  <div className="mt-2 flex justify-end">
                    {(cartQuantities[item.item_id] ?? 0) === 0 ? (
                      <button
                        type="button"
                        onClick={() => handleUpdateCart(item, 1)}
                        className="flex h-8 min-w-[56px] items-center justify-center rounded-full bg-gold px-3 text-xs font-semibold text-white shadow-md shadow-gold/25 transition active:scale-95"
                        aria-label={`Add ${item.item_name}`}
                      >
                        Add
                      </button>
                    ) : (
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleUpdateCart(item, -1)}
                          className="flex h-8 w-8 items-center justify-center rounded-full border border-gold/60 text-base font-bold text-gold transition"
                          aria-label={`Decrease ${item.item_name}`}
                        >
                          -
                        </button>
                        <span className={`min-w-5 text-center text-sm font-bold ${t.title}`}>
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
                    )}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className={`mb-6 text-sm ${t.muted}`}>
          Type to get suggestions, then tap the search icon to view full results.
        </p>
      )}
 
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
