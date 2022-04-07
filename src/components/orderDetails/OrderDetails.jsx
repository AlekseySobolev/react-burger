import orderDetailsStyles from './orderDetails.module.css';
import done from '../../images/done.png';

function OrderDetails() {
    return ( 
            <div className={orderDetailsStyles.infoBox + " mt-9"}>
                <h1 className={"text text_type_digits-large mb-8"}>034536</h1>
                <h2 className={"text text_type_main-medium mb-15"}>идентификатор заказа</h2>
                <img className={"mb-15"} src={done} alt="изображение галки" />
                <p className={"text text_type_main-default mb-2"}>Ваш заказ начали готовить</p>
                <p className={"text text_type_main-default text_color_inactive"}>Дождитесь готовности на орбитальной станции</p>
            </div>
    )
}

export default OrderDetails