import PropTypes from 'prop-types';
import React, { SyntheticEvent, useEffect, useState, useRef } from 'react';
import logo from './logo.svg';
import './App.css';
import AppHeader from './components/appHeader/AppHeader.jsx';
import BurgerIngredients from './components/burgerIngredients/BurgerIngredients.jsx';
import BurgerConstructor from './components/burgerConstructor/BurgerConstructor.jsx';
import ModalOverlay from './components/modalOverlay/ModalOverlay';

function App() {

  const baseUrl = "https://norma.nomoreparties.space/api/ingredients";

  const [state, setState] = useState({
    isLoading: false,
    hasError: false,
    ingredients: []
  });

  const [overlayOpened, setOverlay] = useState(false);
  const [clickedObj, setclickedObj] = useState(undefined);
  useEffect(() => {
    setState({ ...state, hasError: false, isLoading: true });
    fetch(baseUrl)
      .then(res => res.json())
      .then(ingredients => setState({ ...state, ingredients, isLoading: false }))
      .catch(e => {
        setState({ ...state, hasError: true, isLoading: false });
      });
  }, []);

  const { ingredients, isLoading, hasError } = state;

  const onClick = (clickedObj) => {
    setOverlay(!overlayOpened);
    setclickedObj(clickedObj);
  };
  

  const onModalClick = (e) => {
    //e.stopPropagation();
    console.log(e);
   }

  return (
    <>
      <ModalOverlay isOpened={overlayOpened} onOverlayClick = {onClick} onModalClick ={onModalClick} clickedObj = {clickedObj}/>
      <div className="App">
        {isLoading && 'Загрузка...'}
        {hasError && 'Произошла ошибка'}
        {!isLoading &&
          !hasError &&
          (ingredients.length === undefined) &&
          <>
            <AppHeader />
            <main className="Main">
              <BurgerIngredients burgerIngredients={ingredients} onClick={onClick} />
              <BurgerConstructor onClick={onClick} />
            </main>
          </>
        }

      </div>
    </>
  );
}

export default App;

