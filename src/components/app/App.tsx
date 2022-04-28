import { useEffect, useState } from 'react';
import appStyles from './app.module.css';
import AppHeader from '../appHeader/AppHeader.jsx';
import BurgerIngredients from '../burgerIngredients/BurgerIngredients.jsx';
import BurgerConstructor from '../burgerConstructor/BurgerConstructor.jsx';
import Modal from '../modal/Modal';
import OrderDetails from '../orderDetails/OrderDetails';
import IngredientDetails from '../ingredientDetails/IngredientDetails';
import { baseUrl } from '../../utils/constants';
import { BurgerConstracorContext } from '../../services/burgerConstractorContext';
import { OrderBoxContext } from '../../services/OrderBoxContext';

function App() {

  const ingredientsUrl = baseUrl + "/ingredients";

  const [state, setState] = useState({
    isLoading: false,
    hasError: false,
    ingredients: { data: [], success: false }
  });

  const [isOrderDetailsOpened, setIsOrderDetailsOpened] = useState(false);
  const [isIngredientDetailsOpened, setIsIngredientDetailsOpened] = useState(false);

  const closeAllModals = () => {
    setIsOrderDetailsOpened(false);
    setIsIngredientDetailsOpened(false);
  };

  const [clickedIngredient, setClickedIngredient] = useState(undefined);
  const [orderNumber, setOrderNumber] = useState(0);

  useEffect(() => {
    setState({ ...state, hasError: false, isLoading: true });
    fetch(ingredientsUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error occurred!")
        }
        return response.json()
      })
      .then(ingredients => setState({ ...state, ingredients, isLoading: false }))
      .catch(e => {
        setState({ ...state, hasError: true, isLoading: false });
      });
  }, []);

  const { ingredients, isLoading, hasError } = state;



  const onIngredientDetailsClick = (clickedIngredient) => {
    setClickedIngredient(clickedIngredient);
    setIsIngredientDetailsOpened(true);
  };

  const onOrderDetailsClick = (orderData) => {
    if (!orderData.hasError) {
      setOrderNumber(orderData.orderNumberInfo.order.number);
      setIsOrderDetailsOpened(true);
    }
  };

  return (
    <>
      {isIngredientDetailsOpened &&
        <Modal title={"Детали ингредиента"} onOverlayClick={closeAllModals}>
          <IngredientDetails clickedIngredient={clickedIngredient} />
        </Modal>
      }

      {isOrderDetailsOpened &&
        <Modal title={""} onOverlayClick={closeAllModals}>
          <OrderBoxContext.Provider value={orderNumber}>
            <OrderDetails />
          </OrderBoxContext.Provider>
        </Modal>
      }

      <div className={appStyles.app}>
        {isLoading && 'Загрузка...'}
        {hasError && 'Произошла ошибка'}
        {!isLoading &&
          !hasError &&
          (ingredients.data.length !== 0) &&
          <>
            <AppHeader />
            <main className={appStyles.main}>
              <BurgerIngredients burgerIngredients={ingredients.data} onIngredientClick={onIngredientDetailsClick} />
              <BurgerConstracorContext.Provider value={{ burgerElements: ingredients.data, onOrderButtonClick: onOrderDetailsClick }}>
                <BurgerConstructor />
              </BurgerConstracorContext.Provider>
            </main>
          </>
        }
      </div>

    </>
  );
}

export default App;

