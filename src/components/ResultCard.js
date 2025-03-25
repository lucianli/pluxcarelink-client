import React from 'react';
import { useNavigate } from 'react-router-dom';
import ResourceBadge from './ResourceBadge';
import '../styles/ResultCard.css';
import addressIcon from '../assets/address.svg';
import phoneIcon from '../assets/phone.svg';

const ResultCard = ({ resource, isActive, id }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/details/${resource._id}`, {
            state: { resource }
        });
    };

    return (
        <div 
            id={id}
            className={`result-card ${isActive ? 'active' : ''}`}
            onClick={handleClick}
        >
            <div className="resource-title">
                <h3 className="resource-name">{resource.name}</h3>
                <ResourceBadge category={resource.category} />
            </div>

            <div className="resource-info">
                <img src={addressIcon} alt="Address" height="22px" width="22px"/>
                <p className="resource-detail">{resource.address}</p>
                <div className="small-divider"></div>
                {resource.phone && 
                    <>
                        <img src={phoneIcon} alt="Phone" height="20px" width="20px"/>
                        <p className="resource-detail">{resource.phone}</p>
                    </>
                }
            </div>

            {resource.summary && <p className="resource-summary">{resource.summary}</p>}
        </div>
    );
};

export default ResultCard;
