import { ChangeEvent, FormEvent, useState } from 'react';
import Styles from './resetPasswordPage.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { getResetPasswordRequest } from '../../services/actions/auth';
import { useSelector, useDispatch } from '../../services/hooks';

function ResetPasswordPage() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { throughForgotPassword } = useSelector(state => state.auth);

    const [form, setValue] = useState({ password: '', token: '' });

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue({ ...form, [e.target.name]: e.target.value });
    }

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(getResetPasswordRequest(form, () => navigate("/login")));
    }

    if (!throughForgotPassword) {
        return <Navigate to="/forgot-password" />
    }

    return (
        <>
            <form className={Styles.form} onSubmit={onSubmit}>
                <h1 className={"text text_type_main-medium"}>{"Восстановление пароля"}</h1>
                <div className={`${Styles.inputBox} mt-6 mb-6`}>
                    <div className={Styles.inputWrapper}>
                        <Input name={"password"} type={"password"} value= {form.password} placeholder={"Введите новый пароль"} icon={"ShowIcon"} onChange={onChange} />
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

export default ResetPasswordPage;