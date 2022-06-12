import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';
import appHeaderStyles from './appHeader.module.css';

function AppHeader() {

    const unactiveLink = appHeaderStyles.unactivelink + " text text_type_main-default text_color_inactive";
    const activeLink = appHeaderStyles.activelink + " text text_type_main-default";

    return (
        <header className={appHeaderStyles.header + " mt-10"}>
            <nav className={appHeaderStyles.nav}>
                <NavLink className={appHeaderStyles.navLink + " pl-5 pr-5 pb-4 pt-4 mr-2"} to="/">
                    {({ isActive }) => (
                        <>
                            <BurgerIcon type={isActive ? "primary" : "secondary"} />
                            <p className={appHeaderStyles.paragraph }><span className={isActive ? activeLink : unactiveLink}>Конструктор</span></p>
                        </>
                    )}
                </NavLink>
                <NavLink className={appHeaderStyles.navLink + " pl-5 pr-5 pb-4 pt-4 mr-2"} to="/stackOrder">
                    {({ isActive }) => (
                        <>
                            <ListIcon type={isActive ? "primary" : "secondary"} />
                            <p className={appHeaderStyles.paragraph }><span className={isActive ? activeLink : unactiveLink}>Лента&nbsp;заказов</span></p>
                        </>
                    )}
                </NavLink>

                <div className={appHeaderStyles.logoElement + " pb-4 pt-4"}>
                    <Logo />
                </div>

                <NavLink className={appHeaderStyles.navLink + " pl-5 pr-5 pb-4 pt-4 mr-2"} to="/profile">
                    {({ isActive }) => (
                        <>
                            <ProfileIcon type={isActive ? "primary" : "secondary"} />
                            <p className={appHeaderStyles.paragraph }><span className={isActive ? activeLink : unactiveLink}>Личный&nbsp;кабинет</span></p>
                        </>
                    )}
                </NavLink>
            </nav>
        </header >

    );
}

export default AppHeader;


{/* 
                <ul className={appHeaderStyles.list}>
                    <li className={appHeaderStyles.listElement + " pl-5 pr-5 pb-4 pt-4 mr-2"}>
                        <BurgerIcon type={"secondary"} />
                        <p className={appHeaderStyles.paragraph + " text text_type_main-default"}> <NavLink className={setActive} to="/" >Конструктор</NavLink> </p>

                    </li>
                    <li className={appHeaderStyles.listElement + " pl-5 pr-5 pb-4 pt-4 mr-2"}>
                        <ListIcon type="secondary" />
                        <p className={appHeaderStyles.paragraph + " text text_type_main-default"}><NavLink className={setActive} to="/StackOrder">Лента&nbsp;заказов</NavLink></p>
                    </li>
                    <li className={appHeaderStyles.logoElement + " pb-4 pt-4"}>
                        <Logo />
                    </li>
                    <li className={appHeaderStyles.listElement + " pl-5 pb-4 pt-4"}>
                        <ProfileIcon type="secondary" />
                        <p className={appHeaderStyles.paragraph + " text text_type_main-default"}><NavLink className={setActive} to="/profile">Личный&nbsp;кабинет</NavLink></p>
                    </li>
                </ul> */}
