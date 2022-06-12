import React, { useCallback, useState } from 'react';
import Styles from './stackOrderPage.module.css';
import RouterModal from '../../components/routerModal/RouterModal';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

function StackOrderPage({ onClose, isRouter }) {
    return (
        <RouterModal title={"Лента заказов(Тест)"} isRouter={isRouter} onClose={onClose}>
            <form className={Styles.form}>

            </form>
        </RouterModal>
    );
}

export default StackOrderPage;