import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './RecipeInfo.css';
import { Link } from 'react-router-dom';

const RecipeInfo = () => {
  const { pathname } = useLocation();
  const recipeId = pathname.split('/').pop();
  const [detailedRecipe, setDetailedRecipe] = useState(null);  
  
  const getResponse = async (apiKey) => {
    const apiUrl = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  }

  const fetchDetailedRecipe = async () => {
    const apiKeyList = ['3bb58e29d57d400199eda4cbd9b683b4', 'daca3440ea2a4e63a9a1ed61b43285db', 'c8b635ec225f42b48b3b00695ee781c5'];

    for (const apiKey of apiKeyList) {
      try {
        const data = await getResponse(apiKey);
        
        if (data.status !== "failure" && data.code !== 402) {
          return data;
        }
      } catch (error) {
        console.error('Errore durante il fetch della ricetta dettagliata:', error);
      }
    }

    return null;
  };

  useEffect(() => {
    const fetchDetailedRecipeData = async () => {
      const data = await fetchDetailedRecipe();
      setDetailedRecipe(data);
    };

    fetchDetailedRecipeData();
  }, []);

  return (
    <>
      {detailedRecipe && recipeId.length === 6 ?(
        detailedRecipe ? (
          <div className='details-container'>
            <div className='more-container'>
              <img src={detailedRecipe.image} alt={detailedRecipe.title}></img>
              <div className='description'>
                <h3 className=''>{detailedRecipe.title.toUpperCase()}</h3>
                <div className='description-container'>
                  <div>
                    <p className='subtitle-details'><b>Servings:</b> {detailedRecipe.servings}</p>
                    <p className='subtitle-details'><b>Ready in:</b> {detailedRecipe.readyInMinutes + 'm'}</p>
                    <p className='subtitle-details'><b>Dish Type:</b> {detailedRecipe.dishTypes && detailedRecipe.dishTypes.length > 0 ? detailedRecipe.dishTypes[0] : "N/A"}</p>
                  </div>
                  <ul className="food-type">
                        {detailedRecipe.vegan && (
                          <div>
                            <li>Vegan</li>              
                          </div>
                        )}
                        {detailedRecipe.vegetarian && (
                          <div>
                            <li>Vegetarian</li>
                          </div>
                        )}
                        {detailedRecipe.glutenFree && (
                          <div>
                            <li>Gluten Free</li>
                          </div>
                        )}
                        {detailedRecipe.dairyFree && (
                          <div>
                            <li>Dairy Free</li>
                          </div>
                        )}
                        {detailedRecipe.veryHealthy && (
                          <div>
                            <li>Very Healthy</li>
                          </div>
                        )}
                  </ul>
                </div>
              </div>
            </div>
            <div className='summary-container'>
              <p className=''>{new DOMParser().parseFromString(detailedRecipe.summary, "text/html").body.textContent}</p>
            </div>
            <div>
              <div className='ingredient-container'>
                <h2>INGREDIENTS</h2>
                <div className='list-container'>
                  <ul>
                    {detailedRecipe.extendedIngredients.map((ingredient, index) => (
                      <li>  
                        {ingredient.nameClean}&nbsp;
                        {ingredient.measures.metric.amount}
                        {ingredient.measures.metric.unitShort}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className='preparation-container'>            
              <h2>PREPARATION</h2>
              {detailedRecipe.analyzedInstructions.map( (instruction, index) => (
                <div className='preparation' key={index}>
                  {instruction.steps.map( (step, stepIndex) => (
                    <div className='steps' key={stepIndex}>
                      <h3 className='step-num'>Step {stepIndex + 1}</h3>
                      <p className='directions'>{step.step}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className='after-search'>Loading...</div>
        )) : (
          <div className='empty-container'>
            <span>Error, Recipe not Found!</span>
            <Link to="/" className='to-home'>Back to Home</Link>
          </div>
      )}
    </>
  )
}

export default RecipeInfo;