"use client";
import React from 'react';
import Navbar from "@/components/core/Navbar";
import { useSession } from "next-auth/react";

const MyComponent: React.FC = () => {
    const { data: session, status } = useSession();

  return <div>
                  <Navbar image={session?.user?.image as string} />
    <iframe style={{border: '0', width: '100%', height: '600px'}} src="http://pub4.bravenet.com/forum/278885111/" />
    </div>;
};

export default MyComponent;