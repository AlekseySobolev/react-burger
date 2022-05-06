import { useEffect, useState } from 'react';
import appStyles from './app.module.css';
import AppHeader from '../appHeader/AppHeader.jsx';
import BurgerIngredients from '../burgerIngredients/BurgerIngredients.jsx';
import BurgerConstructor from '../burgerConstructor/BurgerConstructor.jsx';
import Modal from '../modal/Modal';
import OrderDetails from '../orderDetails/OrderDetails';
import IngredientDetails from '../ingredientDetails/IngredientDetails';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredients } from '../../services/actions/ingredients';
import { getOrderDescription } from '../../services/actions/orderDescription';
import { store } from '../../services/store';
import { SET_INGREDIENT_DESCRIPTION } from '../../services/actions/ingredientDescription';
import { REMOVE_INGREDIENT_DESCRIPTION } from '../../services/actions/ingredientDescription';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
function App() {

  const dispatch = useDispatch();

  type RootState = ReturnType<typeof store.getState>;
  const { ingredients, ingredientsRequest, ingredientsFailed } = useSelector((state: RootState) => state.burgerIngredients);
  const { orderDescriptionFailed } = useSelector((state: RootState) => state.orderDescription);
  const { ingredientDescription } = useSelector((state: RootState) => state.ingredientDescription);
  useEffect(

    () => {
      dispatch(getIngredients());
    },
    [dispatch]
  );

  const [isOrderDetailsOpened, setIsOrderDetailsOpened] = useState(false);
  const [isIngredientDetailsOpened, setIsIngredientDetailsOpened] = useState(false);

  const closeAllModals = () => {

    setIsOrderDetailsOpened(false);
    setIsIngredientDetailsOpened(false);
    if (ingredientDescription) {
      dispatch({ type: REMOVE_INGREDIENT_DESCRIPTION });
    }
  };

  const onIngredientDetailsClick = (clickedIngredient) => {

    if (clickedIngredient) {
      dispatch({ type: SET_INGREDIENT_DESCRIPTION, ingredientDescription: clickedIngredient });
      setIsIngredientDetailsOpened(true);
    }
  };


  const onOrderDetailsClick = (idBurgersElement) => {

    dispatch(getOrderDescription(idBurgersElement));
    if (!orderDescriptionFailed) {
      setIsOrderDetailsOpened(true);
    }
  };

  return (
    <>
      {isIngredientDetailsOpened &&
        <Modal title={"Детали ингредиента"} onClose={closeAllModals}>
          <IngredientDetails />
        </Modal>
      }

      {isOrderDetailsOpened &&
        <Modal title={""} onClose={closeAllModals}>
          <OrderDetails />
        </Modal>
      }

      <div className={appStyles.page}>

        {ingredientsRequest && 'Загрузка...'}
        {ingredientsFailed && 'Произошла ошибка'}
        {!ingredientsRequest && !ingredientsFailed && ingredients.length !== 0 &&
          <>
            <AppHeader />
            <main className={appStyles.main}>
              <DndProvider backend={HTML5Backend}>
                <BurgerIngredients onIngredientClick={onIngredientDetailsClick} />
                <BurgerConstructor onOrderButtonClick={onOrderDetailsClick} />
              </DndProvider>
            </main>
          </>
        }
      </div>

    </>
  );
}

export default App;

