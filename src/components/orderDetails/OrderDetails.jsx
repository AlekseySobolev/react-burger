import styles from './orderDetails.module.css';
import stroke from '../../images/Vector (Stroke).png';
import done from '../../images/done.png';

function OrderDetails(props) {
    console.log(props.clickedIngredient);
    const clickedIngredient = props.clickedIngredient;
    return (
        <form className={styles.form + ' ' + "ml-10 mb-30 mr-10 mt-15"}>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button  className={styles.button} type='button'><img src={stroke} alt="изображение крестика" onClick = {() => props.onCloseClick()}/></button>
            </div>
            <div style={{ display: "flex", flexDirection:"column", alignItems:"center" }}>
                <h1 className={"text text_type_digits-large mb-8"}>034536</h1>
                <h2 className={"text text_type_main-medium mb-15"}>идентификатор заказа</h2>
                <img className={"mb-15"} src={done} alt="изображение галки" />
                <p className={"text text_type_main-default mb-2"}>Ваш заказ начали готовить</p>
                <p className={"text text_type_main-default text_color_inactive"}>Дождитесь готовности на орбитальной станции</p>

            </div>

        </form>
    )
}
export default OrderDetails