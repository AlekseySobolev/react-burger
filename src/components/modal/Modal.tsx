import { useEffect, useCallback, FC } from 'react';
import ReactDOM from 'react-dom';
import ModalOverlay from '../modalOverlay/ModalOverlay';
import Styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const modalsContainer: any = document.querySelector('#modals');

export interface IModal {
    title: string;
    onClose: () => void;
}

export const Modal: FC<IModal> = ({ title, onClose, children }) => {

    const handleEscKeydown = useCallback(
        (event: KeyboardEvent) => {
            event.key === "Escape" && onClose();
        },
        [onClose]);

    useEffect(() => {
        document.addEventListener('keydown', handleEscKeydown);

        return () => {
            document.removeEventListener('keydown', handleEscKeydown);
        };
    }, [handleEscKeydown]);

    return ReactDOM.createPortal(
        <>
            <div className= {Styles.modal}>
                <div className={`${Styles.dataBox} ml-10 mb-15 mr-10 mt-10`}>
                    <div className={Styles.buttonBox}>
                        <h1 className={"text text_type_main-medium"}>{title}</h1>
                        <button className={Styles.button} type='button' onClick={() => onClose()}><CloseIcon type="primary" /></button>
                    </div>
                    {children}
                </div>
            </div>
            <ModalOverlay onClose={onClose}/>
        </>,
        modalsContainer
    );
}

export default Modal;
