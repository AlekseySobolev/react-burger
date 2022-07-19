import React, { useEffect } from 'react';
import Styles from './userOrderDetailsPage.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useParams } from 'react-router-dom';
import { getUserOrder } from '../../services/actions/auth';
import { getOrderLocaleStatus, getOrderNumberColor, normalizeOrderDate } from '../../utils/functions';
import { v4 as uuidv4 } from 'uuid';
import { useSelector, useDispatch } from '../../services/hooks';

const prices: Array<number> = [];

function UserOrderDetailsPage() {

    const dispatch = useDispatch();

    const { id: orderNumber } = useParams<{id: string}>();
    const { userOrderInfo } = useSelector(state => state.feed);
   
     useEffect(
        () => {
            dispatch(getUserOrder(orderNumber));
        },
        [dispatch]
      );
    
    let orderIngredients: Array<any> = [];
    let unicOrderIngredients: Array<any>  = [];

    if(userOrderInfo){
        orderIngredients = userOrderInfo[0].ingredients;
    }
    if(orderIngredients)unicOrderIngredients = [...new Set(orderIngredients)];
    
    const { ingredients: burgerIngredients } = useSelector(state => state.burgerIngredients);

    const fullPrice = prices.reduce((currentSum, currentNumber) => {
        return currentSum + currentNumber
    }, 0);

    prices.length = 0;

    return (
        <React.Fragment key={uuidv4()}>
            {userOrderInfo &&
            <React.Fragment key={uuidv4()}>
                <main className={Styles.main + " mt-30"}>
                <h1 className={Styles.h1 + " text text_type_main-medium"}>{`#${orderNumber}`}</h1>
                    <div className={Styles.orderInfoBox + " mt-5"}>
                        <h2 className={Styles.h2 + " text text_type_main-medium"}>{userOrderInfo[0].name}</h2>
                        <p className={"text text_type_main-default"} style={{ color: getOrderNumberColor(userOrderInfo[0].status) }}>{getOrderLocaleStatus(userOrderInfo[0].status)}</p>
                    </div>

                    <div className={Styles.orderIngredientsBox + " mt-15"}>
                        <h2 className={"text text_type_main-medium mb-7"}>Состав: </h2>
                        <ul className={Styles.list + " mt-7"}>
                            {unicOrderIngredients?.length > 0 &&
                                unicOrderIngredients.map((orderIngredientId) => {

                                    const burgerIngredient = burgerIngredients.find(ingredient => ingredient._id === orderIngredientId);
                                    const filteredUnicOrderIngredients = orderIngredients.filter(ingredient => ingredient === orderIngredientId);
                                    let isBun = burgerIngredient?.type === "bun";
                                    const orderIngredientQty = isBun ? filteredUnicOrderIngredients.length * 2 : filteredUnicOrderIngredients.length;
                                    let commonPrice: number = 0;
                                    if(isBun && burgerIngredient) {
                                        commonPrice =  burgerIngredient.price * 2;
                                    }
                                    else if(!isBun && burgerIngredient) {
                                        commonPrice = burgerIngredient?.price * orderIngredientQty;
                                    }                            
                                    prices.push(commonPrice);

                                    return (
                                        <React.Fragment key={uuidv4()}>
                                            {burgerIngredient &&
                                                <li key={uuidv4()} className={Styles.listElement + " mr-6"}>
                                                    <div style={{ backgroundImage: `url(${burgerIngredient.image_mobile})` }} className={Styles.img + " mr-2"}></div>
                                                    <div className={Styles.imgInfo}>
                                                        <p>{burgerIngredient.name}</p>
                                                        <div className={Styles.qtyPriceBox}>
                                                            <p className={"text text_type_digits-default mr-2"}>{`${orderIngredientQty} x ${burgerIngredient.price}`}</p>
                                                            <CurrencyIcon type="primary" />
                                                        </div>
                                                    </div>
                                                </li>
                                            }
                                        </React.Fragment>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <div className={Styles.bottomInfoBox + " ml-85 mt-10"}>
                        <p className={"text text_type_main-default text_color_inactive"}>{normalizeOrderDate(userOrderInfo[0].createdAt)}</p>
                        <div className={Styles.qtyPriceBox}>
                            <p className={"text text_type_main-medium mr-2"}>{fullPrice}</p>
                            <CurrencyIcon type="primary" />
                        </div>
                    </div>
                </main>
                </React.Fragment>
            } 
        </React.Fragment>
    );
}

export default UserOrderDetailsPage;