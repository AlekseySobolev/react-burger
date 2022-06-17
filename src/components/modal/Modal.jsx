import PropTypes from 'prop-types';
import { useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import ModalOverlay from '../modalOverlay/ModalOverlay';
import Styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const modalsContainer = document.querySelector('#modals');

function Modal({ title, onClose, isRouter, children }) {

    const handleEscKeydown = useCallback(
        (event) => {
            event.key === "Escape" && onClose();
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
            <div className= {Styles.modal}>
                <div className={Styles.dataBox + ' ' + "ml-10 mb-15 mr-10 mt-10"}>
                    <div className={Styles.buttonBox}>
                        <h1 className={"text text_type_main-medium"}>{title}</h1>
                        <button className={Styles.button} type='button' onClick={() => onClose()}><CloseIcon type="primary" /></button>
                    </div>
                    {children}
                </div>
            </div>
            <ModalOverlay onClose={onClose} isRouter={isRouter}/>
        </>,
        modalsContainer
    );
}

Modal.propTypes = {
    title: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    isRouter: PropTypes.bool.isRequired,
    children: PropTypes.element.isRequired
}

export default Modal;
