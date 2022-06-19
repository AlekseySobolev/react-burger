import Styles from './userOrderDetails.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { getOrderLocaleStatus, getOrderNumberColor, normalizeOrderDate } from '../../utils/functions';
import { v4 as uuidv4 } from 'uuid';
import { useLocation } from 'react-router-dom';
const prices = [];

function UserOrderDetails() {

    const location = useLocation();
    const userOrderDescription  = location.state?.currentOrder;

    const orderIngredients = userOrderDescription.ingredients;
    const unicOrderIngredients = [...new Set(orderIngredients)];

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

                    <li key={uuidv4()} className={Styles.listElement + " mr-6"}>
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
            {userOrderDescription &&
                <main className={Styles.main + " mt-10"}>
                    <div className={Styles.orderInfoBox}>
                        <h2 className={Styles.h2 + " text text_type_main-medium"}>{userOrderDescription.name}</h2>
                        <p className={"text text_type_main-default"} style={{ color: getOrderNumberColor(userOrderDescription.status) }}>{getOrderLocaleStatus(userOrderDescription.status)}</p>
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
                        <p className={"text text_type_main-default text_color_inactive"}>{normalizeOrderDate(userOrderDescription.createdAt)}</p>
                        <div className={Styles.qtyPriceBox}>
                            <p className={"text text_type_main-medium mr-2"}>{fullPrice}</p>
                            <CurrencyIcon type="primary" size="large" />
                        </div>
                    </div>
                </main>
            }
        </>
    );
}


export default UserOrderDetails;