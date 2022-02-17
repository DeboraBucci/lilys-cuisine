import React, { useState } from "react";
import classes from "./AllDisplayedMeals.module.css";

import MealItem from "./MealItem";
import MealsPagination from "./MealsPagination";

const AllDisplayedMeals = ({ mealsList, setInfoHandler }) => {
  let current = 0;

  const [active, setActive] = useState(1);

  const content = mealsList.map((mealChunk) => {
    current++;
    return (
      <div key={Math.random()}>
        {current === active && [
          <div className={classes["chunk-meals"]}>
            {mealChunk.map((meal) => (
              <MealItem
                setInfoHandler={setInfoHandler}
                key={Math.random()}
                meal={meal}
              />
            ))}
          </div>,
          <MealsPagination
            setActive={setActive}
            mealsList={mealsList}
            active={active}
          />,
        ]}
      </div>
    );
  });

  return <React.Fragment>{content}</React.Fragment>;
};

export default AllDisplayedMeals;