import React, {useRef} from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag, useDrop } from 'react-dnd';
import { changeIngredientPosition } from '../../services/actions/ingredients';
import Styles from './constructorIngredient.module.css';
function ConstructorIngredient({ ingredientWithUuid, index, isMiddle, deleteIngredientInConstructor }) {

    const { ingredient } = ingredientWithUuid;
    const dispatch = useDispatch();

    const [{ opacity }, dragRef] = useDrag({
        type: 'constructorIngredients',
        item: { index },
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.5 : 1
        })
    });

    const [{ isHover }, dropTarget] = useDrop({
        accept: 'constructorIngredients',
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

    const className = isHover ? Styles.onHoverConstructorIngredient : "";
    return (
        <div className={className} ref={dropTarget}>
            <div style={{ opacity }} ref={dragRef}>
                <DragIcon type="primary"  />
                <ConstructorElement isLocked={!isMiddle} text={ingredient.name} price={ingredient.price} thumbnail={ingredient.image} handleClose={() => deleteIngredientInConstructor(ingredientWithUuid)} />
            </div>
        </div>
    );
}

// ConstructorIngredient.propTypes = {
//     image: PropTypes.string.isRequired,
//     name: PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired
// }

export default ConstructorIngredient;