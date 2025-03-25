import React from 'react';
import Header from '../components/Header';
import { useLocation, useNavigate } from 'react-router-dom';
import BackIcon from '../assets/back.svg';
import '../styles/Details.css';
import ResourceBadge from '../components/ResourceBadge';
import Map from '../components/Map';

const Details = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const resource = location.state?.resource;   

    if (!resource) return <div>Resource not found</div>;
    
    const mapCenter = {
        lat: resource.location.coordinates[1],
        lng: resource.location.coordinates[0]
    };
    
    return (
        <div>
            <Header />
            <div className="details-container">
                <div className="details-header">
                    <img src={BackIcon} alt="Back" onClick={() => navigate(-1)} className="back-icon"/>
                    <h1 className="details-title">{resource.name}</h1>
                    <ResourceBadge category={resource.category} />
                </div>
                <div className="details-layout">
                    <Map resources={[resource]} />
                    <div className="details-info-section">
                        <div>
                            <h3 className="details-info-section-title">Address</h3>
                            <p className="details-info-section-text">{resource.address}</p>
                        </div>
                        <div>
                            <h3 className="details-info-section-title">Phone Number</h3>
                            <p className="details-info-section-text">{resource.phone}</p>
                        </div>
                        {resource.website && 
                            <div>
                                <h3 className="details-info-section-title">Website</h3>
                                <a href={resource.website}>{resource.website}</a>
                            </div>
                        }
                        <div>
                            <h3 className="details-info-section-title">Summary</h3>
                            <p className="details-info-section-text">{resource.summary}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Details;