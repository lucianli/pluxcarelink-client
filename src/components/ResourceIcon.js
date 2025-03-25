import React from 'react';
import '../styles/ResourceIcon.css';

const ResourceIcon = ({ icon, text }) => {
    return (
        <div className="resource-icon">
            <img src={icon} alt={text} height="60px" width="60px"/>
            <p className="icon-name">{text}</p>
        </div>
    );
};

export default ResourceIcon;
