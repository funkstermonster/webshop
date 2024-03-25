"use client";
import { ListOrdered, ShoppingBasket, Users } from "lucide-react";
import { useSession } from "next-auth/react";

export const Sidebar = () => {
    const { data: session, status } = useSession();
  return (
    <div className="flex flex-col bg-gray-800 ml-6 mt-2 pl-1 w-48 rounded-md">
      <ul className="space-y-2 mt-2 mb-2">
        <li className="flex items-center hover:bg-gray-700 cursor-pointer">
          <ShoppingBasket />
          <span>Add Product</span>
        </li>
        <li className="flex items-center hover:bg-gray-700 cursor-pointer">
          <Users />
          <span>Manage Users</span>
        </li>
        <li className="flex items-center hover:bg-gray-700 cursor-pointer">
          <ListOrdered />
          <span>Orders</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
