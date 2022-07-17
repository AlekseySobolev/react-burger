import { ChangeEvent, FormEvent, useState } from 'react';
import Styles from './forgotPasswordPage.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { getForgotPasswordRequest } from '../../services/actions/auth';
import { useSelector, useDispatch } from '../../services/hooks';
import type { TLocationParams } from '../../services/types/data';

function ForgotPasswordPage() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation() as TLocationParams;

    const currentPath = location.state?.from?.pathname;

    const [form, setValue] = useState({ email: '' });

    const { isAnon } = useSelector(state => state.auth);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue({ ...form, [e.target.name]: e.target.value });
    }

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (form.email) {
            dispatch(getForgotPasswordRequest(form, () => navigate("/reset-password")));
        }
    }
    if (!isAnon) {
        return <Navigate to={currentPath ? currentPath : "/"} />
    }
    return (
        <>
        <form className={Styles.form} onSubmit={onSubmit}>
            <h1 className={"text text_type_main-medium"}>{"Восстановление пароля"}</h1>
            <div className={`${Styles.inputBox} mt-6 mb-6`}>
                <div className={Styles.inputWrapper}>
                    <Input name={"email"} type={"email"} value={form.email} placeholder={"Укажите e-mail"} onChange={onChange} />
                </div>
            </div>
            <Button type="primary" size="large">Восстановить</Button>
            <p className={"mt-20 text text_type_main-default text_color_inactive"}>Вспомнили пароль? <Link className={Styles.span} to="/login"> Войти </Link></p>
        </form>
        </>
    );
}

export default ForgotPasswordPage;