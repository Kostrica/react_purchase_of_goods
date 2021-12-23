import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';

import styles from "./Cards.module.scss";

import { Card } from "../Card/Card";
import { Popup } from "../Popup/Popup";
import { setCards } from "../../store/actions/cardsActions";
import { setGoodMinPrice } from "../../store/actions/goodMinPriceActions";

export const Cards = () => {
  const dispatch = useDispatch();

  const { cards } = useSelector(({ cards }) => cards);
  const { goodMinPrice } = useSelector(({ goodMinPrice }) => goodMinPrice);

  const [ isOpen, setIsOpen ] = useState(false);

  useEffect(() => {
    dispatch(setCards());
  }, [dispatch]);

  const handleClick = () => {
    const copyCards = [...cards];

    dispatch(setGoodMinPrice(copyCards));
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          {cards.map(({ id, name, category, price }) => (
            <Card
              key={id}
              name={name}
              category={category}
              price={price}
            />
          ))}
        </div>
        <button
          type="button"
          className={styles.button}
          onClick={handleClick}
        >
          Buy cheapest
        </button>
      </div>
      <Popup
        category={goodMinPrice.category}
        name={goodMinPrice.name}
        price={goodMinPrice.price}
        isOpen={isOpen}
        handleClose={handleClose}
      />
    </>
  );
}
