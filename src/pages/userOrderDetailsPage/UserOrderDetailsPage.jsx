import React, { useEffect, useState } from 'react';
import Styles from './userOrderDetailsPage.module.css';
import RouterModal from '../../components/routerModal/RouterModal';
import { Input, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getEditUserRequest, getLogoutRequest, getUserOrder } from '../../services/actions/auth';
import PropTypes from 'prop-types';
import { ordersData, ordersUrl } from '../../utils/constants';
import { getOrderLocaleStatus, getOrderNumberColor, normalizeOrderDate } from '../../utils/functions';
import { wsCloseConnection, wsStartConnection } from '../../services/actions/wsActions';

const prices=[];

function UserOrderDetailsPage({ isRouter }) {

    const dispatch = useDispatch();

    const { id: orderNumber } = useParams();
     const { userOrderInfo } = useSelector(state => state.feed);
   
     useEffect(
        () => {
            console.log("Я внутри useEffect");
            dispatch(getUserOrder(orderNumber));
        },
        []
      );
    
    let orderIngredients = null;
    let unicOrderIngredients = null;

    if(userOrderInfo){
        orderIngredients = userOrderInfo[0].ingredients;
    }
    if(orderIngredients)unicOrderIngredients = [...new Set(orderIngredients)];
    
    const { ingredients: burgerIngredients } = useSelector(state => state.burgerIngredients);


    const renderOrderIngredients = (orderIngredientId, index) => {

        const burgerIngredient = burgerIngredients.find(ingredient => ingredient._id === orderIngredientId);
        const filteredUnicOrderIngredients = orderIngredients.filter(ingredient => ingredient === orderIngredientId);
        let isBun = burgerIngredient.type === "bun";
        const orderIngredientQty = isBun ? filteredUnicOrderIngredients.length * 2 : filteredUnicOrderIngredients.length;

        prices.push((isBun ? burgerIngredient.price * 2 : burgerIngredient.price * orderIngredientQty));

        return (
            <>
                {burgerIngredient &&
                    <li key={index} className={Styles.listElement + " mr-6"}>
                        <div style={{ backgroundImage: `url(${burgerIngredient.image_mobile})` }} className={Styles.img + " mr-2"}></div>
                        <div className={Styles.imgInfo}>
                            <p>{burgerIngredient.name}</p>
                            <div className={Styles.qtyPriceBox}>
                                <p className={"text text_type_digits-default mr-2"}>{`${orderIngredientQty} x ${burgerIngredient.price}`}</p>
                                <CurrencyIcon type="primary" size="large" />
                            </div>
                        </div>
                    </li>
                }
            </>
        )
    }

    const fullPrice = prices.reduce((currentSum, currentNumber) => {
        return currentSum + currentNumber
    }, 0);

    prices.length = 0;
    return (
        <>
            {userOrderInfo &&
             <RouterModal title={""} isRouter={isRouter}>
                <h1 className={Styles.h1 + " text text_type_main-medium mt-30"}>{`#${orderNumber}`}</h1>
                <main className={Styles.main + " mt-5"}>
                    <div className={Styles.orderInfoBox}>
                        <h2 className={Styles.h2 + " text text_type_main-medium"}>{userOrderInfo[0].name}</h2>
                        <p className={"text text_type_main-default"} style={{ color: getOrderNumberColor(userOrderInfo[0].status) }}>{getOrderLocaleStatus(userOrderInfo[0].status)}</p>
                    </div>

                    <div className={Styles.orderIngredientsBox + " mt-15"}>
                        <h2 className={"text text_type_main-medium mb-7"}>Состав: </h2>
                        <ul className={Styles.list + " mt-7"}>
                            {orderIngredients &&
                                unicOrderIngredients.map(renderOrderIngredients)
                            }
                        </ul>
                    </div>
                    <div className={Styles.bottomInfoBox + " mt-10"}>
                        <p className={"text text_type_main-default text_color_inactive"}>{normalizeOrderDate(userOrderInfo[0].createdAt)}</p>
                        <div className={Styles.qtyPriceBox}>
                            <p className={"text text_type_main-medium mr-2"}>{fullPrice}</p>
                            <CurrencyIcon type="primary" size="large" />
                        </div>
                    </div>
                </main>
            </RouterModal>
            } 
        </>
    );
}

UserOrderDetailsPage.propTypes = {
    isRouter: PropTypes.bool.isRequired
}

export default UserOrderDetailsPage;