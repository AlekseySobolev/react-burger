//import { useState } from 'react';
import orderBoxStyles from './orderBox.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function OrderBox(props) {
   

        return (

                <div className={orderBoxStyles.orderButton}>
                        <div  className={orderBoxStyles.priceBox + " mr-10"}>
                                <p className={"text text_type_digits-medium"}>610</p>
                                <CurrencyIcon type="primary" size="large" />
                        </div>
                        <Button type="primary" size="large" onClick = {() => props.onClick({})}>Оформить заказ</Button>
                </div>

        );
}

export default OrderBox;