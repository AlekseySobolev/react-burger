
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Styles from './orderElement.module.css';
import { getOrderLocaleStatus, getOrderNumberColor, normalizeOrderDate } from '../../utils/functions';
import { v4 as uuidv4 } from 'uuid';
import { orderType } from '../../utils/constants';

const prices = [];

function OrderElement({ element, isOrderHistoryPage, onUserOrderClick }) {

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
                            prices.push(burgerIngredient.type === "bun" ? burgerIngredient.price * 2 : burgerIngredient.price);
                            const offset = `${50 * index}px`;
                            const zIndex = ingredientsQty - index;
                            let maxImgQty = index < 5;

                            return (
                                <>
                                    {burgerIngredient && maxImgQty &&
                                        <li key={uuidv4()} style={{ backgroundImage: `url(${burgerIngredient.image_mobile})`, left: offset, zIndex: zIndex }} className={Styles.imgList}></li>
                                    }
                                </>
                            )
                        })}

                        {ishiddenImg &&
                            <li key={uuidv4()} style={{ backgroundImage: `url(${lastImg})`, left: lastOffset, zIndex: lastzIndex }} className={Styles.hiddenImgList}>
                                <p style={{ zIndex: `${lastzIndex - 1}` }} className={Styles.qtyHiddenImg}>{`+${ingredientsQty - 5}`}</p>
                            </li>
                        }
                    </ul>
                    <div key={uuidv4()} className={Styles.orderPriceContainer}>
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