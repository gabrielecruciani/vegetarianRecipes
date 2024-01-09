import React, { useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './Recipes.css';
import Recipe from './RecipesGallery';

const RecipesGallery = ({ recipes }) => {

  const responsive = {
        superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 1024 },
        items: 5
    },
    desktop: {
        breakpoint: { max: 1024, min: 800 },
        items: 4
    },
    tablet: {
        breakpoint: { max: 800, min: 464 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
  };

  return (
    <Carousel
    responsive={responsive}
    ssr
    infinite
    showDots={false}
    centerMode
    swipeable
    draggable
    focusOnSelect
    itemClass="carousel-item-margin-40-px"
    >
      <Recipe />
      <Recipe />
      <Recipe />
      <Recipe />
      <Recipe />
      <Recipe />
      <Recipe />
      <Recipe />
      
    </Carousel>
  );
};

export default RecipesGallery;