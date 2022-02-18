import Styles from './modal.module.css';
import IngredientDetails from '../ingredientDetails/IngredientDetails';
import OrderDetails from '../orderDetails/OrderDetails';
function Modal(props) {
    return (
        <div className={Styles.modal} onClick = {props.onModalClick}>
            {props.clickedObj && Object.keys(props.clickedObj).length !== 0
                ?(<IngredientDetails clickedIngredient={props.clickedObj} onOverlayClick = {props.onOverlayClick}/>)
                : (<OrderDetails clickedIngredient={props.clickedObj} onOverlayClick = {props.onOverlayClick} />)
            }
        </div>

    );

}
export default Modal;
