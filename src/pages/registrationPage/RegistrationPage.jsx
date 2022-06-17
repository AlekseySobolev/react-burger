import React, { useCallback, useState } from 'react';
import Styles from './registrationPage.module.css';
import RouterModal from   '../../components/routerModal/RouterModal';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getRegisterRequest } from '../../services/actions/auth';
import PropTypes from 'prop-types';

function RegistrationPage({ isRouter }) {

    const navigate = useNavigate();

    const [form, setValue] = useState({ name: '', email: '', password: '' });
    
    const onChange = e =>{
        setValue({...form, [e.target.name]: e.target.value});
    }

    const dispatch = useDispatch();

    const onSubmit = (event) =>{
 
        event.preventDefault();
        dispatch(getRegisterRequest(form, ()=>navigate("/")));    
    }

    return (
        <RouterModal title={"Регистрация"} isRouter={isRouter}>
            <form className={Styles.form} onSubmit={onSubmit}>
                <div className={Styles.inputBox + ' ' + "mt-6 mb-6"}>
                    <div className={Styles.inputWrapper}>
                        <Input name={"name"} type={"text"} placeholder={"Имя"} onChange={onChange}/>
                    </div>
                    <div className={Styles.inputWrapper}>
                        <Input name={"email"} type={"email"} placeholder={"E-mail"}  onChange={onChange}/>
                    </div>
                    <div className={Styles.inputWrapper}>
                        <Input name={"password"} type={"password"} placeholder={"Пароль"} icon={"ShowIcon"}  onChange={onChange}/>
                    </div>
                </div>
                <Button type="primary" size="large" >Зарегистрироваться</Button>
                <p className={"mt-20 text text_type_main-default text_color_inactive"}>Уже зарегистрированы? <Link className={Styles.link} to="/login"> Войти </Link></p>
            </form>
        </RouterModal>
    );
}

RegistrationPage.propTypes = {
    isRouter: PropTypes.bool.isRequired
}

export default RegistrationPage;