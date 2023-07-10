import clientPromise from "@/lib/mongodb";
import {  NextApiResponse } from "next";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

const getHandler = async (req: Request , res: NextApiResponse) => {
  try {
    
    const searchParams = new URLSearchParams(req.url.split('?')[1]);
    const email = searchParams.get('email');
    
    if(!email){
        return NextResponse.json({ error: 'Error fetching details' });
    }
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);
    const details = await db.collection('userData').find({ email: email }).toArray();
    if(details && details.length > 0) {
        return NextResponse.json({ details, status:200 });
    } else {
        return NextResponse.json({ message: "User Not Found", status: 404 });
    }

  } catch (error) {
    console.error('Error getting details for the user', error);
    return NextResponse.json({ error: 'Error getting details', status: 500 });
  }
};

export { getHandler as GET };
