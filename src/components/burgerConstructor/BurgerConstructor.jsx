import React from 'react';

import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import ConstructorIngredient from '../constructorIngredient/ConstructorIngredient.jsx';
import OrderBox from '../orderBox/OrderBox.jsx';
import burgerConstructorStyles from './burgerConstructor.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import { addIngredientToConstructor, DECREASE_QTY, INCREASE_QTY, DEL_INGREDIENT } from '../../services/actions/ingredients.js';


const renderBunElement = (ingredientWithUuid, isTop) => {

    const { ingredient } = ingredientWithUuid;
    const lastWord = isTop ? " (верх)" : " (низ)";
    const typeValue = isTop ? "top" : "bottom";
    return (
        <>
            {ingredient &&
                <li key={isTop} className={burgerConstructorStyles.listElement + " ml-8 mr-2"}>
                    <ConstructorElement type={typeValue} isLocked={true} text={ingredient.name + lastWord} price={ingredient.price} thumbnail={ingredient.image} />
                </li>
            }
        </>
    )
};


const renderMiddleConstructorElement = (ingredientWithUuid, index, deleteIngredientInConstructor) => {

    const { ingredient } = ingredientWithUuid;
    const isMiddle = ingredient?.type === "bun" ? false : true;

    return (
        <React.Fragment key={ingredientWithUuid.uuid}>
            {
                ingredientWithUuid &&
                isMiddle &&
                    <ConstructorIngredient index = {index} ingredientWithUuid={ingredientWithUuid} isMiddle={isMiddle} deleteIngredientInConstructor={deleteIngredientInConstructor} />
            }
        </React.Fragment>
    )
};




function BurgerConstructor({ onOrderButtonClick }) {

    const { constructorIngredients } = useSelector(state => state.burgerIngredients);
    const dispatch = useDispatch();


    const dropToConstructor = (ingredientWithUuid) => {

        const isItBun = ingredientWithUuid.ingredient.type === 'bun';
        if (isItBun) {
            const bunInConstructor = constructorIngredients.find(e => (e.ingredient.type === 'bun'));
            if (bunInConstructor) {
                const isTheSameBun = bunInConstructor.ingredient._id === ingredientWithUuid.ingredient._id;
                if (!isTheSameBun) {
                    dispatch({ type: DECREASE_QTY, id: bunInConstructor.ingredient._id });
                    dispatch({ type: DEL_INGREDIENT, uuid: bunInConstructor.uuid });
                    dispatch({ type: INCREASE_QTY, id: ingredientWithUuid.ingredient._id });
                    dispatch(addIngredientToConstructor(ingredientWithUuid));
                }
            }
            else {
                dispatch({ type: INCREASE_QTY, id: ingredientWithUuid.ingredient._id });
                dispatch(addIngredientToConstructor(ingredientWithUuid));
            }
        }
        else {
            dispatch({ type: INCREASE_QTY, id: ingredientWithUuid.ingredient._id });
            dispatch(addIngredientToConstructor(ingredientWithUuid));
        }
    }

    const deleteIngredientInConstructor = (ingredientWithUuid) => {
        dispatch({ type: DECREASE_QTY, id: ingredientWithUuid.ingredient._id });
        dispatch({ type: DEL_INGREDIENT, uuid: ingredientWithUuid.uuid });
    }

    const prices = [];

    const bunElement = constructorIngredients?.find(e => (e.ingredient.type === 'bun'));
    const noBunElements = constructorIngredients?.filter(e => (e.ingredient.type !== 'bun'));

    noBunElements.forEach(noBunElement => prices.push(noBunElement.ingredient.price));

    if (bunElement) prices.push(2 * bunElement.ingredient.price);

    const idBurgersElement = constructorIngredients?.map(e => e.ingredient._id);

    const [{ isHover }, dropTarget] = useDrop({
        accept: 'ingredients',
        collect: monitor => ({
            isHover: monitor.isOver()
        }),
        drop(ingredientWithUuid) {
            dropToConstructor(ingredientWithUuid);
        }
    });

    const ingredientList = isHover ? burgerConstructorStyles.onHoverList : burgerConstructorStyles.list;
    const emptyList = isHover ? burgerConstructorStyles.onHoverLEmptyist : burgerConstructorStyles.emptyList;

    const list = constructorIngredients.length !== 0 ? ingredientList : emptyList;

    return (
        <>
            {<section className={burgerConstructorStyles.section} ref={dropTarget}>

                <ul className={list + " mt-15 ml-4 mb-10"} >

                    {bunElement &&
                        renderBunElement(bunElement, true)}

                    <div key={Math.random()} className={burgerConstructorStyles.list + " " + burgerConstructorStyles.constructorBox}>
                        {noBunElements.map((noBunElement, index) => (renderMiddleConstructorElement(noBunElement, ++index, deleteIngredientInConstructor)))}
                    </div>

                    {bunElement &&
                        renderBunElement(bunElement, false)}

                    {constructorIngredients.length === 0 &&
                        <>
                            <p className={burgerConstructorStyles.p}>Здесь пусто.</p>
                            <p className={burgerConstructorStyles.p}>
                                Вы можете добавить ингредиенты в конструктор, перетащив их карточку из списка игредиентов.
                            </p>

                        </>
                    }
                </ul>
                <OrderBox onOrderButtonClick={onOrderButtonClick} prices={prices} idBurgersElement={idBurgersElement} />
            </section>
            }
        </>
    );

}

export default BurgerConstructor;
