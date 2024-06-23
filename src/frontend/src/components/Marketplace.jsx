import React, { useState, useEffect } from 'react';
import './marketplace.css';

const initialProducts = [
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
    {
      name: "Green Building Materials",
      description: "Eco-friendly materials for sustainable construction.",
      rating: 4.6,
      provider: "EcoBuild Inc.",
      contactDetails: "contact@ecobuild.com | Phone: (123) 555-0100",
      impact: "Reduces carbon footprint by 30%."
  },
  {
      name: "Water Conservation Systems",
      description: "Advanced systems for reducing water consumption.",
      rating: 4.9,
      provider: "WaterSaver Tech",
      contactDetails: "contact@watersaver.com | Phone: (123) 555-0300",
      impact: "Saves up to 50% of water usage."
  },
  {
      name: "Electric Vehicle Charging Stations",
      description: "High-efficiency EV charging solutions.",
      rating: 4.7,
      provider: "ChargeUp Solutions",
      contactDetails: "contact@chargeup.com | Phone: (123) 555-0400",
      impact: "Supports the transition to electric vehicles, reducing emissions by 60%."
  },
  {
      name: "Sustainable Apparel",
      description: "Clothing made from eco-friendly and recycled materials.",
      rating: 4.5,
      provider: "EcoWear Fashion",
      contactDetails: "contact@ecowear.com | Phone: (123) 555-0500",
      impact: "Reduces waste and promotes sustainable fashion."
  },
  {
      name: "Organic Waste Management",
      description: "Solutions for composting and reducing organic waste.",
      rating: 4.8,
      provider: "GreenWaste Management",
      contactDetails: "contact@greenwaste.com | Phone: (123) 555-0600",
      impact: "Reduces landfill waste by 40%."
  },
  {
      name: "Renewable Energy Consulting",
      description: "Expert consulting services for implementing renewable energy solutions.",
      rating: 4.9,
      provider: "Renewable Energy Experts",
      contactDetails: "contact@renewableexperts.com | Phone: (123) 555-0700",
      impact: "Provides strategic planning for reducing carbon emissions."
  },
  {
      name: "Air Quality Monitoring Systems",
      description: "Advanced systems for monitoring and improving air quality.",
      rating: 4.6,
      provider: "AirCheck Solutions",
      contactDetails: "contact@aircheck.com | Phone: (123) 555-0700",
      impact: "Helps reduce air pollution and improve health."
  }
];


const Marketplace = () => {
  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
      const filteredProducts = initialProducts.filter(product =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setProducts(filteredProducts);
  }, [searchTerm]);

  const handleContactClick = product => {
      setSelectedProduct(product);
  };

  const handleClosePopup = () => {
      setSelectedProduct(null);
  };

  return (
    <div className="marketplace-container">
        <h1>Marketplace for Sustainable Solutions</h1>
        <input
            type="text"
            placeholder="Search for products or services..."
            className="search-input"
            onChange={(e) => setSearchTerm(e.target.value)}
        />
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
