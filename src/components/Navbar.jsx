import Link from "next/link";
import NavMenuLists from "./NavMenuLists";

const Navbar = async () => {
  console.log("Navbar");
  return (
    <div className="shadow bg-[#1e0f24] text-white">
      <div className="max-w-5xl mx-auto flex justify-between items-center  h-16 ">
        <Link href="/" className="hover:underline cursor-pointer">
          Home
        </Link>

        <ul className="flex space-x-5">
          <NavMenuLists />
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
