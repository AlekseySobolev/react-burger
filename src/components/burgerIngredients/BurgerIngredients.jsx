import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import TabList from '../tabList/TabList.jsx';
import Ingredient from '../ingredient/Ingredient.jsx';
import burgerIngredientsStyles from './burgerIngredients.module.css';
import { useSelector } from 'react-redux';

function BurgerIngredients({ onIngredientClick }) {

    const { ingredients } = useSelector(state => state.burgerIngredients);

    const bunIngredients = ingredients.filter(e => e.type === 'bun');
    const sauceIngredients = ingredients.filter(e => e.type === 'sauce');
    const mainIngredients = ingredients.filter(e => e.type === 'main');

    const bunRef = useRef(null);
    const sauceRef = useRef(null);
    const mainRef = useRef(null);

    const renderIngredient = (ingredient) => {

        return (
            <React.Fragment key={ingredient._id}> 
            {/* опять не понимаю, почему появляется и как убрать index.js:1 Warning: Failed prop type: The prop `isRequired` is marked as required in `Ingredient`, but its value is `undefined`.*/}
               {ingredient &&
                    <Ingredient  ingredient={ingredient}  onIngredientClick={onIngredientClick}/>
                }
            </React.Fragment>

        )

    };

    return (
        <>
            {bunIngredients && sauceIngredients && mainIngredients &&
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
            }
        </>
    );
}

BurgerIngredients.propTypes = {
    onIngredientClick: PropTypes.func.isRequired
}

export default BurgerIngredients;