import PropTypes from 'prop-types';
import AppHeader from '../appHeader/AppHeader';
import { useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import Styles from './routerModal.module.css'
import ModalOverlay from '../modalOverlay/ModalOverlay';

const modalsContainer = document.querySelector('#modals');

function RouterModal({ title, children, onClose, isRouter, isProfilePage = false}) {

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
            <div className={Styles.wrapper}>
                <AppHeader />
                <div className={ isProfilePage ? Styles.profilePageContainer : Styles.container}>
                    <h1 className={"text text_type_main-medium"}>{title}</h1>
                    {children}
                </div>
            </div>
            <ModalOverlay isRouter={isRouter}/>
        </>,
        modalsContainer
    );
}

RouterModal.propTypes = {
    title: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired
}

export default RouterModal;