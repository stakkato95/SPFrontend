import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Typography } from '@material-ui/core';

import { getTimeDifference } from '../../../../helper/CommonHelper';

function SessionDuration() {
    const session = useSelector(state => state.session.session);

    const [elapsedTime, setElapsedTime] = useState(getTimeDifference());

    useEffect(() => {
        setTimeout(() => setElapsedTime(getTimeDifference(session.sessionStartTime)), 1000);
    });

    return (<>
        <Typography variant="h4" gutterBottom>Session duration</Typography>
        <Typography variant="h2" gutterBottom>{elapsedTime}</Typography>
    </>);

}

export default SessionDuration;