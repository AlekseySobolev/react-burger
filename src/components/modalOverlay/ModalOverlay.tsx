import { FC } from 'react';
import Styles from './modalOverlay.module.css';

export interface IModalOverlay{
  onClose: () => void;
}

export const ModalOverlay: FC<IModalOverlay> = ({onClose}) => {
        return (
          <div className={Styles.modalOverlay} onClick = {() => onClose()}/>
        );
}

export default ModalOverlay;