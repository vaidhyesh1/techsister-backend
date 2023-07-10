"use client";
import {
  AlignVerticalJustifyCenter,
  ArrowRight,
  Book,
  Github,
  MoveRight,
  TwitterIcon,
} from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";

interface SigninProps {}

export const Signin: FC<SigninProps> = ({}) => {
  return (
    <div className="h-screen flex flex-col justify-between">
      <div className="w-full md:max-w-6xl mx-auto p-5 flex items-center justify-between">
        <h1 className="font-bold text-3xl tracking-tight">
          tech <span>sister</span>
          <sup className="absolute pt-6 pl-1 top-0 text-xs font-bold text-black">
            [BETA]
          </sup>
        </h1>
        <div className="">
          <button
            onClick={() => {
              signIn("google");
            }}
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md flex gap-2 items-center font-semibold"
          >
            Sign In
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center text-center space-y-3">
        <h1 className="text-3xl font-extrabold md:text-5xl">
          Empowering Women in Tech
        </h1>
        <p className="text-xl font-medium text-gray-600 md:p-3 p-5 max-w-3xl">
          Celebrating Women in Tech: Showcasing the brilliance and achievements
          of trailblazing women, inspiring the next generation of female
          technologists.
        </p>
        <div className="flex items-center space-x-7">
          <button
            onClick={() => {
              signIn("google");
            }}
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-5 py-3 rounded-md flex gap-2 items-center font-semibold"
          >
            Get Started
          </button>
          <Link
            href="https://www.womentech.net/en-us"
            className="flex font-semibold text-gray-700 items-center gap-1"
          >
            <h1>Related Resources</h1>
            <ArrowRight className="inline-block" size={20} />
          </Link>
        </div>
      </div>
      <div className="bg-gray-800 p-8 ">
        <div className="max-w-6xl flex justify-between items-center mx-auto">
          <h1 className="text-gray-300 text-xs font-medium tracking-wider">
            © 2023 Tech Sister. All rights reserved.
          </h1>
          <div className="flex items-center gap-7 text-gray-300 text-xs">
            <Github className="hover:cursor-pointer" size={20} />
            <TwitterIcon className="hover:cursor-pointer" size={20} />
            <Book className="hover:cursor-pointer" size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};
