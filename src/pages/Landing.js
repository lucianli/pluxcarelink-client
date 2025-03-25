import React from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import ResourceIcon from '../components/ResourceIcon';
import '../styles/Landing.css';
import insuranceNavIcon from '../assets/insurance_navigation.svg';
import primaryCareIcon from '../assets/primary_care.svg';
import dentalVisionIcon from '../assets/dental_vision.svg';
import foodServicesIcon from '../assets/food_services.svg';
import hygieneResourcesIcon from '../assets/hygiene_resources.svg';
import testingCentersIcon from '../assets/testing_centers.svg';

const Landing = () => {

    return (
        <div>
            <Header hideBorder={true} />
            <main>
                <div className="hero">
                    <h1 className="hero-title">Discover <span className="hero-title-highlight">low-cost health resources</span> near you</h1>
                    <p className="hero-subtitle">Accessing healthcare shouldn't be complicated. Find low-cost health resources across California, tailored to your region.</p>
                </div>
                <SearchBar/>
                <div className="resource-icons">
                    <ResourceIcon icon={insuranceNavIcon} text="Insurance Navigation" />
                    <ResourceIcon icon={primaryCareIcon} text="Primary Care" />
                    <ResourceIcon icon={dentalVisionIcon} text="Dental/Vision Care" />
                    <ResourceIcon icon={foodServicesIcon} text="Food Services" />
                    <ResourceIcon icon={hygieneResourcesIcon} text="Hygiene Resources" />
                    <ResourceIcon icon={testingCentersIcon} text="Testing Centers" />
                </div>
            </main>
        </div>
    );
}

export default Landing;