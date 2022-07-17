import { ChangeEvent, FormEvent, useState } from 'react';
import Styles from './registrationPage.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import { getRegisterRequest } from '../../services/actions/auth';
import { useDispatch } from '../../services/hooks';

function RegistrationPage() {

    const navigate = useNavigate();

    const [form, setValue] = useState({ name: "", email: "", password: "" });

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue({ ...form, [e.target.name]: e.target.value });
    }

    const dispatch = useDispatch();

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        dispatch(getRegisterRequest(form, () => navigate("/")));
    }

    return (
        <>
            <form className={Styles.form} onSubmit={onSubmit}>
            <h1 className={"text text_type_main-medium"}>{"Регистрация"}</h1>
                <div className={`${Styles.inputBox} mt-6 mb-6`}>
                    <div className={Styles.inputWrapper}>
                        <Input name={"name"} type={"text"} value={form.name} placeholder={"Имя"} onChange={onChange} />
                    </div>
                    <div className={Styles.inputWrapper}>
                        <Input name={"email"} type={"email"} value={form.email} placeholder={"E-mail"} onChange={onChange} />
                    </div>
                    <div className={Styles.inputWrapper}>
                        <Input name={"password"} type={"password"} value={form.password} placeholder={"Пароль"} icon={"ShowIcon"} onChange={onChange} />
                    </div>
                </div>
                <Button type="primary" size="large" >Зарегистрироваться</Button>
                <p className={"mt-20 text text_type_main-default text_color_inactive"}>Уже зарегистрированы? <Link className={Styles.link} to="/login"> Войти </Link></p>
            </form> 
        </>
    );
}

export default RegistrationPage;