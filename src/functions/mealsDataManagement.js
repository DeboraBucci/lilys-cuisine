import axios from "axios";
import SweetAlert from "../components/UI/SweetAlert";
const { randomNumGenerator } = require("./randomNumGenerator");

// SET LINK
// -----------------------------------------------------------------------------
const mealSearchLinkModifier = (text, preferences) => {
  const cuisine = `&cuisine=${preferences.selectedCuisine}`;
  const diet = `&diet=${preferences.selectedDiet}`;
  const excludedIngredients = `&excludeIngredients=${preferences.excludedIng}`;
  const sort = `&sort=${preferences.sort}`;
  const direction = `&sortDirection=${preferences.direction}`;
  const apiKey = "d4d951265a704dc49ac9ee0d5a116060";

  const link = `https://api.spoonacular.com/recipes/complexSearch?query=${
    text + cuisine + diet + excludedIngredients + sort + direction
  }&addRecipeInformation=true&addRecipeNutrition=true&number=100&apiKey=${apiKey}`;

  return link;
};

// GET MEALS DATA
// -----------------------------------------------------------------------------
const getMealsData = async (link) => {
  try {
    const response = await axios.get(link);
    const data = await response.data.results;

    return data;
  } catch (err) {
    if (err.message.includes("402")) {
      SweetAlert({
        title: "Error 402",
        text: "The search's limit has been reached for today, try again tomorrow. Sorry!",
      });
      return;
    }

    SweetAlert({
      title: err.name,
      text: err.message,
    });
  }
};

// SET MEALS
// -----------------------------------------------------------------------------
const setMealsArray = async (data = [], preferences) => {
  const mealsArr = [];

  data.forEach((meal) => {
    const rating = randomNumGenerator(3, 5).toFixed(2);
    const raters = Math.floor(randomNumGenerator(2, 3000));
    const calories = `${Math.round(meal.nutrition.nutrients[0].amount)} ${
      meal.nutrition.nutrients[0].unit
    }`;

    // MOMENTARY FILTER FOR THE CUISINES BECAUSE THE API IS NOT FILTERING THEM PROPERLY

    const desiredCuisine = preferences.selectedCuisine
      ? preferences.selectedCuisine[0].toUpperCase() +
        preferences.selectedCuisine.slice(1)
      : "";
    const check =
      desiredCuisine !== "" ? meal.cuisines.indexOf(desiredCuisine) > -1 : true;

    if (!check) return;
    // --------------------------------------------------------------------------

    mealsArr.push({
      id: meal.id,
      title: meal.title,
      image: meal.image,
      calories: calories,
      healthScore: meal.healthScore,
      diets: meal.diets,
      cuisines: meal.cuisines,
      price: meal.pricePerServing,
      time: meal.readyInMinutes,
      servings: meal.servings,
      ingredients: meal.nutrition.ingredients,
      caloricBreakdown: meal.nutrition.caloricBreakdown,
      summary: meal.summary,
      nutrients: meal.nutrition.nutrients,
      isVegan: meal.vegan,
      rating: rating,
      raters: raters,
    });
  });

  return mealsArr;
};

export { mealSearchLinkModifier, getMealsData, setMealsArray };
