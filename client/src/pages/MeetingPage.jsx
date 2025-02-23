import React, { useState } from 'react';
import Wrapper from '../components/common/Wrapper';
import illustrationImage from '../assets/illustration_1.jpg';
import NewMeetingForm from '../components/MeetingPage/NewMeetingForm';
import JoinMeetingForm from '../components/MeetingPage/JoinMeetingForm';
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { createMeeting, joinMeeting } from '../services/operations/MEETING_API';

const MettingPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);
    const [meetingLink, setMeetingLink] = useState('');
    const [userName, setUserName] = useState('');
    const [roomName, setRoomName] = useState('');

    const createNewMeeting = () => {
        if (!token) return toast.error('Please login to create a new meeting');
        if (!userName || !roomName) return toast.error('Please fill all the fields');
        dispatch(createMeeting({ channel: roomName }, token, navigate));
    }
    const handleJoinMeeting = async() => {
        if (!token) return toast.error('Please login to join a meeting');
        if (!meetingLink) return toast.error('Please enter a meeting link');
        const response = await joinMeeting({ meetingLink }, token);
        if(!response) return toast.error('Meeting not found')
        const channel = meetingLink.split("/").at(-2);
        const uid = meetingLink.split("/").at(-1);
        navigate(`/meeting/${channel}/${uid}`);
    }
    return (
        <div className='flex justify-center items-center min-h-[calc(100vh-5rem)] py-8'>
            <Wrapper>
                <div className='flex flex-col lg:flex-row gap-8 lg:gap-12 items-center'>
                    <div className='w-full lg:w-5/12 flex flex-col gap-5 px-4 lg:px-0'>
                        <h1 className='text-2xl md:text-3xl lg:text-4xl font-semibold text-center lg:text-left'>
                            Video calls and meeting for everyone
                        </h1>
                        <p className='text-gray-500 font-medium text-center lg:text-left text-sm md:text-base'>
                            Connect, collaborate and celebrate from anywhere with Roomify
                        </p>
                        <div className='flex gap-5 flex-col'>
                            <NewMeetingForm setRoomName={setRoomName} setUserName={setUserName} />
                            <button
                                className='bg-[#1657FF] text-white p-2 rounded-md hover:bg-blue-500 hover:scale-95 transform transition duration-300 font-semibold tracking-wider text-sm md:text-base'
                                onClick={createNewMeeting}
                            >
                                New Meeting
                            </button>
                        </div>
                        <hr className='my-2' />
                        <div className='flex gap-5 flex-col'>
                            <JoinMeetingForm setMeetingLink={setMeetingLink} />
                            <button
                                className='bg-white text-gray-500 p-2 rounded-md border-gray-200 border-2 w-full hover:scale-95 transform transition duration-300 font-semibold tracking-wider text-sm md:text-base'
                                onClick={handleJoinMeeting}
                            >
                                Join Meeting
                            </button>
                        </div>
                    </div>
                    <div className='w-full lg:w-7/12 mt-6 lg:mt-0'>
                        <img
                            src={illustrationImage}
                            alt="Illustration"
                            className='w-full h-full object-cover rounded-md shadow-lg'
                        />
                    </div>
                </div>
            </Wrapper>
        </div>
    )
}

export default MettingPage