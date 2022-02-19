import React, { useEffect } from "react";
import classes from "./Search.module.css";
import Axios from "axios";
import SearchForm from "./SearchForm";

const Search = ({
  onSearchMeals,
  meals,
  setIsWait,
  setIsMealsShown,
  setMeals,
}) => {
  useEffect(() => {
    onSearchMeals(meals);
  }, [meals, onSearchMeals]);

  const onSubmit = (text, preferences) => {
    setIsWait(true);
    setIsMealsShown(true);

    const cuisine = `&cuisine=${preferences.selectedCuisine}`;
    const diet = `&diet=${preferences.selectedDiet}`;
    const excludedIngredients = `&excludeIngredients=${preferences.excludedIng}`;

    const apiKey = "d4d951265a704dc49ac9ee0d5a116060";

    const link = `https://api.spoonacular.com/recipes/complexSearch?query=${text}${cuisine}${diet}${excludedIngredients}&addRecipeInformation=true&addRecipeNutrition=true&number=100&apiKey=${apiKey}`;

    Axios.get(link).then(function (response) {
      const mealsArr = [];
      const mealsData = response.data.results;

      mealsData.forEach((meal) => {
        mealsArr.push({
          id: meal.id,
          title: meal.title,
          image: meal.image,
          calories: `${Math.round(meal.nutrition.nutrients[0].amount)} ${
            meal.nutrition.nutrients[0].unit
          }`,
          healthScore: meal.healthScore,
          diets: meal.diets,
          price: meal.pricePerServing,
          time: meal.readyInMinutes,
          servings: meal.servings,
          ingredients: meal.nutrition.ingredients,
          caloricBreakdown: meal.nutrition.caloricBreakdown,
          summary: meal.summary,
          nutrients: meal.nutrition.nutrients,
        });
      });

      setMeals(mealsArr);
    });
  };

  return (
    <section className={classes.search}>
      <h1>Lily's Cuisine</h1>
      <p>Your meal in one click</p>

      <SearchForm onSubmit={onSubmit} />
    </section>
  );
};

export default Search;