import React from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/ResourceBadge.css';
import { categoryColors } from '../utils/constants';

const ResourceBadge = ({ category }) => {
    const location = useLocation();
    const isDetailsPage = location.pathname.includes('/details/');

    const getBadgeColor = (category) => {
        return categoryColors[category] || categoryColors['default'];
    };

    return (
        <span 
            className={`category-badge ${isDetailsPage ? 'large' : ''}`}
            style={{ backgroundColor: getBadgeColor(category) }}
        >
            {category}
        </span>
    );
};

export default ResourceBadge; 