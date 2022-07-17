import orderBoxStyles from './orderBox.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC } from 'react';

export interface IOrderBox {
        onOrderButtonClick: (idBurgersElement: string) => void;
        prices: Array<number>;
        idBurgersElement: string;
}

export const OrderBox: FC<IOrderBox> = ({ onOrderButtonClick, prices, idBurgersElement })  => {


        const fullPrice = prices.reduce((currentSum, currentNumber) => {
                return currentSum + currentNumber
        }, 0);

        return (

                <div className={orderBoxStyles.orderButton}>
                        <div className={orderBoxStyles.priceBox + " mr-10"}>
                                <p className={"text text_type_digits-medium"}>{fullPrice}</p>
                                <CurrencyIcon type="primary" />
                        </div>
                        <Button type="primary" size="large" onClick={() => onOrderButtonClick(idBurgersElement)}>Оформить заказ</Button>
                </div>

        );
}

export default OrderBox;