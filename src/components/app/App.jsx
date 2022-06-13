import { useEffect, useState } from 'react';
import appStyles from './app.module.css';
import Modal from '../modal/Modal';
import OrderDetails from '../orderDetails/OrderDetails';
import IngredientDetails from '../ingredientDetails/IngredientDetails';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredients } from '../../services/actions/ingredients';
import { getOrderDescription } from '../../services/actions/orderDescription';
import { SET_INGREDIENT_DESCRIPTION } from '../../services/actions/ingredientDescription';
import { REMOVE_INGREDIENT_DESCRIPTION } from '../../services/actions/ingredientDescription';
import { Routes, Route, useLocation } from 'react-router-dom';
import MainPage from '../../pages/mainPage/MainPage';
import RegistrationPage from '../../pages/registrationPage/RegistrationPage';
import LoginPage from '../../pages/loginPage/LoginPage';
import ForgotPasswordPage from '../../pages/forgotPasswordPage/ForgotPasswordPage';
import ResetPasswordPage from '../../pages/resetPasswordPage/ResetPasswordPage';
import ProfilePage from '../../pages/profilePage/ProfilePage';
import StackOrderPage from '../../pages/stackOrderPage/StackOrderPage';
import IngredientDetailsPage from '../../pages/ingredientDetailsPage/IngredientDetailsPage';
import { getCookie } from '../../utils/functions';
import ProtectedRoute from '../protectedRoute/ProtectedRoute';
import { useNavigate } from 'react-router-dom';
import { getRefreshTokenRequest, getUserRequest } from '../../services/actions/auth';
import OrderHistoryPage from '../../pages/orderHistoryPage/OrderHistoryPage';

function App() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const background = location.state?.background;

  const { ingredients, ingredientsRequest, ingredientsFailed } = useSelector(state => state.burgerIngredients);
  const { orderDescriptionFailed } = useSelector(state => state.orderDescription);
  const { ingredientDescription } = useSelector(state => state.ingredientDescription);
  const { isAuth, userRequest } = useSelector(state => state.auth);

  const [isOrderDetailsOpened, setIsOrderDetailsOpened] = useState(false);
  const [isIngredientDetailsOpened, setIsIngredientDetailsOpened] = useState(false);

  const checkAuth = () => {

    if (getCookie('accessToken')) {
      dispatch(getUserRequest());
    }
    else {
      dispatch(getRefreshTokenRequest(localStorage.getItem("refreshToken")));
      if (getCookie('accessToken')) {
        dispatch(getUserRequest());
      }
    }
  }

  useEffect(
    () => {
      dispatch(getIngredients());
      checkAuth();
    },
    []
  );

  const closeAllModals = () => {
    setIsOrderDetailsOpened(false);
    setIsIngredientDetailsOpened(false);
    if (ingredientDescription) {
      dispatch({ type: REMOVE_INGREDIENT_DESCRIPTION });
      navigate(-1);
    }
  }

  const onIngredientDetailsClick = (clickedIngredient) => {

    if (clickedIngredient) {
      dispatch({ type: SET_INGREDIENT_DESCRIPTION, ingredientDescription: clickedIngredient });
      setIsIngredientDetailsOpened(true);
    }
  };


  const onOrderDetailsClick = (idBurgersElement) => {

    if (!isAuth) {
      navigate('/login');
    }
    else {

      dispatch(getOrderDescription(idBurgersElement));
      if (!orderDescriptionFailed) {
        setIsOrderDetailsOpened(true);
      }
    }

  };

  return (
    <>
      {isIngredientDetailsOpened &&
        background && <Routes>
          <Route path="/ingredients/:id" element={
            <Modal title={"Детали ингредиента"} onClose={closeAllModals} isRouter={false}>
              <IngredientDetails />
            </Modal>
          } />
        </Routes>
      }

      {isOrderDetailsOpened &&
        <Modal title={""} onClose={closeAllModals} isRouter={false}>
          <OrderDetails />
        </Modal>
      }

      <div className={appStyles.page}>

        {ingredientsRequest && userRequest && 'Загрузка...'}
        {ingredientsFailed && 'Произошла ошибка'}
        {!ingredientsRequest && !ingredientsFailed && ingredients.length !== 0 && !userRequest &&
          <>
            <Routes location={background || location}>

              <Route path="/login" element={<LoginPage isRouter={true} />} />
              <Route path="/register" element={<RegistrationPage isRouter={true} />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage isRouter={true} />} />
              <Route path="/reset-password" element={<ResetPasswordPage isRouter={true} />} />
              <Route path="/" element={<MainPage onIngredientClick={onIngredientDetailsClick} onOrderButtonClick={onOrderDetailsClick} />} />
              <Route path="/ingredients/:id" element={<IngredientDetailsPage isRouter={true} />} />
              <Route path="/stackOrder" element={<StackOrderPage isRouter={true} />} />

              <Route path="/profile" element={
                <ProtectedRoute>
                  <ProfilePage isRouter={true} />
                </ProtectedRoute>
              } />
              <Route path="/profile/orders" element={
                <ProtectedRoute>
                  <OrderHistoryPage isRouter={true} />
                </ProtectedRoute>
              } />

            </Routes>


          </>
        }
      </div>

    </>
  );
}

export default App;

