"use client";
import { usePathname } from "next/navigation";
// import AuthLists from "./AuthLists";
import Link from "next/link";
import AuthLists from "./AuthLists";

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
          <AuthLists
            pages={pages}
            path={path}
            label={label}
            index={index}
            key={index}
          />
        ))}
    </ul>
  );
};

export default ListPages;
