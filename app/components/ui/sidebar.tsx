"use client";
import { ListOrdered, ShoppingBasket, Users } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";


export const Sidebar = () => {
  const { data: session, status } = useSession();

  // Define the sidebar elements based on the user's role
  const adminSidebar = (
    <>
      <li className="flex items-center hover:bg-eggplant cursor-pointer rounded-md p-2">
        <ShoppingBasket className="me-2" />
        <Link href="/admin/product" className="text-inherit">
          <span>Add Product</span>
        </Link>
      </li>
      <li className="flex items-center hover:bg-eggplant cursor-pointer rounded-md p-2">
        <Users className="me-2" />
        <Link href="/admin/manage-users" className="text-inherit">
          <span> Manage Users</span>
        </Link>
      </li>
      <li className="flex items-center hover:bg-eggplant cursor-pointer rounded-md p-2">
        <ListOrdered className="me-2" />
        <Link href="/admin/manage-orders" className="text-inherit">
          <span>Orders</span>
        </Link>
      </li>
    </>
  );

  const userSidebar = (
    <>
      <li className="flex items-center hover:bg-eggplant cursor-pointer rounded-md p-2">
        <Users className="me-2" />
        <Link href="/profile">Profile</Link>
      </li>
      <li className="flex items-center hover:bg-eggplant cursor-pointer rounded-md p-2">
        <ListOrdered className="me-2" />
        <Link href="/my-orders">My Orders</Link>
      </li>
    </>
  );

  return (
    <div className="flex flex-col bg-gradient-to-t from-violet to-pink text-white py-12 w-48 p-3 h-screen">
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

export default Sidebar;
