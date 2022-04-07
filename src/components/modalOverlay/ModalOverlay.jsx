import PropTypes from 'prop-types';
import styles from './modalOverlay.module.css';

function ModalOverlay({onOverlayClick}){

        return (
          <div className={styles.modalOverlay} onClick = {() => onOverlayClick()}/>
        );
}

ModalOverlay.propTypes = {
  onOverlayClick: PropTypes.func.isRequired
}

export default ModalOverlay;