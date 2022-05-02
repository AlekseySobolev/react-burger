import { useEffect, useState, useRef } from 'react';
import appStyles from './app.module.css';
import AppHeader from '../appHeader/AppHeader.jsx';
import BurgerIngredients from '../burgerIngredients/BurgerIngredients.jsx';
import BurgerConstructor from '../burgerConstructor/BurgerConstructor.jsx';
import Modal from '../modal/Modal';
import OrderDetails from '../orderDetails/OrderDetails';
import IngredientDetails from '../ingredientDetails/IngredientDetails';
import { baseUrl } from '../../utils/constants';
import { BurgerContext } from '../../services/burgerContext';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredients } from '../../services/actions/ingredients';
import { store } from '../../services/store';
function App() {

  const ingredientsUrl = baseUrl + "/ingredients";
  const orderNumberUrl = baseUrl + "/orders";

   const dispatch = useDispatch();

   type RootState = ReturnType<typeof store.getState>;
   const { ingredients, ingredientsRequest, ingredientsFailed, errorDesc} = useSelector((state:RootState) => state.burgerIngredients);

   const checkResponse = (response) => {
    if (!response.ok) {
      throw new Error("Error occurred!")
    }
    return response.json()

  }

   useEffect(
    () => {
      dispatch(getIngredients());
    },
    [dispatch]
  );

  const bunRef = useRef(null);
  const sauceRef = useRef(null);
  const mainRef = useRef(null);

  //  const [state, setState] = useState({
  //    isLoading: false,
  //    hasError: false,
  //    ingredients: { data: [], success: false }
  //  });

  const [isOrderDetailsOpened, setIsOrderDetailsOpened] = useState(false);
  const [isIngredientDetailsOpened, setIsIngredientDetailsOpened] = useState(false);

  const closeAllModals = () => {
    setIsOrderDetailsOpened(false);
    setIsIngredientDetailsOpened(false);
  };

  const [clickedIngredient, setClickedIngredient] = useState(undefined);
  const [orderNumber, setOrderNumber] = useState(0);
  const [orderNumberstate, setOrderNumberState] = useState({
    hasError: false,
    orderNumberInfo: { name: "", order: { number: 0 }, success: false }
  });

    useEffect(
      () => {
        dispatch(getIngredients());
      },
      [dispatch]
    );

  //  useEffect(() => {
  //    setState({ ...state, hasError: false, isLoading: true });
  //    fetch(ingredientsUrl)
  //      .then(checkResponse)
  //      .then(ingredients => setState({ ...state, ingredients, isLoading: false }))
  //      .catch(e => {
  //        setState({ ...state, hasError: true, isLoading: false });
  //      });
  //  }, []);

  //const { ingredients, isLoading, hasError } = state; 

  const onIngredientDetailsClick = (clickedIngredient) => {
    setClickedIngredient(clickedIngredient);
    setIsIngredientDetailsOpened(true);
  };


  const onOrderDetailsClick = (idBurgersElement) => {

    // setOrderNumberState({ ...orderNumberstate, hasError: false });
    // fetch(orderNumberUrl, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     ingredients: idBurgersElement
    //   })
    // })
    //   .then(checkResponse)
    //   .then(orderNumberInfo => setOrderNumberState({ ...orderNumberstate, orderNumberInfo }))
    //   .catch(e => {
    //     setOrderNumberState({ ...orderNumberstate, hasError: true });
    //   });


    // const { orderNumberInfo, hasError } = orderNumberstate;

    // if (!hasError) {
    //   setOrderNumber(orderNumberInfo.order.number);
    //   setIsOrderDetailsOpened(true);
    // }
  };

  return (
    <>
      {isIngredientDetailsOpened &&
        <Modal title={"Детали ингредиента"} onClose={closeAllModals}>
          <IngredientDetails clickedIngredient={clickedIngredient} />
        </Modal>
      }

      {isOrderDetailsOpened &&
        <Modal title={""} onClose={closeAllModals}>
          <OrderDetails orderNumber={orderNumber} />
        </Modal>
      }

      <div className={appStyles.page}>
         {/* {isLoading && 'Загрузка...'}
        {hasError && 'Произошла ошибка'}
        {!isLoading &&
          !hasError &&
          (ingredients.data.length !== 0) && */}
         {ingredientsRequest && 'Загрузка...'}
         {ingredientsFailed && 'Произошла ошибка'}
         {!ingredientsRequest && !ingredientsFailed && ingredients.length !== 0 &&
          <>
              <AppHeader />
              <main className={appStyles.main}>
              <BurgerContext.Provider value={{ burgerElements: ingredients, onOrderButtonClick: onOrderDetailsClick, bunRef: bunRef, sauceRef: sauceRef, mainRef: mainRef}}>
                {/* <BurgerIngredients burgerIngredients={ingredients.data} onIngredientClick={onIngredientDetailsClick} />  */}
                <BurgerIngredients />
                <BurgerConstructor />
              </BurgerContext.Provider>
              </main>
          </>
          }     
      </div>

    </>
  );
}

export default App;

