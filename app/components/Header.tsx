"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "./../store/store";
   
export default function Header() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        
        <Link href="/" className="text-xl font-bold">
          🛒 E-Shop
        </Link>

        <nav className="space-x-6 flex items-center">
          <Link href="/" className="hover:text-blue-500">
            Home
          </Link>
          <Link href="/cart" className="relative flex items-center">
            🛍️ Cart
            {totalItems > 0 && (
              <span className="absolute top-[-15px] right-[-15px]  bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                {totalItems}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
