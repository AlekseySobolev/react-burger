
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Styles from './orderElement.module.css';
import { getOrderLocaleStatus, getOrderNumberColor, normalizeOrderDate } from '../../utils/functions';
import { v4 as uuidv4 } from 'uuid';
import React, { FC } from 'react';
import { useSelector } from '../../services/hooks';
import { TUserOrderDescription } from '../../services/types/data';


export interface IOrderElement {
    element: TUserOrderDescription;
    isOrderHistoryPage: boolean;
    onUserOrderClick: (userOrderDescription: TUserOrderDescription) => void;
}

const prices: Array<number> = [];

export const OrderElement: FC<IOrderElement> = ({ element, isOrderHistoryPage, onUserOrderClick }) => {

    const { ingredients: burgerIngredients } = useSelector(state => state.burgerIngredients);
    const { number, createdAt, name, status, ingredients } = element;

    const ingredientsQty = ingredients.length - 1;
    const ishiddenImg = ingredientsQty > 5;

    const lastOffset = "250px";
    const lastzIndex = ingredientsQty - 5;
    const lastImg = burgerIngredients[burgerIngredients.length - 1].image_mobile;

    const fullPrice = prices.reduce((currentSum, currentNumber) => {
        return currentSum + currentNumber
    }, 0);
    prices.length = 0;

    return (

        <li key={uuidv4()} className={Styles.listElement + " pt-6 pb-6 pl-6 pr-6 mr-2"} onClick={() => onUserOrderClick(element)}>
            <div className={Styles.orderContainer}>
                <div className={Styles.topInfoBox}>
                    <p className={"text text_type_main-default"}>{`#${number}`}</p>
                    <p className={"text text_type_main-default text_color_inactive"}>{normalizeOrderDate(createdAt)}</p>
                </div>

                <div className={Styles.middleInfoBox}>
                    <p className={Styles.paragraph + " text text_type_main-medium"}>{name}</p>
                    {isOrderHistoryPage &&
                        <p className={"text text_type_main-default"} style={{ color: getOrderNumberColor(status) }}>{getOrderLocaleStatus(status)}</p>
                    }
                </div>

                <div className={Styles.bottomInfoBox}>
                    <ul className={Styles.imageContainer}>

                        {ingredients.map((ingredientId, index) => {

                            const burgerIngredient = burgerIngredients.find(ingredient => ingredient._id === ingredientId);
                            let commonPrice = 0;
                            if(burgerIngredient?.type === "bun" && burgerIngredient){
                                commonPrice =  burgerIngredient.price * 2;
                            }
                            else if(burgerIngredient?.type !== "bun" && burgerIngredient){
                                commonPrice =  burgerIngredient.price;
                            }
                            // prices.push(burgerIngredient?.type === "bun" ? burgerIngredient.price * 2 : burgerIngredient.price);
                            prices.push(commonPrice);
                            const offset = `${50 * index}px`;
                            const zIndex = ingredientsQty - index;
                            let maxImgQty = index < 5;
              
                            return (
                                <React.Fragment key={uuidv4()}>
                                    {burgerIngredient && maxImgQty &&
                                        <li key={uuidv4()} style={{ backgroundImage: `url(${burgerIngredient.image_mobile})`, left: offset, zIndex: zIndex }} className={Styles.imgList}></li>
                                    }
                                </React.Fragment>
                            )
                        })}

                        {ishiddenImg &&
                            <li key={uuidv4()} style={{ backgroundImage: `url(${lastImg})`, left: lastOffset, zIndex: lastzIndex }} className={Styles.hiddenImgList}>
                                <p style={{ zIndex: `${lastzIndex - 1}` }} className={Styles.qtyHiddenImg}>{`+${ingredientsQty - 5}`}</p>
                            </li>
                        }
                    </ul>
                    <div className={Styles.orderPriceContainer}>
                        <p className={"text text_type_digits-default mr-2"}>{fullPrice}</p>
                        <CurrencyIcon type="primary"/>
                    </div>
                </div>
            </div>
        </li>

    )
}

export default OrderElement;