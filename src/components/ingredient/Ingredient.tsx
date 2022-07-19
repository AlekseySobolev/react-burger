import ingredientStyles from './ingredient.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';
import { TIngredientDescription } from '../../services/types/data';
import { FC } from 'react';

export interface IIngredient {
        ingredient: TIngredientDescription;
        onIngredientClick: (ingredient: TIngredientDescription) => void;
}

export const Ingredient: FC<IIngredient> = ({ ingredient, onIngredientClick }) => {

        const { image, price, name, __v } = ingredient;

        const [{ opacity }, dragRef] = useDrag({
                type: 'ingredients',
                item: { ingredient },
                collect: monitor => ({
                        opacity: monitor.isDragging() ? 0.5 : 1
                })
        });

        return (

                <li style={{ opacity }} className={ingredientStyles.listElement} onClick={() => onIngredientClick(ingredient)}>
                        <img className={"mb-1 mr-4 ml-4"} alt={"изображение ингредиента"} src={image} ref={dragRef}></img>
                        <div className={ingredientStyles.container + " mb-1"} >
                                <p className={ingredientStyles.paragraph + " text text_type_digits-default"}>{price}</p>
                                <CurrencyIcon type="primary" />
                        </div>
                        <p className={ingredientStyles.p + " text text_type_main-default mb-6"}>{name}</p>
                        <Counter count={__v} size="default" />
                </li>
        );
}

export default Ingredient;