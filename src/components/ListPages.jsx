"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const ListPages = () => {
  const pathName = usePathname();

  const pages = [
    { path: "/secret-page-1", label: "secret-app-1" },
    { path: "/secret-page-2", label: "secret-app-2" },
    { path: "/secret-page-3", label: "secret-app-3" },
  ];

  return (
    <ul className="flex">
      {pages &&
        pages.map(({ path, label }, index) => (
          <li
            key={index}
            className={`text-sm font-semibold hover:underline cursor-pointer ${
              index !== pages.length - 1
                ? "border-r-2 border-gray-700 px-2"
                : "pl-2"
            } ${pathName == path ? "text-red-500" : ""}`}
          >
            <Link href={path}>{label}</Link>
          </li>
        ))}

      {/* <li
        className={`text-sm font-semibold hover:underline cursor-pointer ${
          pathName == "/secret-page-1" ? "text-red-500" : ""
        }`}
      >
        <Link href="/secret-page-1">secret-app-1</Link>
      </li>
      &nbsp;/&nbsp;
      <li
        className={`text-sm font-semibold hover:underline cursor-pointer ${
          pathName == "/secret-page-2" ? "text-red-500" : ""
        }`}
      >
        <Link href="/secret-page-2">secret-app-2</Link>
      </li>
      &nbsp;/&nbsp;
      <li
        className={`text-sm font-semibold hover:underline cursor-pointer ${
          pathName == "/secret-page-3" ? "text-red-500" : ""
        }`}
      >
        <Link href="/secret-page-3">secret-app-3</Link>
      </li> */}
    </ul>
  );
};

export default ListPages;
