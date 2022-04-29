import PropTypes from 'prop-types';
import styles from './modalOverlay.module.css';

function ModalOverlay({onClose}){

        return (
          <div className={styles.modalOverlay} onClick = {() => onClose()}/>
        );
}

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired
}

export default ModalOverlay;