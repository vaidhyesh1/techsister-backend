import clientPromise from "@/lib/mongodb";
import {  NextApiResponse } from "next";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

const getHandler = async (req: Request , res: NextApiResponse) => {
  try {
    
    const client = await clientPromise;
    const db = client.db("prod");
    const scholarships = await db.collection('scholarships').find().toArray();
    if(scholarships) {
        return NextResponse.json({ scholarships, status:200 });
    } else {
        return NextResponse.json({ message: "Scholarships Not Found", status: 404 });
    }

  } catch (error) {
    console.error('Error getting scholarships', error);
    return NextResponse.json({ error: 'Error getting details', status: 500 });
  }
};

export { getHandler as GET };
