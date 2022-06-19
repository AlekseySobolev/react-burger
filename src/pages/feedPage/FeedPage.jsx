import { useEffect } from 'react';
import Styles from './feedPage.module.css';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import OrderElement from '../../components/orderElement/OrderElement';
import { wsStartConnection, wsCloseConnection } from '../../services/actions/wsActions';
import { ordersUrl } from '../../utils/constants';
import { getOrderNumberColor } from '../../utils/functions';
import { SET_CLICKED_ORDER } from '../../services/actions/userOrderDescription';
import Modal from '../../components/modal/Modal';
import UserOrderDetails from '../../components/userOrderDetails/UserOrderDetails';
import { v4 as uuidv4 } from 'uuid';

function FeedPage() {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const background = location.state?.background;

    const userOrderDescription = location.state?.currentOrder;
    const { orders: wsOrders, wsConnected } = useSelector(state => state.feed);
    const { orders, total, totalToday } = wsOrders;

    useEffect(() => {
        dispatch(wsStartConnection({ wsUrl: `${ordersUrl}/all`, token: null }));

        return () => {
            dispatch(wsCloseConnection());
        }
    }, [dispatch])


    const closeAllModals = () => {


        navigate(-1);

    }

    const onUserOrderDetailsClick = (userOrderDescription) => {

        if (userOrderDescription) {
            dispatch({ type: SET_CLICKED_ORDER, userOrderDescription: userOrderDescription });

        }

    };

    // const renderOrderElement = (element) => {
    //     return (

    //         <Link key={uuidv4()} className={Styles.link} to={`/feed/${element.number}`} state={{ background: location, currentOrder: element }}>
    //             <OrderElement element={element} isOrderHistoryPage={false} onUserOrderClick={onUserOrderDetailsClick} />
    //         </Link>

    //     )
    // };

    const renderOrderNumberList = (status) => {

        const filteredOrders = orders.filter((order) => order.status === status);
        const ordersQty = filteredOrders.length;
        const orderNumberColor = getOrderNumberColor(status);

        return (
            <>

                {background &&
                    <>
                        <Modal title={`#${userOrderDescription.number}`} onClose={closeAllModals}>
                            <UserOrderDetails />
                        </Modal>
                    </>
                }
                {filteredOrders && ordersQty <= 10 &&
                    <ul className={Styles.orderlist}>
                        {filteredOrders.map((filteredOrder, index) => {
                            return (
                                <li key={uuidv4()} className={Styles.orderListElement + " text text_type_digits-default"} style={{ color: `${orderNumberColor}` }}>
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
                                            <li key={uuidv4()} className={Styles.orderListElement + " text text_type_digits-default"} style={{ color: `${orderNumberColor}` }}>
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
                                            <li key={uuidv4()} className={Styles.orderListElement + " text text_type_digits-default"} style={{ color: `${orderNumberColor}` }}>
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
                <>
                    <form className={Styles.form + " mt-10 ml-5"}>

                        <h1 className={Styles.h1 + " text text_type_main-large mb-5"}>Лента заказов</h1>
                        <div className={Styles.sectionContainer}>
                            <section className={Styles.leftSection}>
                                <ul style={{ gap: "16px" }} className={Styles.list}>
                                    {orders.map((element) => {
                                        return (

                                            <Link key={uuidv4()} className={Styles.link} to={`/feed/${element.number}`} state={{ background: location, currentOrder: element }}>
                                                <OrderElement element={element} isOrderHistoryPage={false} onUserOrderClick={onUserOrderDetailsClick} />
                                            </Link>

                                        )
                                    })}
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
                </>
            }
        </>
    );
}

export default FeedPage;