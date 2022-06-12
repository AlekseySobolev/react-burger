import PropTypes from 'prop-types';
import AppHeader from '../../components/appHeader/AppHeader.jsx';
import BurgerIngredients from '../../components/burgerIngredients/BurgerIngredients.jsx';
import BurgerConstructor from '../../components/burgerConstructor/BurgerConstructor.jsx';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Styles from './mainPage.module.css';
import { useLocation } from 'react-router-dom';

function MainPage({onIngredientClick, onOrderButtonClick }) {

    const location = useLocation();
    const background = location.state?.background;
    return (
        <>
            <AppHeader />
            <main className={Styles.main}>
                <DndProvider backend={HTML5Backend}>
                    <BurgerIngredients onIngredientClick={onIngredientClick} />
                    <BurgerConstructor onOrderButtonClick={onOrderButtonClick} />
                </DndProvider>
            </main>
        </>);
}
MainPage.propTypes = {
    onIngredientClick: PropTypes.func.isRequired,
    onOrderButtonClick: PropTypes.func.isRequired

}
export default MainPage;