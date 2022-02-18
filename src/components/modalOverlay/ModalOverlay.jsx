import Styles from './modalOverlay.module.css';
import Modal from '../modal/Modal';
import OrderBox from '../orderBox/OrderBox';

function ModalOverlay(props){

    return(
        <div className = {props.isOpened ? Styles.modalOverlay_opened : Styles.modalOverlay} >
            <Modal clickedObj = {props.clickedObj}  onOverlayClick = {props.onOverlayClick} onModalClick = {props.onModalClick}/>
        </div>

    );

}

export default ModalOverlay;