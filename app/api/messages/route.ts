import clientPromise from "@/lib/mongodb";
import { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

const getHandler = async (req: Request, res: NextApiResponse) => {
  try {
    const searchParams = new URLSearchParams(req.url.split('?')[1]);
    const email1 = searchParams.get('email1');
    const email2 = searchParams.get('email2');

    if (!email1 || !email2) {
        return NextResponse.json({ error: 'Error fetching messages', status: 400 });
    }

    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);
    const messages1 = await db.collection('messages').find({ sender: email1, reciever :email2 }).toArray();
    const messages2 = await db.collection('messages').find({ reciever: email1, sender :email2 }).toArray();
    const mergedArray = [...messages1, ...messages2].sort((a, b) => a.timestamp - b.timestamp);

    return NextResponse.json({ messages: mergedArray, status: 200 });
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json({ error: 'Error fetching messages', status: 500 });
  }
};



const postHandler = async (req: NextRequest, res: NextApiResponse) => {
    try {
        const body = await req.json();
        const { sender, receiver, content, timestamp } = body;
    
        const client = await clientPromise;
        const db = client.db(process.env.DB_NAME);

        await db.collection('messages').insertOne({
          sender: sender,
          reciever: receiver,
          content: content,
          timestamp: timestamp,
        });
    
        // Emit the message to all connected clients
        //io.emit('message', { sender, content, timestamp });
    
        return NextResponse.json({ success: true, status: 200 });
      } catch (error) {
        console.error('Error storing message:', error);
        return NextResponse.json({ error: 'Error storing message', status: 500 });
      }
};


export { getHandler as GET, postHandler as POST };
