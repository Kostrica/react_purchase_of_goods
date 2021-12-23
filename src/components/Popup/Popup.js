import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Modal from "react-modal";
import classNames from "classnames/bind";

import { ReactComponent as CrossIcon } from "../../assets/img/cancel-close-svgrepo-com.svg";
import { ReactComponent as CrossRedIcon } from "../../assets/img/cancel-svgrepo-com.svg";

import styles from "./Popup.module.scss";

import { setUserName, setUserPhone } from "../../store/actions/userDataActions";

const cn = classNames.bind(styles);

Modal.setAppElement('#root');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '350px',
    padding: '0',
    borderRadius: '20px',
    zIndex: '500',
  },
  overlay: {
    background: "#00000099",
  }
};

export const Popup = ({ category, name, price, isOpen, handleClose }) => {
  const dispatch = useDispatch();

  const { userName, userPhone } = useSelector(({ userData }) => userData);

  const [ userNameFieldIsBlank, setUserNameFieldIsBlank ] = useState(false);
  const [ userNameLettersOnly, setUserNameLettersOnly ] = useState(true);
  const [ userPhoneFieldIsBlank, setUserPhoneFieldIsBlank ] = useState(false);
  const [ userPhoneNumbersOnly, setUserPhoneNumbersOnly ] = useState(true);
  const [ userPhoneLengthIsСorrect, setUserPhoneLengthIsСorrect ] = useState(true);

  const handleValidationUserName = useCallback(() => {
    if (!userName) {
      setUserNameFieldIsBlank(true);
    }

    const patternOnlyLetter = /^[a-zA-Z]+$/;
    const onlyLetter = patternOnlyLetter.test(userName);

    if (userName && !onlyLetter) {
      setUserNameLettersOnly(false);
    }
  }, [userName]);

  const handleValidationUserPhone = useCallback(() => {
    if (!userPhone) {
      setUserPhoneFieldIsBlank(true);
    }

    const patternOnlyNumber = /^\d+$/;
    const onlyNumber = patternOnlyNumber.test(userPhone);

    if (userPhone && !onlyNumber) {
      setUserPhoneNumbersOnly(false);
    }

    if (userPhone && onlyNumber && userPhone.length !== 12) {
      setUserPhoneLengthIsСorrect(false);
    }
  }, [userPhone]);

  const handleChange = (event) => {
    event.preventDefault();

    const { value, name: inputName } = event.target;

    switch (inputName) {
      case 'userName':
        dispatch(setUserName(value));
        break;
      case 'userPhone':
        dispatch(setUserPhone(value));
        break;
      default:
        return;
    };
  };

  const handleFocus = (event) => {
    event.preventDefault();

    const { name: inputName } = event.target;

    switch (inputName) {
      case 'userName':
        setUserNameFieldIsBlank(false);
        setUserNameLettersOnly(true);
        break;
      case 'userPhone':
        setUserPhoneFieldIsBlank(false);
        setUserPhoneNumbersOnly(true);
        setUserPhoneLengthIsСorrect(true);
        break;
      default:
        return;
    };
  };

  const hadleSubmit = (event) => {
    event.preventDefault();

    handleValidationUserName();
    handleValidationUserPhone();

    setTimeout(() => {
      if (userName
        && userPhone
        && !userNameFieldIsBlank
        && userNameLettersOnly
        && !userPhoneFieldIsBlank
        && userPhoneNumbersOnly
        && userPhoneLengthIsСorrect) {
        handleClose();
        dispatch(setUserName(''));
        dispatch(setUserPhone(''));

        console.log({
          'Category': category,
          'Product name': name,
          'Price': price,
          'User name': userName,
          'User phone': userPhone,
        });
      }
    });
  };

  useEffect(() => {
    dispatch(setUserName(''));
    dispatch(setUserPhone(''));

    setUserNameFieldIsBlank(false);
    setUserNameLettersOnly(true);
    setUserPhoneFieldIsBlank(false);
    setUserPhoneNumbersOnly(true);
    setUserPhoneLengthIsСorrect(true);
  }, [handleClose, dispatch]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      style={customStyles}
    >
      <div className={styles.popup}>
        <CrossIcon className={styles.crossIcon} onClick={handleClose} />
        <div className={styles.description}>
          <span className={styles.category}>
            {category}
          </span>
          <span className={styles.name}>
            {name}
          </span>
          <span className={styles.priceBox}>
            <span className={styles.currency}>
              &#36;
            </span>
            <span className={styles.price}>
              {price.toFixed(2)}
            </span>
          </span>
        </div>
        <form className={styles.form} onSubmit={hadleSubmit}>
          <div className={styles.inputBox}>
            <input
              className={cn({
                input: true,
                error: userNameFieldIsBlank || !userNameLettersOnly,
              })}
              type="text"
              name="userName"
              value={userName}
              placeholder="Name"
              onChange={handleChange}
              onBlur={handleValidationUserName}
              onFocus={handleFocus}
            />
            {userNameFieldIsBlank && (
              <>
                <CrossRedIcon className={styles.crossRedIcon} />
                <p className={styles.errorMessage}>
                  This field in required
                </p>
              </>
            )}
            {!userNameLettersOnly && (
              <>
                <CrossRedIcon className={styles.crossRedIcon} />
                <p className={styles.errorMessage}>
                  Only letters allowed
                </p>
              </>
            )}
          </div>
          <div className={styles.inputBox}>
            <input
              className={cn({
                input: true,
                error: userPhoneFieldIsBlank || !userPhoneNumbersOnly || !userPhoneLengthIsСorrect,
              })}
              type="text"
              name="userPhone"
              value={userPhone}
              placeholder="Phone number"
              onChange={handleChange}
              onBlur={handleValidationUserPhone}
              onFocus={handleFocus}
            />
            {userPhoneFieldIsBlank && (
              <>
                <CrossRedIcon className={styles.crossRedIcon} />
                <p className={styles.errorMessage}>
                  This field in required
                </p>
              </>
            )}
            {!userPhoneNumbersOnly && (
              <>
                <CrossRedIcon className={styles.crossRedIcon} />
                <p className={styles.errorMessage}>
                  Only numbers allowed
                </p>
              </>
            )}
            {!userPhoneLengthIsСorrect && (
              <>
                <CrossRedIcon className={styles.crossRedIcon} />
                <p className={styles.errorMessage}>
                  Should contain 12 characters
                </p>
              </>
            )}
          </div>
          <button
            className={styles.button}
            type="submit"
            name="action"
          >
            order <span className={styles.arrow}>&#10140;</span>
          </button>
        </form>
      </div>
    </Modal>
  );
};
