import { useEffect } from 'react';
import Styles from './orderHistoryPage.module.css';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getLogoutRequest } from '../../services/actions/auth';
import { ordersUrl } from '../../utils/constants';
import OrderElement from '../../components/orderElement/OrderElement';
import { wsCloseConnection, wsStartConnection } from '../../services/actions/wsActions';
import { getCookie } from '../../utils/functions';
import { SET_CLICKED_ORDER } from '../../services/actions/userOrderDescription';
import UserOrderDetails from '../../components/userOrderDetails/UserOrderDetails';
import Modal from '../../components/modal/Modal';
import { v4 as uuidv4 } from 'uuid';

function OrderHistoryPage() {

    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const background = location.state?.background;

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
        navigate('/profile/orders');
    }

    const onUserOrderDetailsClick = (userOrderDescription) => {

        if (userOrderDescription) {
            dispatch({ type: SET_CLICKED_ORDER, userOrderDescription: userOrderDescription });
        }

    };

    return (
        <>

            {background &&
                <Modal title={`#${userOrderDescription.number}`} onClose={closeAllModals}>
                    <UserOrderDetails />
                </Modal>
            }

            {!orders && !wsConnected && 'Загрузка...'}
            {orders && wsConnected &&
                <>
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
                                {orders.map((element) => {
                                    return (
                                        <Link key={uuidv4()} className={Styles.link} to={`/profile/orders/${element.number}`} state={{ background: location, currentOrder: element }}>
                                            <OrderElement element={element} isOrderHistoryPage={true} onUserOrderClick={onUserOrderDetailsClick} />
                                        </Link>
                                    )
                                })}
                            </ul>
                        </section>
                    </form>
                </>
            }
        </>
    );
}

export default OrderHistoryPage;