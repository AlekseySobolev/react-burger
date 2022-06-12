import React, { useState } from 'react';
import Styles from './stackOrderPage.module.css';
import RouterModal from '../../components/routerModal/RouterModal';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function StackOrderPage({ isRouter }) {
    return (
        <RouterModal title={"Лента заказов(Тест)"} isRouter={isRouter}>
            <form className={Styles.form}>

            </form>
        </RouterModal>
    );
}

StackOrderPage.propTypes = {
    isRouter: PropTypes.bool.isRequired
}

export default StackOrderPage;