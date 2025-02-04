"use client";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  return (
    <div>
      <h1 className="text-4xl font-bold">404 | Page not found</h1>
      <button onClick={() => router.back()}>back</button>
    </div>
  );
};

export default Page;
