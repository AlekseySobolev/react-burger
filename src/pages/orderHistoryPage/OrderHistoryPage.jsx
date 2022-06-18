import React, { useEffect, useState } from 'react';
import Styles from './orderHistoryPage.module.css';
import RouterModal from '../../components/routerModal/RouterModal';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getLogoutRequest } from '../../services/actions/auth';
import PropTypes from 'prop-types';
import { ordersUrl } from '../../utils/constants';
import OrderElement from '../../components/orderElement/OrderElement';
import { wsCloseConnection, wsStartConnection } from '../../services/actions/wsActions';
import { getCookie } from '../../utils/functions';
import { REMOVE_CLICKED_ORDER, SET_CLICKED_ORDER } from '../../services/actions/userOrderDescription';
import UserOrderDetails from '../../components/userOrderDetails/UserOrderDetails';
import Modal from '../../components/modal/Modal';
import AppHeader from '../../components/appHeader/AppHeader';

function OrderHistoryPage({ isRouter }) {

    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const [isOrderDoneDetailsOpened, setIsOrderDoneDetailsOpened] = useState(false);
    const { userOrderDescription } = useSelector(state => state.userOrderDescription);
    const { orders: wsOrders, wsConnected } = useSelector(state => state.feed);
    const { orders } = wsOrders;

    useEffect(() => {
        dispatch(wsStartConnection({ wsUrl: `${ordersUrl}`, token: getCookie("accessToken") }));

        return () => {
            dispatch(wsCloseConnection());
        }
    }, [dispatch])


    const unactiveLink = Styles.activeLink + " text text_type_main-medium text_color_inactive";
    const activeLink = Styles.unactiveLink + " text text_type_main-medium";

    const onLogoutClick = () => {
        dispatch(getLogoutRequest(localStorage.getItem('refreshToken')));
    }


    const closeAllModals = () => {

        setIsOrderDoneDetailsOpened(false);

        if (userOrderDescription) {
            dispatch({ type: REMOVE_CLICKED_ORDER });
            navigate(-1);
        }
    }

    const onUserOrderDetailsClick = (userOrderDescription) => {

        if (userOrderDescription) {
            dispatch({ type: SET_CLICKED_ORDER, userOrderDescription: userOrderDescription });
            setIsOrderDoneDetailsOpened(true);
        }

    };

    const renderOrderElement = (element, index) => {
        return (
            <React.Fragment key={index}>
                <Link className={Styles.link} to={`/profile/orders/${element.number}`} state={{ background: location }}>
                    <OrderElement element={element} isOrderHistoryPage={true} onUserOrderClick={onUserOrderDetailsClick} />
                </Link>
            </React.Fragment>
        )
    };


    return (
        <>

            {isOrderDoneDetailsOpened && userOrderDescription &&
                <Modal title={`#${userOrderDescription.number}`} onClose={closeAllModals} isRouter={false}>
                    <UserOrderDetails />
                </Modal>
            }

            {!orders && !wsConnected && 'Загрузка...'}
            {orders && wsConnected &&
                <>
                    <AppHeader/>
                    <form className={Styles.form + " mt-10"}>
                        <section className={Styles.leftSection + " mt-20 ml-5 mr-15"}>
                            <nav className={Styles.nav}>
                                <NavLink className={Styles.navLink + " mt-4 mb-4"} to="/profile">

                                    <p className={unactiveLink}>Профиль</p>

                                </NavLink>
                                <NavLink className={Styles.navLink + " mt-4 mb-4"} to="/profile/orders">
                                    {({ isActive }) => (
                                        <p className={isActive ? activeLink : unactiveLink}>История заказов</p>
                                    )}
                                </NavLink>
                                <NavLink className={Styles.navLink + " mt-4 mb-4"} to="/login">
                                    {({ isActive }) => (
                                        <p className={isActive ? activeLink : unactiveLink} onClick={onLogoutClick}> Выход</p>
                                    )}
                                </NavLink>
                            </nav>

                            <div className={Styles.paragraphBox + " mt-20"}>
                                <p className={"text text_type_main-default text_color_inactive"}>В этом разделе вы можете </p>
                                <p className={"text text_type_main-default text_color_inactive"}>изменить свои персональные данные </p>
                            </div>
                        </section>

                        <section className={Styles.rightSection}>
                            <ul style={{ gap: "24px" }} className={Styles.list}>
                                {orders.map(renderOrderElement)}
                            </ul>
                        </section>
                    </form>
                </>
            }
        </>
    );
}

OrderHistoryPage.propTypes = {
    isRouter: PropTypes.bool.isRequired
}

export default OrderHistoryPage;