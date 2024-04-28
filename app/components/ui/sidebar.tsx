"use client";
import { Link } from "@nextui-org/react";
import { ListOrdered, ShoppingBasket, Users } from "lucide-react";
import { useSession } from "next-auth/react";

export const Sidebar = () => {
  const { data: session, status } = useSession();

  // Define the sidebar elements based on the user's role
  const adminSidebar = (
    <>
      <li className="flex items-center hover:bg-gray-700 cursor-pointer">
        <ShoppingBasket />
        <Link href="/admin/product" className="text-inherit">
          <span>Add Product</span>
        </Link>
      </li>
      <li className="flex items-center hover:bg-gray-700 cursor-pointer">
        <Users />
        <Link href="/admin/manage-users" className="text-inherit">
          <span> Manage Users</span>
        </Link>
      </li>
      <li className="flex items-center hover:bg-gray-700 cursor-pointer">
        <ListOrdered />
        <Link href="/admin/manage-orders" className="text-inherit">
          <span>Orders</span>
        </Link>
      </li>
    </>
  );

  const userSidebar = (
    <>
      <li className="flex items-center hover:bg-gray-700 cursor-pointer">
        <Users />
        <Link href="/profile">Profile</Link>
      </li>
      <li className="flex items-center hover:bg-gray-700 cursor-pointer">
        <ListOrdered />
        <Link href="/my-orders">My Orders</Link>
      </li>
    </>
  );

  return (
    <div className="flex flex-col bg-gray-800 w-48 rounded-md p-3 h-screen">
      {session ? (
        <ul className="space-y-2 mt-2 mb-2">
          {session.user.role === "Admin" ? adminSidebar : userSidebar}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Sidebar
