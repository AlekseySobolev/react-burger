import React, { useState } from 'react';
import Styles from './forgotPasswordPage.module.css';
import RouterModal from '../../components/routerModal/RouterModal';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getForgotPasswordRequest } from '../../services/actions/auth';
import PropTypes from 'prop-types';

function ForgotPasswordPage({ isRouter }) {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const currentPath = location?.state?.from?.pathname;

    const [form, setValue] = useState({ email: ''});

    const { isAnon } = useSelector(state => state.auth);

    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
    }

    const onSubmit = (event) => {
        event.preventDefault();
        if (form.email) {
            dispatch(getForgotPasswordRequest(form, () => navigate("/reset-password")));
        }
    }
    if(!isAnon){
        return <Navigate to = {currentPath ? currentPath : "/"}/>
    }
    return (
        <RouterModal title={"Восстановление пароля"} isRouter={isRouter}>
            <form className={Styles.form} onSubmit={onSubmit}>
                <div className={Styles.inputBox + ' ' + "mt-6 mb-6"}>
                    <div className={Styles.inputWrapper}>
                        <Input name={"email"} type={"email"} placeholder={"Укажите e-mail"} onChange={onChange} />
                    </div>
                </div>
                <Button type="primary" size="large">Восстановить</Button>
                <p className={"mt-20 text text_type_main-default text_color_inactive"}>Вспомнили пароль? <Link className={Styles.span} to="/login"> Войти </Link></p>
            </form>
        </RouterModal>
    );
}

ForgotPasswordPage.propTypes = {
    isRouter: PropTypes.bool.isRequired
}

export default ForgotPasswordPage;