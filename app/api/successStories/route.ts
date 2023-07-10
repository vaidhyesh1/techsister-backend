import clientPromise from "@/lib/mongodb";
import {  NextApiResponse } from "next";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';


const getHandler = async (req: Request , res: NextApiResponse) => {
  try {
    
    const client = await clientPromise;
    const db = client.db("prod");
    const success_stories = await db.collection('success_stories').find().toArray();
    if(success_stories) {
        return NextResponse.json({ success_stories, status:200 });
    } else {
        return NextResponse.json({ message: "Success Stories Not Found", status: 404 });
    }

  } catch (error) {
    console.error('Error getting success stories', error);
    return NextResponse.json({ error: 'Error getting success stories', status: 500 });
  }
};

export { getHandler as GET };
