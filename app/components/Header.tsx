"use client";

import Link from "next/link";


export default function Header() {
  

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold">
          🛒 E-Shop
        </Link>

        {/* Navigation */}
        <nav className="space-x-6">
          <Link href="/" className="hover:text-blue-500">
            Home
          </Link>
          <Link href="/cart" className="relative">
            🛍️ Cart
            
            
          </Link>
        </nav>
      </div>
    </header>
  );
}
