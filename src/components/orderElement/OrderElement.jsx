import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag, useDrop } from 'react-dnd';
import { changeIngredientPosition } from '../../services/actions/ingredients';
import { ingredientType } from '../../utils/constants';
import Styles from './orderElement.module.css';

function OrderElement({ ingredientWithUuid, index, isMiddle, deleteIngredientInConstructor }) {
    const { ingredient } = ingredientWithUuid;
    
    return (
        <li className={Styles.middleListElement + " mr-2"} >
            <DragIcon type="primary" />
            <ConstructorElement isLocked={!isMiddle} text={ingredient.name} price={ingredient.price} thumbnail={ingredient.image} handleClose={() => deleteIngredientInConstructor(ingredientWithUuid)} />
        </li>
    );
}

OrderElement.propTypes = {
    ingredientWithUuid: PropTypes.shape({
        ingredient: ingredientType,
        uuid: PropTypes.string.isRequired
}),
    index: PropTypes.number.isRequired,
    isMiddle: PropTypes.bool.isRequired,
    deleteIngredientInConstructor: PropTypes.func.isRequired
}

export default OrderElement;