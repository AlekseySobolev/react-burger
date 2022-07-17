import  { FC, useRef } from 'react';
import { useDispatch } from '../../services/hooks';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag, useDrop } from 'react-dnd';
import { changeIngredientPosition } from '../../services/actions/ingredients';
import Styles from './constructorIngredient.module.css';
import { TIngredientDescriptionWithUuid } from '../../services/types/data';

export interface IConstructorIngredient {
    ingredientWithUuid: TIngredientDescriptionWithUuid;
    index: number;
    isMiddle: boolean;
    deleteIngredientInConstructor: (ingredientWithUuid: TIngredientDescriptionWithUuid) => void;
}


export const ConstructorIngredient: FC<IConstructorIngredient> = ({ ingredientWithUuid, index, isMiddle, deleteIngredientInConstructor }) => {
    const ref: any = useRef();
    const { ingredient } = ingredientWithUuid;
    const dispatch = useDispatch();

    const [, dragRef] = useDrag({
        type: 'constructorIngredient',
        item: { index },
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.5 : 1
        })
    });

    const [{ isHover }, dropRef] = useDrop({
        accept: 'constructorIngredient',
        collect: monitor => ({
            isHover: monitor.isOver()
        }),
        drop(dragIngredient: any) {
            if (dragIngredient.index === index) {
                return
            }
            dispatch(changeIngredientPosition(dragIngredient.index, index));
        }
    });

    dragRef(dropRef(ref));
    const className = isHover ? Styles.onHoverConstructorIngredient : "";
    return (
        <li className={className + " " + Styles.middleListElement + " mr-2"} ref={ref}>
            <DragIcon type="primary" />
            <ConstructorElement isLocked={!isMiddle} text={ingredient.name} price={ingredient.price} thumbnail={ingredient.image} handleClose={() => deleteIngredientInConstructor(ingredientWithUuid)} />
        </li>
    );
}


export default ConstructorIngredient;