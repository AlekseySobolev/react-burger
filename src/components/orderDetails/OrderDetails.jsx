import PropTypes from 'prop-types';
import orderDetailsStyles from './orderDetails.module.css';
import stroke from '../../images/Vector (Stroke).png';
import done from '../../images/done.png';

function OrderDetails({ onClick }) {
    return (
        <form className={"ml-10 mb-30 mr-10 mt-15"}>
            <div className={orderDetailsStyles.buttonBox}>
                <button  className={orderDetailsStyles.button} type='button'><img className={orderDetailsStyles.img} src={stroke} alt="изображение крестика" onClick = {() => onClick()}/></button>
            </div>
            <div className={orderDetailsStyles.infoBox + " mt-9"}>
                <h1 className={"text text_type_digits-large mb-8"}>034536</h1>
                <h2 className={"text text_type_main-medium mb-15"}>идентификатор заказа</h2>
                <img className={"mb-15"} src={done} alt="изображение галки" />
                <p className={"text text_type_main-default mb-2"}>Ваш заказ начали готовить</p>
                <p className={"text text_type_main-default text_color_inactive"}>Дождитесь готовности на орбитальной станции</p>

            </div>

        </form>
    )
}

OrderDetails.propTypes = {
    onClick:  PropTypes.func
}

export default OrderDetails