import clientPromise from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

const handler = async (req: Request, res: NextApiResponse) => {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);
    console.log("db", process.env.DB_NAME);
    const data = await req.json();
    console.log(data);
    const collection = db.collection("userData");

    await collection.updateOne(
            { email: data.email },
            { $set: data }
    );
    return NextResponse.json({ message: "Data added successfully" });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Something went wrong" });
  }
};

export { handler as POST };
