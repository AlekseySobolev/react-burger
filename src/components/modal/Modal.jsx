import PropTypes from 'prop-types';
import { useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import ModalOverlay from '../modalOverlay/ModalOverlay';
import Styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const modalsContainer = document.querySelector('#modals');

function Modal({ title, onOverlayClick, children }) {

    const handleEscKeydown = useCallback(
        (event) => {
            event.key === "Escape" && onOverlayClick();
        },
        []);

    useEffect(() => {
        document.addEventListener('keydown', handleEscKeydown);

        return () => {
            document.removeEventListener('keydown', handleEscKeydown);
        };
    }, [handleEscKeydown]);

    return ReactDOM.createPortal(
        <>
            <div className={children.type.name === "IngredientDetails" ? Styles.ingredientModal : Styles.orderModal}>
                <div className={Styles.dataBox + ' ' + "ml-10 mb-15 mr-10 mt-10"}>
                    <div className={Styles.buttonBox}>
                        <h1 className={"text text_type_main-large"}>{title}</h1>
                        <button className={Styles.button} type='button' onClick={() => onOverlayClick()}><CloseIcon type="primary" /></button>
                    </div>
                    {children}
                </div>
            </div>
            <ModalOverlay onOverlayClick={onOverlayClick} />
        </>,
        modalsContainer
    );
}

Modal.propTypes = {
    title: PropTypes.string.isRequired,
    onOverlayClick: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired
}

export default Modal;
