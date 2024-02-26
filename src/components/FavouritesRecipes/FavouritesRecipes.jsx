import React, { useEffect, useState } from 'react';
import './FavouritesRecipes.css';
import { Link } from 'react-router-dom';
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";


const FavouritesRecipes = ({ favourites }) => {
  const [favouritesData, setFavouritesData] = useState([]);

  const handleToggleFavourites = (recipe) => {
    const storedFavourites = JSON.parse(localStorage.getItem('favourites')) || [];
    const isFavourite = storedFavourites.some((fav) => fav.id === recipe.id);
    let updatedFavourites;

    if (isFavourite) {
      updatedFavourites = storedFavourites.filter((fav) => fav.id !== recipe.id);
    } else {
      updatedFavourites = [...storedFavourites, recipe];
    }

    setFavouritesData(updatedFavourites);

    localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
  };
  useEffect(() => {
    const handleStorageChange = () => {
      const updatedFavourites = JSON.parse(localStorage.getItem('favourites')) || [];
      setFavouritesData(updatedFavourites);
    };
    window.addEventListener('storage', handleStorageChange);

    const initialFavourites = JSON.parse(localStorage.getItem('favourites')) || [];
    setFavouritesData(initialFavourites);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
  
  return (
    <div className='favourite-container'>
      {favouritesData && favouritesData.length > 0 ? (
        favouritesData.map((recipe) => (
          <div key={recipe.id} className='recipe-container'>
            <img src={recipe.image} alt={recipe.title} />
            <h3>{recipe.title.toUpperCase()}</h3>
            <div>
              <button className= 'prefer-container' onClick={() => handleToggleFavourites(recipe)}>
                {favourites && favourites.some((fav) => fav.id === recipe.id) ? (
                  <FaIcons.FaStar />
                ) : (
                  <FaIcons.FaRegStar />
                )}
              </button>
              <div className= 'add-to-container'>
                Remove Recipe
              </div>
            </div>
            <div>
              <Link to={`/recipeinfo/${recipe.id}`} state={{ recipeInfo: recipe }}>
                <button className="icon-container">
                  <AiIcons.AiOutlinePlusCircle className="default-icon" />
                  <AiIcons.AiFillPlusCircle className="hovered-icon" />
                </button>
                <div className= 'pop-up'>
                  More Info
                </div>
              </Link>
            </div>
          </div>          
        ))
        
        
      ) : (
        <div className='empty-container'>
          <span>No favorite recipe!</span>
          <Link to="/" className='to-home'>Back to Home</Link>
        </div>
      )}
    </div>
  );
}

export default FavouritesRecipes;