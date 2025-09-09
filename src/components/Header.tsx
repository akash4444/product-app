import Link from "next/link";
import Image from "next/image";
import Profile from "./Profile";
import ProductSearch from "./products/SearchProducts";
import CartIcon from "./CartIcon";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full bg-header text-black shadow-md z-50">
      <div className="flex items-center mx-2">
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

        <div className="flex-1 w-full container mx-auto flex justify-center items-center py-4">
          <ProductSearch />
        </div>

        <div className="flex items-center space-x-2">
          <Link href="/cart" className="hidden sm:flex">
            <CartIcon />
          </Link>
          <Profile />
        </div>
      </div>
    </header>
  );
};

export default Header;
