import React, { useEffect } from 'react';
import './RecipesGallery.css';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai"; 
import { Link } from 'react-router-dom';

const RecipesGallery = ({ recipes, favourites, setFavourites }) => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1920 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 1919, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1023, min: 700 },
      items: 3
    },
    mobile: {
      breakpoint: { max: 699, min: 0 },
      items: 1
    }
  };

  const handleToggleFavourites = (recipe) => {
    const storedFavourites = JSON.parse(localStorage.getItem('favourites')) || [];
    const isFavourite = storedFavourites.some((fav) => fav.id === recipe.id);
    let updatedFavourites;

    if (isFavourite) {
      updatedFavourites = storedFavourites.filter((fav) => fav.id !== recipe.id);
    } else {
      updatedFavourites = [...storedFavourites, recipe];
    }

    setFavourites(updatedFavourites);

    localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
  };
  
  useEffect(() => {
    const handleStorageChange = () => {
      const updatedFavourites = JSON.parse(localStorage.getItem('favourites')) || [];
      setFavourites(updatedFavourites);
    };
    window.addEventListener('storage', handleStorageChange);

    const initialFavourites = JSON.parse(localStorage.getItem('favourites')) || [];
    setFavourites(initialFavourites);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <Carousel
      responsive={responsive}
      ssr
      infinite
      showDots={false}
      swipeable
      draggable
      centerMode
      containerClass="carousel-container"
    >
      {recipes ? (
        recipes.map((recipe) => (
          <div key={recipe.id} className="recipe-item">
            {recipe.image && recipe.title ? (
              <>
                <img src={recipe.image} alt={recipe.title} />
                <h3>{recipe.title.toUpperCase()}</h3>
              </>
            ) : (
              <p>Image or title not available</p>
            )}
            <div>
              <button className= 'prefer' onClick={() => handleToggleFavourites(recipe)}>
                {favourites && favourites.some((fav) => fav.id === recipe.id) ? (
                  <FaIcons.FaStar />
                ) : (
                  <FaIcons.FaRegStar />
                )}
              </button>
              <div className= 'add-container'>
                {favourites && favourites.some((fav) => fav.id === recipe.id) ? 'Already Added' : 'Add to Favourites'}
              </div>
            </div>
            <div>
              <Link to={`/recipeinfo/${recipe.id}`} state={{ recipeInfo: recipe }}>
                <button className="info">
                  <AiIcons.AiOutlinePlusCircle className="default-icon" />
                  <AiIcons.AiFillPlusCircle className="hovered-icon" />
                </button>
                <div className= 'info-container'>
                  More Info
                </div>
              </Link>
              
            </div>
          </div>
        ))
      ) : (
        <div>Recipe not found!⛔</div>
      )}
    </Carousel>
  );
};

export default RecipesGallery;