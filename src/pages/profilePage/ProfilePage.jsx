import React, { useState } from 'react';
import Styles from './profilePage.module.css';
import RouterModal from '../../components/routerModal/RouterModal';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getEditUserRequest, getLogoutRequest, getUserRequest } from '../../services/actions/auth';
import PropTypes from 'prop-types';

function ProfilePage({ isRouter }) {

    const { user, password} = useSelector(state => state.auth);

    const dispath = useDispatch();

    const unactiveLink = Styles.activeLink + " text text_type_main-medium text_color_inactive";
    const activeLink = Styles.unactiveLink + " text text_type_main-medium";
    const [form, setValue] = useState({ name: user.name, email: user.email, password: password});
    const [isOpen, setIsOpen] = useState(false);
    
    const onChange = e =>{
        setValue({...form, [e.target.name]: e.target.value});
        setIsOpen(true);
    }

    const onLogoutClick = () =>{
        dispath(getLogoutRequest(localStorage.getItem('refreshToken')));
    }
    const onCancelClick = () =>{
        setIsOpen(false);
        dispath(getUserRequest(form));
    }

    const onSubmit = () =>{
        dispath(getEditUserRequest(form));   
    }
    return (
        <RouterModal title={""} isRouter={isRouter} isProfilePage={true}>
            <form className={Styles.form + " mt-30"} onSubmit={onSubmit}>
                <section className={Styles.leftSection + " ml-5 mr-15"}>

                    <nav className={Styles.nav}>
                        <NavLink className={Styles.navLink + " mt-4 mb-4"} to="/profile">
                            {({ isActive }) => (
                                <p className={isActive ? activeLink : unactiveLink}>Профиль</p>
                            )}
                        </NavLink>
                        <NavLink className={Styles.navLink + " mt-4 mb-4"} to="/profile/orders">
                            {({ isActive }) => (
                                <p className={isActive ? activeLink : unactiveLink}>История заказов</p>
                            )}
                        </NavLink>
                        <NavLink className={Styles.navLink + " mt-4 mb-4"} to="/login">
                            {({ isActive }) => (
                                <p className={isActive ? activeLink : unactiveLink} onClick={onLogoutClick}> Выход</p>
                            )}
                        </NavLink>
                    </nav>

                    <div className={Styles.paragraphBox + " mt-20"}>
                        <p className={"text text_type_main-default text_color_inactive"}>В этом разделе вы можете </p>
                        <p className={"text text_type_main-default text_color_inactive"}>изменить свои персональные данные </p>
                    </div>

                </section>


                <section className={Styles.rightSection}>

                    <div className={Styles.inputBox}>
                        <div className={Styles.inputWrapper}>
                            <Input name={"name"} type={"text"} placeholder={"Имя"} icon={"EditIcon"} value={form.name}  onChange={onChange}/>
                        </div>
                        <div className={Styles.inputWrapper}>
                            <Input name={"email"} type={"email"} placeholder={"Логин"} icon={"EditIcon"} value={form.email}  onChange={onChange}/>
                        </div>
                        <div className={Styles.inputWrapper}>
                            <Input name={"password"} type={"password"} placeholder={"Пароль"} icon={"CloseIcon"}  value={form.password} onChange={onChange}/>
                        </div>

                        <div className={isOpen ? Styles.buttonBox_opened: Styles.buttonBox } >
                            <p className={Styles.link + " mr-7 text text_type_main-default text_color_inactive"} onClick={onCancelClick}>Отмена</p>
                            <Button type="primary" size="large" >Сохранить</Button>
                        </div>

                    </div>
                </section>
            </form>
        </RouterModal>
    );
}

ProfilePage.propTypes = {
    isRouter: PropTypes.bool.isRequired
}

export default ProfilePage;