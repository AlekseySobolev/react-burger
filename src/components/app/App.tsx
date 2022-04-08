import { useEffect, useState } from 'react';
import appStyles from './app.module.css';
import AppHeader from '../appHeader/AppHeader.jsx';
import BurgerIngredients from '../burgerIngredients/BurgerIngredients.jsx';
import BurgerConstructor from '../burgerConstructor/BurgerConstructor.jsx';
import Modal from '../modal/Modal';
import OrderDetails from '../orderDetails/OrderDetails';
import IngredientDetails from '../ingredientDetails/IngredientDetails';
import { baseUrl } from '../../utils/constants';
function App() {

  const ingredientsUrl = baseUrl + "/ingredients";

  const [state, setState] = useState({
    isLoading: false,
    hasError: false,
    ingredients: []
  });

  const [isOrderDetailsOpened, setIsOrderDetailsOpened] = useState(false);
  const [isIngredientDetailsOpened, setIsIngredientDetailsOpened] = useState(false);

  const closeAllModals = () => {
    setIsOrderDetailsOpened(false);
    setIsIngredientDetailsOpened(false);
  };

  const [clickedIngredient, setClickedIngredient] = useState(undefined);

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

  const onOrderDetailsClick = (clickedIngredient) => {
    setClickedIngredient(clickedIngredient);
    setIsOrderDetailsOpened(true);
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
          <OrderDetails />
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
              <BurgerIngredients burgerIngredients={ingredients} onIngredientClick={onIngredientDetailsClick} />
              <BurgerConstructor burgerElements={ingredients} onOrderButtonClick={onOrderDetailsClick} />
            </main>
          </>
        }
      </div>

    </>
  );
}

export default App;

