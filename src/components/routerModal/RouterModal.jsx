import PropTypes from 'prop-types';
import AppHeader from '../appHeader/AppHeader';
import ReactDOM from 'react-dom';
import Styles from './routerModal.module.css'
import ModalOverlay from '../modalOverlay/ModalOverlay';

const modalsContainer = document.querySelector('#modals');

function RouterModal({ title, children, isRouter, isProfilePage = false}) {

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
    children: PropTypes.element.isRequired,
    isRouter: PropTypes.bool.isRequired,
    isProfilePage: PropTypes.bool.isRequired
}

export default RouterModal;