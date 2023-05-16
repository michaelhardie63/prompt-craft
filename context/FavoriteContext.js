import React, { createContext, useState, useEffect } from 'react';

// Create the context
export const FavoriteContext = createContext();

// Create the context provider
export const FavoriteProvider = ({ children }) => {
  const [favoritePrompts, setFavoritePrompts] = useState([]);

  useEffect(() => {
    // Load favorite prompts from localStorage on initial render
    const storedFavoritePrompts = localStorage.getItem('favoritePrompts');
    if (storedFavoritePrompts) {
      setFavoritePrompts(JSON.parse(storedFavoritePrompts));
    }
  }, []);

  useEffect(() => {
    // Update localStorage whenever favorite prompts change
    localStorage.setItem('favoritePrompts', JSON.stringify(favoritePrompts));
  }, [favoritePrompts]);

  const addFavoritePrompt = (prompt) => {
    setFavoritePrompts((prevPrompts) => [...prevPrompts, prompt]);
  };

  const removeFavoritePrompt = (promptId) => {
    setFavoritePrompts((prevPrompts) =>
      prevPrompts.filter((prompt) => prompt._id !== promptId)
    );
  };

  const isPromptFavorite = (promptId) => {
    return favoritePrompts.some((prompt) => prompt._id === promptId);
  };

  const contextValue = {
    favoritePrompts,
    addFavoritePrompt,
    removeFavoritePrompt,
    isPromptFavorite,
  };

  return (
    <FavoriteContext.Provider value={contextValue}>
      {children}
    </FavoriteContext.Provider>
  );
};