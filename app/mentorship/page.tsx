"use client";

import { useEffect, useState } from 'react';
import { useSession } from "next-auth/react";
import { io } from 'socket.io-client';
import axios from 'axios';
import loading from '../loading';
import React from "react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/core/Navbar";


const ChatPage = () => {
    const [isLoading, setLoading] = useState(true);
    const [toRedirect, setToRedirect] = useState(false);
    const [userDetail, setUserDetail] = useState({mentor: false, isMentor: false});
    const { data: session, status } = useSession();
    const [messages, setMessages] = useState<Message[]>([]);
    const [receiver, setReceiver] = useState('');
    const [recvName, setRecvName] = useState('');
    const [messageInput, setMessageInput] = useState('');
    const socket = io(`${process.env.NEXT_PUBLIC_SOCKET_URL}`);


    const containerStyle: React.CSSProperties = {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
    };
  
    const headingStyle: React.CSSProperties = {
      fontSize: '24px',
      marginBottom: '20px',
      textAlign: 'center',
    };
  
    const chatContainerStyle: React.CSSProperties = {
      border: '1px solid #ccc',
      borderRadius: '4px',
      padding: '10px',
      marginBottom: '20px',
      minHeight: '200px',
      maxHeight: '400px',
      overflowY: 'scroll',
    };
  
    const messageContainerStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '10px',
    };
  
    const senderStyle: React.CSSProperties = {
      fontWeight: 'bold',
      marginRight: '5px',
    };
  
    const messageStyle: React.CSSProperties = {
      padding: '8px',
      backgroundColor: '#f5f5f5',
      borderRadius: '4px',
    };
  
    const inputContainerStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
    };
  
    const inputStyle: React.CSSProperties = {
      flex: '1',
      border: '1px solid #ccc',
      borderRadius: '4px',
      padding: '8px',
      marginRight: '10px',
    };
  
    const buttonStyle: React.CSSProperties = {
      padding: '8px 16px',
      backgroundColor: '#4caf50',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    };
  
    const scheduleButtonStyle: React.CSSProperties = {
      ...buttonStyle,
      marginLeft: '10px',
    };

    useEffect(() => {
      if (!isLoading && !session) {
            window.location.href = '/';
            return; 
      }
      getDetails();
    }, [ session, isLoading]);

    useEffect(() => {
      if(toRedirect) {
        window.location.href = '/not-assigned';
            return; 
      }
  
    }, [ toRedirect]);



  

  useEffect(() => {
    // Listen for private messages
    socket.on('privateMessage', (message) => {
      console.log("New message recieved");
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Clean up the event listener
    return () => {
      socket.off('privateMessage');
    };
  }, []);


  const getRecvName = async (email:string) => {
    try {
      const response = await axios.get('/api/details?email='+email);
      const details = response.data.details;
      if(details && details.length == 1) {
        setRecvName(details[0].name);
      }
    }
    catch (error) {
        console.error('Error fetching name of user', error);
      }
  }

  const getDetails = async () => {
    try {
      const response = await axios.get('/api/details?email='+session?.user?.email);
      const details = response.data.details;
      if(details && details.length == 1) {
        const detail = details[0];
        let recv;
        if(detail.isAssigned && (detail.isMentor || detail.mentor==true)) {
            setReceiver(detail.mentee.email);
            recv = detail.mentee.email;
        }
        else if(detail.isAssigned){
            setReceiver(detail.mentor.email);
            recv = detail.mentor.email;
        } else {
            setToRedirect(true);
            setLoading(false);
        }
        await setUserDetail(detail);
        socket.emit('join', {recipient: receiver });
        await getRecvName(recv);
        fetchMessages(recv);
      }

    } catch (error) {
      console.error('Error fetching details of user:', error);
    }
  };

  const fetchMessages = async (receiver: string) => {
    try {
      const response = await axios.get('/api/messages?email1='+session?.user?.email+'&email2='+receiver);
      setMessages(response.data.messages);
      if(isLoading)
        setLoading(false);
    } catch (error) {
      if(isLoading)
      setLoading(false);
      console.error('Error fetching messages:', error);
    }
  };

  const scheduleEvent = ()=> {
    console.log('In here')
    window.location.href = '/schedule';
    return; 
  }

  const sendMessage = async () => {
    if (messageInput.trim() === '') return;

    try {
      const message = {
        sender: session?.user?.email,
        receiver:receiver,
        content: messageInput.trim(),
        timestamp: Date.now(),
      };

      // Send the message to the server
      await axios.post('/api/messages', message);
      socket.emit('privateMessage', { recipient: receiver, message: message });
      fetchMessages(receiver);
      // Clear the input field
      setMessageInput('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div>
              <Navbar image={session?.user?.image as string} />
    <div style={{ 'position': 'absolute','left': '50%','top': '50%','transform': 'translate(-50%, -50%)'}}>
      {isLoading ? (
        loading() 
      ) : (
        <div style={containerStyle}>

          <h1 style={headingStyle}>Chat with {recvName}</h1>
          <div style={chatContainerStyle}>
          {messages.map((message, index) => (
            <div key={index} style={messageContainerStyle}>
              <span style={senderStyle}>{message.sender}: </span>
              <div style={messageStyle}>{message.content}</div>
            </div>
          ))}
          </div>
          <div style={inputContainerStyle}>
          <input type="text" placeholder='Enter your message...' style={inputStyle} value={messageInput} onChange={(e) => setMessageInput(e.target.value)} />
          <Button style={buttonStyle} onClick={sendMessage} >Send</Button>
          {userDetail && (userDetail.isMentor || userDetail.mentor == true) ? (<Button  style={scheduleButtonStyle} onClick={scheduleEvent}>Schedule a meeting</Button>): null}
          </div>
        </div>
      )}
    </div>
    </div>
  );
}
  

export default ChatPage;

type Message = {
    content: string;
    sender: string;
    receiver: string;
    timeStamp: Date;
  };
