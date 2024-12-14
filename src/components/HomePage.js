import React from 'react';
import { useNavigate } from 'react-router-dom';
import philosophies from '../data/philosophies';
import ImageLoader from './ImageLoader';
import '../styles/HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();

  const handleCardClick = (philosophy) => {
    navigate('/write', { state: { philosophy } });
  };

  return (
    <div className="home-page">
      <div className="pile-header">
        <div className="pile-content">
          <span className="logo">R&R</span>
          <span className="divider">•</span>
          <a 
            href="https://twitter.com/moghalsaifa" 
            target="_blank" 
            rel="noopener noreferrer"
            className="twitter-link"
          >
            built by @moghalsaifa
          </a>
        </div>
      </div>

      <div className="glowing-ball"></div>

      <div className="content">
        <div className="title-container">
          <div className="title-circle"></div>
          <h1 className="title">The Older the Problem, The Older the Solution</h1>
        </div>
        
        <p className="subheading">
          Humans have been living for centuries. Your problems are not unique to you. 
          Write down your problems and seek wisdom from the gods.
        </p>

        <h2 className="section-heading">Choose Your School of Philosophy</h2>

        <div className="cards-container">
          {philosophies.map((philosophy) => (
            <div
              key={philosophy.id}
              className="philosophy-card"
              onClick={() => handleCardClick(philosophy)}
            >
              <div className="card-content">
                <ImageLoader 
                  src={philosophy.image} 
                  alt={philosophy.name}
                  className="card-image"
                />
                <h3 className="card-title">{philosophy.name}</h3>
                <p className="card-description">{philosophy.description}</p>
                <div className="card-books">
                  <h4>Sacred Texts & Books:</h4>
                  <ul>
                    {philosophy.books.map((book, index) => (
                      <li key={index}>{book}</li>
                    ))}
                  </ul>
                </div>
                <p className="card-quote">"{philosophy.quote}"</p>
                <p className="card-author">- {philosophy.author}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer className="footer">
        <a 
          href="https://twitter.com/moghalsaifa" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          built by @moghalsaifa
        </a>
      </footer>
    </div>
  );
};

export default HomePage;
