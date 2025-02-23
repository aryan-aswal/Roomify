import React, { useEffect, useRef, useState } from 'react';
import { LuSendHorizonal } from "react-icons/lu";
import { io } from 'socket.io-client';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import MessageComponent from './MessageComponent';
const SOCKET_IO_URL = import.meta.env.VITE_APP_SOCKET_IO_URL;

// Create a singleton socket instance outside the component
let socketInstance = null;

const ChatComponent = ({ messages, setMessages, className }) => {
    const { token } = useSelector((state) => state.auth);
    const { channel, uid } = useParams();
    const [message, setMessage] = useState('');
    const isSocketInitialized = useRef(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        // Initialize socket only once
        if (!socketInstance && !isSocketInitialized.current) {
            socketInstance = io(SOCKET_IO_URL, {
                auth: { token },
            });

            socketInstance.on('connect', () => {
                console.log('Connected to the server:', socketInstance.id);
            });

            socketInstance.on('message', (newMessage) => {
                setMessages((prevMessages) => [...prevMessages, newMessage]);
            });

            socketInstance.on('connect_error', (error) => {
                console.error('Connection error:', error);
            });

            socketInstance.on('error', (error) => {
                console.error('Socket error:', error);
            });

            isSocketInitialized.current = true;
        }

        return () => {
            // Only disconnect and cleanup when the last instance is unmounted
            if (socketInstance && !document.querySelector('.chat-component')) {
                socketInstance.disconnect();
                socketInstance = null;
                isSocketInitialized.current = false;
            }
        };
    }, [token, setMessages]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!message.trim()) return;
        
        const data = {
            message,
            meetingLink: `${window.location.origin}/meeting/${channel}/${uid}`,
        };
        if (socketInstance) {
            socketInstance.emit('message', data);
        }
        setMessage('');
    };

    return (
        <div className={`flex flex-col h-full chat-component ${className}`}>
            <div className='chat-container flex-1 overflow-y-auto px-4 pt-4 pb-20 space-y-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent rounded-t-lg' 
                 style={{ maxHeight: 'calc(100vh - 300px)' }}>
                {messages.map((chat, index) => (
                    <MessageComponent chat={chat} key={index} />
                ))}
                <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSubmit} className='text-white p-4 mt-auto bg-[#2B2D2E] rounded-b-lg'>
                <div className='relative flex items-center'>
                    <input
                        type="text"
                        placeholder='Write a message...'
                        className='bg-[#1B1A1D] w-full py-3 px-5 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all'
                        onChange={(e) => setMessage(e.target.value)}
                        value={message}
                    />
                    <button 
                        type="submit"
                        className='absolute right-4 p-2 hover:bg-[#3F4246] rounded-full transition-colors' 
                    >
                        <LuSendHorizonal className='text-2xl text-blue-500' />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ChatComponent;
