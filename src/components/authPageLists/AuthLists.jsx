"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AuthLists = ({ path, label, index, pages }) => {
  const pathName = usePathname();
  return (
    <li
      className={`text-sm font-semibold hover:underline cursor-pointer ${
        index !== pages.length - 1 ? "border-r-2 border-gray-700 px-2" : "pl-2"
      } ${pathName == path ? "text-red-500" : ""}`}
    >
      <Link href={path}>{label}</Link>
    </li>
  );
};

export default AuthLists;
