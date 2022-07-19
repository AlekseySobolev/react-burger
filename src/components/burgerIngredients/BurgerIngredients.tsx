import React, { FC, useRef } from 'react';
import TabList from '../tabList/TabList';
import Ingredient from '../ingredient/Ingredient';
import burgerIngredientsStyles from './burgerIngredients.module.css';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/hooks';
import type { TIngredientDescription, TLocationParams } from '../../services/types/data';


export interface IBurgerIngredients {
    onIngredientClick: (clickedIngredient: TIngredientDescription) => void;
}

export const BurgerIngredients: FC<IBurgerIngredients> = ({ onIngredientClick }) => {

    const { ingredients } = useSelector(state => state.burgerIngredients);
    const location = useLocation() as TLocationParams; 

    const bunIngredients = ingredients.filter(e => e.type === 'bun');
    const sauceIngredients = ingredients.filter(e => e.type === 'sauce');
    const mainIngredients = ingredients.filter(e => e.type === 'main');

    const bunRef = useRef(null);
    const sauceRef = useRef(null);
    const mainRef = useRef(null);

    const renderIngredient = (ingredient: TIngredientDescription) => {

        return (
            <React.Fragment key={ingredient._id}>
                {ingredient &&
                      <Link className={burgerIngredientsStyles.link} to={`/ingredients/${ingredient._id}`} state={{ background: location, currentIngredient: ingredient}}>
                        <Ingredient ingredient={ingredient} onIngredientClick={onIngredientClick} />
                      </Link>
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

export default BurgerIngredients;