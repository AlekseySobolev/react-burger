import React, { useEffect, useState } from 'react';
import Styles from './feedPage.module.css';
import RouterModal from '../../components/routerModal/RouterModal';
import { Link, NavLink, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import OrderElement from '../../components/orderElement/OrderElement';
import { wsStartConnection, wsCloseConnection } from '../../services/actions/wsActions';
import { ordersUrl } from '../../utils/constants';
import { getOrderNumberColor } from '../../utils/functions';
import { REMOVE_CLICKED_ORDER, SET_CLICKED_ORDER } from '../../services/actions/userOrderDescription';
import Modal from '../../components/modal/Modal';
import UserOrderDetails from '../../components/userOrderDetails/UserOrderDetails';
import UserOrderDetailsPage from '../userOrderDetailsPage/UserOrderDetailsPage';


function FeedPage({ isRouter }) {

    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    // const background = location.state?.background;

    const { userOrderDescription } = useSelector(state => state.userOrderDescription);
    const { orders: wsOrders, wsConnected } = useSelector(state => state.feed);
    const { orders, total, totalToday } = wsOrders;

    const [isOrderDoneDetailsOpened, setIsOrderDoneDetailsOpened] = useState(false);

    useEffect(() => {
        dispatch(wsStartConnection({ wsUrl: `${ordersUrl}/all`, token: null }));

        return () => {
            dispatch(wsCloseConnection());
        }
    }, [dispatch])


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
                <Link className={Styles.link} to={`/feed/${element.number}`} state={{ background: location }}>
                    <OrderElement element={element} isOrderHistoryPage={false} onUserOrderClick={onUserOrderDetailsClick} />
                </Link>
            </React.Fragment>
        )
    };


    const renderOrderNumberList = (status) => {

        const filteredOrders = orders.filter((order) => order.status === status);
        const ordersQty = filteredOrders.length;
        const orderNumberColor = getOrderNumberColor(status);

        return (
            <>
                {isOrderDoneDetailsOpened && userOrderDescription &&
                    <Modal title={`#${userOrderDescription.number}`} onClose={closeAllModals} isRouter={false}>
                        <UserOrderDetails />
                    </Modal>
                }

                {filteredOrders && ordersQty <= 10 &&
                    <ul className={Styles.orderlist}>
                        {filteredOrders.map((filteredOrder, index) => {
                            return (
                                <li key={index} className={Styles.orderListElement + " text text_type_digits-default"} style={{ color: `${orderNumberColor}` }}>
                                    {filteredOrder.number}
                                </li>
                            )
                        })}
                    </ul>
                }

                {filteredOrders && ordersQty >= 10 &&
                    <>
                        <ul className={Styles.orderlist}>
                            {filteredOrders.map((filteredOrder, index) => {

                                return (
                                    <>
                                        {index <= 10 &&
                                            <li key={index} className={Styles.orderListElement + " text text_type_digits-default"} style={{ color: `${orderNumberColor}` }}>
                                                {filteredOrder.number}
                                            </li>
                                        }
                                    </>
                                )

                            })}
                        </ul>

                        <ul className={Styles.orderlist}>
                            {filteredOrders.map((filteredOrder, index) => {
                                return (
                                    <>
                                        {index >= 10 &&
                                            <li key={index} className={Styles.orderListElement + " text text_type_digits-default"} style={{ color: `${orderNumberColor}` }}>
                                                {filteredOrder.number}
                                            </li>
                                        }
                                    </>
                                )
                            })}
                        </ul>
                    </>
                }
            </>
        )
    }



    return (
        <>
            {!orders && !wsConnected && 'Загрузка...'}
            {orders && wsConnected &&
                <RouterModal title={""} isRouter={isRouter} isProfilePage={true}>
                    <form className={Styles.form + " mt-10 ml-5"}>

                        <h1 className={Styles.h1 + " text text_type_main-large mb-5"}>Лента заказов</h1>
                        <div className={Styles.sectionContainer}>
                            <section className={Styles.leftSection}>
                                <ul style={{ gap: "16px" }} className={Styles.list}>
                                    {orders.map(renderOrderElement)}
                                </ul>
                            </section>

                            <section className={Styles.rightSection}>

                                <div className={Styles.totalInfoContainer}>
                                    <div className={Styles.statusInfoContainer}>
                                        <div className={Styles.statusInfoBox}>
                                            <h2 className={" text text_type_main-medium mb-6"}>Готовы:</h2>
                                            <div className={Styles.orderNumberContainer}>
                                                {renderOrderNumberList("done")}
                                            </div>

                                        </div>
                                        <div className={Styles.statusInfoBox}>
                                            <h2 className={Styles.h2 + " text text_type_main-medium mb-6"}>В работе:</h2>
                                            <div className={Styles.orderNumberContainer}>
                                                {renderOrderNumberList("pending")}
                                            </div>

                                        </div>
                                    </div>
                                    <div className={Styles.totalInfoBox}>
                                        <h2 className={Styles.h2 + " text text_type_main-medium"}>Выполнено за все время:</h2>
                                        <p className={Styles.totalCount + " text text_type_digits-large"}>{total}</p>
                                    </div>
                                    <div className={Styles.totalInfoBox}>
                                        <h2 className={Styles.h2 + " text text_type_main-medium"}>Выполнено за сегодня:</h2>
                                        <p className={Styles.totalCount + " text text_type_digits-large"}>{totalToday}</p>
                                    </div>
                                </div>

                            </section>

                        </div>
                    </form>
                </RouterModal>
            }
        </>
    );
}

FeedPage.propTypes = {
    isRouter: PropTypes.bool.isRequired
}

export default FeedPage;