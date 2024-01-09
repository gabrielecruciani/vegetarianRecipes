import React, { useState } from 'react';
import './Recipes.css';

const Recipe = ({ recipes }) => {

  let activeIndex = 0;

  return (
    <div className= "recipe-carousel" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
        {recipes ? (
          recipes.map((recipe, index) => (
              <div key={index} className="recipe-item">
                  <img src={recipe.image} alt={recipe.title} />
                  <h3>{recipe.title}</h3>
              </div>
          ))
        ) : (
          <p>Nessuna ricetta disponibile</p>
        )}
    </div>
  );
};

export default Recipe;