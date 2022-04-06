import PropTypes from 'prop-types';
import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import ModalOverlay from '../modalOverlay/ModalOverlay';
import Styles from './modal.module.css';

const modalsContainer = document.querySelector('#modals');

function Modal({ onOverlayClick, onEscKeydown, children }) {

    useEffect(() => {
        document.addEventListener('keydown', onEscKeydown);

        return () => {
            document.removeEventListener('keydown', onEscKeydown);
        };
    }, []);

    return ReactDOM.createPortal(
        <>
            <div className={children.type.name === "IngredientDetails" ? Styles.ingredientModal : Styles.orderModal}>
                {children}
            </div>
            <ModalOverlay onOverlayClick={onOverlayClick} />
        </>,
        modalsContainer
    );
}

Modal.propTypes = {
    onOverlayClick: PropTypes.func,
    onEscKeydown: PropTypes.func,
    children: PropTypes.element 
}

export default Modal;
