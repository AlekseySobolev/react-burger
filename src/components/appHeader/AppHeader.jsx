import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
//import { Box } from '@ya.praktikum/react-developer-burger-ui-components';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import appHeaderStyles from './appHeader.module.css';

function AppHeader(){

        return(
        <header className={appHeaderStyles.test + ' ' + appHeaderStyles.header + " mt-10 mb-10"}>
             <nav className={appHeaderStyles.test + ' ' + appHeaderStyles.navigator}>  
              <ul className ={appHeaderStyles.list}>
                <li className ={appHeaderStyles.test + ' ' + appHeaderStyles.listElement + " pl-5 pr-5 pb-4 pt-4 mr-2"}>                   
                    <BurgerIcon type="primary" />
                    <p className = {appHeaderStyles.test + ' ' + appHeaderStyles.paragraph +" text text_type_main-default"}>Конструктор</p>        
                </li> 
                <li className ={appHeaderStyles.test + ' ' + appHeaderStyles.listElement + " pl-5 pr-5 pb-4 pt-4 mr-2"}>                  
                    <ListIcon type="secondary" />
                    <p className = {appHeaderStyles.test + ' ' + appHeaderStyles.paragraph +" text text_type_main-default text_color_inactive"}>Лента&nbsp;заказов</p>        
                </li> 
                <li className = {appHeaderStyles.test + ' ' + appHeaderStyles.logoElement + " pb-4 pt-4"}>                  
                    <Logo/>      
                </li>  
                <li className ={appHeaderStyles.test + ' ' + appHeaderStyles.listElement + " pr-5 pb-4 pt-4"}>                  
                    <ProfileIcon type="secondary" />
                    <p className= {appHeaderStyles.test + ' ' + appHeaderStyles.paragraph +" text text_type_main-default text_color_inactive"}>Личный&nbsp;кабинет</p>        
                </li>
              </ul>
            </nav>   
        </header>
        );
}

export default AppHeader;
