import React, { useEffect, useState } from 'react';
import appStyles from './app.module.css';
import AppHeader from '../appHeader/AppHeader.jsx';
import BurgerIngredients from '../burgerIngredients/BurgerIngredients.jsx';
import BurgerConstructor from '../burgerConstructor/BurgerConstructor.jsx';
import Modal from '../modal/Modal';
import OrderDetails from '../orderDetails/OrderDetails';
import IngredientDetails from '../ingredientDetails/IngredientDetails';

function App() {

  const baseUrl = "https://norma.nomoreparties.space/api/ingredients";

  const [state, setState] = useState({
    isLoading: false,
    hasError: false,
    ingredients: []
  });

  const [isOrderDetailsOpened, setIsOrderDetailsOpened] = useState(false);
  const [isIngredientDetailsOpened, setisIngredientDetailsOpened] = useState(false);

  const closeAllModals = () => {
    setIsOrderDetailsOpened(false);
    setisIngredientDetailsOpened(false);
  };

  const handleEscKeydown = (event) => {
    event.key === "Escape" && closeAllModals();
  };

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

  const onIngredientDetailsClick = (clickedObj) => {
    setclickedObj(clickedObj);
    setisIngredientDetailsOpened(true);
  };

  const onOrderDetailsClick = (clickedObj) => {
    setclickedObj(clickedObj);
    setIsOrderDetailsOpened(true);
  };

  return (
    <>
      {isIngredientDetailsOpened &&
        <Modal onOverlayClick={closeAllModals} onEscKeydown={handleEscKeydown}>
          <IngredientDetails clickedIngredient={clickedObj} onClick={closeAllModals} />
        </Modal>
      }

      {isOrderDetailsOpened &&
        <Modal onOverlayClick={closeAllModals} onEscKeydown={handleEscKeydown}>
          <OrderDetails onClick={closeAllModals} />
        </Modal>
      }

      <div className={appStyles.app}>
        {isLoading && 'Загрузка...'}
        {hasError && 'Произошла ошибка'}
        {!isLoading &&
          !hasError &&
          (ingredients.length === undefined) &&
          <>
            <AppHeader />
            <main className={appStyles.main}>
              <BurgerIngredients burgerIngredients={ingredients} onClick={onIngredientDetailsClick} />
              <BurgerConstructor burgerElements={ingredients} onClick={onOrderDetailsClick} />
            </main>
          </>
        }
      </div>
      
    </>
  );
}

export default App;

