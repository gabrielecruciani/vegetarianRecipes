import React from 'react';
import FavouritesRecipes from '../components/FavouritesRecipes/FavouritesRecipes';


const Favourites = ({ handleToggleFavourites }) => {
  const favourites = JSON.parse(localStorage.getItem('favourites')) || [];

  return (
    <>
      <h2 className='subtitle'> FAVOURITES </h2>
      <FavouritesRecipes favourites={favourites} handleToggleFavourites={handleToggleFavourites} />
    </>
  );
}

export default Favourites;