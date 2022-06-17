import PropTypes from 'prop-types';
import Styles from './modalOverlay.module.css';

function ModalOverlay({onClose, isRouter}){

  const modalOverlay = isRouter ? Styles.routerModalOverlay: Styles.modalOverlay;
        return (
          <div className={modalOverlay} onClick = {() => onClose()}/>
        );
}

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
  isRouter: PropTypes.bool.isRequired
}

export default ModalOverlay;