import React, { useState } from "react";
import classNames from "classnames/bind";

import { Popup } from "../Popup/Popup";

import styles from "./Card.module.scss";

const cn = classNames.bind(styles);

export const Card = ({ name, category, price }) => {
  const [ isActiveButton, setIsActiveButton ] = useState(false);
  const [ isOpen, setIsOpen ] = useState(false);

  const handleClick = () => {
    setIsActiveButton(true);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsActiveButton(false);
    setIsOpen(false);
  };

  return (
    <>
      <div className={styles.card}>
        <div className={styles.description}>
          <span className={styles.category}>
            {category}
          </span>
          <span className={styles.name}>
            {name}
          </span>
        </div>
        <div className={styles.infoBox}>
          <span className={styles.priceBox}>
            <span className={styles.currency}>
              &#36;
            </span>
            <span className={styles.price}>
              {price.toFixed(2)}
            </span>
          </span>
          <button
            type="button"
            className={cn({
              notActiveButton: !isActiveButton,
              activeButton: isActiveButton
            })}
            onClick={handleClick}
          >
            buy
          </button>
        </div>
      </div>
      <Popup
        category={category}
        name={name}
        price={price}
        isOpen={isOpen}
        handleClose={handleClose}
      />
    </>
  )
};
