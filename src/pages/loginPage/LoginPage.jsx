import React, { useState } from 'react';
import Styles from './loginPage.module.css';
import RouterModal from '../../components/routerModal/RouterModal';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Navigate, useLocation, useNavigate} from 'react-router-dom';
import { getLoginRequest } from '../../services/actions/auth';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import AppHeader from '../../components/appHeader/AppHeader';

function LoginPage({ isRouter }) {

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const currentPath = location?.state?.from?.pathname;
    const [form, setValue] = useState({ email: '', password: '' });
    
    const { isAnon } = useSelector(state => state.auth);

    const onChange = e =>{
        setValue({...form, [e.target.name]: e.target.value});
    }

    const onSubmit = (event) =>{
 
        event.preventDefault();
        dispatch(getLoginRequest(form, ()=>navigate(location?.pathname)));    
    }

    if(!isAnon){
        return <Navigate to = {currentPath ? currentPath : "/"}/>
    }

    return (
            <>
            <AppHeader/>
            <form className={Styles.form} onSubmit={onSubmit}>
                 <h1 className={"text text_type_main-medium"}>{"Вход"}</h1>
                <div className={`${Styles.inputBox} mt-6 mb-6`}>

                    <div className={Styles.inputWrapper}>
                        <Input name={"email"} type={"email"}  value={form.email} placeholder={"E-mail"} onChange={onChange}/>
                    </div>
                    <div className={Styles.inputWrapper}>
                        <Input  name={"password"} type={"password"} value={form.password} placeholder={"Пароль"} icon={"ShowIcon"} onChange={onChange}/>
                    </div>
                </div>
                <Button type="primary" size="large">Войти</Button>
                <div className={`${Styles.paragraphBox} mt-20`}>
                    <p className={"text text_type_main-default text_color_inactive"}>Вы - новый пользователь?<Link className={Styles.link} to="/register"> Зарегистрироваться</Link></p>
                    <p className={"text text_type_main-default text_color_inactive"}>Забыли пароль?<Link className={Styles.link} to="/forgot-password"> Восстановить пароль</Link></p>
                </div>
            </form>
            </>
     
    );
}

LoginPage.propTypes = {
    isRouter: PropTypes.bool.isRequired
}

export default LoginPage;