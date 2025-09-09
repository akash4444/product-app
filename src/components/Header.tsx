"use client"; // Next.js 13+ client component
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import Image from "next/image";
import Profile from "./Profile";
import ProductSearch from "./products/SearchProducts";
import useCartStore from "@/store/cartStore";
import { ShoppingCart } from "lucide-react"; // optional icon

const Header = () => {
  const cartItems = useCartStore((state) => state.cartItems);
  const totalQuantity = cartItems.length;

  return (
    <header className="fixed top-0 left-0 w-full bg-header text-black shadow-md z-50">
      <div className="flex items-center mx-2">
        {/* Logo */}
        <Link href="/">
          <div className="flex-shrink-0">
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/3/33/Vanamo_Logo.png"
              width={50}
              height={50}
              alt="logo"
            />
          </div>
        </Link>

        {/* Search bar */}
        <div className="flex-1 container mx-auto flex justify-center items-center p-4">
          <ProductSearch />
        </div>

        <div className="flex items-center space-x-8">
          <Link href="/cart" className="relative flex items-center">
            <ShoppingCart className="w-6 h-6" />
            {totalQuantity > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {totalQuantity}
              </span>
            )}
          </Link>
          <Profile />
        </div>
      </div>
    </header>
  );
};

export default Header;
