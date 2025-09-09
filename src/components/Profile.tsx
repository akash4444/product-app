import Link from "next/link";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { User, LogOut, Settings, ShoppingCart } from "lucide-react";

const Profile = () => {
  return (
    <div className="flex justify-end items-center p-2">
      <Menubar className="border-none bg-transparent shadow-none">
        <MenubarMenu>
          <MenubarTrigger className="rounded-full cursor-pointer p-2 hover:bg-accent hover:text-accent-foreground transition-colors">
            <User className="h-5 w-5" />
          </MenubarTrigger>
          <MenubarContent className="w-48 rounded-xl p-2 mr-2 mt-1 shadow-lg bg-black/50 backdrop-blur-md text-white">
            <Link href="/my-profile" passHref>
              <MenubarItem className="flex items-center gap-2 cursor-pointer rounded-md px-3 py-2 hover:bg-white/20 transition-colors">
                <User className="h-4 w-4" />
                My Profile
              </MenubarItem>
            </Link>

            <Link href="/settings" passHref>
              <MenubarItem className="flex items-center gap-2 cursor-pointer rounded-md px-3 py-2 hover:bg-white/20 transition-colors">
                <Settings className="h-4 w-4" />
                Settings
              </MenubarItem>
            </Link>

            <Link href="/cart" passHref>
              <MenubarItem className="flex items-center gap-2 cursor-pointer rounded-md px-3 py-2 hover:bg-white/20 transition-colors">
                <ShoppingCart className="h-4 w-4" />
                Cart
              </MenubarItem>
            </Link>

            <MenubarSeparator />

            <MenubarItem className="flex items-center gap-2 cursor-pointer rounded-md px-3 py-2 text-white bg-red-600 hover:bg-red-400 hover:text-white transition-colors">
              <LogOut className="h-4 w-4" />
              Logout
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  );
};

export default Profile;
