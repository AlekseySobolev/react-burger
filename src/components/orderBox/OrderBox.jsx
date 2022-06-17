import PropTypes from 'prop-types';
import orderBoxStyles from './orderBox.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function OrderBox({ onOrderButtonClick, prices, idBurgersElement}) {

        
    const fullPrice = prices.reduce((currentSum, currentNumber) => {
        return currentSum + currentNumber
    }, 0);
    
        return (

                <div className={orderBoxStyles.orderButton}>
                        <div className={orderBoxStyles.priceBox + " mr-10"}>
                                <p className={"text text_type_digits-medium"}>{fullPrice}</p>
                                <CurrencyIcon type="primary" size="large" />
                        </div>
                        <Button type="primary" size="large" onClick={() => onOrderButtonClick(idBurgersElement)}>Оформить заказ</Button>
                </div>

        );
}

OrderBox.propTypes = {
        onOrderButtonClick: PropTypes.func,
        prices: PropTypes.array.isRequired,
        idBurgersElement: PropTypes.array.isRequired,
 }

export default OrderBox;