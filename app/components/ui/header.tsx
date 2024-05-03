"use client";

import { Input } from "@nextui-org/input";
import { Logo } from "./logo";
import Logout from "@/logout";
import { Navbar, NavbarBrand, NavbarContent } from "@nextui-org/navbar";
import { SearchIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Header() {
  const { data: session, status } = useSession();
  return (
    <Navbar isBordered className="bg-gradient-to-t from-eggplant to-puce text-white py-4">
      <NavbarContent justify="start">
        <NavbarBrand className="mr-4">
          <Link href="/">
            <Logo />
          </Link>
          <p className="hidden sm:block font-bold text-inherit ml-2">
            FUNKSTER
          </p>
        </NavbarBrand>
        {!!session && <Logout />}
        {!session && <Link href="/login">Login</Link>}
        {!session && (
          <Link className="ml-2" href="register">
            Register
          </Link>
        )}
      </NavbarContent>

      <NavbarContent as="div" className="items-center" justify="end">
        <Input
          classNames={{
            base: "max-w-full sm:max-w-[10rem] h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper:
              "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Type to search..."
          
          size="sm"
          startContent={<SearchIcon size={18} />}
          type="search"
        />
        {session ? (
          <ul>
            {session.user.role === "Admin" ? (
              <li>
                <Link href="/admin/product">Dashboard</Link>
              </li>
            ) : (
              <Link href="/dashboard">Dashboard</Link>
            )}
            <li>
              <Link href="/profile">Profile</Link>
            </li>
            <li>
              <p>Signed in as {session?.user.role}</p>
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <Link href="/login">Login</Link>
            </li>
            <li>
              <Link href="/register">Register</Link>
            </li>
          </ul>
        )}
      </NavbarContent>
    </Navbar>
  )
}
