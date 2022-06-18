import React, { useState } from 'react';
import Styles from './resetPasswordPage.module.css';
import RouterModal from '../../components/routerModal/RouterModal';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getResetPasswordRequest } from '../../services/actions/auth';
import PropTypes from 'prop-types';
import AppHeader from '../../components/appHeader/AppHeader';

function ResetPasswordPage({ isRouter }) {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { throughForgotPassword } = useSelector(state => state.auth);

    const [form, setValue] = useState({ password: '', token: '' });

    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
    }

    const onSubmit = (event) => {
        event.preventDefault();
        dispatch(getResetPasswordRequest(form, () => navigate("/login")));
    }

    if (!throughForgotPassword) {
        return <Navigate to="/forgot-password" />
    }

    return (
        <>
            <AppHeader/>
            <form className={Styles.form} onSubmit={onSubmit}>
                <h1 className={"text text_type_main-medium"}>{"Восстановление пароля"}</h1>
                <div className={`${Styles.inputBox} mt-6 mb-6`}>
                    <div className={Styles.inputWrapper}>
                        <Input name={"password"} type={"password"} value= {form.name} placeholder={"Введите новый пароль"} icon={"ShowIcon"} onChange={onChange} />
                    </div>
                    <div className={Styles.inputWrapper}>
                        <Input name={"token"} type={"text"} value= {form.token} placeholder={"Введите код из письма"} onChange={onChange} />
                    </div>
                </div>
                <Button type="primary" size="large">Восстановить</Button>
                <p className={"mt-20 text text_type_main-default text_color_inactive"}>Вспомнили пароль? <Link className={Styles.span} to="/login"> Войти </Link></p>
            </form>
        </>
    );
}

ResetPasswordPage.propTypes = {
    isRouter: PropTypes.bool.isRequired
}

export default ResetPasswordPage;