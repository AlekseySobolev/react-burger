import PropTypes from 'prop-types';
import { useRef } from 'react';
import TabList from '../tabList/TabList.jsx';
import Ingredient from '../ingredient/Ingredient.jsx';
import burgerIngredientsStyles from './burgerIngredients.module.css';
import { ingredientType } from '../../utils/constants.js';
function BurgerIngredients(props) {

    const burgerIngredients = props.burgerIngredients;

    const bunIngredients = burgerIngredients.filter(e => e.type === 'bun');
    const sauceIngredients = burgerIngredients.filter(e => e.type === 'sauce');
    const mainIngredients = burgerIngredients.filter(e => e.type === 'main');

    const bunRef = useRef(null);
    const sauceRef = useRef(null);
    const mainRef = useRef(null);

    const renderIngredient = (e) => {
        return (
            <li key={e._id} className={burgerIngredientsStyles.listElement} onClick={() => props.onIngredientClick(e)}>
                <Ingredient image={e.image} name={e.name} price={e.price} />
            </li>
        )

    };

    return (
        <section className={burgerIngredientsStyles.section}>
            <h1 className={burgerIngredientsStyles.h1 + " text text_type_main-large mb-5"}>Соберите бургер</h1>
            <TabList bunRef={bunRef} sauceRef={sauceRef} mainRef={mainRef} />
            <div className={burgerIngredientsStyles.ingredientBox + " mt-10"}>
                <section className={burgerIngredientsStyles.ingredientSection} ref={bunRef}>
                    <h2 className={burgerIngredientsStyles.h2 + " text text_type_main-medium"}>Булки</h2>
                    <ul className={burgerIngredientsStyles.list + " ml-4 mt-6 mb-10"}>
                        {bunIngredients.map(renderIngredient)}
                    </ul>
                </section>
                <section className={burgerIngredientsStyles.ingredientSection} ref={sauceRef}>
                    <h2 className={burgerIngredientsStyles.h2 + " text text_type_main-medium"} ref={sauceRef}>Соусы</h2>
                    <ul className={burgerIngredientsStyles.list + " ml-4 mt-6 mb-10"}>
                        {sauceIngredients.map(renderIngredient)}
                    </ul>
                </section>
                <section className={burgerIngredientsStyles.ingredientSection} ref={mainRef}>
                    <h2 className={burgerIngredientsStyles.h2 + " text text_type_main-medium"}>Начинки</h2>
                    <ul className={burgerIngredientsStyles.list + " ml-4 mt-6 mb-10"}>
                        {mainIngredients.map(renderIngredient)}
                    </ul>
                </section>
            </div>
        </section>
    );
}

const burgerIngredients = PropTypes.shape({
    data: PropTypes.arrayOf(ingredientType),
    success: PropTypes.bool
});

BurgerIngredients.propTypes = {
    burgerIngredients: burgerIngredients.isRequired,
    onIngredientClick: PropTypes.func.isRequired
}

export default BurgerIngredients;