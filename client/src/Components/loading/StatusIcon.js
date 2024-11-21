import React from "react";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const StatusIcon = ({ userStatus }) => {
    const iconColor = userStatus ? 'green' : 'red';

    return (
        <FiberManualRecordIcon style={{ color: iconColor, fontSize: 20 }} />
    );
};

export default StatusIcon;
