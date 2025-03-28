import {React, useState, useEffect} from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import { useSearchParams } from 'react-router-dom';
import ResultCard from '../components/ResultCard';
import Map from '../components/Map';
import '../styles/Results.css';

const Results = () => {
    const [searchParams] = useSearchParams();
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeResource, setActiveResource] = useState(null);

    useEffect(() => {
        if (activeResource) {
            const element = document.getElementById(`resource-${activeResource._id}`);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }, [activeResource]);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                setLoading(true);
                const cityOrZip = searchParams.get('cityOrZip');
                const address = searchParams.get('address');
                const category = searchParams.get('category');

                let response;

                // Simplified check - if first character is a digit, treat as zip code
                const isZipCode = (str) => /^\d/.test(str);

                console.log('API URL:', `${process.env.REACT_APP_API_BASE_URL}/api/resources/zipCode/${cityOrZip}`);

                if (address) {
                    console.log('address', address);
                    response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/resources/address`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            address: address,
                            radius: 10
                        })
                    });
                } else if (cityOrZip) {
                    console.log('cityOrZip', cityOrZip);
                    if (isZipCode(cityOrZip)) {
                        response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/resources/zipCode/${cityOrZip}`);
                        console.log(response);
                    } else {
                        console.log('city', cityOrZip);
                        response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/resources/address`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                address: cityOrZip,
                                radius: 10
                            })
                        });
                    }
                } else {
                    const queryParams = new URLSearchParams();
                    if (category && category !== 'All') {
                        queryParams.append('category', category);
                    }
                    response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/resources?${queryParams}`);
                }

                if (!response.ok) {
                    throw new Error('Search failed');
                }

                const data = await response.json();
                
                // Filter results by category if needed
                const filteredData = category === 'All' 
                    ? data 
                    : data.filter(resource => resource.category === category);
                
                console.log('filteredData', filteredData);
                setResults(filteredData);
                setActiveResource(null); // Reset active resource when results change

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, [searchParams]);

    return (
        <div>
            <Header />
            <SearchBar className="results-search-bar"/>
            
            <div className="results-layout">
                <div>
                    {!loading && !error && results.length > 0 && (
                        <Map 
                            resources={results}
                            setActiveResource={setActiveResource}
                        />
                    )}
                </div>

                <div className="results-container">
                    {loading && (
                        <div className="results-message">Loading results...</div>
                    )}
                    
                    {error && (
                        <div className="results-message">
                            Error: {error}
                        </div>
                    )}
                    
                    {!loading && !error && results.length === 0 && (
                        <div className="results-message">
                            No resources found for your search criteria
                        </div>
                    )}

                    <div className="results-list">
                        {results.map((resource) => (
                            <ResultCard 
                                key={resource._id} 
                                resource={resource}
                                id={`resource-${resource._id}`}
                                isActive={activeResource && resource._id === activeResource._id}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Results;