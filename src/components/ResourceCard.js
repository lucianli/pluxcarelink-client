const ResourceCard = ({ resource, isActive, id }) => {
    return (
        <div 
            id={id}
            className={`resource-card ${isActive ? 'active' : ''}`}
        >
            {/* existing card content */}
        </div>
    );
};

export default ResourceCard; 