import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag, useDrop } from 'react-dnd';
import { changeIngredientPosition } from '../../services/actions/ingredients';
import Styles from './constructorIngredient.module.css';
function ConstructorIngredient({ ingredientWithUuid, index, isMiddle, deleteIngredientInConstructor }) {
    const ref = useRef();
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
        drop(dragIngredient) {
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

ConstructorIngredient.propTypes = {
    ingredientWithUuid: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    isMiddle: PropTypes.bool.isRequired,
    deleteIngredientInConstructor: PropTypes.func.isRequired
}

export default ConstructorIngredient;