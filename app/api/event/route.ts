import {  NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { authConfig } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { google } from 'googleapis';

export const dynamic = 'force-dynamic';


const postHandler = async (req: NextRequest, res: NextApiResponse) => {
    try {
        const body = await req.json();
        const session = await getServerSession(authConfig);
        const { attendee1, attendee2, meetingName, meetingStartDate, meetingEndDate, meetingDescription, timeZone } = body;
        const accessToken = session?.accessToken;
        if (!accessToken) {
            console.error('Access token not found');
            return NextResponse.json({ response: 'Access Token not found', status: 500 });

          }
          const auth = new google.auth.OAuth2();
          auth.setCredentials({ access_token: accessToken });
          const calendar = google.calendar({ version: 'v3', auth });
          const event = {
            summary: meetingName,
            description: meetingDescription,
            start: {
              dateTime: new Date(meetingStartDate).toISOString(),
              timeZone: timeZone,
            },
            end: {
              dateTime: new Date(meetingEndDate).toISOString(),
              timeZone: timeZone,
            },attendees: [
                {email: attendee1},
                {email: attendee2}
              ],
              reminders: {
                useDefault: true
              },
              sendUpdates: 'all',
          };
      
          try {
            const response = await calendar.events.insert({
              calendarId: 'primary', // Calendar ID, replace with your desired calendar ID
              requestBody: event,
            });
      
            console.log('Event created:', response.data);
            return NextResponse.json({ response: "success", status: 200 });
            // Handle success and notify the user
          } catch (error) {
            console.error('Error creating event:', error);
            return NextResponse.json({ response: 'Error creating event', status: 500 });
            // Handle error and notify the user
          }
      

    
        // Emit the message to all connected clients
        //io.emit('message', { sender, content, timestamp });
    
      } catch (error) {
        console.error('Error storing message:', error);
        return NextResponse.json({ response: 'Error creating event', status: 500 });
      }
};


export { postHandler as POST };

    