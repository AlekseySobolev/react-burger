import BurgerIngredients from '../../components/burgerIngredients/BurgerIngredients';
import BurgerConstructor from '../../components/burgerConstructor/BurgerConstructor';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Styles from './mainPage.module.css';
import { FC } from 'react';
import { TIngredientDescription } from '../../services/types/data';

interface IMainPage{
    onIngredientClick: (clickedIngredient: TIngredientDescription) => void;
    onOrderButtonClick: (idBurgersElement: string) => void;
}

export const MainPage: FC<IMainPage> = ({onIngredientClick, onOrderButtonClick}) => {

    return (
        <>
            <main className={Styles.main}>
                <DndProvider backend={HTML5Backend}>
                    <BurgerIngredients onIngredientClick={onIngredientClick} />
                    <BurgerConstructor onOrderButtonClick={onOrderButtonClick} />
                </DndProvider>
            </main>
        </>);
}

export default MainPage;