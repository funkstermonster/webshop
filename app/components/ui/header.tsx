import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  Link,
  Input,
} from "@nextui-org/react";
import { Logo } from "./logo";
import { getServerSession } from "next-auth";
import Logout from "@/logout";
import { SearchIcon } from "lucide-react";

export default async function Header() {
  const session = await getServerSession();
  return (
    <Navbar isBordered className="dark">
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
            {" "}
            {/* Open ul tag */}
            <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link href="/profile">Profile</Link>
            </li>
            <li>
              <p>Signed in as {session?.user?.email}</p>{" "}
              {/* Display user's email */}
            </li>
          </ul>
        ) : (
          <ul>
            {" "}
            {/* Open ul tag */}
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
  );
}
