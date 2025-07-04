import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { generateReflection } from '../services/groqService';
import '../styles/WritingPage.css';

const WritingPage = () => {
  const [userText, setUserText] = useState('');
  const [reflection, setReflection] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const { philosophy } = location.state || {};

  const handleTextChange = (e) => {
    setUserText(e.target.value);
  };

  const handleReflect = async () => {
    if (!userText.trim()) return;
    setIsLoading(true);
    // Always show the same demo response and indicate it's a demo
    setTimeout(() => {
      setReflection(
        `--- DEMO RESPONSE ---\n\nA Letter from Stoicism\n\nDear Seeker,\n\nThank you for sharing your thoughts. In the tradition of Stoicism, remember that challenges are a part of life and an opportunity for growth.\n\nYour Path Forward:\n1. Focus on what you can control, and let go of what you cannot.\n2. Practice gratitude for the present moment.\n3. Reflect on this quote: \"The happiness of your life depends upon the quality of your thoughts.\"\n\nImmediate Action:\nTake a deep breath and write down three things you are grateful for today.\n\nWith wisdom,\nStoicism Tradition\n\n(Note: This is a demo response. API functionality is currently disabled.)`
      );
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="writing-page">
      <div className="writing-container">
        <textarea
          className="writing-input"
          value={userText}
          onChange={handleTextChange}
          placeholder=""
          autoFocus
        />
        
        {userText.trim() && (
          <button 
            className="reflect-button"
            onClick={handleReflect}
            disabled={isLoading}
          >
            {isLoading ? 'Reflecting...' : 'Time to Reflect'}
          </button>
        )}

        {reflection && (
          <div className="reflection-container">
            <div className="reflection-text">
              {reflection}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WritingPage;
