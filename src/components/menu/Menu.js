import React, { useContext } from "react";

import CartContext from "../store/cart-context";

import classes from "./Menu.module.css";

import MenuDish from "./MenuDish";

const Menu = ({ setInfoHandler, meals }) => {
  const cartCtx = useContext(CartContext);

  const removeItemHandler = (dish) => {
    const { id, isVegan } = dish;
    cartCtx.removeItem(id, isVegan);
  };

  return (
    <section className={classes.menu}>
      <div className={classes.title}>
        <h2>MENU</h2>
      </div>
      <div className={classes.box}>
        <ul>
          {meals.map((dish) => {
            return (
              <MenuDish
                dish={dish}
                setInfoHandler={setInfoHandler}
                removeItemHandler={removeItemHandler}
              />
            );
          })}
        </ul>
        <div
          className={`${classes.actions} ${
            cartCtx.totalDishes.length === 0 && classes.disabled
          }`}
        >
          <button disabled={cartCtx.totalDishes.length === 0}>
            Order Menu
          </button>
        </div>
      </div>
    </section>
  );
};

export default Menu;
