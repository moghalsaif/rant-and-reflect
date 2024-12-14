import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { generateReflection } from '../services/groqService';
import '../styles/WritingPage.css';

const WritingPage = () => {
  const [userText, setUserText] = useState('');
  const [reflection, setReflection] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { philosophy } = location.state || {};

  const handleTextChange = (e) => {
    setUserText(e.target.value);
  };

  const handleReflect = async () => {
    if (!userText.trim()) return;
    
    setIsLoading(true);
    try {
      const advice = await generateReflection(userText, philosophy);
      setReflection(advice);
    } catch (error) {
      console.error('Error generating reflection:', error);
      setReflection('Unable to generate reflection at this time. Please try again.');
    }
    setIsLoading(false);
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
