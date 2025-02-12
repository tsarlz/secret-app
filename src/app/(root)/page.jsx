"use client";

import ListPages from "@/components/authPageLists/ListPages";
import useGetUser from "@/utils/hooks/useGetUser";

const Page = () => {
  const { user } = useGetUser();
  return (
    <>
      <div className="flex flex-col space-y-10 justify-center items-center h-[88vh]">
        {user && <ListPages />}
        <h1 className="text-4xl font-bold">Welcome to Secret App</h1>
      </div>
    </>
  );
};

export default Page;
