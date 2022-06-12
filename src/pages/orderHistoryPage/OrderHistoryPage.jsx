import React, { useCallback, useState } from 'react';
import Styles from './orderHistoryPage.module.css';
import RouterModal from '../../components/routerModal/RouterModal';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getEditUserRequest, getLogoutRequest, getUserRequest } from '../../services/actions/auth';

function OrderHistoryPage({ isRouter }) {

    const { user, password} = useSelector(state => state.auth);

    const dispath = useDispatch();

    const unactiveLink = Styles.activeLink + " text text_type_main-medium text_color_inactive";
    const activeLink = Styles.unactiveLink + " text text_type_main-medium";
    const [form, setValue] = useState({ name: user.name, email: user.email, password: password});

    const onChange = e =>{
        setValue({...form, [e.target.name]: e.target.value});
    }

    const onLogoutClick = () =>{
        dispath(getLogoutRequest(localStorage.getItem('refreshToken')));
    }
    const onCancelClick = () =>{
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
                       
                                <p className={unactiveLink}>Профиль</p>
        
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
                     <p>История заказов(тест)</p>   
                    </div>
                </section>
            </form>
        </RouterModal>
    );
}

export default OrderHistoryPage;