"use client";
import { signOut } from "next-auth/react";
import React, { FC } from "react";

interface SignoutProps {}

export const Signout: FC<SignoutProps> = ({}) => {
  return (
    <button
      onClick={() => {
        signOut();
      }}
    >
      Signout
    </button>
  );
};
