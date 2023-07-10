"use client";
import React from 'react';
import ScholarshipList from '../../components/core/scholarshipList';
import Navbar from "@/components/core/Navbar";
import { useSession } from "next-auth/react";


const HomePage: React.FC = () => {
  const { data: session, status } = useSession();

  return (
    <div>
      <Navbar image={session?.user?.image as string} />
      <ScholarshipList apiEndpoint='/api/scholarship' />
    </div>
  );
};

export default HomePage;
