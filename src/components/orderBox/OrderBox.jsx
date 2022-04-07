
import PropTypes from 'prop-types';
import orderBoxStyles from './orderBox.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function OrderBox({ onClick }) {
   
        return (

                <div className={orderBoxStyles.orderButton}>
                        <div  className={orderBoxStyles.priceBox + " mr-10"}>
                                <p className={"text text_type_digits-medium"}>610</p>
                                <CurrencyIcon type="primary" size="large" />
                        </div>
                        <Button type="primary" size="large" onClick = {() => onClick({})}>Оформить заказ</Button>
                </div>

        );
}

OrderBox.propTypes = {
        onOverlayClick: PropTypes.func.isRequired
}
      
export default OrderBox;