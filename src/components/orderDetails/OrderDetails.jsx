import orderDetailsStyles from './orderDetails.module.css';
import done from '../../images/done.png';
import { useSelector } from 'react-redux';
function OrderDetails() {

    const { orderDescription } = useSelector(state => state.orderDescription);
    const orderNumber = orderDescription?.order?.number;

    return ( 
            <div className={orderDetailsStyles.infoBox + " mt-9"}>
                <h1 className={"text text_type_digits-large mb-8"}>{orderNumber}</h1>
                <h2 className={"text text_type_main-medium mb-15"}>идентификатор заказа</h2>
                <img className={"mb-15"} src={done} alt="изображение галки" />
                <p className={"text text_type_main-default mb-2"}>Ваш заказ начали готовить</p>
                <p className={"text text_type_main-default text_color_inactive"}>Дождитесь готовности на орбитальной станции</p>
            </div>
    )
}

export default OrderDetails