import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/black-logo-new.png';
import { fetchMessages, joinMeeting } from '../../services/operations/MEETING_API';
import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash, FaRegCopy, FaArrowRight, FaArrowLeft, FaMessage } from "react-icons/fa6";
import {
    LocalUser,
    RemoteUser,
    useJoin,
    useLocalCameraTrack,
    useLocalMicrophoneTrack,
    usePublish,
    useRemoteAudioTracks,
    useRemoteUsers,
} from 'agora-rtc-react';
import { Navigation, Scrollbar, A11y, Grid, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import 'swiper/css/grid';
import 'swiper/css/pagination';
import toast from 'react-hot-toast';
import ChatComponent from '../../components/LiveVideoPage/ChatComponent';

const LiveVideoPageComponent = ({meetingDetails, activeConnection, uid, channel, token}) => {
    const APP_ID = import.meta.env.VITE_APP_AGORA_APP_ID;
    const navigate = useNavigate();

    const [micOn, setMic] = useState(true);
    const [cameraOn, setCamera] = useState(true);
    const [messages, setMessages] = useState([]);
    const [isChatOpen, setChatOpen] = useState(false);

    const { localMicrophoneTrack } = useLocalMicrophoneTrack(micOn);
    const { localCameraTrack, error } = useLocalCameraTrack(cameraOn);
    const remoteUsers = useRemoteUsers();
    const { audioTracks } = useRemoteAudioTracks(remoteUsers);

    audioTracks.forEach((tracks) => {
        tracks.play();
    })

    const handleLeaveMeeting = async () => {
        localStorage.removeItem('meetingDetails');
        navigate('/');
    };

    const getMessages = async () => {
        const response = await fetchMessages({ meetingLink: `${window.location.origin}/meeting/${channel}/${uid}` }, token);
        if (!response) return toast.error("Error fetching messages");
        setMessages(response.data);
    };

    const joinUser = async () => {
        await joinMeeting({ meetingLink: `${window.location.origin}/meeting/${channel}/${uid}` }, token);
    };

    usePublish([localMicrophoneTrack, localCameraTrack]);


    useJoin(
        {
            appid: APP_ID,
            channel: meetingDetails?.room_name,
            token: meetingDetails?.room_token,
        },
        activeConnection
    );
    
    useEffect(() => {
        joinUser();
        getMessages();

        return () => {
            setMessages([]);
        };
    }, [channel, uid, token]);

    useEffect(() => {
        if (error && error.message.includes("NotReadableError")) {
            toast.error("Camera is already in use. Please close other applications using the camera.");
        } else if (error) {
            toast.error("Something went wrong while streaming video.");
        }
    }, [error]);

    return (
        <div className="bg-[#1B1A1D] h-screen">
            <div className="border-b-1 border-[#2F2F31] flex items-center h-[10%] px-4">
                <img src={logo} alt="Logo" className="w-28 md:w-40 h-12 md:h-16 border-r-2 border-[#2F2F31]" />
                <h1 className="text-2xl md:text-4xl text-white ml-4 truncate">{channel}</h1>
            </div>
            <div className="w-full md:w-10/12 flex flex-col md:flex-row mx-auto h-[80%] md:gap-10 px-2 md:px-0">
                {/* Video Section */}
                <div className="h-full w-full md:w-[70%] flex flex-col items-center gap-4 my-4">
                    {/* Remote Video Grid */}
                    <Swiper
                        modules={[Navigation, Scrollbar, A11y, Grid, Pagination]}
                        spaceBetween={10}
                        slidesPerView={1}
                        grid={{
                            rows: 1,
                            fill: 'row'
                        }}
                        pagination={{
                            el: '.swiper-pagination',
                            clickable: true,
                            dynamicBullets: true,
                        }}
                        breakpoints={{
                            768: { 
                                slidesPerView: 3,
                                grid: {
                                    rows: 1
                                }
                            }
                        }}
                        navigation={{
                            nextEl: ".custom-next-btn",
                            prevEl: ".custom-prev-btn",
                        }}
                        className="w-full h-[60%] md:h-[45%] flex gap-2 md:gap-10 mb-4"
                    >
                        {remoteUsers.map((user) => (
                            <SwiperSlide key={user.uid} className="flex items-center justify-center">
                                <div className="video-container">
                                    <RemoteUser user={user} />
                                </div>
                            </SwiperSlide>
                        ))}
                        <button className="custom-prev-btn cursor-pointer bg-[#2F2F31] p-2 rounded-r-lg">
                            <FaArrowLeft className="text-lg md:text-2xl text-white" />
                        </button>
                        <button className="custom-next-btn cursor-pointer bg-[#2F2F31] p-2 rounded-l-lg">
                            <FaArrowRight className="text-lg md:text-2xl text-white" />
                        </button>
                    </Swiper>

                    {/* Local Video */}
                    <div className="video-container md:h-[55%] mt-2">
                        <LocalUser
                            audioTrack={localMicrophoneTrack}
                            videoTrack={localCameraTrack}
                            cameraOn={cameraOn}
                            micOn={micOn}
                            playAudio={false}
                            playVideo={cameraOn}
                        />
                    </div>
                </div>
                
                {/* Chat Section - Desktop */}
                <div className="w-full md:w-[30%] flex flex-col gap-4 mt-4">
                    {/* Chat Section */}
                    <div className="hidden md:block w-full bg-[#2B2D2E] rounded-lg flex-1">
                        {/* Only render ChatComponent on desktop if not mobile */}
                        <ChatComponent 
                            messages={messages} 
                            setMessages={setMessages} 
                            className="hidden md:block" 
                        />
                    </div>

                    {/* Controls for Desktop - Now outside chat box */}
                    <div className="hidden md:block p-4 rounded-lg">
                        <div className="flex items-center justify-between gap-2">
                            <button
                                className="p-3 text-white rounded-md border-2 border-gray-500 text-2xl bg-[#2B2D2E]"
                                onClick={() => {
                                    navigator.clipboard.writeText(meetingDetails?.meeting_link);
                                    toast.success("Link copied");
                                }}
                            >
                                <FaRegCopy />
                            </button>

                            <button
                                className={`p-3 ${
                                    micOn ? "border-gray-500" : "bg-[#D95140] border-red-600"
                                } transition duration-300 text-white font-semibold rounded-md text-2xl border-2 bg-[#2B2D2E]`}
                                onClick={() => setMic((prev) => !prev)}
                            >
                                {micOn ? <FaMicrophone /> : <FaMicrophoneSlash />}
                            </button>

                            <button
                                className={`p-3 ${
                                    cameraOn ? "border-gray-500" : "bg-[#D95140] border-red-600"
                                } transition duration-300 text-white font-semibold rounded-md text-2xl border-2 bg-[#2B2D2E]`}
                                onClick={() => setCamera((prev) => !prev)}
                            >
                                {cameraOn ? <FaVideo /> : <FaVideoSlash />}
                            </button>
                            
                            <button
                                className="p-3 bg-[#D95140] text-white rounded-lg hover:bg-red-700 transition duration-300 opacity-80 hover:opacity-100 text-xl"
                                onClick={handleLeaveMeeting}
                            >
                                Leave
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Chat Overlay */}
                <div className={`md:hidden fixed bottom-0 left-0 right-0 bg-[#2B2D2E] rounded-t-2xl transition-transform duration-300 ease-in-out transform ${isChatOpen ? 'translate-y-0' : 'translate-y-full'} z-40 h-[80vh] flex flex-col`}>
                    <div className="flex justify-between items-center p-4 border-b border-[#1B1A1D]">
                        <h3 className="text-white text-lg font-semibold">Chat</h3>
                        <button 
                            onClick={() => setChatOpen(false)}
                            className="text-white"
                        >
                            ✕
                        </button>
                    </div>
                    <div className="flex-1 overflow-hidden flex flex-col">
                        {/* Only render ChatComponent on mobile when chat is open */}
                        {isChatOpen && (
                            <ChatComponent 
                                messages={messages} 
                                setMessages={setMessages} 
                                className="md:hidden" 
                            />
                        )}
                    </div>
                </div>
            </div>

            {/* Update the mobile controls to only show on mobile */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 flex flex-col items-center justify-between w-full px-4 gap-4 pb-4 bg-[#1B1A1D]">
                <div className="flex items-center justify-center gap-4 w-full">
                    <button
                        className="p-3 bg-[#2B2D2E] text-white rounded-full border-2 border-gray-500 text-xl"
                        onClick={() => {
                            navigator.clipboard.writeText(meetingDetails?.meeting_link);
                            toast.success("Link copied");
                        }}
                    >
                        <FaRegCopy />
                    </button>

                    <button
                        className={`p-3 ${
                            micOn ? "bg-[#2B2D2E] border-gray-500" : "bg-[#D95140] border-red-600"
                        } transition duration-300 text-white font-semibold rounded-full text-xl border-2`}
                        onClick={() => setMic((prev) => !prev)}
                    >
                        {micOn ? <FaMicrophone /> : <FaMicrophoneSlash />}
                    </button>

                    <button
                        className={`p-3 ${
                            cameraOn ? "bg-[#2B2D2E] border-gray-500" : "bg-[#D95140] border-red-600"
                        } transition duration-300 text-white font-semibold rounded-full text-xl border-2`}
                        onClick={() => setCamera((prev) => !prev)}
                    >
                        {cameraOn ? <FaVideo /> : <FaVideoSlash />}
                    </button>
                    
                    <button 
                        onClick={() => setChatOpen(!isChatOpen)}
                        className="p-3 bg-[#2B2D2E] text-white rounded-full border-2 border-gray-500 text-xl"
                    >
                        <FaMessage />
                    </button>
                    
                    <button
                        className="p-3 bg-[#D95140] text-white rounded-full hover:bg-red-700 transition duration-300 opacity-80 hover:opacity-100 text-xl"
                        onClick={handleLeaveMeeting}
                    >
                        Leave
                    </button>
                </div>
            </div>
        </div>
    )
}

export default LiveVideoPageComponent