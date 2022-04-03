import React, { useEffect, useState} from 'react';
import appStyles from './app.module.css';
import AppHeader from '../appHeader/AppHeader.jsx';
import BurgerIngredients from '../burgerIngredients/BurgerIngredients.jsx';
import BurgerConstructor from '../burgerConstructor/BurgerConstructor.jsx';
import ModalOverlay from '../modalOverlay/ModalOverlay';

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
      <div className={appStyles.app}>
        {isLoading && 'Загрузка...'}
        {hasError && 'Произошла ошибка'}
        {!isLoading &&
          !hasError &&
          (ingredients.length === undefined) &&
          <>
            <AppHeader />
            <main className={appStyles.main}>
              <BurgerIngredients burgerIngredients={ingredients} onClick={onClick} />
              <BurgerConstructor burgerElements={ingredients} onClick={onClick} />
            </main>
          </>
        }

      </div>
    </>
  );
}

export default App;

