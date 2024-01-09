import React, { useState, useEffect } from 'react';
import RecipeGallery from '../components/RecipesGallery';
import shuffle from 'lodash/shuffle';


const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [shuffledRecipes, setShuffledRecipes] = useState([]);

  useEffect(() => {
    const getRecipesBySection = async (section) => {

      try {
        const apiKey = 'daca3440ea2a4e63a9a1ed61b43285db';
        const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}`;

        let params = {};

        switch (section) {
          case 'mainCourse':
            params.diet = 'vegetarian';
            params.type = 'mainCourse';
            break;
          case 'sideDish':
            params.diet = 'vegetarian';
            params.type = 'sideDish';
            break;
          case 'appetizer':
            params.diet = 'vegetarian';
            params.type = 'appetizer';
            break;
          
          default:
            break;
        }
        // Effettua la richiesta API
        const response = await fetch(`${apiUrl}&${new URLSearchParams(params)}`);
        const data = await response.json();
        setRecipes(data.results);
      } catch (error) {
        console.error('Errore nel recupero delle ricette:', error);
      }
    };

    getRecipesBySection();
  }, []);


  //   // Effettua la chiamata API per ottenere le ricette
  //   const fetchRecipes = async () => {
  //     try {
  //       const apiKey = //3bb58e29d57d400199eda4cbd9b683b4;
  //       const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?diet=vegetarian&type=mainCourse?apiKey=${apiKey}`);
  //       const data = await response.json();
  //       setRecipes(data.results);
  //     } catch (error) {
  //       console.error('Errore nel recupero delle ricette:', error);
  //     }
  //   };

  //   fetchRecipes();
  // }, []);
  
  useEffect(() => {
    const currentDate = new Date();
    const lastShuffleDate = localStorage.getItem('lastShuffleDate');
    const displayedRecipes = JSON.parse(localStorage.getItem('displayedRecipes')) || [];

    // Verifica se è passato un giorno dall'ultimo shuffle o se è la prima volta
    const shouldShuffle =
      !lastShuffleDate || currentDate.toDateString() !== new Date(lastShuffleDate).toDateString();

    if (shouldShuffle && currentDate.getHours() === 0) {

      // Escludi le ricette già mostrate nei giorni precedenti
      const newRecipesToDisplay = recipes.filter(recipe => !displayedRecipes.includes(recipe.id));

      // Mescola casualmente le ricette filtrate
      const newShuffledRecipes = shuffle(newRecipesToDisplay);

      // Salva la data e le ricette mostrate dell'ultimo shuffle nel localStorage
      localStorage.setItem('lastShuffleDate', currentDate.toISOString());
      localStorage.setItem('displayedRecipes', JSON.stringify(newShuffledRecipes.map(recipe => recipe.id)));

      // Aggiorna lo stato con le nuove ricette mescolate
      setShuffledRecipes(newShuffledRecipes);
    }
  }, [recipes]);

  return (
    <>
      {shuffledRecipes.length > 0 && <RecipeGallery recipes={shuffledRecipes} />}
      
    </>
  );
}

export default Home;
