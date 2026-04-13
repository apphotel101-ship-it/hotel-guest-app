"use client";

export const GUEST_CART_KEY = "guest_cart_items";
export const GUEST_CART_UPDATED_EVENT = "guest-cart-updated";

export type CartItem = {
  item_id: number;
  item_name: string;
  item_price: number;
  service_id: number;
  service_name: string;
  quantity: number;
};

export type CartItemInput = Omit<CartItem, "quantity">;

export function getCartItems(): CartItem[] {
  if (typeof window === "undefined") return [];

  const raw = localStorage.getItem(GUEST_CART_KEY);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw) as CartItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function getCartCount(items = getCartItems()): number {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

export function addItemToCart(item: CartItemInput): void {
  updateCartItemQuantity(item, 1);
}

export function updateCartItemQuantity(item: CartItemInput, delta: number): void {
  if (delta === 0) return;

  const currentItems = getCartItems();
  const matched = currentItems.find((cartItem) => cartItem.item_id === item.item_id);

  let nextItems: CartItem[];
  if (!matched && delta < 0) {
    nextItems = currentItems;
  } else if (!matched) {
    nextItems = [...currentItems, { ...item, quantity: delta }];
  } else {
    nextItems = currentItems
      .map((cartItem) =>
        cartItem.item_id === item.item_id
          ? { ...cartItem, quantity: cartItem.quantity + delta }
          : cartItem,
      )
      .filter((cartItem) => cartItem.quantity > 0);
  }

  localStorage.setItem(GUEST_CART_KEY, JSON.stringify(nextItems));
  window.dispatchEvent(new CustomEvent(GUEST_CART_UPDATED_EVENT));
}

export function getCartItemQuantity(itemId: number): number {
  const matched = getCartItems().find((item) => item.item_id === itemId);
  return matched?.quantity ?? 0;
}
