import PropTypes from 'prop-types';
import Styles from './modalOverlay.module.css';

function ModalOverlay({onClose}){
        return (
          <div className={Styles.modalOverlay} onClick = {() => onClose()}/>
        );
}

ModalOverlay.propTypes = {
  onClose: PropTypes.func
}

export default ModalOverlay;