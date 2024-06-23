import React, { useState } from 'react';
import './marketplace.css';

const products = [
    {
        id: 1,
        name: 'Eco-Friendly Packaging',
        description: 'Sustainable packaging solutions to reduce plastic waste.',
        rating: 4.5,
        provider: 'Green Packaging Co.',
        impact: 'Reduces carbon footprint by 15%',
        contactDetails: 'Email: contact@greenpackaging.com | Phone: (123) 456-7890',
    },
    {
        id: 2,
        name: 'Solar Panel Installation',
        description: 'Renewable energy solutions for businesses and homes.',
        rating: 4.8,
        provider: 'SunPower Solutions',
        impact: 'Reduces carbon footprint by 40%',
        contactDetails: 'Email: info@sunpowersolutions.com | Phone: (987) 654-3210',
    },
    {
        id: 3,
        name: 'Energy Efficient Lighting',
        description: 'LED lighting solutions to save energy and reduce costs.',
        rating: 4.7,
        provider: 'Bright Future Lighting',
        impact: 'Reduces carbon footprint by 20%',
        contactDetails: 'Email: support@brightfuture.com | Phone: (555) 123-4567',
    },
    // Add more products as needed
];

const Marketplace = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleContactClick = (product) => {
        setSelectedProduct(product);
    };

    const handleClosePopup = () => {
        setSelectedProduct(null);
    };

    return (
        <div className="marketplace-container">
            <h1>Marketplace for Sustainable Solutions</h1>
            <input type="text" placeholder="Search for products or services..." className="search-input" />
            <div className="products-grid">
                {products.map(product => (
                    <div key={product.id} className="product-card">
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                        <p className="rating">Rating: {product.rating} ★</p>
                        <p>Provider: {product.provider}</p>
                        <div className="info-button" title={product.impact}>i</div>
                        <button onClick={() => handleContactClick(product)} className="contact-button">Contact Provider</button>
                    </div>
                ))}
            </div>
            {selectedProduct && (
                <div className="popup">
                    <div className="popup-content">
                        <h2>{selectedProduct.name}</h2>
                        <p>{selectedProduct.contactDetails}</p>
                        <button onClick={handleClosePopup} className="close-button">Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Marketplace;
