import React, { useEffect, useState } from 'react';
import { fetchMeetingDetails } from '../services/operations/MEETING_API';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LiveVideoPageComponent from '../components/LiveVideoPage/LiveVideoPageComponent';

const LiveVideoPage = () => {
    const dispatch = useDispatch();
    const { uid, channel } = useParams();
    const { token } = useSelector((state) => state.auth);

    const [meetingDetails, setMeetingDetails] = useState(null);
    const [activeConnection, setActiveConnection] = useState(true);

    const getMeetingDetails = async () => {
        const data = await dispatch(fetchMeetingDetails({ channel, uid }, token));
        setMeetingDetails(data);
        setActiveConnection(true);
    };

    useEffect(() => {
        getMeetingDetails();
        return () => {
            setMeetingDetails(null);
        };
    }, [channel, uid, token])

    return (
        <>
            {meetingDetails && (<LiveVideoPageComponent meetingDetails={meetingDetails}  activeConnection={activeConnection} uid={uid} channel={channel} token={token}/>)}
        </>
    );
};

export default LiveVideoPage;
