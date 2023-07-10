import React from "react";
import AvatarFunctions from "./AvatarFunctions";
import Link from "next/link";

interface Props {
  image: string;
}

function Navbar({ image }: Props) {
  return (
    <div className="w-full border-b border-gray-400 px-5 py-3 flex items-center justify-between">
      <h1 className="font-bold text-3xl tracking-tight">
        tech <span>sister</span>
        <sup className="absolute pt-3 pl-1 top-0 text-xs font-bold text-black">
          [BETA]
        </sup>
      </h1>
      <div className="flex items-center gap-6 font-medium text-gray-600 ">
        <Link
          href="/"
          className="hover:text-gray-950 hover:underline duration-300 transition-all"
        >
          Home
        </Link>
        <Link
          href="/forums"
          className="hover:text-gray-950 hover:underline duration-300 transition-all"
        >
          Forums
        </Link>
        <Link
          href="/mentorship"
          className="hover:text-gray-950 hover:underline duration-300 transition-all"
        >
          Mentorship
        </Link>
        <Link
          href="/scholarships"
          className="hover:text-gray-950 hover:underline duration-300 transition-all"
        >
          Scholarships
        </Link>
      </div>
      <div className="">
        <AvatarFunctions image={image} />
      </div>
    </div>
  );
}

export default Navbar;
