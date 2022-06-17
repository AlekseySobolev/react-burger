import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag, useDrop } from 'react-dnd';
import { changeIngredientPosition } from '../../services/actions/ingredients';
import { ingredientType, orderType } from '../../utils/constants';
import Styles from './orderElement.module.css';
import RouterModal from '../routerModal/RouterModal';
import { getOrderLocaleStatus, getOrderNumberColor, normalizeOrderDate } from '../../utils/functions';

let lastOffset = 0;
const prices = [];

function OrderElement({ element, isOrderHistoryPage, onUserOrderClick}) {

    const { ingredients: burgerIngredients } = useSelector(state => state.burgerIngredients);
    const { number, createdAt, name, status, ingredients } = element;
    
    const ingredientsQty = ingredients.length - 1;
    const ishiddenImg = ingredientsQty > 5;

    const lastOffset = "250px";
    const lastzIndex = ingredientsQty - 5;
    const lastImg = burgerIngredients[burgerIngredients.length - 1].image_mobile;

    const renderIngredientsImage = (ingredientId, burgerIngredients, orderIngredientQty, index) => {

        const burgerIngredient = burgerIngredients.find(ingredient => ingredient._id === ingredientId);
        prices.push(burgerIngredient.type === "bun" ? burgerIngredient.price * 2 : burgerIngredient.price);
        const offset = `${50 * index}px`;
        const zIndex = orderIngredientQty - index;
        let maxImgQty = index < 5;
    
        return (
            <>
                {burgerIngredient && maxImgQty &&
                    <div style={{ backgroundImage: `url(${burgerIngredient.image_mobile})`, left: offset, zIndex: zIndex }} className={Styles.img}></div>
                }
    
    
            </>
        )
    }

    const fullPrice = prices.reduce((currentSum, currentNumber) => {
        return currentSum + currentNumber
    }, 0);
    prices.length = 0;
    
    return (
        <li className={Styles.listElement + " pt-6 pb-6 pl-6 pr-6 mr-2"} onClick={() => onUserOrderClick(element)}>
            <div className={Styles.orderContainer}>
                <div className={Styles.topInfoBox}>
                    <p className={"text text_type_main-default"}>{`#${number}`}</p>
                    <p className={"text text_type_main-default text_color_inactive"}>{normalizeOrderDate(createdAt)}</p>
                </div>

                <div className={Styles.middleInfoBox}>
                    <p className={Styles.paragraph + " text text_type_main-medium"}>{name}</p>
                    {isOrderHistoryPage &&
                        <p className={"text text_type_main-default"} style={{color: getOrderNumberColor(status)}}>{getOrderLocaleStatus(status)}</p>
                    }
                </div>

                <div className={Styles.bottomInfoBox}>
                    <div className={Styles.imageContainer}>
                        {ingredients.map((ingredient, index) => renderIngredientsImage(ingredient, burgerIngredients, ingredientsQty, index))}
                        {ishiddenImg &&
                            <div style={{ backgroundImage: `url(${lastImg})`, left: lastOffset, zIndex: lastzIndex }} className={Styles.hiddenImg}>
                                <p style={{ zIndex: `${lastzIndex - 1}` }} className={Styles.qtyHiddenImg}>{`+${ingredientsQty - 5}`}</p>
                            </div>
                        }
                    </div>
                    <div className={Styles.orderPriceContainer}>
                        <p className={"text text_type_digits-default mr-2"}>{fullPrice}</p>
                        <CurrencyIcon type="primary" size="large" />
                    </div>
                </div>
            </div>
        </li>
    )
}

OrderElement.propTypes = {
    element: orderType,
    isOrderHistoryPage: PropTypes.bool.isRequired,
    onUserOrderClick: PropTypes.func.isRequired,
    
}

export default OrderElement;