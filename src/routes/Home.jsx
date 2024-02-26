import React, { useEffect, useState } from 'react';
import RecipesGallery from '../components/Carousel/RecipesGallery';
import './Home.css';
import lensImage from '../components/images/lens.png';

const HomeForNow = () => {
  const [recipes, setRecipes] = useState([]);
  const [mainCourses, setMainCourses] = useState([]);
  const [sideDishes, setSideDishes] = useState([]);
  const [dessert, setDessert] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');

  const updateSearch = e => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch('')
  };

  const getResponse = async (apiKey, dishTypes) => {

    const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?&query=${query}&addRecipeInformation=true&diet=vegetarian&type=${dishTypes}&apiKey=${apiKey}&number=100&offset=0`
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  }

  const fetchRecipes = async (dishType) => {
    //apiKey = 3bb58e29d57d400199eda4cbd9b683b4 daca3440ea2a4e63a9a1ed61b43285db c8b635ec225f42b48b3b00695ee781c5
    let data = await getResponse('3bb58e29d57d400199eda4cbd9b683b4', dishType);
    if (data.status === 'failure' && data.code === 402) {
      data = await getResponse('daca3440ea2a4e63a9a1ed61b43285db')
      if (data.status === 'failure' && data.code === 402) {
        data = await getResponse('c8b635ec225f42b48b3b00695ee781c5')
        if (data.status === 'failure' && data.code === 402) {
          setError('Limit of request API reached. Try Tomorrow.');
          
          return
        }
      }
    setError(null);
  }
  return data.results;
}

  useEffect(() => {
    const fetchData = async () => {
      const allRecipesData = await fetchRecipes();

      if (!allRecipesData) {
        return;
      }

      const mainCoursesData = allRecipesData.filter(recipe => recipe.dishTypes.includes('main course'));
      const sideDishesData = allRecipesData.filter(recipe => recipe.dishTypes.includes('side dish'));
      const dessertData = await fetchRecipes('dessert');

      const filteredSideDishesData = sideDishesData.filter(sideDish => {
        return !mainCoursesData.find(mainCourse => mainCourse.id === sideDish.id);
      });

      const storedFavourites = JSON.parse(localStorage.getItem('favourites')) || [];
      setFavourites(storedFavourites);

      setMainCourses(mainCoursesData.slice(0, 10));
      setSideDishes(filteredSideDishesData.slice(0, 10));
      setDessert(dessertData.slice(0, 10));
    };
    fetchData();
  }, [query]);

  return (
    <>
      <form onSubmit={handleSubmit} className="search-form">
        <input className="search-bar" type="text" placeholder='Search' value={search} onChange={updateSearch}/>
        <button className="search-button" type="submit">
          <img src={lensImage} alt='lens' className='lens'/>
        </button>
      </form>
    
      <div className='gallery'>
      {error ? (
        <div className='empty'>
          <span>Limit of request API reached.</span>
          <span>Try Tomorrow.</span>
        </div>
        ) : (
          <>
            <>
              <h2 className='subtitle'> MAIN COURSES </h2>
              {mainCourses.length > 0 ? (
                <RecipesGallery
                  recipes={mainCourses}
                  favourites={favourites}
                  setFavourites={setFavourites}
                />
              ) : (
                <p className='no-match'> No match with <i>{query}</i>! </p>
              )}
            </>            
            <>
              <h2 className='subtitle'> SIDE DISHES </h2>
              {sideDishes.length > 0 ? (
                <RecipesGallery
                  recipes={sideDishes}
                  favourites={favourites}
                  setFavourites={setFavourites}
                />
              ) : (
                <p className='no-match'> No match with <i>{query}</i>! </p>
              )}
            </>            
            <>
              <h2 className='subtitle'> DESSERT </h2>
              {dessert.length > 0 ? (
                <RecipesGallery
                  recipes={dessert}
                  favourites={favourites}
                  setFavourites={setFavourites}
                />
              ) : (
                <p className='no-match'> No match with <i>{query}</i>!</p>
              )}
            </> 
          </>
        )}
      </div>
    </>
  );
};

export default HomeForNow;