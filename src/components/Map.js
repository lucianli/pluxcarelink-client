import React, { useState } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import '../styles/Map.css';
import { categoryColors } from '../utils/constants';

const Map = ({ resources, setActiveResource }) => {
    const [selectedResource, setSelectedResource] = useState(null);
    const [hoveredResource, setHoveredResource] = useState(null);
    
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    });

    const handleMarkerClick = (resource, e) => {
        e.stop();
        setSelectedResource(resource);
        if (setActiveResource) {
            setActiveResource(resource); // Only call setActiveResource if it exists
        }
    };

    const handleMapClick = () => {
        setSelectedResource(null);
        if (setActiveResource) {
            setActiveResource(null); // Only call setActiveResource if it exists
        }
    };

    const getMarkerIcon = (category, isHovered, isSelected) => {
        const color = categoryColors[category] || categoryColors.default;
        return {
            path: 'M -5, 0 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0',  // SVG circle path
            fillColor: color,
            fillOpacity: 1,
            strokeWeight: isSelected ? 2 : (isHovered ? 1.5 : 1),
            strokeColor: isSelected ? '#000000' : '#333333',
            scale: isSelected ? 2.5 : (isHovered ? 2.2 : 2)
        };
    };

    // Calculate center based on first result or default to a location
    const center = resources.length > 0 && resources[0].location ? {
        lat: resources[0].location.coordinates[1],
        lng: resources[0].location.coordinates[0]
    } : {
        lat: 37.7749, // Default to San Francisco
        lng: -122.4194
    };

    if (!isLoaded) return <div>Loading map...</div>;

    return (
        <GoogleMap
            mapContainerClassName="map"
            zoom={11}
            center={center}
            onClick={handleMapClick}
        >
            {resources.map((resource) => (
                resource.location && (
                    <React.Fragment key={resource._id}>
                        <Marker
                            position={{
                                lat: resource.location.coordinates[1],
                                lng: resource.location.coordinates[0]
                            }}
                            icon={getMarkerIcon(resource.category, hoveredResource === resource._id, selectedResource === resource._id)}
                            onClick={(e) => handleMarkerClick(resource, e)}
                            onMouseOver={() => setHoveredResource(resource._id)}
                            onMouseOut={() => setHoveredResource(null)}
                        />
                    </React.Fragment>
                )
            ))}
        </GoogleMap>
    );
};

export default Map; 